
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectNames() {
    try {
        const users = await prisma.user.findMany({
            where: {
                deletedAt: null,
                userRole: { name: 'CLIENT' }
            },
            orderBy: { name: 'asc' },
            select: { id: true, name: true, email: true }
        });

        console.log('Database Inspection (ordered by prisma):');
        users.forEach((u, i) => {
            console.log(`${i + 1}. |${u.name}| (${u.email}) - Length: ${u.name?.length}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

inspectNames();
