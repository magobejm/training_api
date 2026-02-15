"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedMasters() {
    console.log('🌱 Seeding masters...');
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
                imageUrl: null,
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
//# sourceMappingURL=masters.seed.js.map