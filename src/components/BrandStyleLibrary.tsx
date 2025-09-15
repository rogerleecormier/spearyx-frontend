import React from 'react';

import { cn } from '../lib/utils';

// Brand Color Palette Component
interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  value,
  description,
  className,
}) => {
  // Map color values to Tailwind classes
  const getColorClass = (colorValue: string) => {
    const colorMap: Record<string, string> = {
      '#f0f9ff': 'bg-brand-target-50',
      '#e0f2fe': 'bg-brand-target-100',
      '#bae6fd': 'bg-brand-target-200',
      '#7dd3fc': 'bg-brand-target-300',
      '#38bdf8': 'bg-brand-target-400',
      '#0ea5e9': 'bg-brand-target-500',
      '#0284c7': 'bg-brand-target-600',
      '#0369a1': 'bg-brand-target-700',
      '#075985': 'bg-brand-target-800',
      '#0c4a6e': 'bg-brand-target-900',
      '#082f49': 'bg-brand-target-950',
      '#fff7ed': 'bg-brand-spear-50',
      '#ffedd5': 'bg-brand-spear-100',
      '#fed7aa': 'bg-brand-spear-200',
      '#fdba74': 'bg-brand-spear-300',
      '#fb923c': 'bg-brand-spear-400',
      '#f97316': 'bg-brand-spear-500',
      '#ea580c': 'bg-brand-spear-600',
      '#c2410c': 'bg-brand-spear-700',
      '#9a3412': 'bg-brand-spear-800',
      '#7c2d12': 'bg-brand-spear-900',
      '#431407': 'bg-brand-spear-950',
      '#f8fafc': 'bg-brand-precision-50',
      '#f1f5f9': 'bg-brand-precision-100',
      '#e2e8f0': 'bg-brand-precision-200',
      '#cbd5e1': 'bg-brand-precision-300',
      '#94a3b8': 'bg-brand-precision-400',
      '#64748b': 'bg-brand-precision-500',
      '#475569': 'bg-brand-precision-600',
      '#334155': 'bg-brand-precision-700',
      '#1e293b': 'bg-brand-precision-800',
      '#0f172a': 'bg-brand-precision-900',
      '#020617': 'bg-brand-precision-950',
    };
    return colorMap[colorValue] || 'bg-brand-precision-500';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'w-full h-16 rounded-lg border border-brand-precision-800/50 shadow-lg',
          getColorClass(value)
        )}
      />
      <div className="space-y-1">
        <div className="font-mono text-sm text-brand-target-200">{name}</div>
        <div className="font-mono text-xs text-brand-precision-400">
          {value}
        </div>
        {description && (
          <div className="text-xs text-brand-precision-300">{description}</div>
        )}
      </div>
    </div>
  );
};

// Typography Scale Component
interface TypographyExampleProps {
  variant: string;
  className: string;
  example: string;
  description: string;
}

const TypographyExample: React.FC<TypographyExampleProps> = ({
  variant,
  className,
  example,
  description,
}) => (
  <div className="space-y-4 p-6 bg-brand-precision-950/50 rounded-lg border border-brand-precision-800/30 overflow-hidden">
    <div className="font-mono text-xs text-brand-precision-400">{variant}</div>
    <div className={cn(className, 'break-words')}>{example}</div>
    <div className="text-xs text-brand-precision-300">{description}</div>
  </div>
);

// Design Token Component
interface DesignTokenProps {
  name: string;
  value: string;
  example?: React.ReactNode;
  description?: string;
}

const DesignToken: React.FC<DesignTokenProps> = ({
  name,
  value,
  example,
  description,
}) => (
  <div className="p-4 bg-brand-precision-950/50 rounded-lg border border-brand-precision-800/30">
    <div className="flex items-center justify-between mb-2">
      <div className="font-mono text-sm text-brand-target-200">{name}</div>
      <div className="font-mono text-xs text-brand-precision-400">{value}</div>
    </div>
    {example && <div className="mb-2">{example}</div>}
    {description && (
      <div className="text-xs text-brand-precision-300">{description}</div>
    )}
  </div>
);

