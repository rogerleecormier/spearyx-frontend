/**
 * SVG export functionality for RACI matrix canvas
 */

import * as htmlToImage from 'html-to-image';

import type { ExportOptions } from '../../../types/raci';

/**
 * Exports canvas element to SVG
 */
export async function exportToSvg(
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

    // Capture with less space above and minimal space below
    const finalHeight = Math.max(rect.height, scrollHeight, offsetHeight) - 10; // Remove 10px from bottom
    const finalWidth = Math.max(rect.width, scrollWidth);

    // Configure html-to-image options for SVG without filter to avoid DOM issues
    const imageOptions = {
      backgroundColor: '#ffffff',
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

    console.log('Exporting SVG with options:', imageOptions);

    // Convert to SVG
    const svgDataUrl = await htmlToImage.toSvg(canvasElement, imageOptions);

    // Restore original styles
    canvasElement.style.position = originalStyle.position;
    canvasElement.style.visibility = originalStyle.visibility;
    canvasElement.style.display = originalStyle.display;
    canvasElement.style.height = originalStyle.height;
    canvasElement.style.maxHeight = originalStyle.maxHeight;
    canvasElement.style.overflow = originalStyle.overflow;

    if (!svgDataUrl) {
      throw new Error('Failed to generate SVG data URL');
    }

    // Convert data URL to blob
    const response = await fetch(svgDataUrl);
    if (!response.ok) {
      throw new Error('Failed to convert data URL to blob');
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Failed to export SVG:', error);
    throw new Error(
      `Failed to capture canvas as SVG: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Downloads the SVG file
 */
export function downloadSvg(
  canvasElement: HTMLElement,
  options: ExportOptions = {}
): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    throw new Error('downloadSvg can only be called in a browser environment');
  }

  exportToSvg(canvasElement, options)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'raci.svg';
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
      console.error('Failed to export SVG:', error);
      throw error;
    });
}
