"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
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
            },
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
//# sourceMappingURL=seed-clients.js.map