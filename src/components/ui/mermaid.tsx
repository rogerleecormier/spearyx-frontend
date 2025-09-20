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
  height = 600,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidId = useRef(
    `mermaid-${Math.random().toString(36).substr(2, 9)}`
  );

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
            curve: 'basis',
          },
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
        setError(
          err instanceof Error ? err.message : 'Failed to render diagram'
        );
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
      <div
        className={`flex items-center justify-center rounded-lg border bg-gray-50 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">Rendering diagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-red-200 bg-red-50 ${className}`}
        style={{ width, height }}
      >
        <div className="p-4 text-center">
          <p className="mb-2 text-sm text-red-600">Failed to render diagram</p>
          <p className="text-xs text-red-500">{error}</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-red-500">
              Show Mermaid code
            </summary>
            <pre className="mt-2 max-h-32 overflow-auto rounded border bg-white p-2 text-left text-xs text-gray-600">
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
      className={`overflow-auto rounded-lg border border-gray-200 bg-white ${className}`}
      style={{ width, height }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className="h-full w-full"
      />
    </div>
  );
};

export default Mermaid;
