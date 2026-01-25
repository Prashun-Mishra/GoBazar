import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addBatterProducts() {
    try {
        console.log('🥣 Adding Batter subcategory products...\n');

        // First, find the Batter subcategory
        const subcategory = await prisma.subCategory.findFirst({
            where: {
                OR: [
                    { slug: 'batter' },
                    { name: 'Batter' }
                ]
            }
        });

        if (!subcategory) {
            console.error('❌ Batter subcategory not found!');
            return;
        }

        console.log(`✅ Found subcategory: ${subcategory.name} (ID: ${subcategory.id})\n`);

        const products = [
            {
                name: 'ID Idli & Dosa Batter',
                description: "ID Idli & Dosa Batter is the pioneer of fresh batter in India. Made from RO purified water, high-quality rice, and urad dal, it is 100% natural with no added preservatives or soda. It is stone-ground to maintain the authentic texture and taste. The batter is moderately fermented, ensuring soft idlis and crispy dosas every time. It comes in a convenient pouch with a spout. A lifesaver for busy mornings, delivering the taste of grandma's kitchen.",
                price: 90,
                mrp: 110,
                brand: 'ID Fresh',
                unit: '1 kg',
                stock: 250,
                images: ['https://www.jiomart.com/images/product/600x600/490123433/id-idly-dosa-batter-1-kg-pouch-product-images-o490123433-p590032898-2-202203151048.jpg'],
                tags: ['id batter', 'idli dosa batter', 'fresh batter', 'natural']
            },
            {
                name: 'MTR Dosa Batter',
                description: "MTR Dosa Batter brings the expertise of MTR into a fresh format. This batter is perfectly fermented to give you the golden brown color and crispiness that dosas are famous for. It is prepared using the right ratio of rice and lentils. Free from soda and preservatives, it is a healthy choice. The packaging ensures the batter stays fresh for days in the refrigerator. Just pour, spread, and cook for a delightful South Indian breakfast.",
                price: 85,
                mrp: 95,
                brand: 'MTR',
                unit: '900 g',
                stock: 180,
                images: ['https://tse2.mm.bing.net/th/id/OIP.4pc4B8JEm17QxgNafHhzPAHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'],
                tags: ['dosa batter', 'mtr', 'ready to cook', 'fermented batter']
            },
            {
                name: 'ID Vada Batter',
                description: "ID Vada Batter makes the difficult task of making Medu Vadas incredibly simple. It comes in a unique patented squeeze pack that forms the hole in the vada automatically as you squeeze the batter into hot oil. No messy hands and no shapeless vadas. The batter is made from urad dal and rice flour, seasoned lightly. It is fresh, preservative-free, and crispy on the outside while being soft on the inside. Innovation meets tradition.",
                price: 65,
                mrp: 75,
                brand: 'ID Fresh',
                unit: '375 g',
                stock: 150,
                images: ['https://tse1.mm.bing.net/th/id/OIP.aDWP_CKxeRsvcdv-lWn0ywHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'],
                tags: ['vada batter', 'id fresh', 'medu vada', 'instant vada']
            },
            {
                name: 'Asal Idli/Dosa Batter',
                description: "Asal Idli/Dosa Batter is a popular local choice known for its homemade taste. It uses premium ingredients and traditional grinding methods. The fermentation is controlled to prevent it from becoming too sour. It yields fluffy idlis and paper-thin dosas. Asal ensures strict hygiene during processing. It saves soaking and grinding time for working professionals. A reliable staple for your refrigerator to ensure a healthy breakfast is always ready.",
                price: 70,
                mrp: 80,
                brand: 'Asal',
                unit: '1 kg',
                stock: 120,
                images: ['https://m.media-amazon.com/images/I/71ta34POD1L._SL1500_.jpg'],
                tags: ['asal batter', 'idli batter', 'dosa batter', 'breakfast']
            },
            {
                name: 'Rishta Idli & Dosa Batter',
                description: "Rishta Idli & Dosa Batter is made from high-quality rice and urad dal, ground to a smooth consistency. It is 100% vegetarian and free from artificial preservatives. The batter is versatile and can be used to make Idli, Dosa, Uttapam, and Paniyaram. It ferments naturally, providing good gut bacteria. The convenient packaging allows for easy storage and pouring. Enjoy restaurant-quality South Indian food in the comfort of your home.",
                price: 75,
                mrp: 85,
                brand: 'Rishta',
                unit: '1 kg',
                stock: 100,
                images: ['https://tse1.mm.bing.net/th/id/OIP.E40knGE626v9kZIKbuXjXQAAAA?cb=defcache2defcache=1&w=300&h=300&rs=1&pid=ImgDetMain&o=7&rm=3'],
                tags: ['rishta batter', 'idli dosa', 'fresh food', 'ready to cook']
            }
        ];

        let successCount = 0;

        for (const product of products) {
            console.log(`Adding: ${product.name}...`);

            try {
                const created = await prisma.product.create({
                    data: {
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        mrp: product.mrp,
                        brand: product.brand,
                        unit: product.unit,
                        stock: product.stock,
                        images: product.images,
                        tags: product.tags,
                        categoryId: subcategory.categoryId,
                        subcategoryId: subcategory.id,
                        isActive: true,
                        highlights: []
                    }
                });

                console.log(`  ✅ Added successfully (ID: ${created.id})\n`);
                successCount++;
            } catch (error: any) {
                if (error.code === 'P2002') {
                    console.log(`  ⚠️  Already exists, skipping\n`);
                } else {
                    console.error(`  ❌ Error: ${error.message}\n`);
                }
            }
        }

        console.log(`\n✅ Successfully added ${successCount} out of ${products.length} Batter products!`);
    } catch (error) {
        console.error('❌ Error adding products:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

addBatterProducts();

