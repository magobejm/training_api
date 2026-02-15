
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.exercise.count();
    console.log(`Total exercises in database: ${count}`);

    console.log('\n--- Oldest 20 exercises (Likely the originals) ---');
    const oldest = await prisma.exercise.findMany({
        take: 20,
        orderBy: { createdAt: 'asc' },
        select: { id: true, name: true, createdAt: true }
    });
    oldest.forEach(ex => console.log(`[${ex.createdAt.toISOString()}] ${ex.name}`));

    console.log('\n--- Newest 20 exercises (Likely imported/bad) ---');
    const newest = await prisma.exercise.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, createdAt: true }
    });
    newest.forEach(ex => console.log(`[${ex.createdAt.toISOString()}] ${ex.name}`));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
