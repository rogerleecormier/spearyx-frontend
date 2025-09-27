/**
 * Pretty formatted XLSX export functionality
 */

import type { ExportOptions, RaciKey, RaciState } from '../../../types/raci';
import { getActiveRaciKey } from '../matrix';

/**
 * Color palette for RACI values
 */
const RACI_COLORS: Record<RaciKey, string> = {
  R: 'FF90EE90', // Light green
  A: 'FFFFD700', // Light gold
  C: 'FF87CEEB', // Light sky blue
  I: 'FFD3D3D3', // Light gray
};

/**
 * Exports RACI matrix to formatted XLSX with styling
 */
export async function exportToPrettyXlsx(
  state: RaciState,
  options: ExportOptions = {}
): Promise<Blob> {
  // Dynamic import to avoid SSR issues
  const ExcelJS =
    (await import('exceljs')).default || (await import('exceljs'));

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('RACI Matrix');

  // Set up basic properties
  workbook.creator = 'RACI Generator';
  workbook.lastModifiedBy = 'RACI Generator';
  workbook.created = new Date();

  let currentRow = 1;

  // Add logo if present
  if (state.logo) {
    try {
      // Use base64 data directly to avoid Buffer type issues
      const base64Data = state.logo.dataUrl.split(',')[1];

      // Add image to workbook using base64 data
      const imageId = workbook.addImage({
        base64: base64Data,
        extension: state.logo.mimeType.split('/')[1] as 'png' | 'jpeg',
      });

      // Insert image with optimal sizing
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 },
        ext: { width: 120, height: 60 }, // Slightly larger for better visibility in Excel
      });

      currentRow = 4; // Leave space for logo
    } catch (error) {
      console.warn('Failed to add logo to XLSX:', error);
    }
  }

  // Title header with styling
  const titleCell = worksheet.getCell(currentRow, 1);
  titleCell.value = state.title;
  titleCell.font = { bold: true, size: 18, color: { argb: 'FF2D3748' } };
  titleCell.alignment = { horizontal: 'left', vertical: 'middle' };

  // Merge cells for title
  worksheet.mergeCells(currentRow, 1, currentRow, state.roles.length + 1);

  // Add border to title
  const titleRange = worksheet.getCell(currentRow, 1);
  titleRange.border = {
    bottom: { style: 'thick', color: { argb: 'FF4A5568' } },
  };

  currentRow += 1;

  // Date row if requested
  if (options.includeDate !== false) {
    const dateCell = worksheet.getCell(currentRow, 1);
    dateCell.value = `Generated: ${new Date().toLocaleDateString()}`;
    dateCell.font = { size: 10, color: { argb: 'FF718096' } };
    dateCell.alignment = { horizontal: 'left' };
    currentRow += 1;
  }

  // Empty row for spacing
  currentRow += 1;

  // Header row with styling
  const headerRow = currentRow;

  // Task header
  const taskHeaderCell = worksheet.getCell(headerRow, 1);
  taskHeaderCell.value = 'Task';
  taskHeaderCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  taskHeaderCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4A5568' },
  };
  taskHeaderCell.alignment = { horizontal: 'center', vertical: 'middle' };
  taskHeaderCell.border = {
    top: { style: 'thin', color: { argb: 'FF2D3748' } },
    left: { style: 'thin', color: { argb: 'FF2D3748' } },
    bottom: { style: 'thin', color: { argb: 'FF2D3748' } },
    right: { style: 'thin', color: { argb: 'FF2D3748' } },
  };

  // Role headers
  state.roles.forEach((role, index) => {
    const cell = worksheet.getCell(headerRow, index + 2);
    cell.value = role.name;
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4A5568' },
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF2D3748' } },
      left: { style: 'thin', color: { argb: 'FF2D3748' } },
      bottom: { style: 'thin', color: { argb: 'FF2D3748' } },
      right: { style: 'thin', color: { argb: 'FF2D3748' } },
    };
  });

  currentRow += 1;

  // Data rows with RACI styling
  state.tasks.forEach((task, taskIndex) => {
    const row = currentRow + taskIndex;

    // Task name cell
    const taskCell = worksheet.getCell(row, 1);
    taskCell.value = task.name;
    taskCell.font = { bold: false };
    taskCell.alignment = { horizontal: 'left', vertical: 'middle' };
    taskCell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    };

    // Alternate row background
    if (taskIndex % 2 === 1) {
      taskCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF7FAFC' },
      };
    }

    // RACI cells
    state.roles.forEach((role, roleIndex) => {
      const cell = worksheet.getCell(row, roleIndex + 2);
      const cellValue = state.matrix[task.id]?.[role.name];
      const activeKey = cellValue ? getActiveRaciKey(cellValue) : null;

      cell.value = activeKey || '';
      cell.font = { bold: true, size: 12 };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      };

      // Apply RACI-specific styling
      if (activeKey && RACI_COLORS[activeKey]) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: RACI_COLORS[activeKey] },
        };
        cell.font = { ...cell.font, color: { argb: 'FF2D3748' } };
      } else if (taskIndex % 2 === 1) {
        // Alternate row background for empty cells
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF7FAFC' },
        };
      }
    });
  });

  // Auto-fit columns with constraints
  worksheet.columns.forEach((column, index) => {
    if (index === 0) {
      // Task column - wider for task names
      column.width = 30;
    } else {
      // Role columns - narrower
      column.width = 15;
    }
  });

  // Set row heights
  worksheet.getRow(headerRow).height = 25;
  for (let i = currentRow; i < currentRow + state.tasks.length; i++) {
    worksheet.getRow(i).height = 20;
  }

  // Add RACI legend at the bottom
  const legendStartRow = currentRow + state.tasks.length + 2;

  const legendTitle = worksheet.getCell(legendStartRow, 1);
  legendTitle.value = 'RACI Legend:';
  legendTitle.font = { bold: true, size: 12 };

  const legendItems = [
    { key: 'R', desc: 'Responsible - Does the work' },
    { key: 'A', desc: 'Accountable - Ultimately answerable' },
    { key: 'C', desc: 'Consulted - Provides input' },
    { key: 'I', desc: 'Informed - Needs to know' },
  ];

  legendItems.forEach((item, index) => {
    const row = legendStartRow + index + 1;

    // RACI key cell
    const keyCell = worksheet.getCell(row, 1);
    keyCell.value = item.key;
    keyCell.font = { bold: true, size: 10 };
    keyCell.alignment = { horizontal: 'center', vertical: 'middle' };
    keyCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: RACI_COLORS[item.key as RaciKey] },
    };
    keyCell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    };

    // Description cell
    const descCell = worksheet.getCell(row, 2);
    descCell.value = item.desc;
    descCell.font = { size: 10 };
    descCell.alignment = { horizontal: 'left', vertical: 'middle' };
  });

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

/**
 * Downloads the formatted XLSX file
 */
export function downloadPrettyXlsx(
  state: RaciState,
  options: ExportOptions = {}
): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    throw new Error(
      'downloadPrettyXlsx can only be called in a browser environment'
    );
  }

  exportToPrettyXlsx(state, options)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'raci-formatted.xlsx';
      link.style.display = 'none';
      document.body.appendChild(link);

      // Use a more reliable click mechanism
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      link.dispatchEvent(clickEvent);

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Failed to export formatted XLSX:', error);
      throw error;
    });
}
