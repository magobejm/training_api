"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.findMany({
        include: { userRole: true }
    });
    console.log('--- USERS ---');
    console.log(JSON.stringify(users.map(u => ({
        id: u.id,
        email: u.email,
        role: u.role,
        roleId: u.roleId,
        userRoleName: u.userRole?.name
    })), null, 2));
    const roles = await prisma.role.findMany();
    console.log('--- ROLES ---');
    console.log(JSON.stringify(roles, null, 2));
    const exercises = await prisma.exercise.findMany({
        take: 5
    });
    console.log('--- EXERCISES (Sample 5) ---');
    console.log(JSON.stringify(exercises, null, 2));
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=debug-db.js.map