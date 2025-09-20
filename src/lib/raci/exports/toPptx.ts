/**
 * PPTX export functionality for RACI matrix using PptxGenJS
 */

import { RaciKey } from '../../../types/raci';
import { getActiveRaciKey } from '../matrix';

// Import PptxGenJS types
interface PptxGenJS {
  new (): any;
}

// Dynamic import for PptxGenJS

/**
 * Get image dimensions from a data URL
 */
function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
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

async function getPptxGen(): Promise<any> {
  const PptxGenJS = await import('pptxgenjs');
  return new PptxGenJS.default();
}

/**
 * Color palette for RACI values in PPTX
 */
const RACI_COLORS: Record<RaciKey, string> = {
  R: '90EE90', // Light green
  A: 'FFD700', // Light gold  
  C: '87CEEB', // Light sky blue
  I: 'D3D3D3'  // Light gray
};

/**
 * Add table with 20% smaller sizing - simplified approach for PptxGenJS 4.0.1
 */
async function addTableWithOverflowHandling(
  slide: any,
  tableData: any[][],
  startY: number,
  margin: number,
  slideWidth: number,
  slideHeight: number,
  options: any
): Promise<void> {
  const legendSpace = 1.2; // Space needed for legend
  const bottomMargin = 0.5; // Bottom margin
  const availableHeight = slideHeight - startY - legendSpace - bottomMargin;
  const tableHeight = Math.max(0.8, Math.min(availableHeight * 0.64, 2.24)); // 20% smaller again (0.8 * 0.8 = 0.64), max 2.24"
  
  // Calculate optimal row height based on number of rows
  const numRows = tableData.length;
  const minRowHeight = 0.2; // Smaller minimum row height
  const optimalRowHeight = Math.max(minRowHeight, tableHeight / numRows);
  
  // Add table to slide with color-coded styling
  slide.addTable(tableData, {
    x: margin,
    y: startY,
    w: slideWidth - (2 * margin),
    h: tableHeight,
    border: { type: 'solid', color: '000000', pt: 1 },
    valign: 'middle',
    rowH: optimalRowHeight,
    colW: Array(tableData[0].length).fill((slideWidth - (2 * margin)) / tableData[0].length)
  });
  
  // Add legend
  await addLegendToSlide(slide, startY + tableHeight + 0.2, margin, slideHeight);
}

/**
 * Add legend to a slide
 */
async function addLegendToSlide(slide: any, legendY: number, margin: number, slideHeight: number): Promise<void> {
  if (legendY < slideHeight - 1) {
    slide.addText('RACI Legend:', {
      x: margin,
      y: legendY,
      w: 2,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: '2D3748'
    });
    
    const legendItems = [
      { key: 'R', desc: 'Responsible - Does the work' },
      { key: 'A', desc: 'Accountable - Ultimately answerable' },
      { key: 'C', desc: 'Consulted - Provides input' },
      { key: 'I', desc: 'Informed - Needs to know' }
    ];
    
    legendItems.forEach((item, index) => {
      const legendX = margin + (index * 2.25);
      const legendItemY = legendY + 0.3;
      
      slide.addShape('rect', {
        x: legendX,
        y: legendItemY,
        w: 0.25,
        h: 0.15,
        fill: { color: RACI_COLORS[item.key as RaciKey] },
        line: { color: 'E2E8F0', width: 1 }
      });
      
      slide.addText(item.key, {
        x: legendX,
        y: legendItemY,
        w: 0.25,
        h: 0.15,
        fontSize: 8,
        bold: true,
        color: '2D3748',
        align: 'center',
        valign: 'middle'
      });
      
      slide.addText(item.desc, {
        x: legendX + 0.3,
        y: legendItemY,
        w: 1.9,
        h: 0.15,
        fontSize: 7,
        color: '4A5568',
        align: 'left',
        valign: 'middle'
      });
    });
  }
}

/**
 * Exports RACI matrix to PPTX format
 */
