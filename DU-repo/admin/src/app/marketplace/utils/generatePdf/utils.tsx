import { AcroFormTextField, type jsPDF } from 'jspdf';

export const addInput = (
  doc: jsPDF,
  label: string,
  x: number = 0,
  y: number = 0
) => {
  doc.text(`${label}`, x, y);
  const field = new AcroFormTextField();
  field.fieldName = label;
  field.x = doc.getTextWidth(`${label}:`) + x;
  field.width = 50;
  field.y = y - 4;
  field.height = 5;
  doc.addField(field);
};

export const addSignatureField = (
  doc: jsPDF,
  label: string,
  x: number = 0,
  y: number = 0
) => {
  doc.text(`${label}`, x, y);
  const field = new AcroFormTextField();
  // This changes the field type to a signature field
  field['FT'] = '/Sig';
  field.fieldName = label;
  field.x = doc.getTextWidth(`${label}:`) + x;
  field.width = 50;
  field.y = y - 4;
  field.height = 5;
  doc.addField(field);
};

export const textToTableBody = text => {
  return text.split('\n').map(row => [row]);
};
