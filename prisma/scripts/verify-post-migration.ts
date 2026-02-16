import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
    console.log('Verifying Users post-migration...');
    // Should fail to compile if 'role' field exists on type if we updated client, 
    // but here we check runtime data structure via raw query or standard find

    const user = await prisma.user.findFirst({
        include: { userRole: true }
    });

    if (user) {
        console.log(`User found: ${user.email}`);
        // @ts-ignore
        if (user.role) {
            // @ts-ignore
            console.warn(`Legacy role field still present? ${user.role}`);
        } else {
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
        // @ts-ignore
        if (exercise.muscleGroup) {
            // @ts-ignore
            console.warn(`Legacy muscleGroup field still present? ${exercise.muscleGroup}`);
        } else {
            console.log('Legacy muscleGroup field appears gone.');
        }
        console.log(`Target Muscle Group: ${exercise.targetMuscleGroup?.name}`);
    }
}

verify()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
