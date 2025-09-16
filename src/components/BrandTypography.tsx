import React from 'react';

import { cn } from '../lib/utils';

// Typography Component Types
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

// Typography Variants based on existing Tailwind config
type TypographyVariant =
  // Mission-Critical (Hero) Typography
  | 'mission-briefing'      // 4.5rem, font-900, max impact
  | 'command-directive'     // 2.25rem, font-700, commanding presence
  | 'tactical-heading'      // 1.875rem, font-600, section headers
  | 'operational-title'     // 1.5rem, font-600, component titles

  // Strategic Content Typography
  | 'strategic-body'        // 1.25rem, font-400, main content
  | 'field-report'          // 1rem, font-400, standard text
  | 'intelligence-brief'    // 0.875rem, font-400, secondary content
  | 'status-indicator'      // 0.75rem, font-500, labels & status

  // Standard Tailwind Sizes (for compatibility)
  | 'hero'                  // text-7xl/8xl (for hero text)
  | 'display'               // text-5xl/6xl (for display text)
  | 'headline'              // text-3xl/4xl (for major headings)
  | 'title'                 // text-xl/2xl (for card titles)
  | 'body-lg'               // text-lg (for large body text)
  | 'body'                  // text-base (for standard body text)
  | 'caption'               // text-sm (for captions)
  | 'label'                 // text-xs (for labels)

  // Additional Military-Themed Variants
  | 'briefing-title'        // For mission briefings
  | 'directive-text'        // For operational directives
  | 'tactical-subtitle'     // For tactical subtitles
  | 'strategic-lead'        // For strategic leading text
  | 'intelligence-note'     // For intelligence notes
  | 'status-badge'          // For status indicators
  | 'command-label'         // For command labels
  | 'field-note'            // For field notes

  // Header Styles (used in typography library)
  | 'section-header'         // For section headers (h2)
  | 'subsection-header'      // For subsection headers (h3)

  // Gradient Text Styles
  | 'gradient-command'       // Command blue to tactical orange gradient
  | 'gradient-hero'          // Hero gradient for main titles;

// Typography Component
const BrandTypography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'field-report', as: Component = 'span', children, className, ...props }, ref) => {
    // Base classes for all typography
    const baseClasses = 'font-inter';

    // Variant-specific classes
    const variantClasses = {
      // Mission-Critical Typography (using custom Tailwind classes)
      'mission-briefing': 'text-mission-briefing font-black text-command-100 tracking-tight',
      'command-directive': 'text-command-directive font-bold text-command-200',
      'tactical-heading': 'text-tactical-heading font-semibold text-tactical-200',
      'operational-title': 'text-operational-title font-semibold text-strategic-200',

      // Strategic Content Typography
      'strategic-body': 'text-strategic-body text-strategic-200 leading-relaxed',
      'field-report': 'text-field-report text-strategic-300 leading-relaxed',
      'intelligence-brief': 'text-intelligence-brief text-strategic-400 leading-normal',
      'status-indicator': 'text-status-indicator font-medium text-command-300 uppercase tracking-wider',

      // Standard Tailwind Sizes with Brand Colors
      'hero': 'text-7xl font-black text-command-100 tracking-tight',
      'display': 'text-5xl font-bold text-command-200 tracking-tight',
      'headline': 'text-3xl font-semibold text-tactical-200',
      'title': 'text-xl font-semibold text-strategic-200',
      'body-lg': 'text-lg text-strategic-300 leading-relaxed',
      'body': 'text-base text-strategic-300 leading-relaxed',
      'caption': 'text-sm text-strategic-400 leading-normal',
      'label': 'text-xs font-medium text-strategic-500 uppercase tracking-wide',

      // Additional Military-Themed Variants
      'briefing-title': 'text-4xl font-bold text-command-100 tracking-tight',
      'directive-text': 'text-2xl font-semibold text-tactical-200',
      'tactical-subtitle': 'text-lg font-medium text-tactical-300',
      'strategic-lead': 'text-xl text-strategic-200 leading-loose font-medium',
      'intelligence-note': 'text-sm text-strategic-400 leading-normal font-medium',
      'status-badge': 'text-xs font-bold text-command-400 uppercase tracking-widest',
      'command-label': 'text-xs font-semibold text-strategic-400 uppercase tracking-wide',
      'field-note': 'text-sm text-strategic-500 leading-normal',

      // Header Styles (used in typography library)
      'section-header': 'text-tactical-heading font-bold text-command-200',
      'subsection-header': 'text-operational-title font-semibold text-strategic-200',

      // Gradient Text Styles
      'gradient-command': 'bg-gradient-to-r from-command-400 via-tactical-400 to-command-600 bg-clip-text text-transparent font-black',
    };

    return (
      <Component
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BrandTypography.displayName = 'BrandTypography';

// Specialized Typography Components for specific use cases
interface MissionBriefingProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="mission-briefing" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface CommandDirectiveProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const CommandDirective: React.FC<CommandDirectiveProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="command-directive" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface TacticalHeadingProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const TacticalHeading: React.FC<TacticalHeadingProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="tactical-heading" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface OperationalTitleProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const OperationalTitle: React.FC<OperationalTitleProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="operational-title" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface StrategicBodyProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const StrategicBody: React.FC<StrategicBodyProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="strategic-body" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface FieldReportProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const FieldReport: React.FC<FieldReportProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="field-report" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface IntelligenceBriefProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const IntelligenceBrief: React.FC<IntelligenceBriefProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="intelligence-brief" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface StatusIndicatorProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="status-indicator" className={className} {...props}>
    {children}
  </BrandTypography>
);

// Header Components
interface SectionHeaderProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="section-header" as="h2" className={className} {...props}>
    {children}
  </BrandTypography>
);

