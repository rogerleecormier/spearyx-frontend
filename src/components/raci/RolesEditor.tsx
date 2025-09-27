/**
 * Roles Editor Component - CRUD operations for roles
 */

import { Check, Edit2, Plus, Trash2, Users, X } from 'lucide-react';
import React, { useState } from 'react';

import type { Role } from '../../types/raci';

interface RolesEditorProps {
  roles: Role[];
  onAddRole: (name: string) => void;
  onUpdateRole: (id: string, name: string) => void;
  onDeleteRole: (id: string) => void;
  className?: string;
}

export const RolesEditor: React.FC<RolesEditorProps> = ({
  roles,
  onAddRole,
  onUpdateRole,
  onDeleteRole,
  className = '',
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [editRoleName, setEditRoleName] = useState('');

  // Common role templates
  const roleTemplates = [
    'Product Owner',
    'Project Manager',
    'Business Analyst',
    'Developer',
    'Senior Developer',
    'QA Engineer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Scrum Master',
    'Technical Lead',
    'Stakeholder',
    'Client',
    'Marketing Manager',
    'Sales Representative',
    'Legal Counsel',
    'Compliance Officer',
    'Security Specialist',
    'Database Administrator',
    'System Administrator',
    'Content Writer',
    'Trainer',
    'Support Specialist',
    'Operations Manager',
  ];

  const handleAdd = () => {
    const trimmedName = newRoleName.trim();
    if (trimmedName) {
      // Check for duplicates (case-insensitive)
      const isDuplicate = roles.some(
        (role) => role.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (!isDuplicate) {
        onAddRole(trimmedName);
        setNewRoleName('');
        setIsAdding(false);
      }
    }
  };

  const handleAddTemplate = (templateName: string) => {
    // Check for duplicates (case-insensitive)
    const isDuplicate = roles.some(
      (role) => role.name.toLowerCase() === templateName.toLowerCase()
    );

    if (!isDuplicate) {
      onAddRole(templateName);
    }
  };

  const availableTemplates = roleTemplates.filter(
    (template) =>
      !roles.some((role) => role.name.toLowerCase() === template.toLowerCase())
  );

  const handleEdit = (role: Role) => {
    setEditingId(role.id);
    setEditRoleName(role.name);
  };

  const handleSaveEdit = () => {
    const trimmedName = editRoleName.trim();
    if (trimmedName && editingId) {
      // Check for duplicates (excluding current role)
      const isDuplicate = roles.some(
        (role) =>
          role.id !== editingId &&
          role.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (!isDuplicate) {
        onUpdateRole(editingId, trimmedName);
        setEditingId(null);
        setEditRoleName('');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditRoleName('');
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this role? This will remove all associated RACI assignments.'
      )
    ) {
      onDeleteRole(id);
    }
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Roles</h2>
            <span className="text-sm text-gray-500">({roles.length})</span>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add Role
            </button>
          )}
        </div>

        {/* Quick Add Templates */}
        {availableTemplates.length > 0 && roles.length > 0 && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <p className="mb-2 text-xs font-medium text-gray-700">
              Quick Add Common Roles:
            </p>
            <div className="flex flex-wrap gap-1">
              {availableTemplates.slice(0, 6).map((template) => (
                <button
                  key={template}
                  onClick={() => handleAddTemplate(template)}
                  className="rounded border border-gray-300 bg-white px-2 py-1 text-xs hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  + {template}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Roles List */}
        <div className="space-y-2">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50"
            >
              {editingId === role.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={editRoleName}
                    onChange={(e) => setEditRoleName(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Role name"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit();
                      } else if (e.key === 'Escape') {
                        handleCancelEdit();
                      }
                    }}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 text-green-600 hover:text-green-700"
                    aria-label="Save changes"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Cancel editing"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm font-medium text-gray-900">
                    {role.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(role)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      aria-label={`Edit ${role.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      aria-label={`Delete ${role.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add Role Form */}
          {isAdding && (
            <div className="flex items-center gap-2 rounded-md border-2 border-dashed border-blue-300 bg-blue-50 p-3">
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role name (e.g., Project Manager, Developer)"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAdd();
                  } else if (e.key === 'Escape') {
                    setIsAdding(false);
                    setNewRoleName('');
                  }
                }}
              />
              <button
                onClick={handleAdd}
                disabled={!newRoleName.trim()}
                className="p-1 text-green-600 hover:text-green-700 disabled:text-gray-400"
                aria-label="Add role"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewRoleName('');
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
                aria-label="Cancel adding role"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Empty State */}
          {roles.length === 0 && !isAdding && (
            <div className="py-8 text-center text-gray-500">
              <Users className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="mb-4 text-sm">No roles defined yet</p>

              {/* Template Suggestions for Empty State */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsAdding(true)}
                  className="mx-auto block text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Add your first role
                </button>

                <div className="text-xs text-gray-500">
                  <p className="mb-2">Or quickly add common roles:</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {roleTemplates.slice(0, 5).map((template) => (
                      <button
                        key={template}
                        onClick={() => handleAddTemplate(template)}
                        className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs hover:border-blue-300 hover:bg-blue-50"
                      >
                        + {template}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Helper Text */}
        {roles.length > 0 && (
          <div className="rounded bg-gray-50 p-3 text-xs text-gray-500">
            <p className="mb-1 font-medium">Tips:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Use clear, specific role names (e.g., "Senior Developer" instead
                of "Dev")
              </li>
              <li>
                Consider organizational hierarchy and decision-making authority
              </li>
              <li>
                Each role should represent a distinct responsibility or
                perspective
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
