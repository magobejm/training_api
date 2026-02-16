"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function verify() {
    console.log('Verifying Users post-migration...');
    const user = await prisma.user.findFirst({
        include: { userRole: true }
    });
    if (user) {
        console.log(`User found: ${user.email}`);
        if (user.role) {
            console.warn(`Legacy role field still present? ${user.role}`);
        }
        else {
            console.log('Legacy role field appears gone (at least from type/result).');
        }
        console.log(`User Role Relation: ${user.userRole?.name}`);
    }
    console.log('Verifying Exercises post-migration...');
    const exercise = await prisma.exercise.findFirst({
        include: { targetMuscleGroup: true }
    });
    if (exercise) {
        console.log(`Exercise found: ${exercise.name}`);
        if (exercise.muscleGroup) {
            console.warn(`Legacy muscleGroup field still present? ${exercise.muscleGroup}`);
        }
        else {
            console.log('Legacy muscleGroup field appears gone.');
        }
        console.log(`Target Muscle Group: ${exercise.targetMuscleGroup?.name}`);
    }
}
verify()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=verify-post-migration.js.map