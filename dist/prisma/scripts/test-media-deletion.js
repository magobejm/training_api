"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function testDeletion() {
    console.log('--- Testing Exercise Media Deletion ---');
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
    }
    else {
        console.error('FAILURE: Media fields were not cleared.');
    }
    await prisma.exercise.delete({ where: { id: exercise.id } });
}
testDeletion()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=test-media-deletion.js.map