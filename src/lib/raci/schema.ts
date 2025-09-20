/**
 * Zod schemas for RACI data validation
 */

import { z } from 'zod';

import type { RaciState, ValidationError } from '../../types/raci';

export const RaciKeySchema = z.enum(['R', 'A', 'C', 'I']);

export const RaciValueSchema = z
  .object({
    R: z.boolean(),
    A: z.boolean(),
    C: z.boolean(),
    I: z.boolean(),
  })
  .refine(
    (data) => {
      // Exactly one of R/A/C/I must be true
      const trueCount = Object.values(data).filter(Boolean).length;
      return trueCount <= 1; // Allow 0 or 1 true values
    },
    {
      message: 'Only one RACI value can be selected per cell',
    }
  );

export const RoleSchema = z.object({
  id: z.string().min(1, 'Role ID is required'),
  name: z
    .string()
    .min(1, 'Role name is required')
    .max(100, 'Role name must be less than 100 characters')
    .trim(),
});

export const TaskSchema = z.object({
  id: z.string().min(1, 'Task ID is required'),
  name: z
    .string()
    .min(1, 'Task name is required')
    .max(200, 'Task name must be less than 200 characters')
    .trim(),
});

export const LogoDataSchema = z.object({
  dataUrl: z.string().startsWith('data:'),
  fileName: z.string().min(1),
  mimeType: z.enum(['image/png', 'image/svg+xml', 'image/webp', 'image/jpeg']),
});

export const MatrixSchema = z.record(
  z.string(), // task ID
  z.record(
    z.string(), // role name
    RaciValueSchema
  )
);

export const RaciStateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters'),
  roles: z.array(RoleSchema),
  tasks: z.array(TaskSchema),
  matrix: MatrixSchema,
  logo: LogoDataSchema.optional(),
});

/**
 * Validates the complete RACI state and returns validation errors
 */
export function validateRaciState(state: RaciState): ValidationError[] {
  const errors: ValidationError[] = [];

  try {
    RaciStateSchema.parse(state);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to our validation error format
      error.errors.forEach((err) => {
        errors.push({
          type: 'duplicate_role', // Generic type for now
          message: err.message,
        });
      });
    }
  }

  // Check for duplicate role names (case-insensitive)
  const roleNames = state.roles.map((r) => r.name.toLowerCase());
  const duplicateRoles = roleNames.filter(
    (name, index) => roleNames.indexOf(name) !== index
  );
  duplicateRoles.forEach((name) => {
    const originalRole = state.roles.find((r) => r.name.toLowerCase() === name);
    if (originalRole) {
      errors.push({
        type: 'duplicate_role',
        message: `Duplicate role name: ${originalRole.name}`,
        roleName: originalRole.name,
      });
    }
  });

  // Check for duplicate task names (case-insensitive)
  const taskNames = state.tasks.map((t) => t.name.toLowerCase());
  const duplicateTasks = taskNames.filter(
    (name, index) => taskNames.indexOf(name) !== index
  );
  duplicateTasks.forEach((name) => {
    const originalTask = state.tasks.find((t) => t.name.toLowerCase() === name);
    if (originalTask) {
      errors.push({
        type: 'duplicate_task',
        message: `Duplicate task name: ${originalTask.name}`,
        taskId: originalTask.id,
      });
    }
  });

  // Check that each task has at least one Accountable (A)
  state.tasks.forEach((task) => {
    const taskMatrix = state.matrix[task.id];
    if (!taskMatrix) return;

    const hasAccountable = Object.values(taskMatrix).some(
      (raciValue) => raciValue.A
    );
    if (!hasAccountable) {
      errors.push({
        type: 'missing_accountable',
        message: `Task "${task.name}" must have at least one Accountable (A)`,
        taskId: task.id,
      });
    }
  });

  // Check for multiple selections in cells
  state.tasks.forEach((task) => {
    const taskMatrix = state.matrix[task.id];
    if (!taskMatrix) return;

    state.roles.forEach((role) => {
      const cellValue = taskMatrix[role.name];
      if (!cellValue) return;

      const selectedCount = Object.values(cellValue).filter(Boolean).length;
      if (selectedCount > 1) {
        errors.push({
          type: 'multiple_selections',
          message: `Task "${task.name}" and Role "${role.name}" has multiple RACI selections`,
          taskId: task.id,
          roleName: role.name,
        });
      }
    });
  });

  return errors;
}

/**
 * Validates if a logo file is acceptable
 */
export function validateLogoFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'image/png',
    'image/svg+xml',
    'image/webp',
    'image/jpeg',
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'Logo file must be less than 5MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Logo must be PNG, SVG, WEBP, or JPEG format',
    };
  }

  return { valid: true };
}
