/**
 * Export Center Component - Unified export and sharing interface
 */

import {
  AlertCircle,
  Check,
  Copy,
  Download,
  FileSpreadsheet,
  FileText,
  Image,
  Link,
  Loader2,
  Users,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import {
  copyShareableUrl,
  hasSharedState,
  parseSharedState,
} from '../../lib/sharing/shareLink';
import type { RaciState } from '../../types/raci';

interface ExportCenterProps {
  state: RaciState;
  canvasRef?: React.RefObject<HTMLElement>;
  onStateImport?: (newState: RaciState) => void;
  validationErrors?: Array<{ message: string }>;
  className?: string;
  hasSharedStateInSearch?: boolean;
}

interface ExportButton {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  action: () => Promise<void> | void;
  disabled?: boolean;
  requiresCanvas?: boolean;
}

export const ExportCenter: React.FC<ExportCenterProps> = ({
  state,
  canvasRef,
  onStateImport,
  validationErrors = [],
  className = '',
  hasSharedStateInSearch = false,
}) => {
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [successType, setSuccessType] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importUrl, setImportUrl] = useState<string>('');
  const [canImportFromUrl, setCanImportFromUrl] = useState(
    hasSharedStateInSearch
  );

  const hasErrors = validationErrors.length > 0;
  const canExport = state.roles.length > 0 && state.tasks.length > 0;
  const hasCanvas = canvasRef?.current;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setCanImportFromUrl(hasSharedState(window.location.search));
  }, [hasSharedStateInSearch]);

  const handleExport = async (
    type: string,
    exportFn: () => Promise<void> | void
  ) => {
    if (!canExport) return;

    setExportingType(type);
    setExportError(null);

    try {
      await exportFn();
    } catch (error) {
      console.error(`Export failed (${type}):`, error);
      setExportError(`Failed to export ${type}. Please try again.`);
    } finally {
      setExportingType(null);
    }
  };

  const handleShareLink = async () => {
    try {
      setExportingType('share');
      setShareSuccess(false);
      setExportError(null);

      await copyShareableUrl(state);
      setSuccessType('share');
      setShareSuccess(true);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setShareSuccess(false), 3000);
    } catch (error) {
      console.error('Share failed:', error);
      setExportError('Failed to copy shareable link. Please try again.');
    } finally {
      setExportingType(null);
    }
  };

  const handleImportLink = () => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      setImportError(null);
      const sharedState = parseSharedState(window.location.search);

      if (sharedState && onStateImport) {
        onStateImport(sharedState);
        setSuccessType('import');
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } else {
        setImportError('No valid shared state found in URL');
      }
    } catch (error) {
      console.error('Import failed:', error);
      setImportError('Failed to import state from URL');
    }
  };

  const handleImportFromPastedUrl = () => {
    if (!importUrl.trim()) {
      setImportError('Please enter a valid shareable URL');
      return;
    }

    try {
      setImportError(null);
      setExportingType('import');

      const sharedState = parseSharedState(importUrl.trim());

      if (sharedState && onStateImport) {
        onStateImport(sharedState);
        setSuccessType('import');
        setShareSuccess(true);
        setImportUrl(''); // Clear the input after successful import
        setTimeout(() => setShareSuccess(false), 3000);
      } else {
        setImportError('No valid shared state found in the provided URL');
      }
    } catch (error) {
      console.error('Import from pasted URL failed:', error);
      setImportError(
        'Failed to import state from the provided URL. Please check the URL and try again.'
      );
    } finally {
      setExportingType(null);
    }
  };

  const exportButtons: ExportButton[] = [
    {
      id: 'csv',
      label: 'CSV',
      description: 'Wide format spreadsheet',
      icon: FileSpreadsheet,
      color: 'text-green-600 bg-green-50 hover:bg-green-100 border-green-200',
      action: async () => {
        const { downloadCsv } = await import('../../lib/raci/exports/toCsv');
        await downloadCsv(state, { filename: 'raci.csv' });
      },
    },
    {
      id: 'xlsx',
      label: 'XLSX (Formatted)',
      description: 'Styled spreadsheet with colors',
      icon: FileSpreadsheet,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200',
      action: async () => {
        const { downloadPrettyXlsx } = await import(
          '../../lib/raci/exports/toPrettyXlsx'
        );
        await downloadPrettyXlsx(state, { filename: 'raci-formatted.xlsx' });
      },
    },
    {
      id: 'pdf',
      label: 'PDF (Formatted)',
      description: 'Professional document',
      icon: FileText,
      color: 'text-red-600 bg-red-50 hover:bg-red-100 border-red-200',
      action: async () => {
        const { downloadPdf } = await import('../../lib/raci/exports/toPdf');
        await downloadPdf(state, { filename: 'raci.pdf' });
      },
    },
    {
      id: 'png',
      label: 'PNG (Canvas)',
      description: 'High-quality image capture',
      icon: Image,
      color:
        'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200',
      action: async () => {
        if (!hasCanvas) throw new Error('Canvas not available');
        const { downloadPng } = await import('../../lib/raci/exports/toPng');
        await new Promise((resolve) => setTimeout(resolve, 200));
        downloadPng(canvasRef!.current!, { filename: 'raci.png' });
      },
      requiresCanvas: true,
    },
    {
      id: 'svg',
      label: 'SVG (Canvas)',
      description: 'Scalable vector graphic',
      icon: Image,
      color:
        'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      action: async () => {
        if (!hasCanvas) throw new Error('Canvas not available');
        const { downloadSvg } = await import('../../lib/raci/exports/toSvg');
        await new Promise((resolve) => setTimeout(resolve, 200));
        downloadSvg(canvasRef!.current!, { filename: 'raci.svg' });
      },
      requiresCanvas: true,
    },
    {
      id: 'pptx',
      label: 'PPTX (1-Slide)',
      description: 'PowerPoint presentation',
      icon: FileText,
      color:
        'text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-200',
      action: async () => {
        const { downloadPptx } = await import('../../lib/raci/exports/toPptx');
        await downloadPptx(state, { filename: 'raci.pptx' });
      },
    },
    {
      id: 'docx',
      label: 'DOCX',
      description: 'Word document',
      icon: FileText,
      color: 'text-teal-600 bg-teal-50 hover:bg-teal-100 border-teal-200',
      action: async () => {
        const { downloadDocx } = await import('../../lib/raci/exports/toDocx');
        await downloadDocx(state, { filename: 'raci.docx' });
      },
    },
  ];

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Export & Share
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Download your RACI matrix in various formats or share with others
            </p>
          </div>
          <Download className="h-5 w-5 text-gray-500" />
        </div>

        {/* Validation Warnings */}
        {hasErrors && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Validation Issues Detected
                </p>
                <div className="mt-2 text-xs text-amber-700">
                  <ul className="list-inside list-disc space-y-1">
                    {validationErrors.slice(0, 3).map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                    {validationErrors.length > 3 && (
                      <li>... and {validationErrors.length - 3} more issues</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Messages */}
        {shareSuccess && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800">
                {successType === 'share'
                  ? 'Shareable link copied to clipboard!'
                  : successType === 'import'
                    ? 'State imported successfully!'
                    : 'Operation completed successfully!'}
              </p>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {(exportError || importError) && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-800">
                {exportError || importError}
              </p>
            </div>
          </div>
        )}

        {/* Export Buttons Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {exportButtons.map((button) => {
            const isExporting = exportingType === button.id;
            const isDisabled =
              !canExport ||
              button.disabled ||
              isExporting ||
              (button.requiresCanvas && !hasCanvas);

            return (
              <button
                key={button.id}
                onClick={() => handleExport(button.id, button.action)}
                disabled={isDisabled}
                className={`relative flex flex-col items-center rounded-lg border-2 p-4 transition-all ${
                  isDisabled
                    ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50'
                    : button.color +
                      ' focus:outline-none focus:ring-2 focus:ring-offset-2'
                } `}
                title={
                  button.requiresCanvas && !hasCanvas
                    ? 'Canvas not available'
                    : button.description
                }
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center">
                  {isExporting ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <button.icon className="h-6 w-6" />
                  )}
                </div>

                <span className="mb-1 text-sm font-medium">{button.label}</span>

                <span className="text-center text-xs leading-tight opacity-75">
                  {button.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sharing Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">
              Share & Import
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Share Link */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Share Link
                </span>
              </div>
              <button
                onClick={handleShareLink}
                disabled={!canExport || exportingType === 'share'}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {exportingType === 'share' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                Copy Shareable Link
              </button>
              <p className="text-xs text-gray-500">
                Creates a compressed URL with your full RACI state
              </p>
            </div>

            {/* Import Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Import from Share Link
                </span>
              </div>

              {/* Import from current URL if available */}
              {canImportFromUrl && (
                <button
                  onClick={handleImportLink}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Link className="h-4 w-4" />
                  Import from Current URL
                </button>
              )}

              {/* Import from pasted URL */}
              <div className="space-y-2">
                <input
                  type="url"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder="Paste a shareable RACI link here..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleImportFromPastedUrl();
                    }
                  }}
                />
                <button
                  onClick={handleImportFromPastedUrl}
                  disabled={!importUrl.trim() || exportingType === 'import'}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {exportingType === 'import' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Link className="h-4 w-4" />
                  )}
                  Import from Link
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Paste a shareable RACI link to import and overwrite current data
              </p>
            </div>
          </div>
        </div>

        {/* Canvas Warning */}
        {!hasCanvas && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                PNG and SVG exports require the matrix preview to be visible.
                Make sure the canvas preview is loaded.
              </p>
            </div>
          </div>
        )}

        {/* Disabled State Message */}
        {!canExport && (
          <div className="py-4 text-center">
            <p className="text-sm text-gray-500">
              {state.roles.length === 0 && state.tasks.length === 0
                ? 'Add roles and tasks to enable exports'
                : state.roles.length === 0
                  ? 'Add roles to enable exports'
                  : 'Add tasks to enable exports'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
