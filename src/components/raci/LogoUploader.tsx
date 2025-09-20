/**
 * Logo Uploader Component - For adding logos to RACI chart exports
 */

import { Image as ImageIcon, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { validateLogoFile } from '../../lib/raci/schema';
import type { LogoData } from '../../types/raci';

interface LogoUploaderProps {
  logo?: LogoData;
  onLogoChange: (logo: LogoData | undefined) => void;
  className?: string;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({
  logo,
  onLogoChange,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadError(null);

    const validation = validateLogoFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onLogoChange({
          dataUrl,
          fileName: file.name,
          mimeType: file.type as
            | 'image/png'
            | 'image/svg+xml'
            | 'image/webp'
            | 'image/jpeg',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeLogo = () => {
    onLogoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadError(null);
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Export Logo</h3>
          <p className="mt-1 text-sm text-gray-600">
            Add a logo to appear in your exported XLSX and PDF files
          </p>
        </div>

        {logo ? (
          <div className="space-y-3">
            {/* Logo Preview */}
            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-3">
              <img
                src={logo.dataUrl}
                alt="Logo preview"
                className="h-12 w-auto max-w-[120px] object-contain"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {logo.fileName}
                </p>
                <p className="text-xs text-gray-500">
                  {logo.mimeType.split('/')[1].toUpperCase()}
                </p>
              </div>
              <button
                onClick={removeLogo}
                className="flex-shrink-0 rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                aria-label="Remove logo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Replace Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Upload className="h-4 w-4" />
              Replace Logo
            </button>
          </div>
        ) : (
          /* Upload Area */
          <div
            className={`relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            } `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                Upload your logo
              </p>
              <p className="text-xs text-gray-500">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-400">
                PNG, SVG, WEBP, or JPEG (max 5MB)
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {uploadError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600">
            {uploadError}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/svg+xml,image/webp,image/jpeg"
          onChange={handleFileInput}
          className="hidden"
          aria-label="Upload logo file"
        />

        {/* Usage Note */}
        <div className="rounded bg-blue-50 p-3 text-xs text-gray-500">
          <p className="mb-1 font-medium text-blue-900">Logo Usage:</p>
          <ul className="list-inside list-disc space-y-1 text-blue-800">
            <li>XLSX, PDF, PPTX, and DOCX headers</li>
            <li>PNG/SVG canvas exports</li>
            <li>Auto-scaled with aspect ratio maintained</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