export async function exportToPptx(
  state: any,
  options: any = {}
): Promise<Blob> {
  try {
    const pptx = await getPptxGen();
    
    // Set presentation properties
    pptx.author = 'Spearyx RACI Generator';
    pptx.company = 'Spearyx';
    pptx.title = state.title || 'RACI Matrix';
    pptx.subject = 'RACI Responsibility Assignment Matrix';
    
    // Add slide
    const slide = pptx.addSlide();
    
    // Set slide dimensions and margins (standard PowerPoint slide size in inches)
    const slideWidth = 10;   // 10 inches
    const slideHeight = 7.5; // 7.5 inches  
    const margin = 0.5;
    
    let currentY = margin;
    
    // Add logo if present
    if (state.logo) {
      try {
        // Get logo dimensions from the image data
        const logoDimensions = await getImageDimensions(state.logo.dataUrl);
        
        // Calculate appropriate size while maintaining aspect ratio
        const maxWidth = 2.5; // Maximum width in inches
        const maxHeight = 1.2; // Maximum height in inches
        
        let logoWidth = logoDimensions.width / 96; // Convert pixels to inches (96 DPI)
        let logoHeight = logoDimensions.height / 96;
        
        // Scale down if too large, maintaining aspect ratio
        const widthScale = maxWidth / logoWidth;
        const heightScale = maxHeight / logoHeight;
        const scale = Math.min(widthScale, heightScale, 1); // Don't scale up, only down
        
        logoWidth *= scale;
        logoHeight *= scale;
        
        slide.addImage({
          data: state.logo.dataUrl,
          x: margin,
          y: currentY,
          w: logoWidth,
          h: logoHeight
        });
        currentY += logoHeight + 0.1;
      } catch (error) {
        console.warn('Failed to add logo to PPTX:', error);
        // Fallback to default size if dimension detection fails
        slide.addImage({
          data: state.logo.dataUrl,
          x: margin,
          y: currentY,
          w: 2.0,
          h: 1.0
        });
        currentY += 0.7;
      }
    }
    
    // Add title
    slide.addText(state.title, {
      x: margin,
      y: currentY,
      w: slideWidth - (2 * margin),
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: '2D3748',
      align: 'left'
    });
    currentY += 0.5; // Reduced spacing after title
    
    // Add date if requested
    if (options.includeDate !== false) {
      slide.addText(`Generated: ${new Date().toLocaleDateString()}`, {
        x: margin,
        y: currentY,
        w: slideWidth - (2 * margin),
        h: 0.3,
        fontSize: 12,
        color: '718096',
        align: 'left'
      });
      currentY += 0.3; // Reduced spacing after date
    }
    
    // Create table data with color formatting
    const tableData: any[][] = [];
    
    // Header row with formatting
    const headerRow = [
      { text: 'Task', options: { fill: '4A5568', color: 'FFFFFF', fontSize: 9 } as any },
      ...state.roles.map((role: any) => ({ 
        text: role.name, 
        options: { fill: '4A5568', color: 'FFFFFF', fontSize: 9 } as any
      }))
    ];
    tableData.push(headerRow);
    
    // Data rows with color formatting
    state.tasks.forEach((task: any, taskIndex: number) => {
      const isEvenRow = taskIndex % 2 === 0;
      const row = [
        { 
          text: task.name, 
          options: { 
            align: 'left', 
            fontSize: 8, 
            fill: isEvenRow ? 'F7FAFC' : 'FFFFFF' 
          } 
        }
      ];
      
      state.roles.forEach((role: any) => {
        const cellValue = state.matrix[task.id]?.[role.name];
        const activeKey = cellValue ? getActiveRaciKey(cellValue) : null;
        const raciKey = activeKey as RaciKey;
        
        if (raciKey && RACI_COLORS[raciKey]) {
          row.push({
            text: raciKey,
            options: {
              align: 'center',
              fontSize: 8,
              fill: RACI_COLORS[raciKey],
              color: '2D3748'
            } as any
          });
        } else {
          row.push({
            text: '',
            options: {
              align: 'center',
              fontSize: 8,
              fill: isEvenRow ? 'F7FAFC' : 'FFFFFF'
            } as any
          });
        }
      });
      
      tableData.push(row);
    });
    
    // Add table with 20% smaller sizing
    await addTableWithOverflowHandling(slide, tableData, currentY, margin, slideWidth, slideHeight, options);
    
    // Generate the presentation
    const buffer = await pptx.write();
    return new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    });
  } catch (error) {
    console.error('Failed to export PPTX:', error);
    throw new Error('Failed to create PowerPoint presentation. Please try again.');
  }
}

/**
 * Downloads the PPTX file
 */
export function downloadPptx(state: any, options: any = {}): void {
  exportToPptx(state, options).then(blob => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = options.filename || 'raci.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }).catch(error => {
    console.error('Failed to export PPTX:', error);
    throw error;
  });
}
