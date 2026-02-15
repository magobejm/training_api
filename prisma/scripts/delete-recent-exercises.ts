
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const allExercises = await prisma.exercise.findMany({
        orderBy: { createdAt: 'asc' },
        select: { id: true, name: true, createdAt: true }
    });

    console.log(`Total exercises found: ${allExercises.length}`);

    if (allExercises.length <= 20) {
        console.log('20 or fewer exercises found. No deletion needed.');
        return;
    }

    const exercisesToDelete = allExercises.slice(20);
    const idsToDelete = exercisesToDelete.map(ex => ex.id);

    console.log(`Original 20 exercises will be kept.`);
    console.log(`Deleting ${idsToDelete.length} exercises (newly added/imported)...`);

    // Optional: Log names of deleted for verification
    // exercisesToDelete.forEach(ex => console.log(`- Deleting: ${ex.name} (${ex.createdAt.toISOString()})`));

    const result = await prisma.exercise.deleteMany({
        where: {
            id: { in: idsToDelete }
        }
    });

    console.log(`Successfully deleted ${result.count} exercises.`);

    const finalCount = await prisma.exercise.count();
    console.log(`Final exercise count: ${finalCount}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
