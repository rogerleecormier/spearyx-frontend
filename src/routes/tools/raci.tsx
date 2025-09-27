import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Eye, Link, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { NotAuthorized } from '@/components/auth/NotAuthorized';
import { useSession } from '@/hooks/useSession';

// Components
import { generateProjectTitle } from '../../ai/adapter';
import {
  assignRaciFromDescription,
  type InferenceOptions,
} from '../../ai/assignRaciFromDescription';
import { Layout } from '../../components/layout';
import { DescriptionPanel } from '../../components/raci/DescriptionPanel';
import { ExportCenter } from '../../components/raci/ExportCenter';
import { HeroCard } from '../../components/raci/HeroCard';
import { LogoUploader } from '../../components/raci/LogoUploader';
import { RaciCanvasPreview } from '../../components/raci/RaciCanvasPreview';
import { RaciLearnModal } from '../../components/raci/RaciLearnModal';
import { RaciMatrixEditor } from '../../components/raci/RaciMatrixEditor';
import { RolesEditor } from '../../components/raci/RolesEditor';
import { TasksEditor } from '../../components/raci/TasksEditor';
// Types and utilities
import { DEMO_STATES } from '../../lib/raci/demo-data';
import {
  addRoleToMatrix,
  addTaskToMatrix,
  migrateMatrix,
  removeRoleFromMatrix,
  removeTaskFromMatrix,
  renameRoleInMatrix,
} from '../../lib/raci/matrix';
import { RaciStateSchema, validateRaciState } from '../../lib/raci/schema';
import {
  clearSharedStateFromUrl,
  parseSharedState,
} from '../../lib/sharing/shareLink';
import type {
  LogoData,
  RaciState,
  Role,
  Task,
  ValidationError,
} from '../../types/raci';

// Generate unique IDs
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default state
const createDefaultState = (): RaciState => ({
  title: 'RACI Matrix',
  description: '',
  roles: [],
  tasks: [],
  matrix: {},
  logo: undefined,
});

const formatGeneratedOn = (iso: string) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

// Demo data for quick start - using imported demo descriptions

export const Route = createFileRoute('/tools/raci')({
  loader: ({ location }) => {
    const sharedState = parseSharedState(location.searchStr);

    return {
      initialState: sharedState ?? createDefaultState(),
      hasSharedState: Boolean(sharedState),
      generatedOn: new Date().toISOString(),
    };
  },
  component: RaciGeneratorPage,
});

