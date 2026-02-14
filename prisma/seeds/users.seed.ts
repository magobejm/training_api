import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUsers() {
    console.log('🌱 Seeding users...');

    // Hash password
    const hashedPassword = await bcrypt.hash('trainer123', 10);

    // Create trainer user
    const trainer = await prisma.user.upsert({
        where: { email: 'trainer@example.com' },
        update: {},
        create: {
            email: 'trainer@example.com',
            password: hashedPassword,
            role: 'TRAINER',
        },
    });

    console.log('✅ Created trainer:', trainer.email);

    // Create client user for testing
    const clientPassword = await bcrypt.hash('client123', 10);
    const client = await prisma.user.upsert({
        where: { email: 'client@example.com' },
        update: {},
        create: {
            email: 'client@example.com',
            password: clientPassword,
            role: 'CLIENT',
        },
    });

    console.log('✅ Created client:', client.email);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    console.log('✅ Created admin:', admin.email);

    return { trainer, client, admin };
}

async function main() {
    await seedUsers();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
