import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDeletion() {
    console.log('--- Testing Exercise Media Deletion ---');

    // 1. Create a dummy exercise with media
    const exercise = await prisma.exercise.create({
        data: {
            name: 'Test Deletion Obj',
            description: 'Test Description',
            muscleGroup: 'PECTORAL',
            defaultVideoUrl: 'http://youtube.com/test',
            defaultImageUrl: 'http://cloudinary.com/test',
        }
    });

    console.log('Created exercise with URLs:', {
        video: exercise.defaultVideoUrl,
        image: exercise.defaultImageUrl
    });

    // 2. Clear URLs by sending null
    const updated = await prisma.exercise.update({
        where: { id: exercise.id },
        data: {
            defaultVideoUrl: null,
            defaultImageUrl: null
        }
    });

    console.log('Updated exercise (should be null):', {
        video: updated.defaultVideoUrl,
        image: updated.defaultImageUrl
    });

    if (updated.defaultVideoUrl === null && updated.defaultImageUrl === null) {
        console.log('SUCCESS: Media fields cleared correctly.');
    } else {
        console.error('FAILURE: Media fields were not cleared.');
    }

    // 3. Cleanup
    await prisma.exercise.delete({ where: { id: exercise.id } });
}

testDeletion()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
