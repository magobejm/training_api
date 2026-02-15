import * as XLSX from 'xlsx';
import * as path from 'path';

const filePath = path.join(__dirname, '../../../docs/plantillas_xls/Hoja Rutina Rubén 2.xlsx');
console.log('Reading file:', filePath);

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
console.log('Sheet Name:', sheetName);

const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Array of arrays

console.log('--- First 5 rows ---');
data.slice(0, 5).forEach((row, i) => {
    console.log(`Row ${i}:`, row);
});
