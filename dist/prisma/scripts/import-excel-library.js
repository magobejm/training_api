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
const XLSX = __importStar(require("xlsx"));
const client_1 = require("@prisma/client");
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
const MUSCLE_MAPPING = {
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
    const dbMuscles = await prisma.muscleGroup.findMany();
    const muscleMap = new Map(dbMuscles.map(m => [m.name, m.id]));
    let importedCount = 0;
    let skippedCount = 0;
    let createdCount = 0;
    let updatedCount = 0;
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length < 2)
            continue;
        const rawMuscle = row[0]?.toString().trim();
        const name = row[1]?.toString().trim();
        const videoUrl = row[3]?.toString().trim();
        if (!rawMuscle || !name) {
            skippedCount++;
            continue;
        }
        const targetMuscleName = MUSCLE_MAPPING[rawMuscle] || rawMuscle.toUpperCase();
        const muscleGroupId = muscleMap.get(targetMuscleName);
        if (!muscleGroupId) {
            console.warn(`[WARNING] Muscle group "${targetMuscleName}" (from "${rawMuscle}") not found in DB. Skipping exercise "${name}".`);
            skippedCount++;
            continue;
        }
        try {
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
                    }
                });
                updatedCount++;
            }
            else {
                await prisma.exercise.create({
                    data: {
                        name,
                        defaultVideoUrl: videoUrl || null,
                        muscleGroupId: muscleGroupId,
                        description: `Ejercicio de ${targetMuscleName}`,
                    }
                });
                createdCount++;
            }
            importedCount++;
        }
        catch (error) {
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
//# sourceMappingURL=import-excel-library.js.map