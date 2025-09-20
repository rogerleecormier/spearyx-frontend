/**
 * Mermaid diagram generation for RACI matrices
 */

import type { LogoData, Matrix, Role, Task } from '../../types/raci';

interface RaciDiagramData {
  title: string;
  roles: Role[];
  tasks: Task[];
  matrix: Matrix;
  logo?: LogoData;
}

/**
 * Generates a Mermaid flowchart diagram representing the RACI matrix
 * Shows task-role relationships with RACI indicators
 */
export function generateMermaidDiagram(data: RaciDiagramData): string {
  const { title, roles, tasks, matrix } = data;
  
  // Start the diagram
  let diagram = 'flowchart TD\n';
  
  // Add title as a comment
  diagram += `    %% ${title}\n`;
  
  // Create role nodes
  const roleNodes = roles.map(role => {
    const nodeId = `role_${role.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
    return `    ${nodeId}["${role.name}"]`;
  });
  
  // Create task nodes
  const taskNodes = tasks.map(task => {
    const nodeId = `task_${task.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
    return `    ${nodeId}["${task.name}"]`;
  });
  
  // Add all nodes to diagram
  diagram += roleNodes.join('\n') + '\n';
  diagram += taskNodes.join('\n') + '\n';
  
  // Add relationships based on RACI matrix
  const relationships: string[] = [];
  
  tasks.forEach(task => {
    const taskId = `task_${task.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    roles.forEach(role => {
      const roleId = `role_${role.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const cellValue = matrix[task.id]?.[role.name];
      
      if (cellValue) {
        // Determine the relationship type and style
        let relationship = '';
        let style = '';
        
        if (cellValue.R) {
          relationship = `${taskId} -->|R| ${roleId}`;
          style = 'stroke:#059669,stroke-width:3px'; // green
        } else if (cellValue.A) {
          relationship = `${taskId} -->|A| ${roleId}`;
          style = 'stroke:#d97706,stroke-width:3px'; // amber
        } else if (cellValue.C) {
          relationship = `${taskId} -.->|C| ${roleId}`;
          style = 'stroke:#2563eb,stroke-width:2px'; // blue
        } else if (cellValue.I) {
          relationship = `${taskId} -.->|I| ${roleId}`;
          style = 'stroke:#6b7280,stroke-width:2px'; // gray
        }
        
        if (relationship) {
          relationships.push(`    ${relationship}`);
          // Note: linkStyle syntax may vary by Mermaid version
          // For now, we'll rely on the relationship arrows themselves
        }
      }
    });
  });
  
  // Add relationships to diagram
  if (relationships.length > 0) {
    diagram += '\n' + relationships.join('\n');
  }
  
  return diagram;
}

/**
 * Generates a simplified Mermaid diagram focusing on key relationships
 */
export function generateSimplifiedMermaidDiagram(data: RaciDiagramData): string {
  const { title, roles, tasks, matrix } = data;
  
  let diagram = 'graph LR\n';
  diagram += `    %% Simplified ${title}\n\n`;
  
  // Only show relationships where someone is Responsible or Accountable
  const keyRelationships: Array<{task: Task, role: Role, type: 'R' | 'A'}> = [];
  
  tasks.forEach(task => {
    roles.forEach(role => {
      const cellValue = matrix[task.id]?.[role.name];
      if (cellValue?.R) {
        keyRelationships.push({ task, role, type: 'R' });
      } else if (cellValue?.A) {
        keyRelationships.push({ task, role, type: 'A' });
      }
    });
  });
  
  // Create nodes and relationships
  const nodeIds = new Set<string>();
  
  keyRelationships.forEach(({ task, role, type }) => {
    const taskId = `T${task.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const roleId = `R${role.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    if (!nodeIds.has(taskId)) {
      diagram += `    ${taskId}["${task.name}"]\n`;
      nodeIds.add(taskId);
    }
    
    if (!nodeIds.has(roleId)) {
      diagram += `    ${roleId}["${role.name}"]\n`;
      nodeIds.add(roleId);
    }
    
    const arrow = type === 'R' ? '-->' : '-.->';
    const color = type === 'R' ? '#059669' : '#d97706';
    const label = type === 'R' ? 'Responsible' : 'Accountable';
    
    diagram += `    ${taskId} ${arrow}|"${label}"| ${roleId}\n`;
  });
  
  return diagram;
}

/**
 * Downloads a Mermaid diagram as an SVG file
 * Note: This function generates the Mermaid code and provides it for download
 * The actual SVG rendering would need to be done server-side or with a Mermaid library
 */
export async function downloadMermaidSvg(data: RaciDiagramData, filename: string = 'raci-diagram.svg'): Promise<void> {
  try {
    // Generate the Mermaid diagram code
    const mermaidCode = generateMermaidDiagram(data);
    
    // Create a data URL with the Mermaid code
    // In a real implementation, you'd need to render this to SVG first
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="50" y="50" font-family="Arial, sans-serif" font-size="16" fill="black">
    RACI Matrix Diagram
  </text>
  <text x="50" y="80" font-family="Arial, sans-serif" font-size="12" fill="gray">
    ${data.title}
  </text>
  <text x="50" y="120" font-family="monospace" font-size="10" fill="black">
    Mermaid Code:
  </text>
  <foreignObject x="50" y="140" width="700" height="400">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: monospace; font-size: 10px; white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-radius: 4px;">
${mermaidCode}
    </div>
  </foreignObject>
  <text x="50" y="560" font-family="Arial, sans-serif" font-size="10" fill="gray">
    Note: Copy the Mermaid code above and paste it into a Mermaid renderer (like mermaid.live) to generate the actual diagram.
  </text>
</svg>`;
    
    // Create blob and download
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Failed to download Mermaid SVG:', error);
    throw new Error('Failed to generate diagram download');
  }
}
