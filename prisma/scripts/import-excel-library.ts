
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';

const prisma = new PrismaClient();

// Mappings approved by user
const MUSCLE_MAPPING: Record<string, string> = {
    'Pecho': 'PECTORAL',
    'Espalda': 'DORSAL',
    'Biceps': 'BICEPS',
    'Triceps': 'TRICEPS',
    'Cuadriceps': 'CUADRICEPS',
    'Gluteos': 'GLUTEO',
    'Gemelo': 'GEMELO',
    'Abdomen': 'ABDOMINALES',
    'Espalda baja': 'LUMBAR',
    'Isquios': 'FEMORAL',
    'Movilidad': 'MOVILIDAD',
    'Preparacion': 'CALENTAMIENTO',
    'Delt anterior': 'DELTOIDES',
    'Delt lateral': 'DELTOIDES',
    'Delt posterior': 'DELTOIDES',
    'Aductor': 'PIERNA',
};

async function main() {
    const filePath = path.join(__dirname, '../../../../docs/plantillas_xls/Hoja Rutina Rubén 2.xlsx');
    console.log(`Reading file: ${filePath}`);

    const workbook = XLSX.readFile(filePath);
    const sheetName = 'Biblioteca de ejercicios';
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        console.error(`Sheet "${sheetName}" not found!`);
        process.exit(1);
    }

    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(`Loaded ${data.length} rows.`);

    // Fetch existing muscle groups for ID lookup
    const dbMuscles = await prisma.muscleGroup.findMany();
    const muscleMap = new Map(dbMuscles.map(m => [m.name, m.id]));

    let importedCount = 0;
    let skippedCount = 0;
    let createdCount = 0;
    let updatedCount = 0;

    // Start from row 1 (index 1), assume row 0 is header
    for (let i = 1; i < data.length; i++) {
        const row = data[i] as any[];
        if (!row || row.length < 2) continue;

        const rawMuscle = row[0]?.toString().trim();
        const name = row[1]?.toString().trim();
        const videoUrl = row[3]?.toString().trim(); // Column 4 is index 3

        if (!rawMuscle || !name) {
            skippedCount++;
            continue;
        }

        // Determine target muscle group name
        const targetMuscleName = MUSCLE_MAPPING[rawMuscle] || rawMuscle.toUpperCase();

        // Get Muscle Group ID
        const muscleGroupId = muscleMap.get(targetMuscleName);

        if (!muscleGroupId) {
            console.warn(`[WARNING] Muscle group "${targetMuscleName}" (from "${rawMuscle}") not found in DB. Skipping exercise "${name}".`);
            skippedCount++;
            continue;
        }

        try {
            // Manual "upsert" by name
            const existing = await prisma.exercise.findFirst({
                where: { name }
            });

            if (existing) {
                await prisma.exercise.update({
                    where: { id: existing.id },
                    data: {
                        defaultVideoUrl: videoUrl || null,
                        muscleGroupId: muscleGroupId,
                        description: `Ejercicio de ${targetMuscleName}`,
                    } as any
                });
                updatedCount++;
            } else {
                await prisma.exercise.create({
                    data: {
                        name,
                        defaultVideoUrl: videoUrl || null,
                        muscleGroupId: muscleGroupId,
                        description: `Ejercicio de ${targetMuscleName}`,
                    } as any
                });
                createdCount++;
            }
            importedCount++;
        } catch (error) {
            console.error(`Error importing "${name}":`, error);
            skippedCount++;
        }
    }

    console.log('\n--- Import Summary ---');
    console.log(`Created: ${createdCount}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Total Processed: ${importedCount}`);
    console.log(`Skipped/Failed: ${skippedCount}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
