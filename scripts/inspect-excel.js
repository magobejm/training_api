const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../../../docs/plantillas_xls/Hoja Rutina Rubén 2.xlsx');
console.log('Reading file:', filePath);

try {
    const workbook = XLSX.readFile(filePath);
    console.log('Sheet Names:', workbook.SheetNames);

    const sheetName = 'Biblioteca de ejercicios';
    console.log('Reading Sheet:', sheetName);

    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
        console.error('Sheet not found!');
        process.exit(1);
    }
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Array of arrays

    const groups = new Set();
    data.slice(1).forEach(row => {
        if (row[0]) groups.add(row[0]);
    });
    console.log('Unique Groups:', Array.from(groups));

} catch (error) {
    console.error('Error reading file:', error);
}
