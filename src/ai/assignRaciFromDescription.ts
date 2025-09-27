/**
 * Main entry point for RACI inference from project descriptions
 */

import { createEmptyMatrix, createRaciValue } from '../lib/raci/matrix';
import type { AIInferenceResult, Matrix, Role, Task } from '../types/raci';
import { inferRaci } from './adapter';
import { TASK_CATEGORIES } from './examples';

/**
 * Generates an AI-powered title for a project based on its description
 */
export async function generateProjectTitle(description: string): Promise<string> {
  // Import the generateProjectTitle function from adapter
  const { generateProjectTitle: generateTitle } = await import('./adapter');
  return generateTitle(description);
}

/**
 * Builds an enhanced prompt with context for the AI worker
 */
function buildEnhancedPrompt(
  description: string,
  seedRoles: string[],
  previousAnswers: Record<string, string>
): string {
  let prompt = description;

  if (seedRoles.length > 0) {
    prompt += `\n\nSuggested roles to consider: ${seedRoles.join(', ')}`;
  }

  if (Object.keys(previousAnswers).length > 0) {
    prompt += '\n\nAdditional context provided:';
    Object.entries(previousAnswers).forEach(([question, answer]) => {
      prompt += `\n- ${question}: ${answer}`;
    });
  }

  return prompt;
}

export interface InferenceOptions {
  description: string;
  seedRoles?: string[];
  previousAnswers?: Record<string, string>;
  keepExistingData?: boolean;
  existingRoles?: Role[];
  existingTasks?: Task[];
  existingMatrix?: Matrix;
}

export interface InferenceResult extends AIInferenceResult {
  confidence: 'high' | 'medium' | 'low';
  suggestions: string[];
}

/**
 * Main function to assign RACI from project description
 */
export async function assignRaciFromDescription(
  options: InferenceOptions
): Promise<InferenceResult> {
  const {
    description,
    seedRoles = [],
    previousAnswers = {},
    keepExistingData = false,
    existingRoles = [],
    existingTasks = [],
    existingMatrix = {},
  } = options;

  // Pre-process the description to extract hints
  const extractedInfo = extractProjectInfo(description);

  // Combine seed roles with extracted roles
  const allSeedRoles = [...new Set([...seedRoles, ...extractedInfo.roles])];

  try {
    // Call AI inference with enhanced prompt
    const enhancedPrompt = buildEnhancedPrompt(
      description,
      allSeedRoles,
      previousAnswers
    );
    const aiResult = await inferRaci(
      enhancedPrompt,
      allSeedRoles,
      previousAnswers
    );

    // Post-process and enhance the result
    let finalResult: InferenceResult;

    if (keepExistingData && existingRoles.length > 0) {
      // Merge with existing data
      finalResult = mergeWithExistingData(aiResult, {
        roles: existingRoles,
        tasks: existingTasks,
        matrix: existingMatrix,
      });
    } else {
      // Use AI result as-is, but enhance it
      finalResult = enhanceAIResult(aiResult, extractedInfo);
    }

    // Add confidence scoring and suggestions
    finalResult.confidence = calculateConfidence(finalResult, description);
    finalResult.suggestions = generateSuggestions(finalResult, extractedInfo);

    return finalResult;
  } catch (error) {
    console.error('RACI inference failed:', error);

    // Fallback to rule-based inference
    return fallbackInference(description, extractedInfo, allSeedRoles);
  }
}

/**
 * Extracts project information from description using pattern matching
 */
function extractProjectInfo(description: string): {
  roles: string[];
  taskCategories: string[];
  projectType: string;
  complexity: 'simple' | 'medium' | 'complex';
} {
  const text = description.toLowerCase();
  const roles: string[] = [];
  const taskCategories: string[] = [];

  // Extract roles from common patterns
  const rolePatterns = [
    /project manager|pm\b/g,
    /product owner|po\b|product manager/g,
    /developer|dev\b|engineer|programmer/g,
    /qa|quality assurance|tester/g,
    /designer|ux|ui/g,
    /architect|technical lead|tech lead/g,
    /business analyst|ba\b/g,
    /scrum master|sm\b/g,
    /stakeholder|sponsor|executive/g,
    /marketing|sales/g,
    /devops|infrastructure/g,
  ];

  const roleNames = [
    'Project Manager',
    'Product Owner',
    'Developer',
    'QA Engineer',
    'Designer',
    'Technical Architect',
    'Business Analyst',
    'Scrum Master',
    'Stakeholder',
    'Marketing Manager',
    'DevOps Engineer',
  ];

  rolePatterns.forEach((pattern, index) => {
    if (pattern.test(text)) {
      roles.push(roleNames[index]);
    }
  });

  // Extract task categories
  Object.keys(TASK_CATEGORIES).forEach((category) => {
    if (text.includes(category) || text.includes(category.replace('_', ' '))) {
      taskCategories.push(category);
    }
  });

  // Determine project type
  let projectType = 'general';
  if (text.includes('mobile') || text.includes('app')) projectType = 'mobile';
  else if (text.includes('web') || text.includes('website'))
    projectType = 'web';
  else if (text.includes('software') || text.includes('system'))
    projectType = 'software';

  // Determine complexity
  let complexity: 'simple' | 'medium' | 'complex' = 'medium';
  if (description.length < 100 || roles.length < 3) complexity = 'simple';
  else if (description.length > 500 || roles.length > 6) complexity = 'complex';

  return { roles, taskCategories, projectType, complexity };
}