interface SubsectionHeaderProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const SubsectionHeader: React.FC<SubsectionHeaderProps> = ({
  children,
  className,
  ...props
}) => (
  <BrandTypography variant="subsection-header" as="h3" className={className} {...props}>
    {children}
  </BrandTypography>
);

// Gradient Text Components
interface GradientCommandProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const GradientCommand: React.FC<GradientCommandProps> = ({
  children,
  className,
  ...props
}) => {
  const baseClasses = 'font-inter';
  const variantClasses = 'font-black';

  return (
    <span
      className={cn(baseClasses, variantClasses, className)}
      style={{
        background: 'linear-gradient(90deg, #38bdf8 0%, #fb923c 50%, #0ea5e9 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        MozBackgroundClip: 'text',
        MozTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: '#38bdf8', // Fallback color for browsers that don't support gradient text
        display: 'inline-block',
      }}
      {...props}
    >
      {children}
    </span>
  );
};

interface GradientHeroProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  className?: string;
}

export const GradientHero: React.FC<GradientHeroProps> = ({
  children,
  className,
  ...props
}) => {
  const baseClasses = 'font-inter';
  const variantClasses = 'text-mission-briefing font-black';

  return (
    <h1
      className={cn(baseClasses, variantClasses, className)}
      style={{
        background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 50%, #fb923c 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        MozBackgroundClip: 'text',
        MozTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: '#0ea5e9', // Fallback color for browsers that don't support gradient text
        display: 'inline-block',
      }}
      {...props}
    >
      {children}
    </h1>
  );
};

// Typography Showcase Component for demonstrating all variants
interface TypographyShowcaseProps {
  className?: string;
}

