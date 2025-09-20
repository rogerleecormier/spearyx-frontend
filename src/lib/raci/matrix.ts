/**
 * Matrix manipulation utilities for RACI data
 */

import type { Matrix, RaciKey, RaciValue, Role, Task } from '../../types/raci';

/**
 * Creates an empty RACI value with all flags set to false
 */
export function createEmptyRaciValue(): RaciValue {
  return { R: false, A: false, C: false, I: false };
}

/**
 * Creates a RACI value with only the specified key set to true
 */
export function createRaciValue(key: RaciKey): RaciValue {
  const value = createEmptyRaciValue();
  value[key] = true;
  return value;
}

/**
 * Gets the active RACI key for a cell, or null if none selected
 */
export function getActiveRaciKey(value: RaciValue): RaciKey | null {
  const keys: RaciKey[] = ['R', 'A', 'C', 'I'];
  for (const key of keys) {
    if (value[key]) return key;
  }
  return null;
}

/**
 * Sets a single RACI key to true and all others to false
 */
export function setSingleRaciValue(value: RaciValue, key: RaciKey): RaciValue {
  return {
    R: key === 'R',
    A: key === 'A',
    C: key === 'C',
    I: key === 'I',
  };
}

/**
 * Toggles a RACI key - if it's already selected, deselect it; otherwise select it
 */
export function toggleRaciValue(value: RaciValue, key: RaciKey): RaciValue {
  if (value[key]) {
    // If already selected, deselect it
    return createEmptyRaciValue();
  } else {
    // Otherwise select it (and deselect others)
    return createRaciValue(key);
  }
}

/**
 * Creates an empty matrix for the given roles and tasks
 */
export function createEmptyMatrix(roles: Role[], tasks: Task[]): Matrix {
  const matrix: Matrix = {};

  tasks.forEach((task) => {
    matrix[task.id] = {};
    roles.forEach((role) => {
      matrix[task.id][role.name] = createEmptyRaciValue();
    });
  });

  return matrix;
}

/**
 * Updates a matrix cell with a new RACI value
 */
export function updateMatrixCell(
  matrix: Matrix,
  taskId: string,
  roleName: string,
  key: RaciKey,
  toggle = false
): Matrix {
  const newMatrix = { ...matrix };

  if (!newMatrix[taskId]) {
    newMatrix[taskId] = {};
  }

  if (!newMatrix[taskId][roleName]) {
    newMatrix[taskId][roleName] = createEmptyRaciValue();
  }

  const currentValue = newMatrix[taskId][roleName];
  newMatrix[taskId][roleName] = toggle
    ? toggleRaciValue(currentValue, key)
    : setSingleRaciValue(currentValue, key);

  return newMatrix;
}

/**
 * Adds a new role to the matrix
 */
export function addRoleToMatrix(
  matrix: Matrix,
  roleName: string,
  taskIds: string[]
): Matrix {
  const newMatrix = { ...matrix };

  taskIds.forEach((taskId) => {
    if (!newMatrix[taskId]) {
      newMatrix[taskId] = {};
    }
    newMatrix[taskId][roleName] = createEmptyRaciValue();
  });

  return newMatrix;
}

/**
 * Removes a role from the matrix
 */
export function removeRoleFromMatrix(matrix: Matrix, roleName: string): Matrix {
  const newMatrix = { ...matrix };

  Object.keys(newMatrix).forEach((taskId) => {
    if (newMatrix[taskId][roleName]) {
      const { [roleName]: removed, ...rest } = newMatrix[taskId];
      newMatrix[taskId] = rest;
    }
  });

  return newMatrix;
}

/**
 * Renames a role in the matrix
 */
export function renameRoleInMatrix(
  matrix: Matrix,
  oldName: string,
  newName: string
): Matrix {
  const newMatrix = { ...matrix };

  Object.keys(newMatrix).forEach((taskId) => {
    if (newMatrix[taskId][oldName]) {
      newMatrix[taskId][newName] = newMatrix[taskId][oldName];
      delete newMatrix[taskId][oldName];
    }
  });

  return newMatrix;
}

/**
 * Adds a new task to the matrix
 */
export function addTaskToMatrix(
  matrix: Matrix,
  taskId: string,
  roleNames: string[]
): Matrix {
  const newMatrix = { ...matrix };

  newMatrix[taskId] = {};
  roleNames.forEach((roleName) => {
    newMatrix[taskId][roleName] = createEmptyRaciValue();
  });

  return newMatrix;
}

/**
 * Removes a task from the matrix
 */
