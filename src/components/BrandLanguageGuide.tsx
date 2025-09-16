import React from 'react';

import { cn } from '../lib/utils';
import {
  FieldReport,
  IntelligenceBrief,
  OperationalTitle,
  StrategicBody,
  TacticalHeading,
} from './BrandTypography';
import { Logo } from './logo';

// Voice Principle Component
interface VoicePrincipleProps {
  title: string;
  description: string;
  keywords: string[];
  doExamples: string[];
  dontExamples: string[];
  className?: string;
}

const VoicePrinciple: React.FC<VoicePrincipleProps> = ({
  title,
  description,
  keywords,
  doExamples,
  dontExamples,
  className,
}) => (
  <div className={cn('space-y-6', className)}>
    <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
      <div className="mb-6">
        <OperationalTitle>{title}</OperationalTitle>
      </div>
      <div className="mb-8">
        <StrategicBody>{description}</StrategicBody>
      </div>
      <div className="mb-6">
        <div className="mb-4">
          <IntelligenceBrief>KEY WORDS</IntelligenceBrief>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span key={keyword} className="badge-command">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="overflow-hidden rounded-lg border border-command-500/30 bg-command-950/20 p-8">
        <div className="mb-4">
          <IntelligenceBrief className="text-command-300">DO</IntelligenceBrief>
        </div>
        <ul className="space-y-3">
          {doExamples.map((example, index) => (
            <li key={index} className="text-strategic-200">
              <span className="mr-2 text-command-400">✓</span>
              {example}
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-lg border border-tactical-500/30 bg-tactical-950/20 p-8">
        <div className="mb-4">
          <IntelligenceBrief className="text-tactical-300">
            DON'T
          </IntelligenceBrief>
        </div>
        <ul className="space-y-3">
          {dontExamples.map((example, index) => (
            <li key={index} className="text-strategic-200">
              <span className="mr-2 text-tactical-400">✗</span>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// Context Guideline Component
interface ContextGuidelineProps {
  context: string;
  purpose: string;
  tone: string;
  examples: Array<{
    scenario: string;
    bad: string;
    good: string;
  }>;
  className?: string;
}

const ContextGuideline: React.FC<ContextGuidelineProps> = ({
  context,
  purpose,
  tone,
  examples,
  className,
}) => (
  <div className={cn('space-y-6', className)}>
    <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
      <div className="mb-6 flex items-center justify-between">
        <TacticalHeading>{context}</TacticalHeading>
        <span className="badge-assault">{tone}</span>
      </div>
      <StrategicBody>{purpose}</StrategicBody>
    </div>

    <div className="space-y-6">
      {examples.map((example, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8"
        >
          <div className="mb-4">
            <IntelligenceBrief>{example.scenario}</IntelligenceBrief>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <IntelligenceBrief className="text-tactical-300">
                AVOID
              </IntelligenceBrief>
              <div className="italic text-strategic-400">"{example.bad}"</div>
            </div>
            <div className="space-y-3">
              <IntelligenceBrief className="text-command-400">
                USE
              </IntelligenceBrief>
              <div className="font-medium text-strategic-200">
                "{example.good}"
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Terminology Component
interface TerminologyProps {
  category: string;
  terms: Array<{
    term: string;
    definition: string;
    usage: string;
  }>;
  className?: string;
}

const Terminology: React.FC<TerminologyProps> = ({
  category,
  terms,
  className,
}) => (
  <div className={cn('space-y-4', className)}>
    <OperationalTitle>{category}</OperationalTitle>
    <div className="space-y-4">
      {terms.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-sm text-command-300">
              {item.term}
            </div>
            <div className="text-caption text-strategic-400">{item.usage}</div>
          </div>
          <StrategicBody>{item.definition}</StrategicBody>
        </div>
      ))}
    </div>
  </div>
);

export const BrandLanguageGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-strategic-950 via-strategic-900 to-strategic-950">
      <div className="container mx-auto px-platoon py-army">
        <div className="mx-auto max-w-7xl space-y-army">
          {/* Header */}
          <div className="space-y-platoon text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Logo size={120} className="text-command-400" />
                <div className="absolute -inset-4 animate-pulse rounded-full bg-command-600/10 blur-xl" />
              </div>
            </div>

            <div className="space-y-squad">
              <h1 className="bg-gradient-to-r from-command-400 via-tactical-400 to-command-600 bg-clip-text text-mission-briefing font-black text-transparent">
                SPEARYX LANGUAGE GUIDE
              </h1>
              <p className="mx-auto max-w-4xl text-operational-title text-strategic-200">
                Precision communication protocols for military-business
                professional PM operations. Execute with clarity, target with
                purpose, achieve with accuracy.
              </p>
            </div>
          </div>

          {/* Core Voice Principles */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-command-200">
                CORE VOICE PRINCIPLES
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-command-400 to-command-600" />
            </div>

            <div className="space-y-army">
              <VoicePrinciple
                title="PRECISION"
                description="Communication that hits the target with surgical accuracy. Every word serves a purpose."
                keywords={[
                  'target',
                  'precision',
                  'surgical',
                  'exact',
                  'pinpoint',
                ]}
                doExamples={[
                  'Deploy resources with pinpoint accuracy',
                  'Execute with surgical precision',
                  'Target specific objectives',
                ]}
                dontExamples={[
                  'Try to accomplish multiple things at once',
                  'Use vague or ambiguous language',
                  'Beat around the bush',
                ]}
              />

              <VoicePrinciple
                title="CLARITY"
                description="Information delivered with tactical transparency. No room for misinterpretation."
                keywords={[
                  'clear',
                  'transparent',
                  'direct',
                  'explicit',
                  'unambiguous',
                ]}
                doExamples={[
                  'State objectives with explicit clarity',
                  'Provide transparent reporting',
                  'Deliver direct feedback',
                ]}
                dontExamples={[
                  'Use corporate jargon unnecessarily',
                  'Leave room for interpretation',
                  'Assume understanding without confirmation',
                ]}
              />

              <VoicePrinciple
                title="AUTHORITY"
                description="Confident command presence without arrogance. Lead through competence and precision."
                keywords={[
                  'command',
                  'authority',
                  'competence',
                  'leadership',
                  'expertise',
                ]}
                doExamples={[
                  'Command attention through proven results',
                  'Lead with demonstrated expertise',
                  'Exercise authority through precision',
                ]}
                dontExamples={[
                  'Boast without evidence',
                  'Claim superiority without foundation',
                  'Use aggressive or confrontational tone',
                ]}
              />

              <VoicePrinciple
                title="EFFICIENCY"
                description="Maximum impact with minimum words. Every communication serves operational efficiency."
                keywords={[
                  'efficient',
                  'streamlined',
                  'optimized',
                  'concise',
                  'effective',
                ]}
                doExamples={[
                  'Streamline operations for maximum efficiency',
                  'Optimize workflows with precision',
                  'Execute with minimal resource overhead',
                ]}
                dontExamples={[
                  'Use unnecessary words or explanations',
                  'Include redundant information',
                  'Rambling or verbose communications',
                ]}
              />
            </div>
          </section>

          {/* Context-Specific Guidelines */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-tactical-200">
                CONTEXT GUIDELINES
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-tactical-400 to-tactical-600" />
            </div>

            <div className="space-y-army">
              <ContextGuideline
                context="PRODUCT MARKETING"
                purpose="Position Spearyx as the precision instrument for project management operations."
                tone="AUTHORITATIVE • CONFIDENT • TECHNICAL"
                examples={[
                  {
                    scenario: 'Product Description',
                    bad: 'Our tool helps you manage projects better and get things done faster',
                    good: 'Execute projects with surgical precision. Target objectives with unmatched accuracy.',
                  },
                  {
                    scenario: 'Value Proposition',
                    bad: 'We make project management easier and more efficient',
                    good: 'Deploy tactical advantage through precision-engineered microtools',
                  },
                ]}
              />

              <ContextGuideline
                context="TECHNICAL DOCUMENTATION"
                purpose="Provide clear, actionable guidance for operational deployment and usage."
                tone="CLINICAL • PRECISE • INSTRUCTIONAL"
                examples={[
                  {
                    scenario: 'Feature Documentation',
                    bad: 'This feature lets you do stuff and makes things work better',
                    good: 'Execute automated workflows with configurable precision parameters',
                  },
                  {
                    scenario: 'Error Messages',
                    bad: 'Something went wrong, please try again',
                    good: 'Deployment failed: Invalid configuration parameters detected',
                  },
                ]}
              />

              <ContextGuideline
                context="CUSTOMER COMMUNICATIONS"
                purpose="Build trust through transparent, professional interaction."
                tone="PROFESSIONAL • HELPFUL • DIRECT"
                examples={[
                  {
                    scenario: 'Support Response',
                    bad: "We're sorry for the inconvenience and will look into this",
                    good: 'Issue identified and targeted for immediate resolution',
                  },
                  {
                    scenario: 'Onboarding',
                    bad: 'Welcome to our platform! Feel free to explore',
                    good: 'Access granted. Execute mission objectives with precision tools',
                  },
                ]}
              />

              <ContextGuideline
                context="EXECUTIVE BRIEFINGS"
                purpose="Deliver strategic insights with commanding presence and clarity."
                tone="STRATEGIC • AUTHORITATIVE • CONCISE"
                examples={[
                  {
                    scenario: 'Status Update',
                    bad: "Things are going pretty well, we're making progress",
                    good: 'Objectives achieved with 98.7% precision. Next phase targeted for execution',
                  },
                  {
                    scenario: 'Risk Assessment',
                    bad: 'There might be some potential issues we should watch out for',
                    good: 'Risk vectors identified. Mitigation protocols deployed with 99.2% effectiveness',
                  },
                ]}
              />
            </div>
          </section>

          {/* Core Terminology */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-strategic-200">
                CORE TERMINOLOGY
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-strategic-400 to-strategic-600" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <Terminology
                category="MISSION OPERATIONS"
                terms={[
                  {
                    term: 'Deploy',
                    definition: 'Execute with precision and purpose',
                    usage:
                      'Deploy resources, Deploy automation, Deploy intelligence',
                  },
                  {
                    term: 'Execute',
                    definition: 'Carry out operations with tactical precision',
                    usage:
                      'Execute strategy, Execute deployment, Execute protocols',
                  },
                  {
                    term: 'Target',
                    definition: 'Identify and focus on specific objectives',
                    usage:
                      'Target objectives, Target improvements, Target optimization',
                  },
                ]}
              />

              <Terminology
                category="TACTICAL LANGUAGE"
                terms={[
                  {
                    term: 'Precision',
                    definition:
                      'Surgical accuracy in execution and measurement',
                    usage:
                      'Precision targeting, Precision execution, Precision metrics',
                  },
                  {
                    term: 'Streamline',
                    definition: 'Optimize processes for maximum efficiency',
                    usage:
                      'Streamline operations, Streamline workflows, Streamline deployment',
                  },
                  {
                    term: 'Intelligence',
                    definition: 'Data-driven insights and predictive analytics',
                    usage:
                      'Intelligence gathering, Intelligence deployment, Actionable intelligence',
                  },
                ]}
              />

              <Terminology
                category="COMMAND STRUCTURE"
                terms={[
                  {
                    term: 'Command',
                    definition:
                      'Exercise authority through demonstrated competence',
                    usage:
                      'Command center, Command protocols, Command execution',
                  },
                  {
                    term: 'Authority',
                    definition: 'Established expertise and proven capability',
                    usage:
                      'Technical authority, Operational authority, Strategic authority',
                  },
                  {
                    term: 'Directive',
                    definition: 'Clear, actionable instructions for execution',
                    usage:
                      'Strategic directive, Operational directive, Tactical directive',
                  },
                ]}
              />

              <Terminology
                category="PERFORMANCE METRICS"
                terms={[
                  {
                    term: 'Accuracy',
                    definition: 'Precision in execution and measurement',
                    usage:
                      '99.7% accuracy, Pinpoint accuracy, Surgical accuracy',
                  },
                  {
                    term: 'Efficiency',
                    definition:
                      'Maximum output with minimum resource consumption',
                    usage:
                      'Operational efficiency, Resource efficiency, Process efficiency',
                  },
                  {
                    term: 'Effectiveness',
                    definition:
                      'Achievement of objectives with measurable impact',
                    usage:
                      'Tactical effectiveness, Strategic effectiveness, Mission effectiveness',
                  },
                ]}
              />
            </div>
          </section>

          {/* Communication Protocols */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-command-200">
                COMMUNICATION PROTOCOLS
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-command-400 to-command-600" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-command-200">
                  WRITING PRINCIPLES
                </h3>
                <ul className="space-y-2 text-strategic-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Use active voice for direct command</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Eliminate unnecessary words</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Front-load important information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Use specific metrics and data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Maintain consistent terminology</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-tactical-200">
                  TONE GUIDELINES
                </h3>
                <ul className="space-y-2 text-strategic-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Confident without arrogance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Authoritative through competence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Professional and direct</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Helpful and solution-oriented</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Transparent and accountable</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-strategic-200">
                  CONTENT STANDARDS
                </h3>
                <ul className="space-y-2 text-strategic-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Lead with the most important information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Include actionable next steps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Use data to support claims</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Avoid marketing fluff</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-command-400">•</span>
                    <span>Be specific, not vague</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Implementation Guide */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-command-200">
                IMPLEMENTATION GUIDE
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-command-400 to-command-600" />
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-center text-operational-title font-semibold text-command-200">
                  EXECUTION CHECKLIST
                </h3>
                <div className="grid grid-cols-1 gap-company md:grid-cols-2">
                  <div className="space-y-squad">
                    <h4 className="text-operational-title font-semibold text-command-300">
                      CONTENT REVIEW
                    </h4>
                    <ul className="space-y-2 text-strategic-200">
                      <li>• Does each word serve a specific purpose?</li>
                      <li>• Is the information presented with clarity?</li>
                      <li>• Are metrics and data included where relevant?</li>
                      <li>
                        • Does the tone convey authority through competence?
                      </li>
                      <li>• Is the message concise and efficient?</li>
                    </ul>
                  </div>

                  <div className="space-y-squad">
                    <h4 className="text-operational-title font-semibold text-command-300">
                      VOICE AUDIT
                    </h4>
                    <ul className="space-y-2 text-strategic-200">
                      <li>• Active voice used for direct commands?</li>
                      <li>• Military terminology appropriate for context?</li>
                      <li>• Business professional tone maintained?</li>
                      <li>• Confidence demonstrated without arrogance?</li>
                      <li>• Precision language used consistently?</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-army rounded-lg border border-command-500/30 bg-command-950/20 p-8">
                  <h4 className="mb-squad text-operational-title font-semibold text-command-200">
                    FINAL COMMAND
                  </h4>
                  <FieldReport>
                    Execute communications with precision. Target your audience
                    with clarity. Deploy your message with authority. Achieve
                    objectives through tactical language that commands attention
                    and delivers results.
                  </FieldReport>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
