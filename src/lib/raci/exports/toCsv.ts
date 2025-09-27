/**
 * CSV export functionality for RACI matrix
 */

import type { ExportOptions, RaciState } from '../../../types/raci';
import { getActiveRaciKey } from '../matrix';

/**
 * Exports RACI matrix to CSV format
 */
export async function exportToCsv(
  state: RaciState,
  _options: ExportOptions = {}
): Promise<Blob> {
  const csvLines: string[] = [];

  // Header row: Task, Role1, Role2, ...
  const headers = ['Task', ...state.roles.map((role) => role.name)];
  csvLines.push(headers.join(','));

  // Data rows
  state.tasks.forEach((task) => {
    const row = [task.name];

    state.roles.forEach((role) => {
      const cellValue = state.matrix[task.id]?.[role.name];
      const activeKey = cellValue ? getActiveRaciKey(cellValue) : null;

      // Escape CSV values and handle empty cells
      const cellValueStr = activeKey || '';
      const escapedValue =
        cellValueStr.includes(',') ||
        cellValueStr.includes('"') ||
        cellValueStr.includes('\n')
          ? `"${cellValueStr.replace(/"/g, '""')}"`
          : cellValueStr;

      row.push(escapedValue);
    });

    csvLines.push(row.join(','));
  });

  // Use \r\n line endings for Excel compatibility
  const csvContent = csvLines.join('\r\n');

  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
}

/**
 * Downloads the CSV file
 */
export function downloadCsv(
  state: RaciState,
  options: ExportOptions = {}
): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    throw new Error('downloadCsv can only be called in a browser environment');
  }

  exportToCsv(state, options)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'raci.csv';
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
      console.error('Failed to export CSV:', error);
      throw error;
    });
}
