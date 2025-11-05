import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

const prisma = new PrismaClient();

interface ProductCSVRow {
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
  images: string; // comma-separated URLs
  tags?: string; // comma-separated tags
}

async function importProducts(csvFilePath: string) {
  const products: ProductCSVRow[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row: ProductCSVRow) => {
        products.push(row);
      })
      .on('end', async () => {
        console.log(`📊 Found ${products.length} products to import`);

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

            // Find or create subcategory if provided
            let subcategoryId: string | null = null;
            if (product.subcategory) {
              const slug = product.subcategory.toLowerCase().replace(/\s+/g, '-');
              
              // Try to find existing subcategory
              let subcategory = await prisma.subCategory.findFirst({
                where: {
                  categoryId: category.id,
                  slug: slug,
                },
              });

              // Create if doesn't exist
              if (!subcategory) {
                subcategory = await prisma.subCategory.create({
                  data: {
                    categoryId: category.id,
                    name: product.subcategory,
                    slug: slug,
                    description: `${product.subcategory} products`,
                    order: 0,
                  },
                });
              }
              
              subcategoryId = subcategory.id;
            }

            // Parse images
            const images = product.images
              .split(',')
              .map((img) => img.trim())
              .filter((img) => img.length > 0);

            // Parse tags
            const tags = product.tags
              ? product.tags
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter((tag) => tag.length > 0)
              : [];

            // Create product
            await prisma.product.create({
              data: {
                name: product.name,
                description: product.description,
                brand: product.brand,
                categoryId: category.id,
                subcategoryId: subcategoryId,
                price: parseFloat(product.price),
                mrp: parseFloat(product.mrp),
                discountPercent: parseInt(product.discountPercent || '0'),
                stock: parseInt(product.stock),
                unit: product.unit,
                images: images,
                tags: tags,
                highlights: [],
                rating: 0,
                reviewCount: 0,
              },
            });

            imported++;
            console.log(`✅ Imported: ${product.name}`);
          } catch (error) {
            failed++;
            console.error(`❌ Failed to import ${product.name}:`, error);
          }
        }

        console.log(`\n📈 Import Summary:`);
        console.log(`   ✅ Imported: ${imported}`);
        console.log(`   ❌ Failed: ${failed}`);
        console.log(`   📊 Total: ${products.length}`);

        resolve({ imported, failed, total: products.length });
      })
      .on('error', reject);
  });
}

// Run import
const csvFile = process.argv[2] || path.join(__dirname, '../templates/products_import_template.csv');

console.log(`🚀 Starting product import from: ${csvFile}\n`);

importProducts(csvFile)
  .then(() => {
    console.log('\n✅ Import completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
