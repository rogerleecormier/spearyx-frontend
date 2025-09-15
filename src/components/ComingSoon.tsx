import React from 'react';

import { cn } from '../lib/utils';
import { Logo } from './logo';

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, className }) => (
  <div className={cn('card-brand', className)}>{children}</div>
);

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => (
  <InfoCard className="group text-center transition-transform duration-300 hover:scale-105">
    <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-3 text-title font-bold text-brand-target-100 transition-colors group-hover:text-brand-target-200">
      {title}
    </h3>
    <p className="text-body leading-relaxed text-brand-precision-300">
      {description}
    </p>
  </InfoCard>
);

export const ComingSoon: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-precision-950 via-brand-precision-900 to-brand-precision-950">
      {/* Targeting grid background */}
      {/* Targeting grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(theme(colors.brand.precision.700)_1px,transparent_1px),linear-gradient(90deg,theme(colors.brand.precision.700)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Precision accent lines */}
      <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-target-600/20 to-transparent" />
      <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-spear-600/20 to-transparent" />

      <div className="container relative mx-auto px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <div className="space-y-12 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Logo size={160} className="text-brand-target-400" />
                <div className="absolute -inset-4 animate-pulse rounded-full bg-brand-target-600/10 blur-xl" />
              </div>
            </div>

            <div className="space-y-8">
              <h1 className="text-gradient-brand text-hero font-black">
                SPEARYX SUITE
              </h1>
              <p className="mx-auto max-w-5xl text-display font-light leading-tight text-brand-precision-200">
                Precision-engineered microtools for project leaders who demand
                <span className="font-medium text-brand-target-300">
                  {' '}
                  tactical clarity
                </span>
              </p>
            </div>
          </div>

          {/* Mission Statement Card */}
          <div className="mx-auto max-w-5xl">
            <InfoCard className="relative overflow-hidden text-center">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand-target-600 via-brand-spear-500 to-brand-target-600" />
              <h2 className="mb-6 text-headline font-bold text-brand-target-100">
                TARGET ACQUIRED: PROJECT CLARITY
              </h2>
              <p className="mx-auto max-w-3xl text-body-lg leading-relaxed text-brand-precision-200">
                Eliminate project management chaos with laser-focused,
                AI-powered tools. Engineered for precision, built for speed,
                designed for results.
              </p>
              <div className="mt-6 font-mono text-caption tracking-wider text-brand-spear-400">
                ENGAGEMENT TIME: &lt; 60 SECONDS
              </div>
            </InfoCard>
          </div>

          {/* Tactical Arsenal */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="mb-4 text-display font-bold text-brand-target-100">
                TACTICAL ARSENAL
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              <ToolCard
                icon="🎯"
                title="PROJECT CHARTER"
                description="AI-guided mission parameters with precision-defined objectives and success metrics"
              />
              <ToolCard
                icon="⚔️"
                title="RACI MATRIX"
                description="Strategic responsibility mapping with intelligent role optimization and conflict resolution"
              />
              <ToolCard
                icon="🔍"
                title="PRIORITY GRID"
                description="Eisenhower-class priority targeting with AI threat assessment and focus optimization"
              />
              <ToolCard
                icon="🛡️"
                title="RISK REGISTER"
                description="Comprehensive threat analysis with probability scoring and countermeasure deployment"
              />
            </div>
          </div>

          {/* Tactical Advantages */}
          <div className="mx-auto max-w-6xl">
            <InfoCard>
              <h2 className="mb-12 text-center text-headline font-bold text-brand-target-100">
                TACTICAL ADVANTAGES
              </h2>
              <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
                <div className="group">
                  <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                    ⚡
                  </div>
                  <h3 className="mb-4 text-title font-bold text-brand-target-200">
                    RAPID DEPLOYMENT
                  </h3>
                  <p className="text-body leading-relaxed text-brand-precision-300">
                    From chaos to clarity in under 60 seconds. No lengthy setup,
                    no complex configurations.
                  </p>
                </div>
                <div className="group">
                  <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                    🧠
                  </div>
                  <h3 className="mb-4 text-title font-bold text-brand-target-200">
                    AI INTELLIGENCE
                  </h3>
                  <p className="text-body leading-relaxed text-brand-precision-300">
                    Advanced pattern recognition and predictive insights for
                    superior decision-making.
                  </p>
                </div>
                <div className="group">
                  <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                    🎯
                  </div>
                  <h3 className="mb-4 text-title font-bold text-brand-target-200">
                    PRECISION FOCUS
                  </h3>
                  <p className="text-body leading-relaxed text-brand-precision-300">
                    Zero bloat, maximum impact. Every feature engineered for
                    tactical effectiveness.
                  </p>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Mission Briefing CTA */}
          <div className="mx-auto max-w-5xl">
            <InfoCard className="relative text-center">
              <div className="bg-gradient-brand absolute inset-0 rounded-2xl opacity-20" />
              <div className="relative">
                <h2 className="mb-6 text-display font-bold text-brand-target-100">
                  MISSION BRIEFING: COMING SOON
                </h2>

                <div className="space-y-6">
                  <p className="mx-auto max-w-3xl text-body-lg text-brand-precision-200">
                    We're finalizing operations. Detailed information and early
                    access sign‑up will be available soon.
                  </p>

                  <div className="space-y-3">
                    <p className="text-title font-bold text-brand-target-300">
                      🚀 DEPLOYMENT: Q4 2025
                    </p>
                    <p className="font-mono text-label tracking-wide text-brand-precision-400">
                      CLASSIFIED ACCESS // FIRST 100 OPERATIVES ONLY
                    </p>
                  </div>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
};
