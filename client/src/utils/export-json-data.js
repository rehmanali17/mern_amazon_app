import XLSX from "xlsx";

const exportJsonData = (json, sheetName, fileName) => {
    const ws = XLSX.utils.json_to_sheet(json);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
};

export default exportJsonData;
