/**
 * Tasks Editor Component - CRUD operations for tasks
 */

import { Check, CheckSquare, Edit2, Plus, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

import type { Task } from '../../types/raci';

interface TasksEditorProps {
  tasks: Task[];
  onAddTask: (name: string) => void;
  onUpdateTask: (id: string, name: string) => void;
  onDeleteTask: (id: string) => void;
  className?: string;
}

export const TasksEditor: React.FC<TasksEditorProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  className = '',
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [editTaskName, setEditTaskName] = useState('');

  // Common task templates
  const taskTemplates = [
    'Requirements Gathering',
    'System Design',
    'Development',
    'Code Review',
    'Testing',
    'Documentation',
    'Deployment',
    'User Training',
    'Go-Live Support',
  ];

  const handleAdd = () => {
    const trimmedName = newTaskName.trim();
    if (trimmedName) {
      // Check for duplicates (case-insensitive)
      const isDuplicate = tasks.some(
        (task) => task.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (!isDuplicate) {
        onAddTask(trimmedName);
        setNewTaskName('');
        setIsAdding(false);
      }
    }
  };

  const handleAddTemplate = (templateName: string) => {
    // Check for duplicates
    const isDuplicate = tasks.some(
      (task) => task.name.toLowerCase() === templateName.toLowerCase()
    );

    if (!isDuplicate) {
      onAddTask(templateName);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTaskName(task.name);
  };

  const handleSaveEdit = () => {
    const trimmedName = editTaskName.trim();
    if (trimmedName && editingId) {
      // Check for duplicates (excluding current task)
      const isDuplicate = tasks.some(
        (task) =>
          task.id !== editingId &&
          task.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (!isDuplicate) {
        onUpdateTask(editingId, trimmedName);
        setEditingId(null);
        setEditTaskName('');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTaskName('');
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this task? This will remove all associated RACI assignments.'
      )
    ) {
      onDeleteTask(id);
    }
  };

  const availableTemplates = taskTemplates.filter(
    (template) =>
      !tasks.some((task) => task.name.toLowerCase() === template.toLowerCase())
  );

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
            <span className="text-sm text-gray-500">({tasks.length})</span>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          )}
        </div>

        {/* Quick Add Templates */}
        {availableTemplates.length > 0 && tasks.length > 0 && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <p className="mb-2 text-xs font-medium text-gray-700">
              Quick Add Common Tasks:
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

        {/* Tasks List */}
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50"
            >
              {editingId === task.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <span className="w-6 text-xs text-gray-500">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={editTaskName}
                    onChange={(e) => setEditTaskName(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Task name"
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
                  <div className="flex flex-1 items-center gap-2">
                    <span className="w-6 text-xs text-gray-500">
                      {index + 1}.
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {task.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      aria-label={`Edit ${task.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      aria-label={`Delete ${task.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add Task Form */}
          {isAdding && (
            <div className="flex items-center gap-2 rounded-md border-2 border-dashed border-blue-300 bg-blue-50 p-3">
              <span className="w-6 text-xs text-gray-500">
                {tasks.length + 1}.
              </span>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name (e.g., Requirements Gathering, Development)"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAdd();
                  } else if (e.key === 'Escape') {
                    setIsAdding(false);
                    setNewTaskName('');
                  }
                }}
              />
              <button
                onClick={handleAdd}
                disabled={!newTaskName.trim()}
                className="p-1 text-green-600 hover:text-green-700 disabled:text-gray-400"
                aria-label="Add task"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewTaskName('');
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
                aria-label="Cancel adding task"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Empty State */}
          {tasks.length === 0 && !isAdding && (
            <div className="py-8 text-center text-gray-500">
              <CheckSquare className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="mb-4 text-sm">No tasks defined yet</p>

              {/* Template Suggestions for Empty State */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsAdding(true)}
                  className="mx-auto block text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Add your first task
                </button>

                <div className="text-xs text-gray-500">
                  <p className="mb-2">Or quickly add common tasks:</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {taskTemplates.slice(0, 5).map((template) => (
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
        {tasks.length > 0 && (
          <div className="rounded bg-gray-50 p-3 text-xs text-gray-500">
            <p className="mb-1 font-medium">Tips:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Break down large activities into specific, actionable tasks
              </li>
              <li>
                Use verb-noun format (e.g., "Review Requirements", "Deploy
                Application")
              </li>
              <li>
                Consider the project lifecycle and dependencies between tasks
              </li>
              <li>Each task should have a clear deliverable or outcome</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
