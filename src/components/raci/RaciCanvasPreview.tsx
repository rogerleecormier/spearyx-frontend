/**
 * RACI Canvas Preview Component - Pretty read-only matrix for export capture
 */

import { Eye } from 'lucide-react';
import React from 'react';

import { getActiveRaciKey } from '../../lib/raci/matrix';
import type { LogoData, Matrix, RaciKey, Role, Task } from '../../types/raci';

interface RaciCanvasPreviewProps {
  title: string;
  roles: Role[];
  tasks: Task[];
  matrix: Matrix;
  logo?: LogoData;
  onLogoChange: (logo: LogoData | undefined) => void;
  generatedOnLabel: string;
  className?: string;
  exportRef?: React.RefObject<HTMLDivElement>;
}

const RACI_COLORS: Record<RaciKey, string> = {
  R: 'bg-green-100 text-green-800',
  A: 'bg-amber-100 text-amber-800',
  C: 'bg-blue-100 text-blue-800',
  I: 'bg-gray-100 text-gray-800',
};

export const RaciCanvasPreview: React.FC<RaciCanvasPreviewProps> = ({
  title,
  roles,
  tasks,
  matrix,
  logo,
  onLogoChange: _onLogoChange,
  generatedOnLabel,
  className = '',
  exportRef,
}) => {
  if (roles.length === 0 || tasks.length === 0) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white p-8 shadow-sm ${className}`}
      >
        <div className="text-center text-gray-500">
          <Eye className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm">
            Preview will appear here once you have roles and tasks defined
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Pretty Matrix Preview */}
      <div
        ref={exportRef}
        className="overflow-visible rounded-lg border border-gray-200 bg-white shadow-lg"
        style={{ minHeight: 'fit-content' }}
      >
        {/* Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">
          <div className="flex items-center gap-4">
            {logo && (
              <img
                src={logo.dataUrl}
                alt="Logo"
                className="h-12 w-auto max-w-[150px] object-contain"
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">
                Generated on {generatedOnLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-600 text-white">
                <th className="min-w-[200px] px-6 py-4 text-left font-semibold">
                  Task
                </th>
                {roles.map((role) => (
                  <th
                    key={role.id}
                    className="min-w-[100px] px-4 py-4 text-center font-semibold"
                  >
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  } border-b border-gray-100`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {task.name}
                  </td>
                  {roles.map((role) => {
                    const cellValue = matrix[task.id]?.[role.name];
                    const activeKey = cellValue
                      ? getActiveRaciKey(cellValue)
                      : null;

                    return (
                      <td key={role.id} className="px-4 py-4 text-center">
                        {activeKey && (
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-sm ${RACI_COLORS[activeKey]} `}
                          >
                            {activeKey}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">RACI Legend</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800">
                  R
                </span>
                <span className="text-xs text-gray-600">Responsible</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
                  A
                </span>
                <span className="text-xs text-gray-600">Accountable</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
                  C
                </span>
                <span className="text-xs text-gray-600">Consulted</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-800">
                  I
                </span>
                <span className="text-xs text-gray-600">Informed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