function RaciGeneratorPage() {
  const loaderData = Route.useLoaderData();
  const { isAuthenticated, isPending, isFetching } = useSession();
  const isCheckingAccess = isPending || isFetching;

  const { initialState, hasSharedState, generatedOn } = loaderData;

  const [state, setState] = useState<RaciState>(initialState);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const matrixCanvasRef = useRef<HTMLDivElement>(null);
  const matrixExportRef = useRef<HTMLDivElement>(null);
  const [generatedOnIso, setGeneratedOnIso] = useState(generatedOn);
  const [userSetTitle, setUserSetTitle] = useState(false);

  const formattedGeneratedOn = useMemo(
    () => formatGeneratedOn(generatedOnIso),
    [generatedOnIso]
  );

  // Form for validation
  const _form = useForm<RaciState>({
    resolver: zodResolver(RaciStateSchema),
    defaultValues: initialState,
    mode: 'onChange',
  });

  // Update validation errors when state changes
  useEffect(() => {
    const errors = validateRaciState(state);
    setValidationErrors(errors);
  }, [state]);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  useEffect(() => {
    setGeneratedOnIso(generatedOn);
  }, [generatedOn]);

  useEffect(() => {
    if (hasSharedState) {
      clearSharedStateFromUrl();
    }
  }, [hasSharedState]);

  // Handlers
  const handleTitleChange = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
    setUserSetTitle(title.trim() !== '' && title !== 'RACI Matrix');
  }, []);

  const handleLogoChange = useCallback((logo: LogoData | undefined) => {
    setState((prev) => ({ ...prev, logo }));
  }, []);

  const handleDescriptionChange = useCallback((description: string) => {
    setState((prev) => ({ ...prev, description }));
  }, []);

  const handleAddRole = useCallback((name: string) => {
    const newRole: Role = { id: generateId(), name };
    setState((prev) => {
      const newRoles = [...prev.roles, newRole];
      const newMatrix = addRoleToMatrix(
        prev.matrix,
        name,
        prev.tasks.map((t) => t.id)
      );
      return { ...prev, roles: newRoles, matrix: newMatrix };
    });
  }, []);

  const handleUpdateRole = useCallback((id: string, newName: string) => {
    setState((prev) => {
      const role = prev.roles.find((r) => r.id === id);
      if (!role) return prev;

      const updatedRoles = prev.roles.map((r) =>
        r.id === id ? { ...r, name: newName } : r
      );
      const newMatrix = renameRoleInMatrix(prev.matrix, role.name, newName);

      return { ...prev, roles: updatedRoles, matrix: newMatrix };
    });
  }, []);

  const handleDeleteRole = useCallback((id: string) => {
    setState((prev) => {
      const role = prev.roles.find((r) => r.id === id);
      if (!role) return prev;

      const newRoles = prev.roles.filter((r) => r.id !== id);
      const newMatrix = removeRoleFromMatrix(prev.matrix, role.name);

      return { ...prev, roles: newRoles, matrix: newMatrix };
    });
  }, []);

  const handleAddTask = useCallback((name: string) => {
    const newTask: Task = { id: generateId(), name };
    setState((prev) => {
      const newTasks = [...prev.tasks, newTask];
      const newMatrix = addTaskToMatrix(
        prev.matrix,
        newTask.id,
        prev.roles.map((r) => r.name)
      );
      return { ...prev, tasks: newTasks, matrix: newMatrix };
    });
  }, []);

  const handleUpdateTask = useCallback((id: string, newName: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, name: newName } : t)),
    }));
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setState((prev) => {
      const newTasks = prev.tasks.filter((t) => t.id !== id);
      const newMatrix = removeTaskFromMatrix(prev.matrix, id);
      return { ...prev, tasks: newTasks, matrix: newMatrix };
    });
  }, []);

  const handleMatrixChange = useCallback(
    (matrix: typeof state.matrix) => {
      setState((prev) => ({ ...prev, matrix }));
    },
    [state]
  );

  const handleGenerateRaci = useCallback(
    async (description: string, answers?: Record<string, string>) => {
      if (!description.trim()) return;

      setIsGenerating(true);
      setFollowUpQuestions([]);

      try {
        const options: InferenceOptions = {
          description,
          previousAnswers: answers,
          keepExistingData: state.roles.length > 0 || state.tasks.length > 0,
          existingRoles: state.roles,
          existingTasks: state.tasks,
          existingMatrix: state.matrix,
        };

        const result = await assignRaciFromDescription(options);

        // Generate AI title if user hasn't set one and title is still default
        let aiGeneratedTitle: string | null = null;
        if (!userSetTitle && state.title === 'RACI Matrix') {
          try {
            // Use AI to generate a better title based on the description
            aiGeneratedTitle = await generateProjectTitle(description);
          } catch (error) {
            console.error(
              'Failed to generate AI title, using fallback:',
              error
            );
            // Fallback to the original method
            const words = description.split(' ').slice(0, 6).join(' ');
            aiGeneratedTitle = `${words} RACI Matrix`;
          }
        }

        // Update state with AI results
        setState((prev) => {
          const oldRoles = prev.roles;
          const oldTasks = prev.tasks;
          const newMatrix = migrateMatrix(
            prev.matrix,
            oldRoles,
            result.roles,
            oldTasks,
            result.tasks
          );

          // Merge AI-generated matrix with existing matrix
          const finalMatrix = { ...newMatrix };
          Object.entries(result.matrix).forEach(([taskId, taskMatrix]) => {
            if (!finalMatrix[taskId]) finalMatrix[taskId] = {};
            Object.entries(taskMatrix).forEach(([roleName, raciValue]) => {
              // Only overwrite if cell is empty or if it's a new role/task combination
              if (
                !finalMatrix[taskId][roleName] ||
                !Object.values(finalMatrix[taskId][roleName]).some(Boolean)
              ) {
                finalMatrix[taskId][roleName] = raciValue;
              }
            });
          });

          return {
            ...prev,
            title: aiGeneratedTitle || prev.title,
            roles: result.roles,
            tasks: result.tasks,
            matrix: finalMatrix,
          };
        });

        // Set follow-up questions if any
        if (result.followUpQuestions && result.followUpQuestions.length > 0) {
          setFollowUpQuestions(result.followUpQuestions);
        }
        setGeneratedOnIso(new Date().toISOString());
      } catch (error) {
        console.error('Failed to generate RACI:', error);
        // You could add a toast notification here
      } finally {
        setIsGenerating(false);
      }
    },
    [state.roles, state.tasks, state.matrix, state.title, userSetTitle]
  );

  // Quick start with demo data
  const handleLoadDemo = useCallback(
    (demoType: keyof typeof DEMO_STATES = 'mobileApp') => {
      const demoState = DEMO_STATES[demoType]();
      setState(demoState);
      setGeneratedOnIso(new Date().toISOString());
    },
    []
  );

  // Handle state import from sharing
  const handleStateImport = useCallback((importedState: RaciState) => {
    setState(importedState);
    // Clear any existing validation errors
    setValidationErrors([]);
    setGeneratedOnIso(new Date().toISOString());
  }, []);

  // Handle learn about RACI modal
  const handleLearnAboutRaci = useCallback(() => {
    setIsLearnModalOpen(true);
  }, []);

  // Memoized validation errors for components
  const matrixValidationErrors = useMemo(() => {
    return validationErrors.map((error) => ({
      taskId: error.taskId,
      roleName: error.roleName,
      message: error.message,
    }));
  }, [validationErrors]);

  const exportValidationErrors = useMemo(() => {
    return validationErrors.map((error) => ({ message: error.message }));
  }, [validationErrors]);

  return (
    <Layout>
      {isCheckingAccess ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Validating Access...
          </div>
        </div>
      ) : !isAuthenticated ? (
        <>
          <NotAuthorized loginPath="/app" />
        </>
      ) : (
        <div>
          {/* Hero Card */}
          <div className="border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <HeroCard onLearnAboutRaci={handleLearnAboutRaci} />
            </div>
          </div>

          {/* Import from Share Link */}
          {hasSharedState && (
            <div className="border-b border-gray-200 bg-green-50">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      try {
                        const sharedState = parseSharedState(
                          window.location.search
                        );
                        if (sharedState) {
                          handleStateImport(sharedState);
                        }
                      } catch (error) {
                        console.error('Import failed:', error);
                      }
                    }}
                    className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Link className="h-4 w-4" />
                    Import RACI Matrix from URL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Demo Content Selector */}
              {state.roles.length === 0 &&
                state.tasks.length === 0 &&
                !state.description && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-blue-900">
                          Quick Start
                        </h3>
                        <p className="mt-1 text-sm text-blue-700">
                          Try one of our demo projects to see how the RACI
                          generator works
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <button
                          onClick={() => handleLoadDemo('mobileApp')}
                          className="rounded-md bg-blue-100 p-3 text-left text-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <div className="font-medium text-blue-900">
                            Mobile App
                          </div>
                          <div className="mt-1 text-xs text-blue-700">
                            E-commerce development team
                          </div>
                        </button>
                        <button
                          onClick={() => handleLoadDemo('webRedesign')}
                          className="rounded-md bg-blue-100 p-3 text-left text-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <div className="font-medium text-blue-900">
                            Web Redesign
                          </div>
                          <div className="mt-1 text-xs text-blue-700">
                            Marketing & design project
                          </div>
                        </button>
                        <button
                          onClick={() => handleLoadDemo('softwareMigration')}
                          className="rounded-md bg-blue-100 p-3 text-left text-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <div className="font-medium text-blue-900">
                            CRM Migration
                          </div>
                          <div className="mt-1 text-xs text-blue-700">
                            Legacy system upgrade
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              {/* Chart Title */}
              <div>
                <label
                  htmlFor="chart-title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Matrix Title
                </label>
                <input
                  id="chart-title"
                  type="text"
                  value={state.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-xl font-semibold text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter matrix title"
                />
              </div>

              {/* Description Panel */}
              <DescriptionPanel
                description={state.description}
                onDescriptionChange={handleDescriptionChange}
                onGenerateRaci={handleGenerateRaci}
                followUpQuestions={followUpQuestions}
                isGenerating={isGenerating}
              />

              {/* Editors Grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <RolesEditor
                  roles={state.roles}
                  onAddRole={handleAddRole}
                  onUpdateRole={handleUpdateRole}
                  onDeleteRole={handleDeleteRole}
                />

                <TasksEditor
                  tasks={state.tasks}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>

              {/* Matrix Editor */}
              <RaciMatrixEditor
                roles={state.roles}
                tasks={state.tasks}
                matrix={state.matrix}
                onMatrixChange={handleMatrixChange}
                validationErrors={matrixValidationErrors}
              />

              {/* Validation Summary */}
              {validationErrors.length > 0 && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">
                        Validation Issues ({validationErrors.length})
                      </h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <ul className="list-inside list-disc space-y-1">
                          {validationErrors.slice(0, 5).map((error, index) => (
                            <li key={index}>{error.message}</li>
                          ))}
                          {validationErrors.length > 5 && (
                            <li>
                              ... and {validationErrors.length - 5} more issues
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Logo Setup */}
              <LogoUploader logo={state.logo} onLogoChange={handleLogoChange} />

              {/* Generated RACI Matrix Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Generated RACI Matrix
                      </h3>
                      <p className="text-sm text-gray-600">
                        AI-generated responsibility assignments
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      Deliverable
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span>Live Preview</span>
                  </div>
                </div>

                <div
                  ref={matrixCanvasRef}
                  className="overflow-hidden rounded-lg border-2 border-blue-300 bg-white shadow-lg"
                >
                  <RaciCanvasPreview
                    title={state.title}
                    roles={state.roles}
                    tasks={state.tasks}
                    matrix={state.matrix}
                    logo={state.logo}
                    onLogoChange={handleLogoChange}
                    generatedOnLabel={formattedGeneratedOn}
                    exportRef={matrixExportRef}
                  />
                </div>
              </div>
            </div>

            {/* Export Center */}
            <ExportCenter
              state={state}
              canvasRef={matrixExportRef}
              onStateImport={handleStateImport}
              validationErrors={exportValidationErrors}
              hasSharedStateInSearch={hasSharedState}
            />
          </div>
        </div>
      )}
      {/* RACI Learn Modal */}
      <RaciLearnModal
        isOpen={isLearnModalOpen}
        onClose={() => setIsLearnModalOpen(false)}
      />
    </Layout>
  );
}
