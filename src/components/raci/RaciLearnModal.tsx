/**
 * RACI Learn Modal Component - Educational modal about RACI methodology
 */

import { AlertCircle, CheckCircle, Info, Target, Users, X } from 'lucide-react';
import React from 'react';

interface RaciLearnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RaciLearnModal: React.FC<RaciLearnModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const raciDefinitions = [
    {
      letter: 'R',
      title: 'Responsible',
      description: 'The person who performs the work or task',
      icon: Target,
      color: 'bg-green-100 text-green-800 border-green-200',
      details: 'This is the doer - the individual who actually carries out the task or activity. There should be at least one Responsible person for each task.',
    },
    {
      letter: 'A',
      title: 'Accountable',
      description: 'The person who is ultimately answerable for the task',
      icon: CheckCircle,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      details: 'This is the decision-maker - the person who must sign off on work and is ultimately responsible for the outcome. Only one Accountable person per task.',
    },
    {
      letter: 'C',
      title: 'Consulted',
      description: 'People whose opinions are sought before decisions',
      icon: Users,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      details: 'These are subject matter experts who provide input or advice. They should be consulted before work begins and their feedback incorporated.',
    },
    {
      letter: 'I',
      title: 'Informed',
      description: 'People who need to be kept in the loop',
      icon: Info,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      details: 'These stakeholders need to be notified of progress and outcomes, but their input is not required for decision-making.',
    },
  ];

  const benefits = [
    'Clarifies roles and responsibilities across teams',
    'Reduces confusion about who does what',
    'Improves decision-making processes',
    'Enhances communication and collaboration',
    'Prevents tasks from falling through the cracks',
    'Provides clear accountability for project outcomes',
  ];

  const bestPractices = [
    'Keep it simple - avoid over-complicating the matrix',
    'Review and update regularly as projects evolve',
    'Ensure every task has at least one Responsible person',
    'Limit Accountable roles to one person per task',
    'Use clear, descriptive task and role names',
    'Share the matrix with all stakeholders',
    'Train team members on RACI methodology',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Understanding RACI Methodology
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              A comprehensive guide to RACI matrices and responsibility assignment
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <div className="space-y-8">
            {/* What is RACI */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is RACI?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                RACI is a project management tool that helps clarify roles and responsibilities
                within a project team. It stands for <strong>Responsible</strong>,{' '}
                <strong>Accountable</strong>, <strong>Consulted</strong>, and{' '}
                <strong>Informed</strong>. RACI matrices provide a clear visual representation
                of who does what in a project, reducing confusion and improving collaboration.
              </p>
            </div>

            {/* RACI Definitions */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                RACI Definitions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {raciDefinitions.map((item) => (
                  <div
                    key={item.letter}
                    className={`rounded-lg border p-4 ${item.color}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                          <span className="text-lg font-bold">{item.letter}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <item.icon className="h-4 w-4" />
                          <h4 className="font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-sm mb-2">{item.description}</p>
                        <p className="text-xs opacity-75">{item.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits of Using RACI
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Practices */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Best Practices
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="space-y-3">
                  {bestPractices.map((practice, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-blue-900">{practice}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Common Mistakes to Avoid
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-900">Too many Responsible people</p>
                    <p className="text-sm text-red-800">
                      Having multiple people marked as Responsible for the same task can lead to confusion about who actually does the work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-900">Missing Accountable person</p>
                    <p className="text-sm text-red-800">
                      Every task must have exactly one person who is ultimately accountable for its completion.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-900">Over-complicated matrices</p>
                    <p className="text-sm text-red-800">
                      Keep your RACI matrix focused on key deliverables rather than trying to document every minor activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
