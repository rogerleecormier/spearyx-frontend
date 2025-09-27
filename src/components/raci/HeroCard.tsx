/**
 * Hero Card Component - Instructions and workflow steps for RACI Matrix Generator
 */

import {
    Download,
    FileText,
    HelpCircle,
    Lightbulb,
    PenTool,
    Sparkles,
} from 'lucide-react';
import React from 'react';

interface HeroCardProps {
  className?: string;
  onLearnAboutRaci?: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  className = '',
  onLearnAboutRaci,
}) => {
  const steps = [
    {
      number: 1,
      title: 'Describe Project',
      description: 'Describe your project, team, and objectives',
      icon: FileText,
      color: 'bg-blue-500 text-white',
    },
    {
      number: 2,
      title: 'Generate with AI',
      description: 'AI creates your RACI matrix automatically',
      icon: Sparkles,
      color: 'bg-purple-500 text-white',
    },
    {
      number: 3,
      title: 'Modify Results',
      description: 'Edit roles, tasks, and assignments as needed',
      icon: PenTool,
      color: 'bg-orange-500 text-white',
    },
    {
      number: 4,
      title: 'Export Matrix',
      description: 'Download in multiple formats or share with others',
      icon: Download,
      color: 'bg-green-500 text-white',
    },
  ];

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            RACI Matrix Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Create comprehensive RACI (Responsible, Accountable, Consulted, Informed)
            matrices for your projects with AI assistance
          </p>
          {onLearnAboutRaci && (
            <button
              onClick={onLearnAboutRaci}
              className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Learn about RACI methodology</span>
            </button>
          )}
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow for larger screens */}
              {step.number < 4 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Pro Tip
              </p>
              <p className="text-sm text-blue-800">
                The more detailed your project description, the better the AI can generate
                accurate role assignments and task breakdowns for your RACI matrix.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
