"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkUser() {
    const user = await prisma.user.findUnique({
        where: { email: 'trainer@example.com' },
    });
    if (user) {
        console.log('✅ Usuario encontrado:');
        console.log('  Email:', user.email);
        console.log('  Role:', user.role || 'N/A');
        console.log('  Password hash:', user.password ? 'EXISTS' : 'NULL');
        console.log('  ID:', user.id);
    }
    else {
        console.log('❌ Usuario NO encontrado en la base de datos');
        console.log('  Ejecuta: pnpm run seed:all');
    }
    await prisma.$disconnect();
}
checkUser().catch(console.error);
//# sourceMappingURL=check-user.js.map