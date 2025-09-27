/**
 * Demo data for RACI Generator - helps users understand the tool quickly
 */

import type { RaciState } from '../../types/raci';
import { createEmptyMatrix, createRaciValue } from './matrix';

export const DEMO_DESCRIPTIONS = {
  mobileApp: `We are developing a mobile e-commerce application with a cross-functional team. The project involves a project manager overseeing the work, a product owner defining requirements, 3 senior developers building features, 2 QA engineers ensuring quality, and a UI/UX designer creating the user experience. 

Key phases include requirements gathering, system design, frontend and backend development, comprehensive testing, and production deployment. The product owner will make decisions about feature scope and priorities, while the project manager coordinates timelines and resources.`,

  webRedesign: `Our marketing team is leading a website redesign project to improve user engagement and conversion rates. The team includes a marketing manager as project lead, a web developer for implementation, an external design agency for creative work, and a content writer for copy updates.

The project phases are: design strategy definition, wireframe creation, content development, frontend implementation, and website launch. The marketing manager has final approval authority, while the design agency leads the creative process.`,

  softwareMigration: `We're migrating our legacy CRM system to a modern cloud-based solution. The technical team includes a solutions architect defining the target architecture, senior developers handling data migration, DevOps engineers managing infrastructure, and QA specialists ensuring data integrity.

Key activities include system analysis, architecture design, data migration planning, development of migration scripts, testing and validation, and production cutover. The solutions architect has technical decision-making authority.`,
};

export const createDemoState = (
  type: keyof typeof DEMO_DESCRIPTIONS = 'mobileApp'
): RaciState => {
  const baseState: RaciState = {
    title: 'RACI Matrix - Demo Project',
    description: DEMO_DESCRIPTIONS[type],
    roles: [],
    tasks: [],
    matrix: {},
    logo: undefined,
  };

  switch (type) {
    case 'mobileApp':
      return createMobileAppDemo(baseState);
    case 'webRedesign':
      return createWebRedesignDemo(baseState);
    case 'softwareMigration':
      return createSoftwareMigrationDemo(baseState);
    default:
      return baseState;
  }
};

function createMobileAppDemo(baseState: RaciState): RaciState {
  const roles = [
    { id: 'mobile-pm', name: 'Project Manager' },
    { id: 'mobile-po', name: 'Product Owner' },
    { id: 'mobile-dev', name: 'Senior Developer' },
    { id: 'mobile-qa', name: 'QA Engineer' },
    { id: 'mobile-designer', name: 'UI/UX Designer' },
  ];

  const tasks = [
    { id: 'mobile-requirements', name: 'Requirements Gathering' },
    { id: 'mobile-design', name: 'UI/UX Design' },
    { id: 'mobile-architecture', name: 'System Architecture' },
    { id: 'mobile-development', name: 'Feature Development' },
    { id: 'mobile-testing', name: 'Quality Assurance' },
    { id: 'mobile-deployment', name: 'Production Deployment' },
  ];

  const matrix = createEmptyMatrix(roles, tasks);

  // Requirements Gathering
  matrix['mobile-requirements']['Project Manager'] = createRaciValue('A');
  matrix['mobile-requirements']['Product Owner'] = createRaciValue('R');
  matrix['mobile-requirements']['Senior Developer'] = createRaciValue('C');
  matrix['mobile-requirements']['QA Engineer'] = createRaciValue('C');
  matrix['mobile-requirements']['UI/UX Designer'] = createRaciValue('C');

  // UI/UX Design
  matrix['mobile-design']['Project Manager'] = createRaciValue('I');
  matrix['mobile-design']['Product Owner'] = createRaciValue('A');
  matrix['mobile-design']['Senior Developer'] = createRaciValue('C');
  matrix['mobile-design']['QA Engineer'] = createRaciValue('I');
  matrix['mobile-design']['UI/UX Designer'] = createRaciValue('R');

  // System Architecture
  matrix['mobile-architecture']['Project Manager'] = createRaciValue('I');
  matrix['mobile-architecture']['Product Owner'] = createRaciValue('C');
  matrix['mobile-architecture']['Senior Developer'] = createRaciValue('A');
  matrix['mobile-architecture']['QA Engineer'] = createRaciValue('C');
  matrix['mobile-architecture']['UI/UX Designer'] = createRaciValue('I');

  // Feature Development
  matrix['mobile-development']['Project Manager'] = createRaciValue('I');
  matrix['mobile-development']['Product Owner'] = createRaciValue('C');
  matrix['mobile-development']['Senior Developer'] = createRaciValue('A');
  matrix['mobile-development']['QA Engineer'] = createRaciValue('I');
  matrix['mobile-development']['UI/UX Designer'] = createRaciValue('C');

  // Quality Assurance
  matrix['mobile-testing']['Project Manager'] = createRaciValue('I');
  matrix['mobile-testing']['Product Owner'] = createRaciValue('C');
  matrix['mobile-testing']['Senior Developer'] = createRaciValue('C');
  matrix['mobile-testing']['QA Engineer'] = createRaciValue('A');
  matrix['mobile-testing']['UI/UX Designer'] = createRaciValue('I');

  // Production Deployment
  matrix['mobile-deployment']['Project Manager'] = createRaciValue('A');
  matrix['mobile-deployment']['Product Owner'] = createRaciValue('I');
  matrix['mobile-deployment']['Senior Developer'] = createRaciValue('R');
  matrix['mobile-deployment']['QA Engineer'] = createRaciValue('C');
  matrix['mobile-deployment']['UI/UX Designer'] = createRaciValue('I');

  return {
    ...baseState,
    title: 'Mobile E-commerce App - RACI Matrix',
    roles,
    tasks,
    matrix,
  };
}