export const BrandStyleLibrary: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-precision-950 via-brand-precision-900 to-brand-precision-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Header */}
          <div className="text-center space-y-8">
            <h1 className="text-hero font-black text-gradient-brand">
              SPEARYX BRAND STYLE LIBRARY
            </h1>
            <p className="text-body-lg text-brand-precision-200 max-w-4xl mx-auto">
              Comprehensive design system for precision-engineered microtools.
              Tactical clarity through consistent visual language.
            </p>
          </div>

          {/* Primary Brand Colors */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                PRIMARY BRAND COLORS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Target Colors */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200 mb-4">
                  TARGET BLUE
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch
                    name="target-500"
                    value="#0ea5e9"
                    description="Primary brand blue"
                  />
                  <ColorSwatch
                    name="target-400"
                    value="#38bdf8"
                    description="Light accent"
                  />
                  <ColorSwatch
                    name="target-600"
                    value="#0284c7"
                    description="Dark accent"
                  />
                  <ColorSwatch
                    name="target-300"
                    value="#7dd3fc"
                    description="Text highlight"
                  />
                </div>
              </div>

              {/* Spear Colors */}
              <div className="space-y-4">
                <h3 className="text-title text-brand-spear-200 mb-4">
                  SPEAR ORANGE
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch
                    name="spear-500"
                    value="#f97316"
                    description="Primary spear orange"
                  />
                  <ColorSwatch
                    name="spear-400"
                    value="#fb923c"
                    description="Light accent"
                  />
                  <ColorSwatch
                    name="spear-600"
                    value="#ea580c"
                    description="Dark accent"
                  />
                  <ColorSwatch
                    name="spear-700"
                    value="#c2410c"
                    description="Deep accent"
                  />
                </div>
              </div>

              {/* Precision Grays */}
              <div className="space-y-4">
                <h3 className="text-title text-brand-precision-200 mb-4">
                  PRECISION GRAYS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch
                    name="precision-950"
                    value="#020617"
                    description="Background dark"
                  />
                  <ColorSwatch
                    name="precision-900"
                    value="#0f172a"
                    description="Card background"
                  />
                  <ColorSwatch
                    name="precision-300"
                    value="#cbd5e1"
                    description="Text secondary"
                  />
                  <ColorSwatch
                    name="precision-200"
                    value="#e2e8f0"
                    description="Text primary"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Typography Scale */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                TYPOGRAPHY SCALE
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TypographyExample
                variant="text-hero (Hero Headlines)"
                className="!text-hero font-black text-gradient-brand"
                example="SPEARYX SUITE"
                description="Main brand headlines, maximum impact"
              />
              <TypographyExample
                variant="text-display (Display Text)"
                className="!text-display font-bold text-brand-target-100"
                example="TACTICAL ARSENAL"
                description="Display text and major headings"
              />
              <TypographyExample
                variant="text-headline (Section Headers)"
                className="!text-headline font-bold text-brand-target-200"
                example="RAPID DEPLOYMENT"
                description="Section headers and major headings"
              />
              <TypographyExample
                variant="text-title (Card Titles)"
                className="!text-title font-semibold text-brand-target-200"
                example="FEATURE MODULE"
                description="Card titles and feature names"
              />
              <TypographyExample
                variant="text-body-lg (Body Large)"
                className="!text-body-lg text-brand-precision-200"
                example="Precision-engineered microtools"
                description="Large body text and descriptions"
              />
              <TypographyExample
                variant="text-body (Body Regular)"
                className="!text-body text-brand-precision-300"
                example="Advanced pattern recognition and predictive insights"
                description="Standard body text and descriptions"
              />
              <TypographyExample
                variant="text-caption (Captions)"
                className="!text-caption text-brand-precision-400"
                example="Status indicators and descriptions"
                description="Captions and secondary text"
              />
              <TypographyExample
                variant="text-label (Labels)"
                className="!text-label font-medium uppercase text-brand-precision-500"
                example="CLASSIFIED ACCESS // FIRST 100"
                description="Labels, captions, and technical text"
              />
            </div>
          </section>

          {/* Design Tokens */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                DESIGN TOKENS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Spacing */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  SPACING
                </h3>
                <DesignToken
                  name="space-1"
                  value="0.25rem"
                  example={<div className="w-1 h-4 bg-brand-target-500" />}
                  description="4px - Fine adjustments"
                />
                <DesignToken
                  name="space-2"
                  value="0.5rem"
                  example={<div className="w-2 h-4 bg-brand-target-500" />}
                  description="8px - Small spacing"
                />
                <DesignToken
                  name="space-4"
                  value="1rem"
                  example={<div className="w-4 h-4 bg-brand-target-500" />}
                  description="16px - Standard spacing"
                />
                <DesignToken
                  name="space-8"
                  value="2rem"
                  example={<div className="w-8 h-4 bg-brand-target-500" />}
                  description="32px - Large spacing"
                />
              </div>

              {/* Border Radius */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  BORDER RADIUS
                </h3>
                <DesignToken
                  name="rounded-sm"
                  value="0.125rem"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 rounded-sm" />
                  }
                  description="2px - Subtle rounding"
                />
                <DesignToken
                  name="rounded-lg"
                  value="0.5rem"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 rounded-lg" />
                  }
                  description="8px - Standard rounding"
                />
                <DesignToken
                  name="rounded-2xl"
                  value="1rem"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 rounded-2xl" />
                  }
                  description="16px - Card rounding"
                />
                <DesignToken
                  name="rounded-full"
                  value="9999px"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 rounded-full" />
                  }
                  description="Pills and buttons"
                />
              </div>

              {/* Shadows */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  SHADOWS
                </h3>
                <DesignToken
                  name="shadow-sm"
                  value="0 1px 2px 0 rgb(0 0 0 / 0.05)"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 shadow-sm rounded" />
                  }
                  description="Subtle elevation"
                />
                <DesignToken
                  name="shadow-lg"
                  value="0 10px 15px -3px rgb(0 0 0 / 0.1)"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 shadow-lg rounded" />
                  }
                  description="Card elevation"
                />
                <DesignToken
                  name="shadow-2xl"
                  value="0 25px 50px -12px rgb(0 0 0 / 0.25)"
                  example={
                    <div className="w-16 h-8 bg-brand-target-500 shadow-2xl rounded" />
                  }
                  description="High elevation"
                />
              </div>
            </div>
          </section>

          {/* Card Components */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                CARD COMPONENTS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Standard Brand Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  STANDARD CARD
                </h3>
                <div className="card-brand p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-title text-brand-precision-900">
                      Tactical Module
                    </h4>
                    <span className="badge-brand-primary">ACTIVE</span>
                  </div>
                  <p className="text-body text-brand-precision-600 mb-4">
                    Precision-engineered microtools for advanced pattern
                    recognition and deployment.
                  </p>
                  <div className="flex gap-2">
                    <button className="btn-brand-primary text-sm px-4 py-2">
                      Deploy
                    </button>
                    <button className="btn-brand-ghost text-sm px-4 py-2">
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              {/* Elevated Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  ELEVATED CARD
                </h3>
                <div className="card-brand-elevated p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div>
                      <h4 className="text-title text-brand-precision-900">
                        Spearyx Suite
                      </h4>
                      <p className="text-caption text-brand-precision-500">
                        Version 2.1.0
                      </p>
                    </div>
                  </div>
                  <p className="text-body text-brand-precision-600 mb-4">
                    Advanced targeting system with real-time analytics and
                    predictive insights.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="status-success px-3 py-1 rounded-full text-xs">
                      ONLINE
                    </span>
                    <button className="btn-brand-accent text-sm px-4 py-2">
                      Launch
                    </button>
                  </div>
                </div>
              </div>

              {/* Glass Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  GLASS CARD
                </h3>
                <div className="card-brand-glass p-6">
                  <h4 className="text-headline text-gradient-brand mb-3">
                    RAPID DEPLOY
                  </h4>
                  <p className="text-body text-brand-precision-300 mb-4">
                    Instant deployment with zero-downtime updates and automatic
                    scaling.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-target-500 rounded-full animate-pulse-brand"></div>
                      <span className="text-caption text-brand-precision-400">
                        Real-time monitoring
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-spear-500 rounded-full animate-pulse-brand"></div>
                      <span className="text-caption text-brand-precision-400">
                        Auto-scaling enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  FEATURE CARD
                </h3>
                <div className="card-brand p-6 hover-lift cursor-pointer">
                  <div className="w-12 h-12 bg-brand-target-500/10 rounded-xl flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-brand-target-500 rounded"></div>
                  </div>
                  <h4 className="text-title text-brand-precision-900 mb-2">
                    Pattern Recognition
                  </h4>
                  <p className="text-body text-brand-precision-600 mb-4">
                    Advanced ML algorithms for intelligent data processing and
                    analysis.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-label text-brand-precision-500">
                      BETA FEATURE
                    </span>
                    <div className="w-8 h-8 bg-brand-target-500/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-brand-target-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  STATS CARD
                </h3>
                <div className="card-brand p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-title text-brand-precision-900">
                      Performance
                    </h4>
                    <span className="status-info px-3 py-1 rounded-full text-xs">
                      LIVE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-target-500">
                        99.9%
                      </div>
                      <div className="text-caption text-brand-precision-500">
                        Uptime
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-spear-500">
                        2.3ms
                      </div>
                      <div className="text-caption text-brand-precision-500">
                        Latency
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-brand-precision-200 rounded-full h-2">
                    <div className="bg-gradient-brand h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* Alert Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  ALERT CARD
                </h3>
                <div className="card-brand p-6 border-l-4 border-brand-spear-500">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-brand-spear-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-brand-spear-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-title text-brand-precision-900 mb-1">
                        System Alert
                      </h4>
                      <p className="text-body text-brand-precision-600 mb-3">
                        High CPU usage detected on server cluster. Consider
                        scaling resources.
                      </p>
                      <div className="flex gap-2">
                        <button className="btn-brand-accent text-sm px-4 py-2">
                          Resolve
                        </button>
                        <button className="btn-brand-ghost text-sm px-4 py-2">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Button Components */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                BUTTON COMPONENTS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-title font-semibold text-brand-target-200">
                  BUTTON VARIANTS
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-brand-primary">Primary</button>
                    <button className="btn-brand-secondary">Secondary</button>
                    <button className="btn-brand-accent">Accent</button>
                    <button className="btn-brand-ghost">Ghost</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-brand-primary text-sm px-4 py-2">
                      Small Primary
                    </button>
                    <button className="btn-brand-secondary text-sm px-4 py-2">
                      Small Secondary
                    </button>
                    <button className="btn-brand-accent text-sm px-4 py-2">
                      Small Accent
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-title font-semibold text-brand-target-200">
                  BUTTON STATES
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-brand-primary hover-lift">
                      Hover Lift
                    </button>
                    <button className="btn-brand-primary hover-glow">
                      Hover Glow
                    </button>
                    <button className="btn-brand-primary glow-brand">
                      Glow Effect
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-brand-primary focus-brand-ring">
                      Focus Ring
                    </button>
                    <button className="btn-brand-primary animate-pulse-brand">
                      Pulsing
                    </button>
                    <button
                      className="btn-brand-primary disabled:opacity-50"
                      disabled
                    >
                      Disabled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Components */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                FORM COMPONENTS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="card-brand p-8">
                <h3 className="text-title text-brand-precision-900 mb-6">
                  Configuration Form
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-label text-brand-precision-700 mb-2 block">
                      Project Name
                    </label>
                    <input
                      className="input-brand"
                      placeholder="Enter project name..."
                      defaultValue="Spearyx Suite"
                    />
                  </div>
                  <div>
                    <label className="text-label text-brand-precision-700 mb-2 block">
                      Environment
                    </label>
                    <select className="input-brand">
                      <option>Production</option>
                      <option>Staging</option>
                      <option>Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-label text-brand-precision-700 mb-2 block">
                      Error State Example
                    </label>
                    <input
                      className="input-brand-error"
                      placeholder="This field has an error..."
                      defaultValue="Invalid input"
                    />
                    <p className="text-caption text-red-500 mt-1">
                      This field is required
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn-brand-primary">
                      Save Configuration
                    </button>
                    <button className="btn-brand-ghost">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Badge Components */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                BADGE COMPONENTS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-title font-semibold text-brand-target-200">
                  BADGE VARIANTS
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="badge-brand-primary">Primary</span>
                  <span className="badge-brand-secondary">Secondary</span>
                  <span className="badge-brand-accent">Accent</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-title font-semibold text-brand-target-200">
                  STATUS BADGES
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="status-success px-3 py-1 rounded-full text-sm">
                    Success
                  </span>
                  <span className="status-warning px-3 py-1 rounded-full text-sm">
                    Warning
                  </span>
                  <span className="status-error px-3 py-1 rounded-full text-sm">
                    Error
                  </span>
                  <span className="status-info px-3 py-1 rounded-full text-sm">
                    Info
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Effect Examples */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                VISUAL EFFECTS
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Gradient Text */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  GRADIENT TEXT
                </h3>
                <div className="text-4xl font-black text-gradient-brand">
                  GRADIENT
                </div>
                <div className="text-2xl font-bold text-gradient-brand-reverse">
                  REVERSE
                </div>
              </div>

              {/* Glow Effects */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  GLOW EFFECTS
                </h3>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-target-500 rounded-lg glow-brand mx-auto"></div>
                  <div className="w-16 h-16 bg-brand-spear-500 rounded-lg glow-spear mx-auto"></div>
                </div>
              </div>

              {/* Shadows */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  SHADOWS
                </h3>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-target-500 rounded-lg shadow-brand mx-auto"></div>
                  <div className="w-16 h-16 bg-brand-spear-500 rounded-lg shadow-spear mx-auto"></div>
                </div>
              </div>

              {/* Animations */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-brand-target-200">
                  ANIMATIONS
                </h3>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-target-500 rounded-lg animate-pulse-brand mx-auto"></div>
                  <div className="w-16 h-16 bg-brand-spear-500 rounded-lg animate-glow-pulse mx-auto"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline font-bold text-brand-target-100 mb-4">
                USAGE GUIDELINES
              </h2>
              <div className="accent-line w-24 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-brand-precision-950/50 rounded-2xl p-8 border border-brand-precision-800/30">
                <h3 className="text-title font-semibold text-brand-target-200 mb-4">
                  COLOR USAGE
                </h3>
                <ul className="space-y-2 text-brand-precision-300">
                  <li>• Use Target Blue for primary actions and highlights</li>
                  <li>• Use Spear Orange for accents and call-to-actions</li>
                  <li>• Use Precision Grays for text hierarchy</li>
                  <li>• Maintain 4.5:1 contrast ratio for accessibility</li>
                </ul>
              </div>

              <div className="bg-brand-precision-950/50 rounded-2xl p-8 border border-brand-precision-800/30">
                <h3 className="text-title font-semibold text-brand-target-200 mb-4">
                  TYPOGRAPHY RULES
                </h3>
                <ul className="space-y-2 text-brand-precision-300">
                  <li>• Use font-black for maximum impact headlines</li>
                  <li>• Use font-bold for section headers</li>
                  <li>• Use font-mono for technical labels</li>
                  <li>• Maintain consistent line-height for readability</li>
                </ul>
              </div>

              <div className="bg-brand-precision-950/50 rounded-2xl p-8 border border-brand-precision-800/30">
                <h3 className="text-title font-semibold text-brand-target-200 mb-4">
                  SPACING SYSTEM
                </h3>
                <ul className="space-y-2 text-brand-precision-300">
                  <li>• Use 8px base unit for consistent spacing</li>
                  <li>• Apply space-4 for standard component spacing</li>
                  <li>• Use space-8 for section separation</li>
                  <li>• Maintain visual rhythm with consistent spacing</li>
                </ul>
              </div>

              <div className="bg-brand-precision-950/50 rounded-2xl p-8 border border-brand-precision-800/30">
                <h3 className="text-title font-semibold text-brand-target-200 mb-4">
                  COMPONENT PATTERNS
                </h3>
                <ul className="space-y-2 text-brand-precision-300">
                  <li>• Use rounded-2xl for card components</li>
                  <li>• Apply backdrop-blur for glass effects</li>
                  <li>• Use gradient text for brand emphasis</li>
                  <li>• Maintain consistent hover states</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
