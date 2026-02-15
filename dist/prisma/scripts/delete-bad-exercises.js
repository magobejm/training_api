"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const muscles = [
        'Pecho', 'Espalda', 'Biceps', 'Triceps', 'Hombro', 'Pierna',
        'Cuadriceps', 'Femoral', 'Gluteos', 'Gemelo', 'Abdominales',
        'Lumbar', 'Delt anterior', 'Delt lateral', 'Delt posterior'
    ];
    console.log('--- Deleting exercises where Name is a Muscle Group ---');
    const badExercises = await prisma.exercise.findMany({
        where: {
            name: { in: muscles }
        }
    });
    console.log(`Found ${badExercises.length} exercises to delete.`);
    badExercises.forEach(ex => {
        console.log(`Deleting: [${ex.id}] ${ex.name} (Muscle: ${ex.muscleGroup})`);
    });
    if (badExercises.length > 0) {
        const result = await prisma.exercise.deleteMany({
            where: {
                name: { in: muscles }
            }
        });
        console.log(`Deleted ${result.count} exercises.`);
    }
    else {
        console.log('No exercises found to delete.');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=delete-bad-exercises.js.map