function createWebRedesignDemo(baseState: RaciState): RaciState {
  const roles = [
    { id: 'web-marketing', name: 'Marketing Manager' },
    { id: 'web-developer', name: 'Web Developer' },
    { id: 'web-agency', name: 'Design Agency' },
    { id: 'web-writer', name: 'Content Writer' },
  ];

  const tasks = [
    { id: 'web-strategy', name: 'Design Strategy' },
    { id: 'web-wireframes', name: 'Wireframe Creation' },
    { id: 'web-content', name: 'Content Development' },
    { id: 'web-implementation', name: 'Frontend Implementation' },
    { id: 'web-launch', name: 'Website Launch' },
  ];

  const matrix = createEmptyMatrix(roles, tasks);

  // Design Strategy
  matrix['web-strategy']['Marketing Manager'] = createRaciValue('A');
  matrix['web-strategy']['Web Developer'] = createRaciValue('C');
  matrix['web-strategy']['Design Agency'] = createRaciValue('R');
  matrix['web-strategy']['Content Writer'] = createRaciValue('C');

  // Wireframe Creation
  matrix['web-wireframes']['Marketing Manager'] = createRaciValue('C');
  matrix['web-wireframes']['Web Developer'] = createRaciValue('C');
  matrix['web-wireframes']['Design Agency'] = createRaciValue('A');
  matrix['web-wireframes']['Content Writer'] = createRaciValue('I');

  // Content Development
  matrix['web-content']['Marketing Manager'] = createRaciValue('A');
  matrix['web-content']['Web Developer'] = createRaciValue('I');
  matrix['web-content']['Design Agency'] = createRaciValue('C');
  matrix['web-content']['Content Writer'] = createRaciValue('R');

  // Frontend Implementation
  matrix['web-implementation']['Marketing Manager'] = createRaciValue('I');
  matrix['web-implementation']['Web Developer'] = createRaciValue('A');
  matrix['web-implementation']['Design Agency'] = createRaciValue('C');
  matrix['web-implementation']['Content Writer'] = createRaciValue('I');

  // Website Launch
  matrix['web-launch']['Marketing Manager'] = createRaciValue('A');
  matrix['web-launch']['Web Developer'] = createRaciValue('R');
  matrix['web-launch']['Design Agency'] = createRaciValue('I');
  matrix['web-launch']['Content Writer'] = createRaciValue('I');

  return {
    ...baseState,
    title: 'Website Redesign - RACI Matrix',
    roles,
    tasks,
    matrix,
  };
}

