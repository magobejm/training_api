
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const filePath = 'c:\\personal\\training\\docs\\plantillas_xls\\Hoja Rutina Rubén 2.xlsx';

async function inspect() {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const workbook = XLSX.readFile(filePath);
    console.log('Sheet Names:', workbook.SheetNames);

    const sheetsToInspect = ['Biblioteca de ejercicios', 'Cardio'];

    for (const sheetName of sheetsToInspect) {
        if (workbook.SheetNames.includes(sheetName)) {
            console.log(`\n--- Inspecting contents of: ${sheetName} ---`);
            const sheet = workbook.Sheets[sheetName];
            // Get range
            const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');

            // Print first 5 rows
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 0 }); // Array of arrays
            console.log(data.slice(0, 5));
        } else {
            console.log(`\nSheet "${sheetName}" not found.`);
        }
    }
}

inspect();
