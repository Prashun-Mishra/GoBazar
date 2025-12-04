import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    try {
        const productsFilePath = path.join(__dirname, '../products-to-add.json');
        const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        console.log(`📦 Found ${productsData.length} products to add.`);

        for (const productData of productsData) {
            console.log(`\nProcessing: ${productData.name}`);

            // 1. Find or Create Category
            let category = await prisma.category.findFirst({
                where: { name: { equals: productData.category, mode: 'insensitive' } },
            });

            if (!category) {
                console.log(`  Creating category: ${productData.category}`);
                // Generate slug from name
                const slug = productData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                category = await prisma.category.create({
                    data: {
                        name: productData.category,
                        slug: slug,
                        isActive: true,
                    },
                });
            } else {
                console.log(`  Found category: ${category.name}`);
            }

            // 2. Find or Create Subcategory
            let subcategory = await prisma.subCategory.findFirst({
                where: {
                    name: { equals: productData.subcategory, mode: 'insensitive' },
                    categoryId: category.id,
                },
            });

            if (!subcategory) {
                console.log(`  Creating subcategory: ${productData.subcategory}`);
                // Generate slug from name
                const slug = productData.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                subcategory = await prisma.subCategory.create({
                    data: {
                        name: productData.subcategory,
                        slug: slug,
                        categoryId: category.id,
                        isActive: true,
                    },
                });
            } else {
                console.log(`  Found subcategory: ${subcategory.name}`);
            }

            // 3. Create Product
            // Check if product already exists to avoid duplicates
            const existingProduct = await prisma.product.findFirst({
                where: {
                    name: productData.name,
                    categoryId: category.id,
                    subcategoryId: subcategory.id,
                },
            });

            if (existingProduct) {
                console.log(`  ⚠️ Product already exists: ${productData.name}. Skipping.`);
                continue;
            }

            // Format fields
            const description = Array.isArray(productData.description)
                ? productData.description.join('\n')
                : productData.description;

            const benefits = Array.isArray(productData.keyBenefits)
                ? productData.keyBenefits.join('\n')
                : productData.keyBenefits;

            const product = await prisma.product.create({
                data: {
                    name: productData.name,
                    brand: productData.brand,
                    price: productData.sellingPrice,
                    mrp: productData.mrp,
                    discountPercent: Math.round(((productData.mrp - productData.sellingPrice) / productData.mrp) * 100),
                    images: productData.imageUrls,
                    unit: productData.unit,
                    stock: productData.stockQuantity,
                    description: description,
                    highlights: [], // Can be populated if data provided
                    tags: productData.tags,
                    benefits: benefits,
                    categoryId: category.id,
                    subcategoryId: subcategory.id,
                    isActive: true,
                    rating: 0,
                    reviewCount: 0,
                },
            });

            console.log(`  ✅ Added product: ${product.name}`);
        }

        console.log('\n🎉 All products processed successfully!');

    } catch (error) {
        console.error('❌ Error adding products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
