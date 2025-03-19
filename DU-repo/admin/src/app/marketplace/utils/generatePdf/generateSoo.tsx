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

export const generateSoo = order => {
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
        content: 'STATEMENT OF OBJECTIVES',
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

  // Draw Introduction section.
  doc.autoTable({
    body: [['1.  Introduction']],
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: { left: 0, top: 2, bottom: 2 }
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  const introductionBody = [
    [
      {
        content: '1.1.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'This document describes the Digital University (DU) objectives and requirements to acquire training from various providers utilizing capability outlined in the Phase III Basic Ordering Agreement (BOA).'
    ],
    [
      {
        content: '1.2.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'This Statement of Objectives (SOO) defines the activities to support Digital University (DU) needs. The Customer will be referred to hereafter as the "Government." The requirements herein will be ordered via Task/Delivery Order to rapidly respond to federal government requirements for Special Operations Command (SOCOM) and DOD-wide Customers. Omni Federal, hereafter will be referred to as the "Contractor."'
    ]
  ];

  doc.autoTable({
    body: introductionBody,
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

  // Draw Scope of work section.
  doc.autoTable({
    body: [['2.  Scope of work']],
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: { left: 0, top: 2, bottom: 2 }
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  const scopeOfWorkBody = [
    [
      {
        content: '2.1.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The scope of work for this requirement is to acquire mission-aligned training, track progress, and archive completions of the training in the DU repository.'
    ]
  ];

  doc.autoTable({
    body: scopeOfWorkBody,
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

  // Draw Objective section.
  doc.autoTable({
    body: [
      ['3.  Objective'],
      [
        {
          content:
            'In alignment with the base BOA, this Task Order addresses Objective 17: Training System and Training Programs. The Contractor is responsible for the following:',
          styles: { fontStyle: 'normal' }
        }
      ]
    ],
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: { left: 0, top: 2, bottom: 2 }
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  const objectiveBody = [
    [
      {
        content: '3.1.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The Contractor shall acquire mission aligned training with procured training tokens.'
    ],
    [
      {
        content: '3.2.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The Contractor shall track progress throughout the training lifecycle.'
    ],
    [
      {
        content: '3.3.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'The Contractor shall ensure completed training is properly archived within the DU repository, such as, certificates, scores, and other relevant documentation. These records must be well-organized for easy retrieval and compliance purposes.'
    ],
    [
      {
        content: '3.4.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      'Upon request, the Contractor shall generate and deliver training management reports. The report should include information regarding training procured and completed.'
    ]
  ];

  doc.autoTable({
    body: objectiveBody,
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

  // Draw Training Tokens section.
  doc.autoTable({
    body: [['4.  Training Tokens']],
    startY: cursorY + gap,
    theme: 'plain',
    styles: {
      font: 'times',
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: { left: 0, top: 2, bottom: 2 }
    },
    margin: { left: xMargin, right: xMargin },
    ...updateCursorFunctions
  });

  const trainingTokensBody = [
    [
      {
        content: '4.1.',
        styles: { cellPadding: { left: 5, top: 2, bottom: 2, right: 0 } }
      },
      `The Contractor shall provide ${totalTokens(order)} training tokens, and each token shall expire 1 year from the date of award.`
    ]
  ];

  doc.autoTable({
    body: trainingTokensBody,
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

  doc.save(`${order.referenceId}_soo.pdf`);
};
