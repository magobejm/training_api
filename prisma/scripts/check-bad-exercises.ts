
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Checking for name startsWith "exercises" ---');
    const ex1 = await prisma.exercise.findMany({
        where: {
            name: { startsWith: 'exercises' }
        },
        select: { id: true, name: true, muscleGroup: true }
    });
    console.log(`Found ${ex1.length} starting with "exercises"`);
    ex1.forEach(ex => console.log(`- [${ex.name}]`));

    console.log('--- Checking for name containing "." ---');
    const ex2 = await prisma.exercise.findMany({
        where: {
            name: { contains: '.' }
        },
        select: { id: true, name: true, muscleGroup: true }
    });
    console.log(`Found ${ex2.length} containing "."`);
    ex2.forEach(ex => console.log(`- [${ex.name}]`));

    console.log('--- Checking for swapped names (Name is a Muscle Group) ---');
    // List of common muscles in Spanish
    const muscles = [
        'Pecho', 'Espalda', 'Biceps', 'Triceps', 'Hombro', 'Pierna',
        'Cuadriceps', 'Femoral', 'Gluteos', 'Gemelo', 'Abdominales',
        'Lumbar', 'Delt anterior', 'Delt lateral', 'Delt posterior'
    ];

    const swapped = await prisma.exercise.findMany({
        where: {
            name: { in: muscles }
        },
        select: { id: true, name: true, muscleGroup: true }
    });
    console.log(`Found ${swapped.length} potentially swapped exercises.`);
    swapped.forEach(ex => {
        console.log(`- [${ex.id}] Name: "${ex.name}" | Muscle: "${ex.muscleGroup}"`);
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
