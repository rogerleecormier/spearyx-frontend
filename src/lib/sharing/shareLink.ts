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

const DEFAULT_ROUTE_PATH = '/tools/raci';

const decodeBase64 = (value: string) => {
  if (typeof atob === 'function') {
    return atob(value);
  }

  const bufferCtor =
    typeof globalThis !== 'undefined'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as { Buffer?: any }).Buffer
      : undefined;

  if (bufferCtor) {
    return bufferCtor.from(value, 'base64').toString('binary');
  }

  throw new Error('Base64 decoding is not supported in this environment');
};

const getSearchParams = (input?: string | URLSearchParams) => {
  if (!input) {
    return new URLSearchParams();
  }

  if (input instanceof URLSearchParams) {
    return input;
  }

  // Check if input is a full URL
  try {
    const url = new URL(input);
    return url.searchParams;
  } catch {
    // If URL parsing fails, treat as search string
    return new URLSearchParams(input.startsWith('?') ? input.slice(1) : input);
  }
};

const getDefaultBaseUrl = () => {
  if (typeof window === 'undefined') {
    throw new Error('A baseUrl must be provided when window is unavailable');
  }

  return `${window.location.origin}${DEFAULT_ROUTE_PATH}`;
};

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
        const decodedCompressed = decodeBase64(compressedState);
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
export function getSharedStateParam(
  search?: string | URLSearchParams
): string | null {
  const params = getSearchParams(search);
  return params.get(SHARING_CONFIG.URL_PARAM);
}

export function parseSharedState(
  search?: string | URLSearchParams
): RaciState | null {
  try {
    const compressed = getSharedStateParam(search);

    if (!compressed) {
      return null;
    }

    return decompressRaciState(compressed);
  } catch (error) {
    console.error('Failed to extract state from URL:', error);
    return null;
  }
}

export function hasSharedState(search?: string | URLSearchParams): boolean {
  return getSharedStateParam(search) !== null;
}

export function generateShareableUrl(
  state: RaciState,
  baseUrl?: string | URL
): string {
  try {
    const compressed = compressRaciState(state);
    const url =
      baseUrl instanceof URL
        ? new URL(baseUrl.toString())
        : new URL(baseUrl || getDefaultBaseUrl());

    url.searchParams.set(SHARING_CONFIG.URL_PARAM, compressed);

    return url.toString();
  } catch (error) {
    console.error('Failed to generate shareable URL:', error);
    throw error;
  }
}

/**
 * Copies shareable URL to clipboard
 */
export async function copyShareableUrl(
  state: RaciState,
  baseUrl?: string
): Promise<string> {
  const url = generateShareableUrl(state, baseUrl);

  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return url;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else if (typeof document !== 'undefined') {
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

  return url;
}

export function clearSharedStateFromUrl(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.delete(SHARING_CONFIG.URL_PARAM);

    window.history.replaceState({}, '', url.toString());
  } catch (error) {
    console.error('Failed to clear shared state from URL:', error);
  }
}

