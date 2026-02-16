import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exercises = [
    // PECHO
    {
        name: 'Press Banca',
        description: 'Ejercicio fundamental para pecho. Acostado en banco plano, baja la barra hasta el pecho y empuja hacia arriba.',
        muscleGroup: 'PECTORAL',
        defaultVideoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Flexiones',
        description: 'Push-ups clásicos. Mantén el cuerpo recto, baja controlado y empuja explosivamente.',
        muscleGroup: 'PECTORAL',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Fondos en Paralelas',
        description: 'Ejercicio avanzado para pecho inferior y tríceps. Inclinación adelante activa más pecho.',
        muscleGroup: 'PECTORAL',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },

    // ESPALDA
    {
        name: 'Dominadas',
        description: 'Pull-ups con agarre prono. Tira de los codos hacia abajo, no de las manos.',
        muscleGroup: 'DORSAL',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Remo con Barra',
        description: 'Inclinado 45°, tira de la barra hacia el abdomen manteniendo espalda recta.',
        muscleGroup: 'DORSAL',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Peso Muerto',
        description: 'Ejercicio compuesto fundamental. Levanta la barra manteniendo espalda neutra.',
        muscleGroup: 'LUMBAR',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },

    // PIERNAS
    {
        name: 'Sentadilla',
        description: 'Squat con barra. Baja hasta paralelo manteniendo rodillas alineadas con pies.',
        muscleGroup: 'CUADRICEPS',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Zancadas',
        description: 'Lunges alternados. Da un paso adelante y baja la rodilla trasera casi hasta el suelo.',
        muscleGroup: 'CUADRICEPS',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Prensa de Pierna',
        description: 'Leg press en máquina. Empuja con toda la planta del pie, no solo con los dedos.',
        muscleGroup: 'CUADRICEPS',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },

    // HOMBROS
    {
        name: 'Press Militar',
        description: 'Overhead press con barra. Empuja la barra verticalmente desde los hombros.',
        muscleGroup: 'DELTOIDES',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Elevaciones Laterales',
        description: 'Lateral raises con mancuernas. Levanta los brazos hasta la altura de los hombros.',
        muscleGroup: 'DELTOIDES',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },

    // BRAZOS
    {
        name: 'Curl de Bíceps con Barra',
        description: 'Bicep curl clásico. Flexiona los codos sin mover los hombros.',
        muscleGroup: 'BICEPS',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Extensiones de Tríceps en Polea',
        description: 'Tricep pushdown. Empuja hacia abajo manteniendo codos fijos.',
        muscleGroup: 'TRICEPS',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },

    // CORE
    {
        name: 'Plancha',
        description: 'Plank frontal. Mantén el cuerpo recto como una tabla, aprieta glúteos y core.',
        muscleGroup: 'ABDOMINALES',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Crunches',
        description: 'Abdominales clásicos. Eleva los hombros del suelo contrayendo el abdomen.',
        muscleGroup: 'ABDOMINALES',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Russian Twists',
        description: 'Giros rusos. Sentado con pies elevados, rota el torso de lado a lado.',
        muscleGroup: 'ABDOMINALES',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },

    // CARDIO
    {
        name: 'Carrera',
        description: 'Running en cinta o exterior. Mantén ritmo constante según objetivo.',
        muscleGroup: 'CARDIO',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Bicicleta Estática',
        description: 'Cycling indoor. Ajusta resistencia según intensidad deseada.',
        muscleGroup: 'CARDIO',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Remo en Máquina',
        description: 'Rowing machine. Cardio de cuerpo completo con técnica: piernas → cadera → brazos.',
        muscleGroup: 'CARDIO',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
    {
        name: 'Burpees',
        description: 'Ejercicio explosivo de cuerpo completo. Flexión → salto → repetir.',
        muscleGroup: 'CARDIO',
        defaultVideoUrl: null,
        defaultImageUrl: null,
        thumbnailUrl: null,
    },
];

async function seedExercises(trainerId: string) {
    console.log('🌱 Seeding exercises...');

    // Fetch Muscle Groups
    const muscleGroups = await prisma.muscleGroup.findMany();
    const muscleGroupMap = new Map(muscleGroups.map(mg => [mg.name, mg.id]));

    if (muscleGroupMap.size === 0) {
        throw new Error('Muscle Groups not found. Run seed:masters first.');
    }

    for (const exerciseData of exercises) {
        const { muscleGroup, ...cleanExercise } = exerciseData;
        const mgId = muscleGroupMap.get(muscleGroup);
        if (!mgId) {
            console.warn(`⚠️ Muscle group not found for exercise: ${cleanExercise.name} (${muscleGroup})`);
        }

        await prisma.exercise.upsert({
            where: { id: cleanExercise.name }, // Using name as temporary unique identifier
            update: {
                muscleGroupId: mgId as string,
            },
            create: {
                ...cleanExercise,
                createdBy: trainerId,
                muscleGroupId: mgId as string,
            } as any,
        });
        console.log(`  ✅ ${cleanExercise.name}`);
    }

    console.log(`✅ Created ${exercises.length} exercises`);
}

async function main() {
    // Get trainer ID (assumes users.seed.ts was run first)
    const trainer = await prisma.user.findUnique({
        where: { email: 'trainer@example.com' },
    });

    if (!trainer) {
        throw new Error('Trainer user not found. Run users.seed.ts first!');
    }

    await seedExercises(trainer.id);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
