import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMasters() {
    console.log('🌱 Seeding masters...');

    // 1. Seed Roles
    const roles = ['ADMIN', 'TRAINER', 'CLIENT'];
    for (const roleName of roles) {
        await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: {
                name: roleName,
                description: `Role for ${roleName.toLowerCase()}`,
            },
        });
    }
    console.log(`✅ Created ${roles.length} roles`);

    // 2. Seed Muscle Groups
    const muscleGroups = [
        'PECTORAL', 'DORSAL', 'PIERNA', 'HOMBRO', 'BICEPS', 'TRICEPS',
        'ABDOMINALES', 'LUMBAR', 'CARDIO', 'MOVILIDAD', 'CALENTAMIENTO',
        'CUADRICEPS', 'FEMORAL', 'GLUTEO', 'GEMELO', 'DELTOIDES'
    ];

    for (const groupName of muscleGroups) {
        await prisma.muscleGroup.upsert({
            where: { name: groupName },
            update: {},
            create: {
                name: groupName,
                imageUrl: null, // Placeholder
            },
        });
    }
    console.log(`✅ Created ${muscleGroups.length} muscle groups`);
}

async function main() {
    await seedMasters();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
