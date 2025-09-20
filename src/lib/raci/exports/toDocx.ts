/**
 * DOCX export functionality for RACI matrix using docx
 */

import {
    AlignmentType,
    Document,
    ImageRun,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType,
    type FileChild,
} from 'docx';

import type { ExportOptions, RaciKey, RaciState } from '../../../types/raci';
import { getActiveRaciKey } from '../matrix';

/**
 * Color palette for RACI values in DOCX (RGB hex values)
 */
const RACI_COLORS: Record<RaciKey, string> = {
  R: '90EE90', // Light green
  A: 'FFD700', // Light gold
  C: '87CEEB', // Light sky blue
  I: 'D3D3D3', // Light gray
};

/**
 * Loads an image and returns its dimensions
 */
function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = dataUrl;
  });
}

/**
 * Calculates scaled dimensions maintaining aspect ratio
 */
function calculateScaledDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let newWidth = originalWidth;
  let newHeight = originalHeight;

  // Scale down if image is too large
  if (originalWidth > maxWidth || originalHeight > maxHeight) {
    if (originalWidth / maxWidth > originalHeight / maxHeight) {
      newWidth = maxWidth;
      newHeight = newWidth / aspectRatio;
    } else {
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    }
  }

  return { width: Math.round(newWidth), height: Math.round(newHeight) };
}

/**
 * Exports RACI matrix to DOCX format
 */
export async function exportToDocx(
  state: RaciState,
  options: ExportOptions = {}
): Promise<Blob> {
  try {
    const children: FileChild[] = [];

    // Calculate logo dimensions if logo exists
    let logoDimensions: { width: number; height: number } | null = null;
    if (state.logo) {
      try {
        const originalDimensions = await getImageDimensions(state.logo.dataUrl);
        logoDimensions = calculateScaledDimensions(
          originalDimensions.width,
          originalDimensions.height,
          150, // max width
          80 // max height
        );
      } catch (error) {
        console.warn(
          'Failed to get logo dimensions, using default size:',
          error
        );
        logoDimensions = { width: 120, height: 60 };
      }
    }

    // Logo section (if present)
    if (state.logo && logoDimensions) {
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: state.logo.dataUrl,
              transformation: {
                width: logoDimensions.width,
                height: logoDimensions.height,
              },
              type:
                state.logo.mimeType === 'image/png'
                  ? 'png'
                  : state.logo.mimeType === 'image/jpeg'
                    ? 'jpg'
                    : 'png',
            }),
          ],
          alignment: AlignmentType.CENTER,
        })
      );
    }

    // Title section
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: state.title,
            bold: true,
            size: 32,
            color: '2D3748',
          }),
        ],
        alignment: AlignmentType.CENTER,
      })
    );

    // Date section
    if (options.includeDate !== false) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Generated: ${new Date().toLocaleDateString()}`,
              size: 20,
              color: '718096',
            }),
          ],
          alignment: AlignmentType.CENTER,
        })
      );
    }

    // Spacing paragraph
    children.push(
      new Paragraph({
        children: [new TextRun({ text: '' })],
      })
    );

    // RACI Matrix Table
    const matrixRows: TableRow[] = [];

    // Header row
    const headerRow = new TableRow({
      children: [
        // Task header
        new TableCell({
          width: {
            size: 30,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Task',
                  bold: true,
                  color: 'FFFFFF',
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          shading: {
            fill: '4A5568',
          },
        }),
        // Role headers
        ...state.roles.map(
          (role) =>
            new TableCell({
              width: {
                size: 70 / state.roles.length,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: role.name,
                      bold: true,
                      color: 'FFFFFF',
                      size: 18,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              shading: {
                fill: '4A5568',
              },
            })
        ),
      ],
    });
    matrixRows.push(headerRow);

    // Data rows
    state.tasks.forEach((task, taskIndex) => {
      const isEvenRow = taskIndex % 2 === 0;

      const dataRow = new TableRow({
        children: [
          // Task name cell
          new TableCell({
            width: {
              size: 30,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: task.name,
                    size: 18,
                    color: '2D3748',
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ],
            shading: isEvenRow ? undefined : { fill: 'F7FAFC' },
          }),
          // RACI cells
          ...state.roles.map((role) => {
            const cellValue = state.matrix[task.id]?.[role.name];
            const activeKey = cellValue ? getActiveRaciKey(cellValue) : null;

            let cellShading = isEvenRow ? undefined : { fill: 'F7FAFC' };
            let textColor = '2D3748';

            if (activeKey && RACI_COLORS[activeKey]) {
              cellShading = { fill: RACI_COLORS[activeKey] };
              textColor = '2D3748';
            }

            return new TableCell({
              width: {
                size: 70 / state.roles.length,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: activeKey || '',
                      bold: !!activeKey,
                      size: 24,
                      color: textColor,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              shading: cellShading,
            });
          }),
        ],
      });
      matrixRows.push(dataRow);
    });

    // Create the matrix table
    const matrixTable = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: matrixRows,
    });

    children.push(matrixTable);

    // Legend section
    children.push(
      new Paragraph({
        children: [new TextRun({ text: '' })],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'RACI Legend:',
            bold: true,
            size: 24,
            color: '2D3748',
          }),
        ],
      })
    );

    // Legend items
    const legendItems = [
      { key: 'R', desc: 'Responsible - Does the work' },
      { key: 'A', desc: 'Accountable - Ultimately answerable' },
      { key: 'C', desc: 'Consulted - Provides input' },
      { key: 'I', desc: 'Informed - Needs to know' },
    ];

    legendItems.forEach((item) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${item.key}: `,
              bold: true,
              size: 20,
              color: '2D3748',
            }),
            new TextRun({
              text: item.desc,
              size: 20,
              color: '4A5568',
            }),
          ],
        })
      );
    });

    // Create document with proper section properties
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          children: children,
        },
      ],
    });

    // Generate blob for browser environment
    const blob = await Packer.toBlob(doc);
    return blob;
  } catch (error) {
    console.error('Failed to export DOCX:', error);
    throw new Error('Failed to create Word document. Please try again.');
  }
}

/**
 * Downloads the DOCX file
 */
export function downloadDocx(
  state: RaciState,
  options: ExportOptions = {}
): void {
  exportToDocx(state, options)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'raci.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Failed to export DOCX:', error);
      throw error;
    });
}
