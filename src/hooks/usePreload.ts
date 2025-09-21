/**
 * Hook for preloading modules on user interaction
 */

import { useCallback, useRef } from 'react';

interface PreloadOptions {
  delay?: number;
  timeout?: number;
}

export const usePreload = (options: PreloadOptions = {}) => {
  const { delay = 100, timeout = 5000 } = options;
  const preloadTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const preloadedModules = useRef<Set<string>>(new Set());

  const preload = useCallback(
    (importPath: string): Promise<unknown> => {
      // Return immediately if already preloaded
      if (preloadedModules.current.has(importPath)) {
        return Promise.resolve({});
      }

      // Clear existing timeout for this path
      const existingTimeout = preloadTimeouts.current.get(importPath);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(async () => {
          try {
            const module = await import(importPath);
            preloadedModules.current.add(importPath);
            preloadTimeouts.current.delete(importPath);
            resolve(module);
          } catch (error) {
            preloadTimeouts.current.delete(importPath);
            reject(error);
          }
        }, delay);

        preloadTimeouts.current.set(importPath, timeoutId);

        // Set a maximum timeout to avoid hanging
        setTimeout(() => {
          const currentTimeout = preloadTimeouts.current.get(importPath);
          if (currentTimeout) {
            clearTimeout(currentTimeout);
            preloadTimeouts.current.delete(importPath);
            reject(new Error(`Preload timeout for ${importPath}`));
          }
        }, timeout);
      });
    },
    [delay, timeout]
  );

  const preloadOnHover = useCallback(
    (importPath: string) => {
      return {
        onMouseEnter: () => preload(importPath),
        onFocus: () => preload(importPath),
      };
    },
    [preload]
  );

  const preloadOnIntersection = useCallback(
    (importPath: string, threshold = 0.1) => {
      return {
        ref: (element: HTMLElement | null) => {
          if (!element || preloadedModules.current.has(importPath)) return;

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  preload(importPath);
                  observer.disconnect();
                }
              });
            },
            { threshold }
          );

          observer.observe(element);

          return () => observer.disconnect();
        },
      };
    },
    [preload]
  );

  const clearPreload = useCallback((importPath: string) => {
    const timeout = preloadTimeouts.current.get(importPath);
    if (timeout) {
      clearTimeout(timeout);
      preloadTimeouts.current.delete(importPath);
    }
    preloadedModules.current.delete(importPath);
  }, []);

  const clearAllPreloads = useCallback(() => {
    preloadTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    preloadTimeouts.current.clear();
    preloadedModules.current.clear();
  }, []);

  return {
    preload,
    preloadOnHover,
    preloadOnIntersection,
    clearPreload,
    clearAllPreloads,
    isPreloaded: (importPath: string) =>
      preloadedModules.current.has(importPath),
  };
};
