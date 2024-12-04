import { CardKeyTypes } from '@/services/interfaces';

export function convertJSONToCSV(
  jsonData: { [key: string]: CardKeyTypes }[],
  columnNames: string[],
): string {
  if (jsonData.length === 0) {
    return '';
  }
  const headers = columnNames.join(';') + '\n';

  const rows = jsonData
    .map((row) => {
      return columnNames
        .map((field) => {
          const newField = row[field] || '-';
          return JSON.stringify(newField).replace(/\n/g, '');
        })
        .join(';');
    })
    .join('\n');

  return headers + rows;
}

export default convertJSONToCSV;