function createSoftwareMigrationDemo(baseState: RaciState): RaciState {
  const roles = [
    { id: 'crm-architect', name: 'Solutions Architect' },
    { id: 'crm-developer', name: 'Senior Developer' },
    { id: 'crm-devops', name: 'DevOps Engineer' },
    { id: 'crm-qa', name: 'QA Specialist' },
    { id: 'crm-pm', name: 'Project Manager' },
  ];

  const tasks = [
    { id: 'crm-analysis', name: 'System Analysis' },
    { id: 'crm-architecture', name: 'Architecture Design' },
    { id: 'crm-migration', name: 'Data Migration' },
    { id: 'crm-infrastructure', name: 'Infrastructure Setup' },
    { id: 'crm-testing', name: 'Testing & Validation' },
    { id: 'crm-cutover', name: 'Production Cutover' },
  ];

  const matrix = createEmptyMatrix(roles, tasks);

  // System Analysis
  matrix['crm-analysis']['Solutions Architect'] = createRaciValue('A');
  matrix['crm-analysis']['Senior Developer'] = createRaciValue('R');
  matrix['crm-analysis']['DevOps Engineer'] = createRaciValue('C');
  matrix['crm-analysis']['QA Specialist'] = createRaciValue('C');
  matrix['crm-analysis']['Project Manager'] = createRaciValue('I');

  // Architecture Design
  matrix['crm-architecture']['Solutions Architect'] = createRaciValue('A');
  matrix['crm-architecture']['Senior Developer'] = createRaciValue('C');
  matrix['crm-architecture']['DevOps Engineer'] = createRaciValue('C');
  matrix['crm-architecture']['QA Specialist'] = createRaciValue('I');
  matrix['crm-architecture']['Project Manager'] = createRaciValue('I');

  // Data Migration
  matrix['crm-migration']['Solutions Architect'] = createRaciValue('C');
  matrix['crm-migration']['Senior Developer'] = createRaciValue('A');
  matrix['crm-migration']['DevOps Engineer'] = createRaciValue('C');
  matrix['crm-migration']['QA Specialist'] = createRaciValue('C');
  matrix['crm-migration']['Project Manager'] = createRaciValue('I');

  // Infrastructure Setup
  matrix['crm-infrastructure']['Solutions Architect'] = createRaciValue('C');
  matrix['crm-infrastructure']['Senior Developer'] = createRaciValue('C');
  matrix['crm-infrastructure']['DevOps Engineer'] = createRaciValue('A');
  matrix['crm-infrastructure']['QA Specialist'] = createRaciValue('I');
  matrix['crm-infrastructure']['Project Manager'] = createRaciValue('I');

  // Testing & Validation
  matrix['crm-testing']['Solutions Architect'] = createRaciValue('C');
  matrix['crm-testing']['Senior Developer'] = createRaciValue('C');
  matrix['crm-testing']['DevOps Engineer'] = createRaciValue('C');
  matrix['crm-testing']['QA Specialist'] = createRaciValue('A');
  matrix['crm-testing']['Project Manager'] = createRaciValue('I');

  // Production Cutover
  matrix['crm-cutover']['Solutions Architect'] = createRaciValue('C');
  matrix['crm-cutover']['Senior Developer'] = createRaciValue('R');
  matrix['crm-cutover']['DevOps Engineer'] = createRaciValue('R');
  matrix['crm-cutover']['QA Specialist'] = createRaciValue('C');
  matrix['crm-cutover']['Project Manager'] = createRaciValue('A');

  return {
    ...baseState,
    title: 'CRM Migration - RACI Matrix',
    roles,
    tasks,
    matrix,
  };
}

export const DEMO_STATES = {
  mobileApp: () => createDemoState('mobileApp'),
  webRedesign: () => createDemoState('webRedesign'),
  softwareMigration: () => createDemoState('softwareMigration'),
} as const;
