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
    if (data.length < 2) {
        console.log("Empty or invalid sheet");
        return;
    }
    console.log('--- First 5 rows (raw) ---');
    data.slice(0, 5).forEach((row, index) => {
        console.log(`Row ${index}:`, row);
    });
    const muscleGroupsInExcel = new Set();
    const exercisesToImport = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0)
            continue;
        const muscle = row[0]?.toString().trim();
        const name = row[1]?.toString().trim();
        const videoUrl = row[3]?.toString().trim();
        if (muscle && name) {
            muscleGroupsInExcel.add(muscle);
            exercisesToImport.push({ muscle, name, videoUrl });
        }
    }
    console.log(`\nFound ${exercisesToImport.length} valid exercises to import.`);
    console.log(`Found ${muscleGroupsInExcel.size} unique muscle groups in Excel:`, Array.from(muscleGroupsInExcel));
    const existingMuscles = await prisma.muscleGroup.findMany({
        select: { name: true }
    });
    const existingMuscleNames = new Set(existingMuscles.map(m => m.name));
    const newMuscles = Array.from(muscleGroupsInExcel).filter(m => !existingMuscleNames.has(m));
    console.log('\n--- Muscle Group Analysis ---');
    console.log('Existing in DB:', Array.from(existingMuscleNames));
    if (newMuscles.length > 0) {
        console.log('⚠️  NEW Muscle Groups to be created:', newMuscles);
    }
    else {
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
//# sourceMappingURL=analyze-import.js.map