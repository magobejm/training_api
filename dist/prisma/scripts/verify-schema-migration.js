"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function verify() {
    console.log('Verifying User Roles...');
    const users = await prisma.user.findMany({
        include: { userRole: true },
    });
    let userErrors = 0;
    for (const user of users) {
        if (!user.roleId || !user.userRole) {
            console.error(`User ${user.email} has no roleId or userRole relation! (Legacy Role: ${user.role})`);
            userErrors++;
        }
        else if (user.role !== user.userRole.name) {
            console.warn(`User ${user.email} mismatch: Legacy=${user.role}, Relation=${user.userRole.name}`);
        }
    }
    console.log(`User verification complete. ${userErrors} errors found.`);
    console.log('Verifying Exercise Muscle Groups...');
    const exercises = await prisma.exercise.findMany({
        include: { targetMuscleGroup: true },
    });
    let exerciseErrors = 0;
    for (const ex of exercises) {
        if (!ex.muscleGroupId || !ex.targetMuscleGroup) {
            console.error(`Exercise ${ex.name} (${ex.id}) has no muscleGroupId! (Legacy Muscle: ${ex.muscleGroup})`);
            exerciseErrors++;
        }
        else if (ex.muscleGroup !== ex.targetMuscleGroup.name) {
            console.warn(`Exercise ${ex.name} mismatch: Legacy=${ex.muscleGroup}, Relation=${ex.targetMuscleGroup.name}`);
        }
    }
    console.log(`Exercise verification complete. ${exerciseErrors} errors found.`);
}
verify()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=verify-schema-migration.js.map