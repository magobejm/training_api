
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const trainer = await prisma.user.findUnique({
        where: { email: 'trainer@example.com' }
    });

    if (!trainer) {
        console.error('Trainer trainer@example.com not found');
        process.exit(1);
    }

    const clientRole = await prisma.role.findUnique({
        where: { name: 'CLIENT' }
    });

    if (!clientRole) {
        console.error('Client role not found');
        process.exit(1);
    }

    const hashedPassword = await bcrypt.hash('client123', 10);

    const fakeClients = [
        { name: 'Carlos Ruiz', email: 'carlos.ruiz@fake.com', goal: 'Ganar masa muscular', weight: 82, height: 180, avatarUrl: '/images/avatars/pixar-2.png' },
        { name: 'Elena Martínez', email: 'elena.mtz@fake.com', goal: 'Perder peso', weight: 68, height: 165, avatarUrl: '/images/avatars/pixar-3.png' },
        { name: 'Javier López', email: 'javier.lopez@fake.com', goal: 'Mejorar resistencia', weight: 74, height: 175, avatarUrl: '/images/avatars/pixar-4.png' },
        { name: 'Sofía García', email: 'sofia.garcia@fake.com', goal: 'Mantenimiento', weight: 58, height: 160, avatarUrl: '/images/avatars/pixar-5.png' },
        { name: 'Miguel Ángel', email: 'miguel.angel@fake.com', goal: 'Hipertrofia', weight: 90, height: 188, avatarUrl: '/images/avatars/pixar-1.png' },
        { name: 'Lucía Fernández', email: 'lucia.fer@fake.com', goal: 'Flexibilidad y Tonificación', weight: 54, height: 162, avatarUrl: '/images/avatars/pixar-2.png' },
    ];

    console.log('🌱 Seeding 6 fake clients...');

    for (const clientData of fakeClients) {
        await prisma.user.upsert({
            where: { email: clientData.email },
            update: {
                trainerId: trainer.id,
                roleId: clientRole.id,
                goal: clientData.goal,
                weight: clientData.weight,
                height: clientData.height,
                avatarUrl: clientData.avatarUrl,
            },
            create: {
                email: clientData.email,
                name: clientData.name,
                password: hashedPassword,
                roleId: clientRole.id,
                trainerId: trainer.id,
                goal: clientData.goal,
                weight: clientData.weight,
                height: clientData.height,
                avatarUrl: clientData.avatarUrl,
            } as any,
        });
        console.log(`✅ Created/Updated client: ${clientData.name}`);
    }

    console.log('✨ Seeding completed!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