/**
 * Merges AI result with existing data
 */
function mergeWithExistingData(
  aiResult: AIInferenceResult,
  existing: { roles: Role[]; tasks: Task[]; matrix: Matrix }
): InferenceResult {
  // Merge roles (keep existing, add new ones)
  const existingRoleNames = new Set(
    existing.roles.map((r) => r.name.toLowerCase())
  );
  const newRoles = aiResult.roles.filter(
    (r) => !existingRoleNames.has(r.name.toLowerCase())
  );
  const mergedRoles = [...existing.roles, ...newRoles];

  // Merge tasks (keep existing, add new ones)
  const existingTaskNames = new Set(
    existing.tasks.map((t) => t.name.toLowerCase())
  );
  const newTasks = aiResult.tasks.filter(
    (t) => !existingTaskNames.has(t.name.toLowerCase())
  );
  const mergedTasks = [...existing.tasks, ...newTasks];

  // Merge matrix (keep existing assignments, add new ones)
  const mergedMatrix = { ...existing.matrix };

  // Add new matrix entries for new combinations
  mergedTasks.forEach((task) => {
    if (!mergedMatrix[task.id]) {
      mergedMatrix[task.id] = {};
    }

    mergedRoles.forEach((role) => {
      if (!mergedMatrix[task.id][role.name]) {
        // Check if AI has a suggestion for this combination
        const aiSuggestion = aiResult.matrix[task.id]?.[role.name];
        mergedMatrix[task.id][role.name] = aiSuggestion || {
          R: false,
          A: false,
          C: false,
          I: false,
        };
      }
    });
  });

  return {
    roles: mergedRoles,
    tasks: mergedTasks,
    matrix: mergedMatrix,
    followUpQuestions: aiResult.followUpQuestions || [],
    confidence: 'medium',
    suggestions: [],
  };
}

/**
 * Enhances AI result with additional logic
 */
function enhanceAIResult(
  aiResult: AIInferenceResult,
  _extractedInfo: unknown
): InferenceResult {
  // Validate and fix matrix issues
  const enhancedMatrix = validateAndFixMatrix(
    aiResult.matrix,
    aiResult.roles,
    aiResult.tasks
  );

  return {
    ...aiResult,
    matrix: enhancedMatrix,
    confidence: 'high',
    suggestions: [],
  };
}

/**
 * Validates matrix and fixes common issues
 */
function validateAndFixMatrix(
  matrix: Matrix,
  roles: Role[],
  tasks: Task[]
): Matrix {
  const fixedMatrix = { ...matrix };

  tasks.forEach((task) => {
    const taskMatrix = fixedMatrix[task.id] || {};
    let hasAccountable = false;

    // Check if task has an accountable
    roles.forEach((role) => {
      const cell = taskMatrix[role.name];
      if (cell?.A) {
        hasAccountable = true;
      }
    });

    // If no accountable, assign to first role that has any assignment
    if (!hasAccountable) {
      for (const role of roles) {
        const cell = taskMatrix[role.name];
        if (cell && (cell.R || cell.C || cell.I)) {
          taskMatrix[role.name] = {
            ...cell,
            A: true,
            R: false,
            C: false,
            I: false,
          };
          break;
        }
      }

      // If still no accountable, assign to first role
      if (!hasAccountable && roles.length > 0) {
        const firstRole = roles[0];
        taskMatrix[firstRole.name] = createRaciValue('A');
      }
    }

    fixedMatrix[task.id] = taskMatrix;
  });

  return fixedMatrix;
}

/**
 * Fallback rule-based inference when AI fails
 */
