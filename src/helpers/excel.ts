import * as XLSX from 'xlsx';

export const exportExcel = (dataList: any[], fileName: string) => {
  const sheet = XLSX.utils.json_to_sheet(dataList);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, fileName);
  const workbookBlob = workbookToBlob(wb);
  openDownload(workbookBlob, `${fileName}.xlsx`);
};

const openDownload = (blob: Blob, fileName: string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName || '';
  const event = new MouseEvent('click');
  link.dispatchEvent(event);
};

const dataToBuffer = (data: any) => {
  const buffer = new ArrayBuffer(data.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i !== data.length; ++i) {
    view[i] = data.charCodeAt(i) & 0xff;
  }
  return buffer;
};

const workbookToBlob = (workbook: XLSX.WorkBook) => {
  const out = XLSX.write(workbook, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  });
  const blob = new Blob([dataToBuffer(out)], {
    type: 'application/octet-stream',
  });
  return blob;
};

export const readExcel = async (file: File) => {
  const arrayBuffer = await readFileAsync(file);
  const wb = XLSX.read(arrayBuffer, { type: 'buffer' });
  const header = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(header);
  return { fileName: file.name, data };
};

const readFileAsync = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};
