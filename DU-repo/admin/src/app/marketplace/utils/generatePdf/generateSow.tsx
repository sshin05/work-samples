import jsPDF from 'jspdf';
import { type jsPDFDocument , applyPlugin } from 'jspdf-autotable';

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

const totalTokens = order => {
  return totalPrice(order) / 20;
};

export const generateSow = order => {
  // Using type from jspdf-autotable to avoid type errors.
  const doc = new jsPDF('portrait', 'mm', 'letter') as jsPDFDocument;
  const gap = 4;
  const xMargin = 20;
  const yMargin = 20;

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
  const titleBody = [
    [
      {
        content: 'STATEMENT OF WORK',
        styles: { fontStyle: 'bold', fontSize: 18 }
      }
    ],
    [{ content: 'FOR' }],
    [
      {
        content: 'DIGITAL UNIVERSITY MARKETPLACE',
        styles: { fontStyle: 'bold', fontSize: 18 }
      }
    ],
    [{ content: 'IN SUPPORT OF' }],
    [{ content: 'SOCOM', styles: { fontStyle: 'bold', fontSize: 18 } }]
  ];

  doc.autoTable({
    body: titleBody,
    startY: yMargin,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 14,
      fontStyle: 'normal',
      halign: 'center',
      cellPadding: 2
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  // Draw Statement of work section.
  const statementOfWorkBody1 = [
    [
      {
        content: '•',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      `Digital University (DU) (hereafter referred to as the “Contractor”) will provide ${totalTokens(order)} training tokens to SOCOM (the “Customer”), and each token shall expire 1 year from the date of award.`
    ]
  ];

  doc.autoTable({
    body: statementOfWorkBody1,
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'normal',
      halign: 'left',
      cellPadding: 2
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  const statementOfWorkBody2 = [
    [
      {
        content: '°', // PDF has limited symbols, so using a degree symbol as a bullet point.
        styles: {
          cellPadding: { left: 10, top: 3, bottom: 0, right: 0 }, // Adjusting padding to align with the text.
          font: 'symbol',
          cellWidth: 12
        }
      },
      `Number of tokens: ${totalTokens(order)}`
    ],
    [
      {
        content: '°', // PDF has limited symbols, so using a degree symbol as a bullet point.
        styles: {
          cellPadding: { left: 10, top: 3, bottom: 0, right: 0 }, // Adjusting padding to align with the text.
          font: 'symbol',
          cellWidth: 12
        }
      },
      `Cost: $${totalPrice(order)}`
    ]
  ];

  doc.autoTable({
    body: statementOfWorkBody2,
    startY: cursorY,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'normal',
      halign: 'left',
      cellPadding: 2
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  const statementOfWorkBody3 = [
    [
      {
        content: '•',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The Contractor will acquire mission aligned training from various providers on behalf of Customer.'
    ],
    [
      {
        content: '•',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The Contractor shall track progress throughout the training lifecycle.'
    ],
    [
      {
        content: '•',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The Contractor shall ensure completed training is properly archived within the DU repository, such as, certificates, scores, and other relevant documentation. These records must be well-organized for easy retrieval and compliance purposes.'
    ],
    [
      {
        content: '•',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'Upon request, the Contractor shall generate and deliver training management reports. The report should include information regarding training procured and completed.'
    ]
  ];

  doc.autoTable({
    body: statementOfWorkBody3,
    startY: cursorY,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'normal',
      halign: 'left',
      cellPadding: 2
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  // Draw Addendum.
  doc.autoTable({
    body: [['Addendum']],
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'normal',
      halign: 'left',
      cellPadding: 2
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

  doc.save(`${order.referenceId}_sow.pdf`);
};