export function removeTaskFromMatrix(matrix: Matrix, taskId: string): Matrix {
  const newMatrix = { ...matrix };
  delete newMatrix[taskId];
  return newMatrix;
}

/**
 * Migrates matrix when roles or tasks change
 */
export function migrateMatrix(
  matrix: Matrix,
  oldRoles: Role[],
  newRoles: Role[],
  oldTasks: Task[],
  newTasks: Task[]
): Matrix {
  let newMatrix = { ...matrix };

  // Handle role changes
  const oldRoleNames = new Set(oldRoles.map((r) => r.name));
  const newRoleNames = new Set(newRoles.map((r) => r.name));

  // Remove deleted roles
  oldRoleNames.forEach((roleName) => {
    if (!newRoleNames.has(roleName)) {
      newMatrix = removeRoleFromMatrix(newMatrix, roleName);
    }
  });

  // Add new roles
  const newTaskIds = newTasks.map((t) => t.id);
  newRoleNames.forEach((roleName) => {
    if (!oldRoleNames.has(roleName)) {
      newMatrix = addRoleToMatrix(newMatrix, roleName, newTaskIds);
    }
  });

  // Handle task changes
  const oldTaskIds = new Set(oldTasks.map((t) => t.id));
  const newTaskIds2 = new Set(newTasks.map((t) => t.id));

  // Remove deleted tasks
  oldTaskIds.forEach((taskId) => {
    if (!newTaskIds2.has(taskId)) {
      newMatrix = removeTaskFromMatrix(newMatrix, taskId);
    }
  });

  // Add new tasks
  const currentRoleNames = newRoles.map((r) => r.name);
  newTaskIds2.forEach((taskId) => {
    if (!oldTaskIds.has(taskId)) {
      newMatrix = addTaskToMatrix(newMatrix, taskId, currentRoleNames);
    }
  });

  return newMatrix;
}

/**
 * Gets a summary of RACI assignments for a task
 */
export function getTaskSummary(
  matrix: Matrix,
  taskId: string
): {
  responsible: string[];
  accountable: string[];
  consulted: string[];
  informed: string[];
} {
  const taskMatrix = matrix[taskId] || {};
  const summary = {
    responsible: [] as string[],
    accountable: [] as string[],
    consulted: [] as string[],
    informed: [] as string[],
  };

  Object.entries(taskMatrix).forEach(([roleName, raciValue]) => {
    if (raciValue.R) summary.responsible.push(roleName);
    if (raciValue.A) summary.accountable.push(roleName);
    if (raciValue.C) summary.consulted.push(roleName);
    if (raciValue.I) summary.informed.push(roleName);
  });

  return summary;
}

/**
 * Gets a summary of RACI assignments for a role
 */
export function getRoleSummary(
  matrix: Matrix,
  roleName: string
): {
  responsible: string[];
  accountable: string[];
  consulted: string[];
  informed: string[];
} {
  const summary = {
    responsible: [] as string[],
    accountable: [] as string[],
    consulted: [] as string[],
    informed: [] as string[],
  };

  Object.entries(matrix).forEach(([taskId, taskMatrix]) => {
    const raciValue = taskMatrix[roleName];
    if (!raciValue) return;

    if (raciValue.R) summary.responsible.push(taskId);
    if (raciValue.A) summary.accountable.push(taskId);
    if (raciValue.C) summary.consulted.push(taskId);
    if (raciValue.I) summary.informed.push(taskId);
  });

  return summary;
}

/**
 * Counts total assignments in the matrix
 */
export function getMatrixStats(matrix: Matrix): {
  totalCells: number;
  filledCells: number;
  emptyTasks: number;
  tasksWithoutAccountable: number;
} {
  let totalCells = 0;
  let filledCells = 0;
  let emptyTasks = 0;
  let tasksWithoutAccountable = 0;

  Object.entries(matrix).forEach(([_taskId, taskMatrix]) => {
    let taskHasAssignments = false;
    let taskHasAccountable = false;

    Object.values(taskMatrix).forEach((raciValue) => {
      totalCells++;
      const hasAssignment = Object.values(raciValue).some(Boolean);
      if (hasAssignment) {
        filledCells++;
        taskHasAssignments = true;
      }
      if (raciValue.A) {
        taskHasAccountable = true;
      }
    });

    if (!taskHasAssignments) emptyTasks++;
    if (!taskHasAccountable) tasksWithoutAccountable++;
  });

  return {
    totalCells,
    filledCells,
    emptyTasks,
    tasksWithoutAccountable,
  };
}
