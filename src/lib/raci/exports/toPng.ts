/**
 * PNG export functionality for RACI matrix canvas
 */

import * as htmlToImage from 'html-to-image';

import type { ExportOptions } from '../../../types/raci';

/**
 * Exports canvas element to PNG
 */
export async function exportToPng(
  canvasElement: HTMLElement,
  _options: ExportOptions = {}
): Promise<Blob> {
  try {
    // Validate canvas element
    if (!canvasElement) {
      throw new Error('Canvas element is not available');
    }

    // Ensure element is visible and get dimensions
    const rect = canvasElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      throw new Error('Canvas element has no dimensions');
    }

    // Force a reflow to ensure all content is rendered
    canvasElement.offsetHeight;

    // Temporarily make sure the element is fully visible for measurement
    const originalStyle = {
      position: canvasElement.style.position,
      visibility: canvasElement.style.visibility,
      display: canvasElement.style.display,
      height: canvasElement.style.height,
      maxHeight: canvasElement.style.maxHeight,
      overflow: canvasElement.style.overflow,
    };

    // Ensure element is fully visible and not constrained
    canvasElement.style.position = 'static';
    canvasElement.style.visibility = 'visible';
    canvasElement.style.display = 'block';
    canvasElement.style.height = 'auto';
    canvasElement.style.maxHeight = 'none';
    canvasElement.style.overflow = 'visible';

    // Force another reflow after style changes
    canvasElement.offsetHeight;

    // Get the scroll height to ensure we capture the full content
    const scrollHeight = canvasElement.scrollHeight;
    const scrollWidth = canvasElement.scrollWidth;
    const offsetHeight = canvasElement.offsetHeight;

    console.log('Canvas dimensions:', {
      rect,
      scrollHeight,
      scrollWidth,
      offsetHeight,
      clientHeight: canvasElement.clientHeight,
    });

    // Get device pixel ratio for crisp images
    const pixelRatio = window.devicePixelRatio || 2;

    // Capture with less space above and minimal space below
    const finalHeight = Math.max(rect.height, scrollHeight, offsetHeight) - 10; // Remove 10px from bottom
    const finalWidth = Math.max(rect.width, scrollWidth);

    // Configure html-to-image options without filter to avoid DOM issues
    const imageOptions = {
      backgroundColor: '#ffffff',
      pixelRatio: Math.min(pixelRatio, 3), // Cap pixel ratio to prevent memory issues
      quality: 1.0,
      width: finalWidth,
      height: finalHeight,
      skipFonts: true, // Skip font loading to avoid issues
      useCORS: true, // Enable CORS for images
      allowTaint: false, // Don't allow tainted canvas
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        overflow: 'visible', // Ensure overflow content is captured
        height: 'auto',
        maxHeight: 'none',
        marginTop: '-10px', // Reduce space above by 10px
        marginBottom: '20px', // Add space below for legend
      },
    };

    console.log('Final export dimensions:', { finalWidth, finalHeight });

    console.log('Exporting PNG with options:', imageOptions);

    // Convert to PNG
    const dataUrl = await htmlToImage.toPng(canvasElement, imageOptions);

    // Restore original styles
    canvasElement.style.position = originalStyle.position;
    canvasElement.style.visibility = originalStyle.visibility;
    canvasElement.style.display = originalStyle.display;
    canvasElement.style.height = originalStyle.height;
    canvasElement.style.maxHeight = originalStyle.maxHeight;
    canvasElement.style.overflow = originalStyle.overflow;

    if (!dataUrl) {
      throw new Error('Failed to generate PNG data URL');
    }

    // Convert data URL to blob
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error('Failed to convert data URL to blob');
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Failed to export PNG:', error);
    throw new Error(
      `Failed to capture canvas as PNG: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Downloads the PNG file
 */
export function downloadPng(
  canvasElement: HTMLElement,
  options: ExportOptions = {}
): void {
  exportToPng(canvasElement, options)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'raci.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Failed to export PNG:', error);
      throw error;
    });
}
