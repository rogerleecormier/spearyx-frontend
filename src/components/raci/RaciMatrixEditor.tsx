/**
 * RACI Matrix Editor Component - Main editable table with checkbox booleans
 */

import { AlertTriangle, Info } from 'lucide-react';
import React from 'react';
import { getActiveRaciKey, updateMatrixCell } from '../../lib/raci/matrix';
import type { Matrix, RaciKey, Role, Task } from '../../types/raci';

interface RaciMatrixEditorProps {
  roles: Role[];
  tasks: Task[];
  matrix: Matrix;
  onMatrixChange: (matrix: Matrix) => void;
  validationErrors?: Array<{ taskId?: string; roleName?: string; message: string }>;
  className?: string;
}

const RACI_COLORS: Record<RaciKey, string> = {
  R: 'bg-green-100 border-green-300 text-green-800',
  A: 'bg-amber-100 border-amber-300 text-amber-800',
  C: 'bg-blue-100 border-blue-300 text-blue-800',
  I: 'bg-gray-100 border-gray-300 text-gray-800'
};

const RACI_DESCRIPTIONS: Record<RaciKey, string> = {
  R: 'Responsible - Does the work',
  A: 'Accountable - Ultimately answerable',
  C: 'Consulted - Provides input',
  I: 'Informed - Needs to know'
};

export const RaciMatrixEditor: React.FC<RaciMatrixEditorProps> = ({
  roles,
  tasks,
  matrix,
  onMatrixChange,
  validationErrors = [],
  className = ''
}) => {
  const handleCellChange = (taskId: string, roleName: string, raciKey: RaciKey) => {
    const newMatrix = updateMatrixCell(matrix, taskId, roleName, raciKey, true);
    onMatrixChange(newMatrix);
  };

  const getCellError = (taskId: string, roleName: string) => {
    return validationErrors.find(
      error => error.taskId === taskId && error.roleName === roleName
    );
  };

  const getTaskError = (taskId: string) => {
    return validationErrors.find(
      error => error.taskId === taskId && !error.roleName
    );
  };

  if (roles.length === 0 || tasks.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-8 ${className}`}>
        <div className="text-center text-gray-500">
          <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">
            {roles.length === 0 && tasks.length === 0 
              ? 'Add roles and tasks to start building your RACI matrix'
              : roles.length === 0 
                ? 'Add roles to start building your RACI matrix'
                : 'Add tasks to start building your RACI matrix'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">RACI Matrix</h2>
          
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            {Object.entries(RACI_DESCRIPTIONS).map(([key, description]) => (
              <div key={key} className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded font-medium ${RACI_COLORS[key as RaciKey]}`}>
                  {key}
                </span>
                <span className="text-gray-600 hidden lg:inline">
                  {description.split(' - ')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 min-w-[200px]">
                Task
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
                >
                  <div className="truncate" title={role.name}>
                    {role.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task, taskIndex) => {
              const taskError = getTaskError(task.id);
              const isEvenRow = taskIndex % 2 === 0;
              
              return (
                <tr
                  key={task.id}
                  className={`${isEvenRow ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                >
                  {/* Task Name Cell */}
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 z-10 bg-inherit">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {task.name}
                        </div>
                        {taskError && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-600">
                              {taskError.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* RACI Cells */}
                  {roles.map((role) => {
                    const cellValue = matrix[task.id]?.[role.name];
                    const activeKey = cellValue ? getActiveRaciKey(cellValue) : null;
                    const cellError = getCellError(task.id, role.name);

                    return (
                      <td
                        key={role.id}
                        className="px-4 py-4 text-center"
                      >
                        <div className="flex justify-center">
                          <div className="grid grid-cols-2 gap-1">
                            {(['R', 'A', 'C', 'I'] as RaciKey[]).map((raciKey) => {
                              const isSelected = activeKey === raciKey;
                              
                              return (
                                <label
                                  key={raciKey}
                                  className={`
                                    relative flex items-center justify-center w-8 h-8 rounded cursor-pointer
                                    transition-all duration-150 border-2
                                    ${isSelected 
                                      ? RACI_COLORS[raciKey] + ' shadow-sm'
                                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }
                                    ${cellError ? 'ring-2 ring-red-300' : ''}
                                  `}
                                  title={`${RACI_DESCRIPTIONS[raciKey]} for ${task.name} - ${role.name}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleCellChange(task.id, role.name, raciKey)}
                                    className="sr-only"
                                    aria-label={`${raciKey} - ${RACI_DESCRIPTIONS[raciKey]} for ${task.name} and ${role.name}`}
                                  />
                                  <span className={`text-xs font-bold ${isSelected ? '' : 'text-gray-400'}`}>
                                    {raciKey}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        
                        {cellError && (
                          <div className="mt-1">
                            <AlertTriangle className="w-3 h-3 text-red-500 mx-auto" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with Instructions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-600 space-y-1">
          <p className="font-medium">Instructions:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Click on R, A, C, or I to assign RACI roles for each task</li>
            <li>Only one RACI value can be selected per task-role combination</li>
            <li>Each task must have exactly one Accountable (A) person</li>
            <li>Use keyboard navigation and screen readers for accessibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