function fallbackInference(
  description: string,
  _extractedInfo: unknown,
  seedRoles: string[]
): InferenceResult {
  // Create basic roles if none provided
  let roles: Role[] = [];
  if (seedRoles.length > 0) {
    roles = seedRoles.map((name, index) => ({ id: `role-${index}`, name }));
  } else if (
    (_extractedInfo as { roles?: string[] }).roles &&
    (_extractedInfo as { roles: string[] }).roles.length > 0
  ) {
    roles = (_extractedInfo as { roles: string[] }).roles.map(
      (name: string, index: number) => ({ id: `role-${index}`, name })
    );
  } else {
    // Default roles
    roles = [
      { id: 'pm', name: 'Project Manager' },
      { id: 'dev', name: 'Developer' },
      { id: 'qa', name: 'QA Engineer' },
    ];
  }

  // Create basic tasks based on project type
  const tasks: Task[] = [
    { id: 'planning', name: 'Project Planning' },
    { id: 'design', name: 'Design & Architecture' },
    { id: 'development', name: 'Development' },
    { id: 'testing', name: 'Testing' },
    { id: 'deployment', name: 'Deployment' },
  ];

  // Create basic matrix with sensible defaults
  const matrix = createEmptyMatrix(roles, tasks);

  // Apply basic RACI patterns
  tasks.forEach((task) => {
    roles.forEach((role, roleIndex) => {
      const roleName = role.name.toLowerCase();
      const taskName = task.name.toLowerCase();

      // Simple heuristics
      if (roleName.includes('project manager') || roleName.includes('pm')) {
        if (taskName.includes('planning') || taskName.includes('deployment')) {
          matrix[task.id][role.name] = createRaciValue('A');
        } else {
          matrix[task.id][role.name] = createRaciValue('I');
        }
      } else if (roleName.includes('developer') || roleName.includes('dev')) {
        if (taskName.includes('development') || taskName.includes('design')) {
          matrix[task.id][role.name] = createRaciValue(
            taskName.includes('development') ? 'R' : 'C'
          );
        } else {
          matrix[task.id][role.name] = createRaciValue('I');
        }
      } else if (roleName.includes('qa') || roleName.includes('test')) {
        if (taskName.includes('testing')) {
          matrix[task.id][role.name] = createRaciValue('R');
        } else {
          matrix[task.id][role.name] = createRaciValue('I');
        }
      } else {
        // Default: first role is accountable if no one else is
        if (roleIndex === 0) {
          matrix[task.id][role.name] = createRaciValue('A');
        } else {
          matrix[task.id][role.name] = createRaciValue('I');
        }
      }
    });
  });

  return {
    roles,
    tasks,
    matrix,
    followUpQuestions: [
      'What are the main roles involved in this project?',
      'What are the key deliverables or milestones?',
      'Who has decision-making authority?',
      'Are there any external stakeholders?',
    ],
    confidence: 'low',
    suggestions: [
      'Consider adding more specific roles based on your project needs',
      'Review the suggested tasks and add project-specific ones',
      'Adjust RACI assignments based on your team structure',
    ],
  };
}

/**
 * Calculates confidence score for the inference result
 */
function calculateConfidence(
  result: InferenceResult,
  description: string
): 'high' | 'medium' | 'low' {
  let score = 0;

  // More roles and tasks = higher confidence
  if (result.roles.length >= 4) score += 2;
  else if (result.roles.length >= 2) score += 1;

  if (result.tasks.length >= 5) score += 2;
  else if (result.tasks.length >= 3) score += 1;

  // Rich description = higher confidence
  if (description.length > 200) score += 2;
  else if (description.length > 100) score += 1;

  // Few follow-up questions = higher confidence
  if (!result.followUpQuestions || result.followUpQuestions.length === 0)
    score += 2;
  else if (result.followUpQuestions.length <= 2) score += 1;

  if (score >= 6) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

/**
 * Generates suggestions for improving the RACI matrix
 */
function generateSuggestions(
  result: InferenceResult,
  _extractedInfo: unknown
): string[] {
  const suggestions: string[] = [];

  if (result.roles.length < 3) {
    suggestions.push(
      'Consider adding more roles to better distribute responsibilities'
    );
  }

  if (result.tasks.length < 5) {
    suggestions.push(
      'Break down high-level tasks into more specific deliverables'
    );
  }

  // Check for tasks without accountable
  const tasksWithoutA = result.tasks.filter((task) => {
    const taskMatrix = result.matrix[task.id];
    return !Object.values(taskMatrix || {}).some((cell) => cell.A);
  });

  if (tasksWithoutA.length > 0) {
    suggestions.push('Ensure every task has exactly one Accountable person');
  }

  // Check for roles with too many accountable assignments
  result.roles.forEach((role) => {
    const accountableCount = result.tasks.filter(
      (task) => result.matrix[task.id]?.[role.name]?.A
    ).length;

    if (accountableCount > result.tasks.length * 0.6) {
      suggestions.push(
        `${role.name} may be overloaded with too many accountable tasks`
      );
    }
  });

  return suggestions;
}
