/**
 * Core RACI types and interfaces
 */

export type RaciKey = 'R' | 'A' | 'C' | 'I';

export interface RaciValue {
  R: boolean;
  A: boolean;
  C: boolean;
  I: boolean;
}

export interface Role {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
}

export type Matrix = Record<Task['id'], Record<Role['name'], RaciValue>>;

export interface RaciState {
  title: string;
  description: string;
  roles: Role[];
  tasks: Task[];
  matrix: Matrix;
  logo?: LogoData;
}

export interface LogoData {
  dataUrl: string;
  fileName: string;
  mimeType: string;
}

export interface AIInferenceResult {
  roles: Role[];
  tasks: Task[];
  matrix: Matrix;
  followUpQuestions?: string[];
}

export interface ValidationError {
  type: 'missing_accountable' | 'multiple_selections' | 'duplicate_role' | 'duplicate_task';
  message: string;
  taskId?: string;
  roleName?: string;
}

export interface ExportOptions {
  includeDate?: boolean;
  filename?: string;
}

// Mermaid diagram types
export interface MermaidConfig {
  enabled: boolean;
  direction: 'TD' | 'LR';
}

