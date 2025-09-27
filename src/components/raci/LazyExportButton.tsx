/**
 * Lazy Export Button - Optimized lazy loading with preloading and error handling
 */

import { AlertCircle, Loader2 } from 'lucide-react';
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';

import { usePreload } from '../../hooks/usePreload';
import type { RaciState } from '../../types/raci';

interface LazyExportButtonProps {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  importPath: string;
  exportFunction: string;
  state: RaciState;
  filename: string;
  disabled?: boolean;
  requiresCanvas?: boolean;
  hasCanvas?: boolean;
  canvasRef?: React.RefObject<HTMLElement>;
  onExportStart?: (type: string) => void;
  onExportEnd?: () => void;
  onExportError?: (error: string) => void;
  onModuleLoad?: (moduleId: string) => void;
  isModuleLoaded?: boolean;
  disablePreload?: boolean;
}

// Helper function to create lazy export components
const createLazyExportComponent = (
  importPath: string,
  exportFunction: string,
  requiresCanvas?: boolean
) => {
  return lazy(async () => {
    const module = await import(importPath);
    return {
      default: ({
        state,
        filename,
        canvasRef,
      }: {
        state: RaciState;
        filename: string;
        canvasRef?: React.RefObject<HTMLElement>;
      }) => {
        const exportFn = module[exportFunction];
        if (requiresCanvas) {
          return exportFn(canvasRef?.current, { filename });
        } else {
          return exportFn(state, { filename });
        }
      },
    };
  });
};

export const LazyExportButton: React.FC<LazyExportButtonProps> = ({
  id,
  label,
  description,
  icon: Icon,
  color,
  importPath,
  exportFunction,
  state,
  filename,
  disabled = false,
  requiresCanvas = false,
  hasCanvas = false,
  canvasRef,
  onExportStart,
  onExportEnd,
  onExportError,
  onModuleLoad,
  isModuleLoaded = false,
  disablePreload = false,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [moduleLoaded, setModuleLoaded] = useState(false);

  const { preloadOnHover, isPreloaded } = usePreload({
    delay: 100,
    timeout: 5000,
  });

  // Get hover handlers for preloading
  const hoverHandlers = preloadOnHover(importPath);

  // Load module on component mount for better UX
  useEffect(() => {
    const loadModule = async () => {
      try {
        await import(importPath);
        setModuleLoaded(true);
        setLoadError(null);
        onModuleLoad?.(id);
      } catch (error) {
        console.warn(`Failed to preload ${importPath}:`, error);
        setLoadError(`Failed to load ${label} exporter`);
      }
    };

    // Only preload if not disabled, has canvas if required, and preloading is not disabled
    if (!disabled && (!requiresCanvas || hasCanvas) && !disablePreload) {
      loadModule();
    }
  }, [
    importPath,
    disabled,
    requiresCanvas,
    hasCanvas,
    label,
    onModuleLoad,
    id,
    disablePreload,
  ]);

  const handleExport = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent form submission
      if (disabled || isExporting) return;

      setIsExporting(true);
      setLoadError(null);
      onExportStart?.(id);

      try {
        const module = await import(importPath);
        const exportFn = module[exportFunction];

        if (requiresCanvas && !hasCanvas) {
          throw new Error('Canvas not available');
        }

        // Add small delay for canvas exports to ensure rendering
        if (requiresCanvas) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        // Handle different export function signatures
        if (requiresCanvas) {
          await exportFn(canvasRef?.current, { filename });
        } else {
          await exportFn(state, { filename });
        }
      } catch (error) {
        console.error(`Export failed (${id}):`, error);
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        setLoadError(`Export failed: ${errorMessage}`);
        onExportError?.(`Failed to export ${label}. Please try again.`);
      } finally {
        setIsExporting(false);
        onExportEnd?.();
      }
    },
    [
      disabled,
      isExporting,
      id,
      importPath,
      exportFunction,
      requiresCanvas,
      hasCanvas,
      state,
      filename,
      canvasRef,
      onExportStart,
      onExportEnd,
      onExportError,
      label,
    ]
  );

  const isDisabled = disabled || isExporting || (requiresCanvas && !hasCanvas);

  // Show error state if module failed to load
  if (loadError && !isExporting) {
    return (
      <div
        className={`relative flex flex-col items-center rounded-lg border-2 border-red-200 bg-red-50 p-4 transition-all`}
      >
        <div className="mb-2 flex h-8 w-8 items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <span className="mb-1 text-sm font-medium text-red-800">{label}</span>
        <span className="text-center text-xs leading-tight text-red-600">
          Load Error
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleExport}
      {...hoverHandlers}
      disabled={isDisabled}
      className={`relative flex flex-col items-center rounded-lg border-2 p-4 transition-all ${
        isDisabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50'
          : `${color} focus:outline-none focus:ring-2 focus:ring-offset-2`
      }`}
      title={
        requiresCanvas && !hasCanvas ? 'Canvas not available' : description
      }
    >
      <div className="mb-2 flex h-8 w-8 items-center justify-center">
        {isExporting ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Icon className="h-6 w-6" />
        )}
      </div>

      <span className="mb-1 text-sm font-medium">{label}</span>
      <span className="text-center text-xs leading-tight opacity-75">
        {description}
      </span>

      {/* Preloaded indicator */}
      {isPreloaded(importPath) && !isExporting && (
        <div
          className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500"
          title="Preloaded"
        />
      )}

      {/* Module loaded indicator */}
      {(moduleLoaded || isModuleLoaded) &&
        !isPreloaded(importPath) &&
        !isExporting && (
          <div
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-500"
            title="Ready"
          />
        )}
    </button>
  );
};

// Alternative approach using React.lazy for the entire export logic
export const LazyExportButtonWithSuspense: React.FC<LazyExportButtonProps> = (
  props
) => {
  const LazyComponent = createLazyExportComponent(
    props.importPath,
    props.exportFunction,
    props.requiresCanvas
  );

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center rounded-lg border-2 border-gray-200 bg-gray-50 p-4 opacity-50">
          <Loader2 className="mb-2 h-6 w-6 animate-spin" />
          <span className="text-sm font-medium">Loading...</span>
        </div>
      }
    >
      <LazyComponent
        state={props.state}
        filename={props.filename}
        canvasRef={props.canvasRef}
      />
    </Suspense>
  );
};
