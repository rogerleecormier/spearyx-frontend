/**
 * Mermaid Diagram Component
 * Renders Mermaid diagrams using the installed mermaid package
 */

import { Loader2 } from 'lucide-react';
import mermaid from 'mermaid';
import React, { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Mermaid: React.FC<MermaidProps> = ({ 
  chart, 
  className = '', 
  width = 800, 
  height = 600 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize Mermaid with configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Arial, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
          }
        });

        // Ensure we have a unique ID for each render
        const currentId = mermaidId.current;
        
        // Use Mermaid 11.x API with proper error handling
        const result = await mermaid.render(currentId, chart);
        const svg = result.svg;
        
        setSvgContent(svg);
        setIsLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        console.error('Chart content:', chart);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
        setIsLoading(false);
      }
    };

    if (chart.trim()) {
      // Generate a new unique ID for each chart
      mermaidId.current = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      renderDiagram();
    }
  }, [chart]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 rounded-lg border ${className}`} 
           style={{ width, height }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-gray-600">Rendering diagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 rounded-lg border border-red-200 ${className}`} 
           style={{ width, height }}>
        <div className="text-center p-4">
          <p className="text-sm text-red-600 mb-2">Failed to render diagram</p>
          <p className="text-xs text-red-500">{error}</p>
          <details className="mt-2">
            <summary className="text-xs text-red-500 cursor-pointer">Show Mermaid code</summary>
            <pre className="text-xs text-gray-600 mt-2 p-2 bg-white rounded border text-left overflow-auto max-h-32">
              {chart}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg border border-gray-200 overflow-auto ${className}`}
      style={{ width, height }}
    >
      <div 
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className="w-full h-full"
      />
    </div>
  );
};

export default Mermaid;
