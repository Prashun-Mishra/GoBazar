import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

interface ProductRow {
  name: string;
  description: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: string;
  mrp: string;
  discountPercent: string;
  stock: string;
  unit: string;
  images: string;
  tags?: string;
}

async function importProducts(csvPath: string) {
  const products: ProductRow[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row: ProductRow) => products.push(row))
      .on('end', async () => {
        console.log(`📊 Found ${products.length} products to import\n`);

        let imported = 0;
        let failed = 0;

        for (const product of products) {
          try {
            // Find or create category
            const category = await prisma.category.upsert({
              where: { name: product.category },
              update: {},
              create: {
                name: product.category,
                slug: product.category.toLowerCase().replace(/\s+/g, '-'),
                image: '/images/categories/default.jpg',
                order: 0,
              },
            });

            // Find or create subcategory
            let subcategoryId: string | null = null;
            if (product.subcategory) {
              const slug = product.subcategory.toLowerCase().replace(/\s+/g, '-');
              let subcategory = await prisma.subCategory.findFirst({
                where: { categoryId: category.id, slug },
              });

              if (!subcategory) {
                subcategory = await prisma.subCategory.create({
                  data: {
                    categoryId: category.id,
                    name: product.subcategory,
                    slug,
                    description: `${product.subcategory} products`,
                    order: 0,
                  },
                });
              }
              subcategoryId = subcategory.id;
            }

            // Parse images and tags
            const images = product.images.split(',').map(img => img.trim()).filter(img => img);
            const tags = product.tags ? product.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

            // Create product
            await prisma.product.create({
              data: {
                name: product.name,
                description: product.description,
                brand: product.brand,
                categoryId: category.id,
                subcategoryId,
                price: parseFloat(product.price),
                mrp: parseFloat(product.mrp),
                discountPercent: parseInt(product.discountPercent || '0'),
                stock: parseInt(product.stock),
                unit: product.unit,
                images,
                tags,
                highlights: [],
                rating: 0,
                reviewCount: 0,
              },
            });

            imported++;
            console.log(`✅ Imported: ${product.name}`);
          } catch (error) {
            failed++;
            console.error(`❌ Failed: ${product.name}`, error);
          }
        }

        console.log(`\n📈 Summary:`);
        console.log(`   ✅ Imported: ${imported}`);
        console.log(`   ❌ Failed: ${failed}`);
        console.log(`   📊 Total: ${products.length}`);

        await prisma.$disconnect();
        resolve({ imported, failed, total: products.length });
      })
      .on('error', reject);
  });
}

// Get CSV file path
const csvFile = process.argv[2] || join(process.cwd(), 'templates', 'products_import_template.csv');

console.log(`🚀 Starting import from: ${csvFile}\n`);

importProducts(csvFile)
  .then(() => {
    console.log('\n✅ Import completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });
