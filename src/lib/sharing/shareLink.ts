/**
 * Sharing utilities for RACI state via compressed URLs
 */

import * as LZString from 'lz-string';

import type { RaciState } from '../../types/raci';

/**
 * Configuration for sharing
 */
const SHARING_CONFIG = {
  MAX_URL_SIZE: 150000, // ~150KB limit for URL sharing
  COMPRESSION_LEVEL: 6, // LZ-string compression level (1-9)
  URL_PARAM: 's', // URL parameter name for state
} as const;

/**
 * Serializes and compresses RACI state for URL sharing
 */
export function compressRaciState(state: RaciState): string {
  try {
    // Convert state to JSON string
    const jsonString = JSON.stringify(state);

    // Compress using LZ-string with built-in base64 encoding
    const compressed = LZString.compressToBase64(jsonString);

    if (!compressed) {
      throw new Error('Failed to compress state data');
    }

    // Check size limits
    if (compressed.length > SHARING_CONFIG.MAX_URL_SIZE) {
      throw new Error('State too large for URL sharing');
    }

    return compressed;
  } catch (error) {
    console.error('Failed to compress RACI state:', error);
    throw new Error('Failed to prepare state for sharing');
  }
}

/**
 * Decompresses and deserializes RACI state from URL
 */
export function decompressRaciState(compressedState: string): RaciState {
  try {
    let jsonString: string | null = null;

    // Try LZString base64 decompression first (new format)
    try {
      jsonString = LZString.decompressFromBase64(compressedState);
    } catch {
      // If LZString base64 fails, try manual base64 + decompress (intermediate format)
      try {
        const decodedCompressed = atob(compressedState);
        jsonString = LZString.decompress(decodedCompressed);
      } catch {
        // If both fail, try direct decompression (old format - backward compatibility)
        try {
          jsonString = LZString.decompress(compressedState);
        } catch {
          // All methods failed
          throw new Error('Failed to decode compressed state');
        }
      }
    }

    if (!jsonString) {
      throw new Error('Failed to decompress state data');
    }

    // Parse JSON
    const state = JSON.parse(jsonString) as RaciState;

    // Basic validation
    if (!state || typeof state !== 'object') {
      throw new Error('Invalid state format');
    }

    if (!Array.isArray(state.roles) || !Array.isArray(state.tasks)) {
      throw new Error('Invalid state structure');
    }

    return state;
  } catch (error) {
    console.error('Failed to decompress RACI state:', error);
    throw new Error('Failed to restore state from link');
  }
}

/**
 * Generates a shareable URL for the current RACI state
 */
export function generateShareableUrl(
  state: RaciState,
  baseUrl?: string
): string {
  try {
    const compressed = compressRaciState(state);
    // Always use the RACI generator route for shareable URLs
    const targetUrl =
      baseUrl || `${window.location.origin}/tools/raci-generator`;
    const separator = targetUrl.includes('?') ? '&' : '?';

    return `${targetUrl}${separator}${SHARING_CONFIG.URL_PARAM}=${encodeURIComponent(compressed)}`;
  } catch (error) {
    console.error('Failed to generate shareable URL:', error);
    throw error;
  }
}

/**
 * Extracts RACI state from URL parameters
 */
export function extractStateFromUrl(url?: string): RaciState | null {
  try {
    const targetUrl = url || window.location.href;
    const urlObj = new URL(targetUrl);
    const compressedState = urlObj.searchParams.get(SHARING_CONFIG.URL_PARAM);

    if (!compressedState) {
      return null;
    }

    return decompressRaciState(decodeURIComponent(compressedState));
  } catch (error) {
    console.error('Failed to extract state from URL:', error);
    return null;
  }
}

/**
 * Copies shareable URL to clipboard
 */
export async function copyShareableUrl(state: RaciState): Promise<void> {
  try {
    const url = generateShareableUrl(state);

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
  } catch (error) {
    console.error('Failed to copy URL to clipboard:', error);
    throw new Error('Failed to copy link to clipboard');
  }
}

/**
 * Checks if current URL contains a shared state
 */
export function hasSharedStateInUrl(): boolean {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has(SHARING_CONFIG.URL_PARAM);
  } catch {
    return false;
  }
}

/**
 * Clears shared state from URL without page reload
 */
export function clearSharedStateFromUrl(): void {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete(SHARING_CONFIG.URL_PARAM);

    // Update URL without reloading page
    window.history.replaceState({}, '', url.toString());
  } catch (error) {
    console.error('Failed to clear shared state from URL:', error);
  }
}
