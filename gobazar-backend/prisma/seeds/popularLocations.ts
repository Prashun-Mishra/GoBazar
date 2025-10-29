import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPopularLocations() {
  console.log('🌍 Seeding popular locations...');

  const popularLocations = [
    {
      name: 'Connaught Place',
      address: 'Connaught Place, New Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      latitude: 28.6280,
      longitude: 77.2069,
      order: 1,
    },
    {
      name: 'Cyber City',
      address: 'DLF Cyber City, Gurgaon',
      city: 'Gurgaon',
      state: 'Haryana',
      latitude: 28.4961,
      longitude: 77.0943,
      order: 2,
    },
    {
      name: 'Sector 18',
      address: 'Sector 18, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      latitude: 28.5696,
      longitude: 77.3541,
      order: 3,
    },
    {
      name: 'Saket',
      address: 'Saket, South Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      latitude: 28.5244,
      longitude: 77.2066,
      order: 4,
    },
    {
      name: 'Dwarka',
      address: 'Dwarka, West Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      latitude: 28.5921,
      longitude: 77.0460,
      order: 5,
    },
  ];

  for (const location of popularLocations) {
    // Check if location exists by name
    const existing = await prisma.popularLocation.findFirst({
      where: { name: location.name }
    });

    if (existing) {
      await prisma.popularLocation.update({
        where: { id: existing.id },
        data: location,
      });
    } else {
      await prisma.popularLocation.create({
        data: location,
      });
    }
  }

  console.log('✅ Popular locations seeded successfully');
}

// Run if executed directly
if (require.main === module) {
  seedPopularLocations()
    .catch((e) => {
      console.error('❌ Error seeding popular locations:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
