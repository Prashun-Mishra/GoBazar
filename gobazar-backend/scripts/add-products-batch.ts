import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`⚠️ DB Error, retrying... (${retries} left)`);
        await new Promise(r => setTimeout(r, delay));
        return withRetry(fn, retries - 1, delay);
    }
}

async function main() {
    try {
        const productsFilePath = path.join(__dirname, '../products-to-add.json');
        const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        console.log(`📦 Found ${productsData.length} products to add.`);

        for (const productData of productsData) {
            console.log(`\nProcessing: ${productData.name}`);

            // Map fields (Handle both Batch 1 and Batch 2 formats)
            const catName = productData.categoryName || productData.category;
            const subName = productData.subcategoryName || productData.subcategory;
            const price = productData.price || productData.sellingPrice;
            const images = productData.images || productData.imageUrls || [];
            const stock = productData.stock || productData.stockQuantity || 0;

            // 1. Find or Create Category
            let category = await withRetry(() => prisma.category.findFirst({
                where: { name: { equals: catName, mode: 'insensitive' } },
            }));

            if (!category) {
                console.log(`  Creating category: ${catName}`);
                const slug = slugify(catName);
                try {
                    category = await withRetry(() => prisma.category.create({
                        data: { name: catName, slug, isActive: true },
                    }));
                } catch (e: any) {
                    // If creation failed (race condition/slug collision), fetch again
                    if (e.code === 'P2002') {
                        category = await prisma.category.findFirst({ where: { slug } });
                    }
                    if (!category) throw e;
                }
            } else {
                console.log(`  Found category: ${category.name}`);
            }

            if (!category) throw new Error(`Could not find or create category: ${catName}`);

            // 2. Find or Create Subcategory
            let subcategory = await withRetry(() => prisma.subCategory.findFirst({
                where: {
                    name: { equals: subName, mode: 'insensitive' },
                    categoryId: category!.id,
                },
            }));

            if (!subcategory) {
                console.log(`  Creating subcategory: ${subName}`);
                const slug = slugify(subName);
                try {
                    subcategory = await withRetry(() => prisma.subCategory.create({
                        data: {
                            name: subName,
                            slug: slug,
                            categoryId: category!.id,
                            isActive: true,
                            image: images[0] || null // Use product image as fallback
                        },
                    }));
                } catch (e: any) {
                    if (e.code === 'P2002') {
                        // Likely slug conflict, try to find by slug
                        subcategory = await prisma.subCategory.findFirst({ where: { slug } });
                    }
                    if (!subcategory) throw e;
                }
            } else {
                console.log(`  Found subcategory: ${subcategory.name}`);
            }

            if (!subcategory) throw new Error(`Could not find or create subcategory: ${subName}`);

            // 3. Create Product
            const existingProduct = await withRetry(() => prisma.product.findFirst({
                where: {
                    name: productData.name,
                    categoryId: category!.id,
                    subcategoryId: subcategory!.id,
                },
            }));

            if (existingProduct) {
                console.log(`  ⚠️ Product already exists: ${productData.name}. Skipping.`);

                // Optional: Update image if provided and different?
                // For now, just skip.
                continue;
            }

            // Format fields
            const description = Array.isArray(productData.description)
                ? productData.description.join('\n')
                : productData.description || '';

            const benefits = Array.isArray(productData.keyBenefits)
                ? productData.keyBenefits.join('\n')
                : productData.keyBenefits || '';

            const product = await withRetry(() => prisma.product.create({
                data: {
                    name: productData.name,
                    brand: productData.brand,
                    price: price,
                    mrp: productData.mrp,
                    discountPercent: Math.round(((productData.mrp - price) / productData.mrp) * 100),
                    images: images,
                    unit: productData.unit,
                    stock: stock,
                    description: description,
                    highlights: [],
                    tags: productData.tags || [],
                    benefits: benefits,
                    categoryId: category!.id,
                    subcategoryId: subcategory!.id, // Now guaranteed to exist
                    isActive: true,
                    rating: 4.5, // Default nice rating
                    reviewCount: Math.floor(Math.random() * 50) + 10,
                    // isFeatured removed as it does not exist on Product model
                },
            }));

            console.log(`  ✅ Added product: ${product.name}`);
        }

        console.log('\n🎉 Product Batch Processing Complete!');

    } catch (error) {
        console.error('❌ Error adding products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
