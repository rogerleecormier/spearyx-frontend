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
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            RACI Matrix Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Create comprehensive RACI (Responsible, Accountable, Consulted,
            Informed) matrices for your projects with AI assistance
          </p>
          {onLearnAboutRaci && (
            <button
              onClick={onLearnAboutRaci}
              className="mt-3 inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-800"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Learn about RACI methodology
              </span>
            </button>
          )}
        </div>

        {/* Steps - Streamlined Design */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="group relative">
              <div className="relative h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50">
                {/* Step number in corner */}
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500 group-hover:bg-gray-200">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${step.color} shadow-sm`}
                  >
                    <step.icon className="h-7 w-7" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="mb-2 text-base font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Subtle arrow for larger screens */}
              {step.number < 4 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 transform lg:block">
                  <svg
                    className="h-5 w-5 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info - More compact */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="mb-1 text-sm font-medium text-blue-900">Pro Tip</p>
              <p className="text-sm text-blue-800">
                The more detailed your project description, the better the AI
                can generate accurate role assignments and task breakdowns for
                your RACI matrix.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
