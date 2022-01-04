import XLSX from "xlsx";

const exportData = (table, sheetName, fileName) => {
    const fp = XLSX.utils.table_to_book(table, { sheet: sheetName });
    XLSX.write(fp, {
        bookType: "xlsx",
        type: "base64",
    });
    XLSX.writeFile(fp, fileName);
};

export default exportData;
