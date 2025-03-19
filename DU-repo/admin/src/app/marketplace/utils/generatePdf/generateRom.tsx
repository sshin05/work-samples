import jsPDF from 'jspdf';
import { type jsPDFDocument , applyPlugin } from 'jspdf-autotable';
import { addInput, textToTableBody } from './utils';

// Apply the autoTable plugin to the jsPDF instance.
applyPlugin(jsPDF);

const totalPrice = order => {
  return order?.marketplaceOrderItems.reduce((acc, orderItem) => {
    if (orderItem?.status !== 'CANCELLED' && orderItem?.status !== 'REFUNDED') {
      return acc + (orderItem?.price || 0);
    }
    return acc;
  }, 0);
};

const getBodyText = order => `Rough Order of Magnitude (ROM)
Submitted by: Omni Federal. 7528 Rio Grande Way, Gainesville, VA 20155


Order Number: ${order.referenceId}
Total dollar value: $${totalPrice(order)}`;

export const generateRom = order => {
  // Using type from jspdf-autotable to avoid type errors.
  const doc = new jsPDF('portrait', 'mm', 'letter') as jsPDFDocument;
  const gap = 20;
  const xMargin = 20;
  const yMargin = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  let cursorY = 0;
  const updateCursorFunctions = {
    willDrawPage: () => {
      cursorY = 0;
    },
    didDrawCell: ({ cursor, row }) => {
      cursorY = cursor.y + row.height;
    }
  };

  // Draw the title.
  doc.autoTable({
    head: [['ROM: Digital University in Support of SOCOM']],
    startY: yMargin,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 18,
      fontStyle: 'bold',
      halign: 'center',
      cellPadding: 0
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  // Draw the body text.
  doc.autoTable({
    body: textToTableBody(getBodyText(order)),
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      cellPadding: 0
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  // Draw the table of items.
  const headers = [
    'Item Number',
    'Item Name',
    'Vendor',
    'Details',
    'Dollar value'
  ];
  const data = [];
  order?.marketplaceOrderItems.forEach(orderItem => {
    if (orderItem?.status !== 'CANCELLED' && orderItem?.status !== 'REFUNDED') {
      const customizationDetails = orderItem?.customizations
        ?.map(
          customization => `${customization?.name}: ${customization?.value}`
        )
        .join('\n');
      data.push([
        orderItem?.referenceId || '',
        orderItem?.marketplaceProduct?.title || '',
        orderItem?.marketplaceVendor?.name || '',
        customizationDetails || '',
        orderItem?.price ? `$${orderItem?.price}` : ''
      ]);
    }
  });

  doc.autoTable({
    head: [headers],
    body: data,
    startY: cursorY + gap,
    theme: 'grid',
    styles: {
      font: 'times',
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: [0, 0, 0]
    },
    margin: { bottom: yMargin, left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  // Add a new page if the signature field will not fit on the current page.
  // We don't need to do this for the text above this because they are a fixed height.
  if (cursorY + 25 > pageHeight - yMargin) {
    doc.addPage();
    cursorY = 0;
  }
  // Draw the fields.
  doc.setFontSize(12);
  doc.setFont('times');
  addInput(doc, 'Contract:', xMargin, cursorY + gap);
  addInput(doc, 'DoDAAC:', xMargin, cursorY + gap + 5);

  doc.save(`${order.referenceId}_rom.pdf`);
};
