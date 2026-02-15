const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const path = require('path');

const prisma = new PrismaClient();

const GROUP_MAPPING = {
    'Espalda': 'DORSAL',
    'Espalda ': 'DORSAL',
    'Pecho': 'PECTORAL',
    'Delt anterior': 'DELTOIDES',
    'Delt lateral': 'DELTOIDES',
    'Delt posterior': 'DELTOIDES',
    'Biceps': 'BICEPS',
    'Triceps': 'TRICEPS',
    'Cuadriceps': 'CUADRICEPS',
    'Isquios': 'FEMORAL',
    'Gluteos': 'GLUTEO',
    'Aductor': 'PIERNA',
    'Gemelo': 'GEMELO',
    'Abdomen': 'ABDOMINALES',
    'Movilidad': 'MOVILIDAD',
    'Espalda baja': 'LUMBAR',
    'Preparacion': 'CALENTAMIENTO'
};

async function main() {
    const filePath = path.join(__dirname, '../../../docs/plantillas_xls/Hoja Rutina Rubén 2.xlsx');
    console.log('Reading file:', filePath);

    // Get Trainer to attribute creation
    const trainer = await prisma.user.findFirst({
        where: { role: 'TRAINER' }
    });

    if (!trainer) {
        console.error('No trainer found to attribute exercises to.');
        // process.exit(1); 
        // fallback to system or continue? Better to fail.
    }
    const authorId = trainer ? trainer.id : undefined;

    const workbook = XLSX.readFile(filePath);
    const sheetName = 'Biblioteca de ejercicios';
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        console.error(`Sheet "${sheetName}" not found`);
        process.exit(1);
    }

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const rows = data.slice(1);

    console.log(`Found ${rows.length} rows. Processing...`);

    let stats = { updated: 0, created: 0, skipped: 0 };

    for (const row of rows) {
        let groupRaw = row[0];
        let name = row[1];
        let url = row[3];

        if (!name) continue;
        name = name.trim();
        url = url ? url.trim() : null;

        let muscleGroup = 'VARIOS';
        if (groupRaw) {
            groupRaw = groupRaw.trim();
            muscleGroup = GROUP_MAPPING[groupRaw] || groupRaw.toUpperCase();
        }

        const existing = await prisma.exercise.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive',
                },
                deletedAt: null
            },
        });

        if (existing) {
            if (url && existing.defaultVideoUrl !== url) {
                await prisma.exercise.update({
                    where: { id: existing.id },
                    data: { defaultVideoUrl: url },
                });
                console.log(`🔄 UPDATED: ${name}`);
                stats.updated++;
            } else {
                stats.skipped++;
            }
        } else {
            // Create new
            await prisma.exercise.create({
                data: {
                    name: name,
                    description: `Ejercicio de ${muscleGroup} importado.`,
                    muscleGroup: muscleGroup,
                    defaultVideoUrl: url,
                    createdBy: authorId,
                }
            });
            console.log(`✨ CREATED: ${name} (${muscleGroup})`);
            stats.created++;
        }
    }

    console.log('\n--- Import Summary ---');
    console.log(`Created: ${stats.created}`);
    console.log(`Updated: ${stats.updated}`);
    console.log(`Skipped (No changes): ${stats.skipped}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