export const TypographyShowcase: React.FC<TypographyShowcaseProps> = ({
  className
}) => {
  const typographyVariants: Array<{
    variant: TypographyVariant;
    name: string;
    description: string;
    example: string;
  }> = [
    {
      variant: 'mission-briefing',
      name: 'Mission Briefing',
      description: 'Maximum impact hero text for major announcements',
      example: 'TARGET ACQUIRED'
    },
    {
      variant: 'command-directive',
      name: 'Command Directive',
      description: 'Authoritative headings for key sections',
      example: 'EXECUTION PARAMETERS'
    },
    {
      variant: 'tactical-heading',
      name: 'Tactical Heading',
      description: 'Section headers with tactical emphasis',
      example: 'Operational Overview'
    },
    {
      variant: 'operational-title',
      name: 'Operational Title',
      description: 'Component titles and feature names',
      example: 'Project Control Center'
    },
    {
      variant: 'strategic-body',
      name: 'Strategic Body',
      description: 'Primary content text with strategic tone',
      example: 'Precision-engineered microtools for project management excellence.'
    },
    {
      variant: 'field-report',
      name: 'Field Report',
      description: 'Standard body text for detailed content',
      example: 'Advanced pattern recognition and predictive insights for superior decision-making.'
    },
    {
      variant: 'intelligence-brief',
      name: 'Intelligence Brief',
      description: 'Secondary content and detailed information',
      example: 'Real-time analytics and KPI tracking with intelligent alerts.'
    },
    {
      variant: 'status-indicator',
      name: 'Status Indicator',
      description: 'Labels, badges, and status information',
      example: 'ACTIVE MISSION'
    },
    {
      variant: 'hero',
      name: 'Hero Text',
      description: 'Large display text for marketing',
      example: 'SPEARYX SUITE'
    },
    {
      variant: 'display',
      name: 'Display Text',
      description: 'Prominent headings for major sections',
      example: 'TACTICAL ARSENAL'
    },
    {
      variant: 'headline',
      name: 'Headline',
      description: 'Major section headers',
      example: 'RAPID DEPLOYMENT'
    },
    {
      variant: 'title',
      name: 'Title',
      description: 'Card and component titles',
      example: 'Feature Module'
    },
    {
      variant: 'body-lg',
      name: 'Body Large',
      description: 'Large body text for emphasis',
      example: 'Advanced targeting system with real-time analytics.'
    },
    {
      variant: 'body',
      name: 'Body',
      description: 'Standard body text',
      example: 'Precision-engineered tools for project management.'
    },
    {
      variant: 'caption',
      name: 'Caption',
      description: 'Image captions and secondary text',
      example: 'Status indicators and descriptions'
    },
    {
      variant: 'label',
      name: 'Label',
      description: 'Form labels and small text',
      example: 'CLASSIFIED ACCESS'
    },
    {
      variant: 'section-header',
      name: 'Section Header',
      description: 'Major section headers with tactical emphasis',
      example: 'TYPOGRAPHY SCALE'
    },
    {
      variant: 'subsection-header',
      name: 'Subsection Header',
      description: 'Subsection headers for organizing content',
      example: 'USAGE EXAMPLES'
    },
    {
      variant: 'gradient-command',
      name: 'Gradient Command',
      description: 'Command blue to tactical orange gradient text',
      example: 'GRADIENT TEXT'
    },
  ];

  return (
    <div className={cn('space-y-8', className)}>
      {typographyVariants.map(({ variant, name, description, example }) => (
        <div
          key={variant}
          className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-mono text-sm text-command-300">{variant}</div>
              <div className="text-sm font-medium text-tactical-300">{name}</div>
            </div>
            <div className="text-xs text-strategic-400">{description}</div>
          </div>
          {variant === 'gradient-command' ? (
            <GradientCommand>{example}</GradientCommand>
          ) : (
            <BrandTypography variant={variant}>
              {example}
            </BrandTypography>
          )}
        </div>
      ))}

      {/* Special case for Gradient Hero */}
      <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-sm text-command-300">gradient-hero</div>
            <div className="text-sm font-medium text-tactical-300">Gradient Hero</div>
          </div>
          <div className="text-xs text-strategic-400">Hero gradient for main titles with mission briefing size</div>
        </div>
        <GradientHero>SPEARYX TYPOGRAPHY</GradientHero>
      </div>
    </div>
  );
};

// Export the main component
export { BrandTypography };

// Export types
    export type { TypographyProps, TypographyVariant };

