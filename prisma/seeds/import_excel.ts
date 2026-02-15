
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const filePath = 'c:\\personal\\training\\docs\\plantillas_xls\\Hoja Rutina Rubén 2.xlsx';

async function importExercises() {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    console.log('Reading Excel file...');
    const workbook = XLSX.readFile(filePath);

    // 1. Process "Biblioteca de ejercicios"
    const librarySheet = workbook.Sheets['Biblioteca de ejercicios'];
    if (librarySheet) {
        console.log('Processing "Biblioteca de ejercicios"...');
        // Range starts from row 2 (0-indexed aka row 1 is header)
        const data: any[][] = XLSX.utils.sheet_to_json(librarySheet, { header: 1 });
        // Remove header row (row 0)
        const rows = data.slice(1);

        for (const row of rows) {
            if (!row[0]) continue; // Skip empty names

            const name = row[0].toString().trim();
            const muscleNameRaw = row[1]?.toString().trim().toUpperCase();
            const videoUrl = row[2]?.toString().trim();

            // Normalize Muscle Group
            let muscleGroupName = muscleNameRaw;
            // Handle known variations if any, otherwise assume it matches DB or needs mapping
            // DB has: PECTORAL, DORSAL, PIERNA, HOMBRO, BICEPS, TRICEPS, ABDOMINALES, LUMBAR, CARDIO, etc.

            // Try to find muscle group
            let muscleGroup = await prisma.muscleGroup.findUnique({ where: { name: muscleGroupName } });

            if (!muscleGroup) {
                // Try to map or create? For now log warn
                // Maybe mappings:
                if (muscleGroupName === 'FEMORAL') muscleGroupName = 'FEMORAL'; // Exists
                else if (muscleGroupName === 'CUADRICEPS') muscleGroupName = 'CUADRICEPS'; // Exists
                else {
                    // Fallback or skip?
                    // Let's check if it exists in the enum/list.
                    // If not found, ignore muscle group relation or fallback to 'MOVILIDAD' or similar?
                    // Or just create it?
                    // Better to just try to use what's there.
                }
                muscleGroup = await prisma.muscleGroup.findUnique({ where: { name: muscleGroupName } });
            }

            if (muscleGroup) {
                // Upsert Exercise
                await prisma.exercise.upsert({
                    where: { id: `excel-${name.replace(/\s+/g, '-').toLowerCase()}` }, // This is unsafe if IDs are UUIDs. We can't query by name easily as name is not unique in schema, wait schema says name is NOT unique.
                    // But we want to avoid duplicates.
                    // Let's check if exists by name first.
                    create: {
                        name,
                        description: 'Importado de Excel',
                        muscleGroup: muscleGroupName,
                        muscleGroupId: muscleGroup.id,
                        defaultVideoUrl: videoUrl,
                    },
                    update: {
                        muscleGroup: muscleGroupName,
                        muscleGroupId: muscleGroup.id,
                        defaultVideoUrl: videoUrl,
                    }
                }).catch(async () => {
                    // If upsert fails (e.g. ID issue), just findFirst and update, or create
                    const existing = await prisma.exercise.findFirst({ where: { name } });
                    if (existing) {
                        await prisma.exercise.update({
                            where: { id: existing.id },
                            data: {
                                muscleGroupId: muscleGroup!.id,
                                muscleGroup: muscleGroupName,
                                defaultVideoUrl: videoUrl
                            }
                        });
                        console.log(`Updated: ${name}`);
                    } else {
                        await prisma.exercise.create({
                            data: {
                                name,
                                description: 'Importado de Excel',
                                muscleGroup: muscleGroupName,
                                muscleGroupId: muscleGroup!.id,
                                defaultVideoUrl: videoUrl,
                            }
                        });
                        console.log(`Created: ${name}`);
                    }
                });
            } else {
                console.warn(`Muscle Group not found: ${muscleNameRaw} for ${name}`);
                // Create without relation? Or skip?
                // Let's create it with string muscleGroup only
                const existing = await prisma.exercise.findFirst({ where: { name } });
                if (!existing) {
                    await prisma.exercise.create({
                        data: {
                            name,
                            description: 'Importado de Excel',
                            muscleGroup: muscleNameRaw || 'OTHER',
                            defaultVideoUrl: videoUrl,
                        }
                    });
                    console.log(`Created (No Master): ${name}`);
                }
            }
        }
    }

    // 2. Process "Cardio"
    const cardioSheet = workbook.Sheets['Cardio'];
    if (cardioSheet) {
        console.log('Processing "Cardio"...');
        const data: any[][] = XLSX.utils.sheet_to_json(cardioSheet, { header: 1 });
        // Headers often in row 1 (index 1) or 0.
        // Based on inspection, we look for data starting row 2?
        // Let's just find "Cardio" muscle group first
        const cardioGroup = await prisma.muscleGroup.findUnique({ where: { name: 'CARDIO' } });

        if (!cardioGroup) {
            console.error('CARDIO muscle group not found in DB');
        } else {
            for (const row of data) {
                // Heuristic to find data rows: Col 0 has text, not header
                if (!row[0] || row[0] === 'TIPO' || row[0] === 'Cardio' || row[0] === 'EJERCICIO') continue;

                const name = row[0].toString().trim();
                // Check if it looks like an exercise

                const existing = await prisma.exercise.findFirst({ where: { name } });
                if (!existing) {
                    await prisma.exercise.create({
                        data: {
                            name,
                            description: 'Ejercicio de cardio',
                            muscleGroup: 'CARDIO',
                            muscleGroupId: cardioGroup.id,
                        }
                    });
                    console.log(`Created Cardio: ${name}`);
                }
            }
        }
    }

    console.log('Import completed.');
}

importExercises()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
