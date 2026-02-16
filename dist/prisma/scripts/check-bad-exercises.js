"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('--- Checking for name startsWith "exercises" ---');
    const ex1 = await prisma.exercise.findMany({
        where: {
            name: { startsWith: 'exercises' }
        },
        select: { id: true, name: true, targetMuscleGroup: { select: { name: true } } }
    });
    console.log(`Found ${ex1.length} starting with "exercises"`);
    ex1.forEach(ex => console.log(`- [${ex.name}]`));
    console.log('--- Checking for name containing "." ---');
    const ex2 = await prisma.exercise.findMany({
        where: {
            name: { contains: '.' }
        },
        select: { id: true, name: true, targetMuscleGroup: { select: { name: true } } }
    });
    console.log(`Found ${ex2.length} containing "."`);
    ex2.forEach(ex => console.log(`- [${ex.name}]`));
    console.log('--- Checking for swapped names (Name is a Muscle Group) ---');
    const muscles = [
        'Pecho', 'Espalda', 'Biceps', 'Triceps', 'Hombro', 'Pierna',
        'Cuadriceps', 'Femoral', 'Gluteos', 'Gemelo', 'Abdominales',
        'Lumbar', 'Delt anterior', 'Delt lateral', 'Delt posterior'
    ];
    const swapped = await prisma.exercise.findMany({
        where: {
            name: { in: muscles }
        },
        select: { id: true, name: true, targetMuscleGroup: { select: { name: true } } }
    });
    console.log(`Found ${swapped.length} potentially swapped exercises.`);
    swapped.forEach((ex) => {
        console.log(`- [${ex.id}] Name: "${ex.name}" | Muscle: "${ex.targetMuscleGroup?.name}"`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check-bad-exercises.js.map