import React from 'react';
import { cn } from '../lib/utils';
import { Logo } from './logo';

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, className }) => (
  <div
    className={cn(
      'bg-brand-precision-950/80 backdrop-blur-sm rounded-2xl p-8 border border-brand-precision-800/50 shadow-xl hover:shadow-2xl transition-all duration-300',
      'hover:border-brand-target-600/30 hover:bg-brand-precision-950/90',
      className
    )}
  >
    {children}
  </div>
);

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => (
  <InfoCard className="text-center group hover:scale-105 transition-transform duration-300">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-brand-target-100 mb-3 group-hover:text-brand-target-200 transition-colors">
      {title}
    </h3>
    <p className="text-brand-precision-300 leading-relaxed">{description}</p>
  </InfoCard>
);

export const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-precision-950 via-brand-precision-900 to-brand-precision-950 relative overflow-hidden">
      {/* Targeting grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(brand-precision-700 1px, transparent 1px),
            linear-gradient(90deg, brand-precision-700 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Precision accent lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-target-600/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-spear-600/20 to-transparent" />

      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Hero Section */}
          <div className="text-center space-y-12">
            <div className="flex justify-center">
              <div className="relative">
                <Logo size={160} className="text-brand-target-400" />
                <div className="absolute -inset-4 bg-brand-target-600/10 rounded-full blur-xl animate-pulse" />
              </div>
            </div>

            <div className="space-y-8">
              <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-brand-target-400 via-brand-target-300 to-brand-spear-400 bg-clip-text text-transparent tracking-tight">
                SPEARYX SUITE
              </h1>
              <p className="text-3xl md:text-4xl text-brand-precision-200 font-light max-w-5xl mx-auto leading-tight">
                Precision-engineered microtools for project leaders who demand
                <span className="text-brand-target-300 font-medium">
                  {' '}
                  tactical clarity
                </span>
              </p>
            </div>
          </div>

          {/* Mission Statement Card */}
          <div className="max-w-5xl mx-auto">
            <InfoCard className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-target-600 via-brand-spear-500 to-brand-target-600" />
              <h2 className="text-3xl font-bold text-brand-target-100 mb-6">
                TARGET ACQUIRED: PROJECT CLARITY
              </h2>
              <p className="text-xl text-brand-precision-200 leading-relaxed max-w-3xl mx-auto">
                Eliminate project management chaos with laser-focused,
                AI-powered tools. Engineered for precision, built for speed,
                designed for results.
              </p>
              <div className="mt-6 text-brand-spear-400 font-mono text-sm tracking-wider">
                ENGAGEMENT TIME: &lt; 60 SECONDS
              </div>
            </InfoCard>
          </div>

          {/* Tactical Arsenal */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-brand-target-100 mb-4">
                TACTICAL ARSENAL
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-target-600 to-brand-spear-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
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
          <div className="max-w-6xl mx-auto">
            <InfoCard>
              <h2 className="text-3xl font-bold text-center text-brand-target-100 mb-12">
                TACTICAL ADVANTAGES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="group">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    ⚡
                  </div>
                  <h3 className="text-2xl font-bold text-brand-target-200 mb-4">
                    RAPID DEPLOYMENT
                  </h3>
                  <p className="text-brand-precision-300 leading-relaxed">
                    From chaos to clarity in under 60 seconds. No lengthy setup,
                    no complex configurations.
                  </p>
                </div>
                <div className="group">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    🧠
                  </div>
                  <h3 className="text-2xl font-bold text-brand-target-200 mb-4">
                    AI INTELLIGENCE
                  </h3>
                  <p className="text-brand-precision-300 leading-relaxed">
                    Advanced pattern recognition and predictive insights for
                    superior decision-making.
                  </p>
                </div>
                <div className="group">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-brand-target-200 mb-4">
                    PRECISION FOCUS
                  </h3>
                  <p className="text-brand-precision-300 leading-relaxed">
                    Zero bloat, maximum impact. Every feature engineered for
                    tactical effectiveness.
                  </p>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Mission Briefing CTA */}
          <div className="max-w-5xl mx-auto">
            <InfoCard className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-target-900/20 via-transparent to-brand-spear-900/20 rounded-2xl" />
              <div className="relative">
                <h2 className="text-4xl font-bold text-brand-target-100 mb-6">
                  MISSION BRIEFING: COMING SOON
                </h2>

                <div className="space-y-6">
                  <p className="text-xl text-brand-precision-200 max-w-3xl mx-auto">
                    We’re finalizing operations. Detailed information and early
                    access sign‑up will be available soon.
                  </p>

                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-brand-target-300">
                      🚀 DEPLOYMENT: Q4 2025
                    </p>
                    <p className="text-brand-precision-400 font-mono tracking-wide">
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
