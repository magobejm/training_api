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
const fs = __importStar(require("fs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const filePath = 'c:\\personal\\training\\docs\\plantillas_xls\\Hoja Rutina Rubén 2.xlsx';
async function importExercises() {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    console.log('Reading Excel file...');
    const workbook = XLSX.readFile(filePath);
    const librarySheet = workbook.Sheets['Biblioteca de ejercicios'];
    if (librarySheet) {
        console.log('Processing "Biblioteca de ejercicios"...');
        const data = XLSX.utils.sheet_to_json(librarySheet, { header: 1 });
        const rows = data.slice(1);
        for (const row of rows) {
            if (!row[0])
                continue;
            const name = row[0].toString().trim();
            const muscleNameRaw = row[1]?.toString().trim().toUpperCase();
            const videoUrl = row[2]?.toString().trim();
            let muscleGroupName = muscleNameRaw;
            let muscleGroup = await prisma.muscleGroup.findUnique({ where: { name: muscleGroupName } });
            if (!muscleGroup) {
                if (muscleGroupName === 'FEMORAL')
                    muscleGroupName = 'FEMORAL';
                else if (muscleGroupName === 'CUADRICEPS')
                    muscleGroupName = 'CUADRICEPS';
                else {
                }
                muscleGroup = await prisma.muscleGroup.findUnique({ where: { name: muscleGroupName } });
            }
            if (muscleGroup) {
                await prisma.exercise.upsert({
                    where: { id: `excel-${name.replace(/\s+/g, '-').toLowerCase()}` },
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
                    const existing = await prisma.exercise.findFirst({ where: { name } });
                    if (existing) {
                        await prisma.exercise.update({
                            where: { id: existing.id },
                            data: {
                                muscleGroupId: muscleGroup.id,
                                muscleGroup: muscleGroupName,
                                defaultVideoUrl: videoUrl
                            }
                        });
                        console.log(`Updated: ${name}`);
                    }
                    else {
                        await prisma.exercise.create({
                            data: {
                                name,
                                description: 'Importado de Excel',
                                muscleGroup: muscleGroupName,
                                muscleGroupId: muscleGroup.id,
                                defaultVideoUrl: videoUrl,
                            }
                        });
                        console.log(`Created: ${name}`);
                    }
                });
            }
            else {
                console.warn(`Muscle Group not found: ${muscleNameRaw} for ${name}`);
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
    const cardioSheet = workbook.Sheets['Cardio'];
    if (cardioSheet) {
        console.log('Processing "Cardio"...');
        const data = XLSX.utils.sheet_to_json(cardioSheet, { header: 1 });
        const cardioGroup = await prisma.muscleGroup.findUnique({ where: { name: 'CARDIO' } });
        if (!cardioGroup) {
            console.error('CARDIO muscle group not found in DB');
        }
        else {
            for (const row of data) {
                if (!row[0] || row[0] === 'TIPO' || row[0] === 'Cardio' || row[0] === 'EJERCICIO')
                    continue;
                const name = row[0].toString().trim();
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
//# sourceMappingURL=import_excel.js.map