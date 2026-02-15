
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';

const prisma = new PrismaClient();

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

    // Convert to JSON to analyze keys
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Header 1 means array of arrays

    if (data.length < 2) {
        console.log("Empty or invalid sheet");
        return;
    }

    // Assuming row 0 is headers, but user said:
    // Col 1: Muscle Group
    // Col 2: Exercise Name
    // Col 4: Video URL

    // Let's look at the first few rows to confirm structure
    console.log('--- First 5 rows (raw) ---');
    data.slice(0, 5).forEach((row: any, index) => {
        console.log(`Row ${index}:`, row);
    });

    // Extract Muscle Groups from Column A (index 0)
    // Skip header if it looks like a header (e.g. "Grupo Muscular")
    const muscleGroupsInExcel = new Set<string>();
    const exercisesToImport = [];

    // Start from row 1 (index 1) assuming row 0 is header
    for (let i = 1; i < data.length; i++) {
        const row = data[i] as any[];
        if (!row || row.length === 0) continue;

        const muscle = row[0]?.toString().trim();
        const name = row[1]?.toString().trim();
        const videoUrl = row[3]?.toString().trim(); // 4th column is index 3

        if (muscle && name) {
            muscleGroupsInExcel.add(muscle);
            exercisesToImport.push({ muscle, name, videoUrl });
        }
    }

    console.log(`\nFound ${exercisesToImport.length} valid exercises to import.`);
    console.log(`Found ${muscleGroupsInExcel.size} unique muscle groups in Excel:`, Array.from(muscleGroupsInExcel));

    // Check against DB
    const existingMuscles = await prisma.muscleGroup.findMany({
        select: { name: true }
    });
    const existingMuscleNames = new Set(existingMuscles.map(m => m.name));

    const newMuscles = Array.from(muscleGroupsInExcel).filter(m => !existingMuscleNames.has(m));

    console.log('\n--- Muscle Group Analysis ---');
    console.log('Existing in DB:', Array.from(existingMuscleNames));

    if (newMuscles.length > 0) {
        console.log('⚠️  NEW Muscle Groups to be created:', newMuscles);
    } else {
        console.log('✅ All muscle groups already exist.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
