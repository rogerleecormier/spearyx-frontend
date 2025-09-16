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
      '#f0f9ff': 'bg-command-50',
      '#e0f2fe': 'bg-command-100',
      '#bae6fd': 'bg-command-200',
      '#7dd3fc': 'bg-command-300',
      '#38bdf8': 'bg-command-400',
      '#0ea5e9': 'bg-command-500',
      '#0284c7': 'bg-command-600',
      '#0369a1': 'bg-command-700',
      '#075985': 'bg-command-800',
      '#0c4a6e': 'bg-command-900',
      '#082f49': 'bg-command-950',
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
      '#f8fafc': 'bg-strategic-50',
      '#f1f5f9': 'bg-strategic-100',
      '#e2e8f0': 'bg-strategic-200',
      '#cbd5e1': 'bg-strategic-300',
      '#94a3b8': 'bg-strategic-400',
      '#64748b': 'bg-strategic-500',
      '#475569': 'bg-strategic-600',
      '#334155': 'bg-strategic-700',
      '#1e293b': 'bg-strategic-800',
      '#0f172a': 'bg-strategic-900',
      '#020617': 'bg-strategic-950',
    };
    return colorMap[colorValue] || 'bg-strategic-500';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'h-16 w-full rounded-lg border border-strategic-800/50 shadow-lg',
          getColorClass(value)
        )}
      />
      <div className="space-y-1">
        <div className="font-mono text-sm text-command-200">{name}</div>
        <div className="font-mono text-xs text-strategic-400">
          {value}
        </div>
        {description && (
          <div className="text-xs text-strategic-300">{description}</div>
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
  <div className="space-y-4 overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-6">
    <div className="font-mono text-xs text-strategic-400">{variant}</div>
    <div className={cn(className, 'break-words')}>{example}</div>
    <div className="text-xs text-strategic-300">{description}</div>
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
  <div className="rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-4">
    <div className="mb-2 flex items-center justify-between">
      <div className="font-mono text-sm text-command-200">{name}</div>
      <div className="font-mono text-xs text-strategic-400">{value}</div>
    </div>
    {example && <div className="mb-2">{example}</div>}
    {description && (
      <div className="text-xs text-strategic-300">{description}</div>
    )}
  </div>
);

export const BrandStyleLibrary: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-strategic-950 via-strategic-900 to-strategic-950">
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Header */}
          <div className="space-y-8 text-center">
            <h1 className="text-gradient-brand text-hero font-black">
              SPEARYX BRAND STYLE LIBRARY
            </h1>
            <p className="mx-auto max-w-4xl text-body-lg text-strategic-200">
              Comprehensive design system for precision-engineered microtools.
              Tactical clarity through consistent visual language.
            </p>
          </div>

          {/* Primary Brand Colors */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="mb-4 text-headline font-bold text-command-100">
                PRIMARY BRAND COLORS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Target Colors */}
              <div className="space-y-4">
                <h3 className="mb-4 text-title font-semibold text-command-200">
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
                <h3 className="mb-4 text-title text-brand-spear-200">
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
                <h3 className="mb-4 text-title text-strategic-200">
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
              <h2 className="mb-4 text-headline font-bold text-command-100">
                TYPOGRAPHY SCALE
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TypographyExample
                variant="text-hero (Hero Headlines)"
                className="text-gradient-brand !text-hero font-black"
                example="SPEARYX SUITE"
                description="Main brand headlines, maximum impact"
              />
              <TypographyExample
                variant="text-display (Display Text)"
                className="!text-display font-bold text-command-100"
                example="TACTICAL ARSENAL"
                description="Display text and major headings"
              />
              <TypographyExample
                variant="text-headline (Section Headers)"
                className="!text-headline font-bold text-command-200"
                example="RAPID DEPLOYMENT"
                description="Section headers and major headings"
              />
              <TypographyExample
                variant="text-title (Card Titles)"
                className="!text-title font-semibold text-command-200"
                example="FEATURE MODULE"
                description="Card titles and feature names"
              />
              <TypographyExample
                variant="text-body-lg (Body Large)"
                className="!text-body-lg text-strategic-200"
                example="Precision-engineered microtools"
                description="Large body text and descriptions"
              />
              <TypographyExample
                variant="text-body (Body Regular)"
                className="!text-body text-strategic-300"
                example="Advanced pattern recognition and predictive insights"
                description="Standard body text and descriptions"
              />
              <TypographyExample
                variant="text-caption (Captions)"
                className="!text-caption text-strategic-400"
                example="Status indicators and descriptions"
                description="Captions and secondary text"
              />
              <TypographyExample
                variant="text-label (Labels)"
                className="!text-label font-medium uppercase text-strategic-500"
                example="CLASSIFIED ACCESS // FIRST 100"
                description="Labels, captions, and technical text"
              />
            </div>
          </section>

          {/* Design Tokens */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="mb-4 text-headline font-bold text-command-100">
                DESIGN TOKENS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Spacing */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  SPACING
                </h3>
                <DesignToken
                  name="space-1"
                  value="0.25rem"
                  example={<div className="h-4 w-1 bg-command-500" />}
                  description="4px - Fine adjustments"
                />
                <DesignToken
                  name="space-2"
                  value="0.5rem"
                  example={<div className="h-4 w-2 bg-command-500" />}
                  description="8px - Small spacing"
                />
                <DesignToken
                  name="space-4"
                  value="1rem"
                  example={<div className="h-4 w-4 bg-command-500" />}
                  description="16px - Standard spacing"
                />
                <DesignToken
                  name="space-8"
                  value="2rem"
                  example={<div className="h-4 w-8 bg-command-500" />}
                  description="32px - Large spacing"
                />
              </div>

              {/* Border Radius */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  BORDER RADIUS
                </h3>
                <DesignToken
                  name="rounded-sm"
                  value="0.125rem"
                  example={
                    <div className="h-8 w-16 rounded-sm bg-command-500" />
                  }
                  description="2px - Subtle rounding"
                />
                <DesignToken
                  name="rounded-lg"
                  value="0.5rem"
                  example={
                    <div className="h-8 w-16 rounded-lg bg-command-500" />
                  }
                  description="8px - Standard rounding"
                />
                <DesignToken
                  name="rounded-2xl"
                  value="1rem"
                  example={
                    <div className="h-8 w-16 rounded-2xl bg-command-500" />
                  }
                  description="16px - Card rounding"
                />
                <DesignToken
                  name="rounded-full"
                  value="9999px"
                  example={
                    <div className="h-8 w-16 rounded-full bg-command-500" />
                  }
                  description="Pills and buttons"
                />
              </div>

              {/* Shadows */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  SHADOWS
                </h3>
                <DesignToken
                  name="shadow-sm"
                  value="0 1px 2px 0 rgb(0 0 0 / 0.05)"
                  example={
                    <div className="h-8 w-16 rounded bg-command-500 shadow-sm" />
                  }
                  description="Subtle elevation"
                />
                <DesignToken
                  name="shadow-lg"
                  value="0 10px 15px -3px rgb(0 0 0 / 0.1)"
                  example={
                    <div className="h-8 w-16 rounded bg-command-500 shadow-lg" />
                  }
                  description="Card elevation"
                />
                <DesignToken
                  name="shadow-2xl"
                  value="0 25px 50px -12px rgb(0 0 0 / 0.25)"
                  example={
                    <div className="h-8 w-16 rounded bg-command-500 shadow-2xl" />
                  }
                  description="High elevation"
                />
              </div>
            </div>
          </section>

          {/* Card Components */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="mb-4 text-headline font-bold text-command-100">
                CARD COMPONENTS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Standard Brand Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  STANDARD CARD
                </h3>
                <div className="card-brand p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-title text-strategic-900">
                      Tactical Module
                    </h4>
                    <span className="badge-brand-primary">ACTIVE</span>
                  </div>
                  <p className="mb-4 text-body text-strategic-600">
                    Precision-engineered microtools for advanced pattern
                    recognition and deployment.
                  </p>
                  <div className="flex gap-2">
                    <button className="btn-brand-primary px-4 py-2 text-sm">
                      Deploy
                    </button>
                    <button className="btn-brand-ghost px-4 py-2 text-sm">
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              {/* Elevated Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  ELEVATED CARD
                </h3>
                <div className="card-brand-elevated p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-gradient-brand flex h-10 w-10 items-center justify-center rounded-lg">
                      <span className="text-lg font-bold text-white">S</span>
                    </div>
                    <div>
                      <h4 className="text-title text-strategic-900">
                        Spearyx Suite
                      </h4>
                      <p className="text-caption text-strategic-500">
                        Version 2.1.0
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-body text-strategic-600">
                    Advanced targeting system with real-time analytics and
                    predictive insights.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="status-success rounded-full px-3 py-1 text-xs">
                      ONLINE
                    </span>
                    <button className="btn-brand-accent px-4 py-2 text-sm">
                      Launch
                    </button>
                  </div>
                </div>
              </div>

              {/* Glass Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  GLASS CARD
                </h3>
                <div className="card-brand-glass p-6">
                  <h4 className="text-gradient-brand mb-3 text-headline">
                    RAPID DEPLOY
                  </h4>
                  <p className="mb-4 text-body text-strategic-300">
                    Instant deployment with zero-downtime updates and automatic
                    scaling.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse-brand rounded-full bg-command-500"></div>
                      <span className="text-caption text-strategic-400">
                        Real-time monitoring
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse-brand rounded-full bg-brand-spear-500"></div>
                      <span className="text-caption text-strategic-400">
                        Auto-scaling enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  FEATURE CARD
                </h3>
                <div className="card-brand cursor-pointer p-6 hover-lift">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-command-500/10">
                    <div className="h-6 w-6 rounded bg-command-500"></div>
                  </div>
                  <h4 className="mb-2 text-title text-strategic-900">
                    Pattern Recognition
                  </h4>
                  <p className="mb-4 text-body text-strategic-600">
                    Advanced ML algorithms for intelligent data processing and
                    analysis.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-label text-strategic-500">
                      BETA FEATURE
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-command-500/20">
                      <div className="h-2 w-2 rounded-full bg-command-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  STATS CARD
                </h3>
                <div className="card-brand p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-title text-strategic-900">
                      Performance
                    </h4>
                    <span className="status-info rounded-full px-3 py-1 text-xs">
                      LIVE
                    </span>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-command-500">
                        99.9%
                      </div>
                      <div className="text-caption text-strategic-500">
                        Uptime
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-spear-500">
                        2.3ms
                      </div>
                      <div className="text-caption text-strategic-500">
                        Latency
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-strategic-200">
                    <div className="bg-gradient-brand h-2 w-4/5 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Alert Card */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  ALERT CARD
                </h3>
                <div className="card-brand border-l-4 border-brand-spear-500 p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-spear-500/20">
                      <div className="h-2 w-2 rounded-full bg-brand-spear-500"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 text-title text-strategic-900">
                        System Alert
                      </h4>
                      <p className="mb-3 text-body text-strategic-600">
                        High CPU usage detected on server cluster. Consider
                        scaling resources.
                      </p>
                      <div className="flex gap-2">
                        <button className="btn-brand-accent px-4 py-2 text-sm">
                          Resolve
                        </button>
                        <button className="btn-brand-ghost px-4 py-2 text-sm">
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
              <h2 className="mb-4 text-headline font-bold text-command-100">
                BUTTON COMPONENTS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-title font-semibold text-command-200">
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
                    <button className="btn-brand-primary px-4 py-2 text-sm">
                      Small Primary
                    </button>
                    <button className="btn-brand-secondary px-4 py-2 text-sm">
                      Small Secondary
                    </button>
                    <button className="btn-brand-accent px-4 py-2 text-sm">
                      Small Accent
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-title font-semibold text-command-200">
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
              <h2 className="mb-4 text-headline font-bold text-command-100">
                FORM COMPONENTS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="mx-auto max-w-2xl">
              <div className="card-brand p-8">
                <h3 className="mb-6 text-title text-strategic-900">
                  Configuration Form
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-label text-strategic-700">
                      Project Name
                    </label>
                    <input
                      className="input-brand"
                      placeholder="Enter project name..."
                      defaultValue="Spearyx Suite"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-label text-strategic-700">
                      Environment
                    </label>
                    <select className="input-brand">
                      <option>Production</option>
                      <option>Staging</option>
                      <option>Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-label text-strategic-700">
                      Error State Example
                    </label>
                    <input
                      className="input-brand-error"
                      placeholder="This field has an error..."
                      defaultValue="Invalid input"
                    />
                    <p className="mt-1 text-caption text-red-500">
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
              <h2 className="mb-4 text-headline font-bold text-command-100">
                BADGE COMPONENTS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-title font-semibold text-command-200">
                  BADGE VARIANTS
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="badge-brand-primary">Primary</span>
                  <span className="badge-brand-secondary">Secondary</span>
                  <span className="badge-brand-accent">Accent</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-title font-semibold text-command-200">
                  STATUS BADGES
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="status-success rounded-full px-3 py-1 text-sm">
                    Success
                  </span>
                  <span className="status-warning rounded-full px-3 py-1 text-sm">
                    Warning
                  </span>
                  <span className="status-error rounded-full px-3 py-1 text-sm">
                    Error
                  </span>
                  <span className="status-info rounded-full px-3 py-1 text-sm">
                    Info
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Effect Examples */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="mb-4 text-headline font-bold text-command-100">
                VISUAL EFFECTS
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Gradient Text */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  GRADIENT TEXT
                </h3>
                <div className="text-gradient-brand text-4xl font-black">
                  GRADIENT
                </div>
                <div className="text-gradient-brand-reverse text-2xl font-bold">
                  REVERSE
                </div>
              </div>

              {/* Glow Effects */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  GLOW EFFECTS
                </h3>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-lg bg-command-500 glow-brand"></div>
                  <div className="mx-auto h-16 w-16 rounded-lg bg-brand-spear-500 glow-spear"></div>
                </div>
              </div>

              {/* Shadows */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  SHADOWS
                </h3>
                <div className="space-y-4">
                  <div className="shadow-brand mx-auto h-16 w-16 rounded-lg bg-command-500"></div>
                  <div className="shadow-spear mx-auto h-16 w-16 rounded-lg bg-brand-spear-500"></div>
                </div>
              </div>

              {/* Animations */}
              <div className="space-y-4">
                <h3 className="text-title font-semibold text-command-200">
                  ANIMATIONS
                </h3>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 animate-pulse-brand rounded-lg bg-command-500"></div>
                  <div className="mx-auto h-16 w-16 animate-glow-pulse rounded-lg bg-brand-spear-500"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="mb-4 text-headline font-bold text-command-100">
                USAGE GUIDELINES
              </h2>
              <div className="mx-auto w-24 accent-line" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-strategic-800/30 bg-strategic-950/50 p-8">
                <h3 className="mb-4 text-title font-semibold text-command-200">
                  COLOR USAGE
                </h3>
                <ul className="space-y-2 text-strategic-300">
                  <li>• Use Target Blue for primary actions and highlights</li>
                  <li>• Use Spear Orange for accents and call-to-actions</li>
                  <li>• Use Precision Grays for text hierarchy</li>
                  <li>• Maintain 4.5:1 contrast ratio for accessibility</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-800/30 bg-strategic-950/50 p-8">
                <h3 className="mb-4 text-title font-semibold text-command-200">
                  TYPOGRAPHY RULES
                </h3>
                <ul className="space-y-2 text-strategic-300">
                  <li>• Use font-black for maximum impact headlines</li>
                  <li>• Use font-bold for section headers</li>
                  <li>• Use font-mono for technical labels</li>
                  <li>• Maintain consistent line-height for readability</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-800/30 bg-strategic-950/50 p-8">
                <h3 className="mb-4 text-title font-semibold text-command-200">
                  SPACING SYSTEM
                </h3>
                <ul className="space-y-2 text-strategic-300">
                  <li>• Use 8px base unit for consistent spacing</li>
                  <li>• Apply space-4 for standard component spacing</li>
                  <li>• Use space-8 for section separation</li>
                  <li>• Maintain visual rhythm with consistent spacing</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-800/30 bg-strategic-950/50 p-8">
                <h3 className="mb-4 text-title font-semibold text-command-200">
                  COMPONENT PATTERNS
                </h3>
                <ul className="space-y-2 text-strategic-300">
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
