import React from 'react';

import { BrandCard, FeaturedHeroCard, HeroCard } from './BrandCards';
import {
  BrandTypography,
  FieldReport,
  GradientHero,
  IntelligenceBrief,
  OperationalTitle,
  StatusIndicator,
  StrategicBody,
} from './BrandTypography';
import { Logo } from './logo';

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => (
  <BrandCard className="group text-center transition-transform duration-300 hover:scale-105">
    <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <OperationalTitle
      as="h3"
      className="mb-3 transition-colors group-hover:text-command-200"
    >
      {title}
    </OperationalTitle>
    <FieldReport className="leading-relaxed">{description}</FieldReport>
  </BrandCard>
);

export const ComingSoon: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-strategic-950 via-strategic-900 to-strategic-950">
      {/* Targeting grid background */}
      {/* Targeting grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(theme(colors.brand.precision.700)_1px,transparent_1px),linear-gradient(90deg,theme(colors.brand.precision.700)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Precision accent lines */}
      <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-command-600/20 to-transparent" />
      <div className="via-brand-spear-600/20 absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent to-transparent" />

      <div className="container relative mx-auto px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <div className="space-y-12 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Logo size={160} className="text-command-400" />
                <div className="absolute -inset-4 animate-pulse rounded-full bg-command-600/10 blur-xl" />
              </div>
            </div>

            <div className="space-y-8">
              <GradientHero className="text-hero">SPEARYX SUITE</GradientHero>
              <StrategicBody
                block
                className="mx-auto max-w-5xl text-lg leading-tight"
              >
                Advanced project management tools engineered for precision and
                efficiency.
                <span className="font-medium text-command-300">
                  {' '}
                  Streamline operations, optimize workflows, deliver results.
                </span>
              </StrategicBody>
            </div>
          </div>

          {/* Mission Statement Card */}
          <div className="mx-auto max-w-5xl">
            <FeaturedHeroCard
              title="PRECISION PROJECT MANAGEMENT"
              tagline="Clear Vision, Streamlined Execution"
              description="Transform project management challenges into strategic advantages with intelligent, precision-engineered tools. Built for project managers who demand clarity, efficiency, and results."
              features={[
                'Intelligent workflow optimization',
                'Real-time performance analytics',
                'Strategic resource allocation',
                'Automated progress tracking',
              ]}
              metrics={[
                { label: 'Setup Time', value: '< 60s' },
                { label: 'Efficiency Gain', value: '300%' },
                { label: 'Error Reduction', value: '95%' },
                { label: 'Time Saved', value: '40%' },
              ]}
              gradient="command"
            />
          </div>

          {/* Core Tools */}
          <div className="space-y-12">
            <div className="text-center">
              <BrandTypography variant="display" as="h2" className="mb-4">
                CORE PROJECT TOOLS
              </BrandTypography>
              <StrategicBody
                block
                className="mx-auto max-w-5xl text-lg leading-tight"
              >
               Essential project tools—more innovative features arriving soon.
                
              </StrategicBody>
              <div className="accent-line mx-auto w-24" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              <ToolCard
                icon="🎯"
                title="PROJECT CHARTER"
                description="AI-assisted project definition with clear objectives, scope, and success criteria for maximum clarity"
              />
              <ToolCard
                icon="👥"
                title="RACI MATRIX"
                description="Intelligent responsibility mapping that eliminates confusion and optimizes team accountability"
              />
              <ToolCard
                icon="📊"
                title="PRIORITY MATRIX"
                description="Smart priority assessment using proven frameworks to focus efforts on high-impact activities"
              />
              <ToolCard
                icon="⚠️"
                title="RISK ASSESSMENT"
                description="Comprehensive risk analysis with probability scoring and proactive mitigation strategies"
              />
            </div>
          </div>

          {/* Key Advantages */}
          <div className="mx-auto max-w-6xl">
            <BrandCard>
              <BrandTypography
                variant="display"
                as="h2"
                className="mb-12 text-center"
              >
                COMPETITIVE ADVANTAGES
              </BrandTypography>
              <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
                <div className="group">
                  <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                    ⚡
                  </div>
                  <OperationalTitle as="h3" className="mb-4">
                    RAPID IMPLEMENTATION
                  </OperationalTitle>
                  <FieldReport className="leading-relaxed">
                    From setup to execution in under 60 seconds. Streamlined
                    onboarding with intelligent configuration recommendations.
                  </FieldReport>
                </div>
                <div className="group">
                  <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                    🧠
                  </div>
                  <OperationalTitle as="h3" className="mb-4">
                    INTELLIGENT AUTOMATION
                  </OperationalTitle>
                  <FieldReport className="leading-relaxed">
                    Advanced analytics and pattern recognition provide
                    actionable insights for superior project outcomes.
                  </FieldReport>
                </div>
                <div className="group">
                  <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                    🎯
                  </div>
                  <OperationalTitle as="h3" className="mb-4">
                    FOCUSED EFFICIENCY
                  </OperationalTitle>
                  <FieldReport className="leading-relaxed">
                    Purpose-built tools with zero bloat. Every feature designed
                    for maximum project management effectiveness.
                  </FieldReport>
                </div>
              </div>
            </BrandCard>
          </div>

          {/* Launch Information */}
          <div className="mx-auto max-w-5xl">
            <HeroCard
              title="LAUNCH PREPARATION IN PROGRESS"
              subtitle="Project Management Excellence Coming Soon"
              description="We're fine-tuning our precision-engineered tools to ensure maximum effectiveness for project managers. Early access registration and detailed feature information will be available soon."
              icon="🚀"
              badge="BETA ACCESS"
              actions={
                <div className="space-y-4">
                  <StatusIndicator
                    block
                    className="rounded-full bg-command-500/20 px-4 py-2 text-command-300"
                  >
                    LAUNCH TARGET: Q4 2025
                  </StatusIndicator>
                  <IntelligenceBrief
                    block
                    className="font-mono tracking-wide text-strategic-400"
                  >
                    PRIORITY ACCESS • LIMITED TO FIRST 100 PROJECT MANAGERS
                  </IntelligenceBrief>
                </div>
              }
              gradient="command"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
