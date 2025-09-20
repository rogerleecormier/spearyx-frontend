/**
 * Few-shot examples for RACI inference
 */

import type { AIInferenceResult } from '../types/raci';

export const RACI_EXAMPLES = [
  {
    description: "Mobile app development project with user authentication and payment features. Team includes PM, developers, QA, and product owner.",
    result: {
      roles: [
        { id: "pm", name: "Project Manager" },
        { id: "dev", name: "Developer" },
        { id: "qa", name: "QA Engineer" },
        { id: "po", name: "Product Owner" }
      ],
      tasks: [
        { id: "requirements", name: "Define Requirements" },
        { id: "design", name: "UI/UX Design" },
        { id: "development", name: "Feature Development" },
        { id: "testing", name: "Quality Assurance Testing" },
        { id: "deployment", name: "Production Deployment" }
      ],
      matrix: {
        requirements: {
          "Project Manager": { R: false, A: true, C: false, I: false },
          "Developer": { R: false, A: false, C: true, I: false },
          "QA Engineer": { R: false, A: false, C: true, I: false },
          "Product Owner": { R: true, A: false, C: false, I: false }
        },
        design: {
          "Project Manager": { R: false, A: false, C: false, I: true },
          "Developer": { R: false, A: false, C: true, I: false },
          "QA Engineer": { R: false, A: false, C: false, I: true },
          "Product Owner": { R: false, A: true, C: false, I: false }
        },
        development: {
          "Project Manager": { R: false, A: false, C: false, I: true },
          "Developer": { R: true, A: true, C: false, I: false },
          "QA Engineer": { R: false, A: false, C: false, I: true },
          "Product Owner": { R: false, A: false, C: true, I: false }
        },
        testing: {
          "Project Manager": { R: false, A: false, C: false, I: true },
          "Developer": { R: false, A: false, C: true, I: false },
          "QA Engineer": { R: true, A: true, C: false, I: false },
          "Product Owner": { R: false, A: false, C: false, I: true }
        },
        deployment: {
          "Project Manager": { R: false, A: true, C: false, I: false },
          "Developer": { R: true, A: false, C: false, I: false },
          "QA Engineer": { R: false, A: false, C: true, I: false },
          "Product Owner": { R: false, A: false, C: false, I: true }
        }
      }
    } as AIInferenceResult
  },
  {
    description: "Website redesign project involving marketing team, web developers, and external design agency.",
    result: {
      roles: [
        { id: "marketing", name: "Marketing Manager" },
        { id: "webdev", name: "Web Developer" },
        { id: "designer", name: "Design Agency" },
        { id: "content", name: "Content Writer" }
      ],
      tasks: [
        { id: "strategy", name: "Define Design Strategy" },
        { id: "wireframes", name: "Create Wireframes" },
        { id: "content-creation", name: "Content Creation" },
        { id: "frontend-dev", name: "Frontend Development" },
        { id: "launch", name: "Website Launch" }
      ],
      matrix: {
        strategy: {
          "Marketing Manager": { R: false, A: true, C: false, I: false },
          "Web Developer": { R: false, A: false, C: true, I: false },
          "Design Agency": { R: true, A: false, C: false, I: false },
          "Content Writer": { R: false, A: false, C: true, I: false }
        },
        wireframes: {
          "Marketing Manager": { R: false, A: false, C: true, I: false },
          "Web Developer": { R: false, A: false, C: true, I: false },
          "Design Agency": { R: true, A: true, C: false, I: false },
          "Content Writer": { R: false, A: false, C: false, I: true }
        },
        "content-creation": {
          "Marketing Manager": { R: false, A: true, C: false, I: false },
          "Web Developer": { R: false, A: false, C: false, I: true },
          "Design Agency": { R: false, A: false, C: true, I: false },
          "Content Writer": { R: true, A: false, C: false, I: false }
        },
        "frontend-dev": {
          "Marketing Manager": { R: false, A: false, C: false, I: true },
          "Web Developer": { R: true, A: true, C: false, I: false },
          "Design Agency": { R: false, A: false, C: true, I: false },
          "Content Writer": { R: false, A: false, C: false, I: true }
        },
        launch: {
          "Marketing Manager": { R: false, A: true, C: false, I: false },
          "Web Developer": { R: true, A: false, C: false, I: false },
          "Design Agency": { R: false, A: false, C: false, I: true },
          "Content Writer": { R: false, A: false, C: false, I: true }
        }
      }
    } as AIInferenceResult
  }
];

export const ROLE_PATTERNS = {
  // Common role patterns and their typical RACI assignments
  'project manager': {
    planning: ['A', 'R'],
    execution: ['A', 'I'],
    governance: ['A', 'R']
  },
  'product owner': {
    requirements: ['R', 'A'],
    design: ['A', 'C'],
    development: ['C', 'I']
  },
  'developer': {
    design: ['C', 'I'],
    development: ['R', 'A'],
    testing: ['C', 'I']
  },
  'qa': {
    requirements: ['C', 'I'],
    development: ['I'],
    testing: ['R', 'A']
  },
  'architect': {
    design: ['R', 'A'],
    development: ['C', 'I'],
    planning: ['C', 'R']
  }
};

export const TASK_CATEGORIES = {
  planning: [
    'Define Requirements',
    'Project Planning',
    'Resource Allocation',
    'Timeline Creation',
    'Risk Assessment'
  ],
  design: [
    'System Architecture',
    'UI/UX Design',
    'Database Design',
    'API Design',
    'Technical Specifications'
  ],
  development: [
    'Feature Development',
    'Code Implementation',
    'Integration',
    'Code Review',
    'Documentation'
  ],
  testing: [
    'Test Planning',
    'Unit Testing',
    'Integration Testing',
    'User Acceptance Testing',
    'Performance Testing'
  ],
  deployment: [
    'Environment Setup',
    'Deployment',
    'Go-Live',
    'Monitoring',
    'Post-Launch Support'
  ]
};

export const PROBING_QUESTIONS = [
  "Who is responsible for making final decisions on this project?",
  "Which team members will be doing the hands-on work?",
  "Who needs to be consulted before major changes?",
  "Who should be kept informed of progress?",
  "Are there any external stakeholders or vendors involved?",
  "What are the main phases or milestones of this project?",
  "Who has budget authority for this project?",
  "Which roles require approval for deliverables?",
  "Are there any compliance or regulatory requirements?",
  "Who will be responsible for quality assurance?"
];

