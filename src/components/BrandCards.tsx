import React from 'react';

import { cn } from '@/lib/utils';
import {
  BrandTypography,
  CommandDirective,
  FieldReport,
  IntelligenceBrief,
  OperationalTitle,
  StatusIndicator,
  StrategicBody,
  TacticalHeading,
} from './BrandTypography';

// Base Card Component - Simplified to match ComingSoon style
interface BrandCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'command'
    | 'tactical'
    | 'strategic'
    | 'intelligence'
    | 'glass'
    | 'mission'
    | 'alert'
    | 'stats';
  status?:
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'active'
    | 'standby'
    | 'maintenance'
    | 'planned'
    | 'completed'
    | 'failed';
  children?: React.ReactNode;
}

const BrandCard = React.forwardRef<HTMLDivElement, BrandCardProps>(
  ({ className, variant = 'command', status, children, ...props }, ref) => {
    // Simplified styling to match ComingSoon component
    const baseClasses = 'card-brand group';

    // Simple accent styling for different variants
    const variantClasses = {
      command: 'hover:border-command-500/30',
      tactical: 'hover:border-tactical-500/30',
      strategic: 'hover:border-strategic-500/30',
      intelligence: cn(
        status === 'success' &&
          'border-intelligence-success-200/30 hover:border-intelligence-success-400/50',
        status === 'warning' &&
          'border-intelligence-warning-200/30 hover:border-intelligence-warning-400/50',
        status === 'danger' &&
          'border-intelligence-danger-200/30 hover:border-intelligence-danger-400/50',
        status === 'info' && 'border-command-200/30 hover:border-command-500/50'
      ),
      glass:
        'bg-gradient-to-br from-strategic-950/60 to-strategic-900/60 backdrop-blur-xl',
      mission: 'border-l-4 border-l-command-500 hover:border-l-command-600',
      alert: 'border-l-4 border-l-tactical-500 hover:border-l-tactical-600',
      stats: 'hover:border-strategic-500/50',
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BrandCard.displayName = 'BrandCard';

// Command Card Variants - Simplified styling
interface CommandCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  description: string;
  status?: 'active' | 'standby' | 'maintenance';
  metrics?: { label: string; value: string }[];
  actions?: React.ReactNode;
}

export const CommandCard: React.FC<CommandCardProps> = ({
  title,
  description,
  status = 'active',
  metrics,
  actions,
  className,
  ...props
}) => {
  const statusColors = {
    active: 'text-intelligence-success-400',
    standby: 'text-intelligence-warning-400',
    maintenance: 'text-intelligence-danger-400',
  };

  return (
    <BrandCard variant="command" className={className} {...props}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <OperationalTitle as="h3">{title}</OperationalTitle>
            <FieldReport>{description}</FieldReport>
          </div>
          <StatusIndicator className={statusColors[status]}>
            {status}
          </StatusIndicator>
        </div>

        {metrics && (
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <BrandTypography
                  variant="command-directive"
                  className="text-command-300"
                >
                  {metric.value}
                </BrandTypography>
                <IntelligenceBrief>{metric.label}</IntelligenceBrief>
              </div>
            ))}
          </div>
        )}

        {actions && (
          <div className="flex gap-3 border-t border-strategic-700/30 pt-4">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Tactical Card Variants - Simplified styling
interface TacticalCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  objective: string;
  threatLevel?: 'low' | 'medium' | 'high' | 'critical';
  progress?: number;
  team?: string;
  actions?: React.ReactNode;
}

export const TacticalCard: React.FC<TacticalCardProps> = ({
  title,
  objective,
  threatLevel = 'medium',
  progress,
  team,
  actions,
  className,
  ...props
}) => {
  const threatColors = {
    low: 'text-intelligence-success-400 bg-intelligence-success-500/10',
    medium: 'text-intelligence-warning-400 bg-intelligence-warning-500/10',
    high: 'text-tactical-400 bg-tactical-500/10',
    critical: 'text-intelligence-danger-400 bg-intelligence-danger-500/10',
  };

  return (
    <BrandCard variant="tactical" className={className} {...props}>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <OperationalTitle as="h3">{title}</OperationalTitle>
            <div
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold uppercase',
                threatColors[threatLevel]
              )}
            >
              {threatLevel}
            </div>
          </div>
          <FieldReport>{objective}</FieldReport>
        </div>

        {progress !== undefined && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <IntelligenceBrief>Progress</IntelligenceBrief>
              <IntelligenceBrief>{progress}%</IntelligenceBrief>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-strategic-700/30">
              <div
                className={cn(
                  'h-full bg-gradient-to-r from-tactical-400 to-tactical-600 transition-all duration-500'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {(team || actions) && (
          <div className="flex items-center justify-between border-t border-strategic-700/30 pt-4">
            {team && (
              <IntelligenceBrief>
                Team:{' '}
                <BrandTypography variant="body" className="font-medium text-command-300">
                  {team}
                </BrandTypography>
              </IntelligenceBrief>
            )}
            {actions && <div className="flex gap-3">{actions}</div>}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Strategic Card Variants - Simplified styling
interface StrategicCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  overview: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  stakeholders?: string[];
  actions?: React.ReactNode;
}

export const StrategicCard: React.FC<StrategicCardProps> = ({
  title,
  overview,
  priority = 'medium',
  deadline,
  stakeholders,
  actions,
  className,
  ...props
}) => {
  const priorityColors = {
    low: 'bg-intelligence-success-500/20 text-intelligence-success-400',
    medium: 'bg-intelligence-warning-500/20 text-intelligence-warning-400',
    high: 'bg-tactical-500/20 text-tactical-400',
    critical: 'bg-intelligence-danger-500/20 text-intelligence-danger-400',
  };

  return (
    <BrandCard variant="strategic" className={className} {...props}>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <OperationalTitle as="h3">{title}</OperationalTitle>
            <div
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold uppercase',
                priorityColors[priority]
              )}
            >
              {priority}
            </div>
          </div>
          <FieldReport>{overview}</FieldReport>
        </div>

        {(deadline || stakeholders) && (
          <div className="grid grid-cols-2 gap-4 border-t border-strategic-700/30 pt-4">
            {deadline && (
              <div className="space-y-1">
                <IntelligenceBrief>Deadline</IntelligenceBrief>
                <BrandTypography variant="body" className="font-medium text-command-300">
                  {deadline}
                </BrandTypography>
              </div>
            )}
            {stakeholders && (
              <div className="space-y-1">
                <IntelligenceBrief>Stakeholders</IntelligenceBrief>
                <BrandTypography variant="body" className="font-medium text-command-300">
                  {stakeholders.slice(0, 2).join(', ')}
                  {stakeholders.length > 2 && ` +${stakeholders.length - 2}`}
                </BrandTypography>
              </div>
            )}
          </div>
        )}

        {actions && (
          <div className="flex gap-3 border-t border-strategic-700/30 pt-4">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Intelligence Card Variants - Simplified styling
interface IntelligenceCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  briefing: string;
  status: 'success' | 'warning' | 'danger' | 'info';
  source?: string;
  timestamp?: string;
  actions?: React.ReactNode;
}

export const IntelligenceCard: React.FC<IntelligenceCardProps> = ({
  title,
  briefing,
  status,
  source,
  timestamp,
  actions,
  className,
  ...props
}) => {
  const statusIcons = {
    success: '✓',
    warning: '⚠',
    danger: '⚠',
    info: 'ℹ',
  };

  const statusColors = {
    success: 'text-intelligence-success-400 bg-intelligence-success-500/20',
    warning: 'text-intelligence-warning-400 bg-intelligence-warning-500/20',
    danger: 'text-intelligence-danger-400 bg-intelligence-danger-500/20',
    info: 'text-command-400 bg-command-500/20',
  };

  return (
    <BrandCard
      variant="intelligence"
      status={status}
      className={className}
      {...props}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold',
              statusColors[status]
            )}
          >
            {statusIcons[status]}
          </div>
          <div className="flex-1 space-y-3">
            <OperationalTitle as="h3">{title}</OperationalTitle>
            <FieldReport>{briefing}</FieldReport>
          </div>
        </div>

        {(source || timestamp) && (
          <div className="flex items-center justify-between border-t border-strategic-700/30 pt-4">
            {source && (
              <IntelligenceBrief>
                Source:{' '}
                <BrandTypography variant="body" className="font-medium text-command-300">
                  {source}
                </BrandTypography>
              </IntelligenceBrief>
            )}
            {timestamp && (
              <IntelligenceBrief>{timestamp}</IntelligenceBrief>
            )}
          </div>
        )}

        {actions && (
          <div className="flex gap-3 border-t border-strategic-700/30 pt-4">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Glass Card Variants - Simplified styling
interface GlassCardProps {
  title: string;
  content?: React.ReactNode;
  accent?: 'command' | 'tactical' | 'strategic';
  className?: string;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  content,
  accent = 'command',
  className,
  children,
  ...props
}) => {
  const accentColors = {
    command: 'from-command-400/10 via-transparent to-command-600/5',
    tactical: 'from-tactical-400/10 via-transparent to-tactical-600/5',
    strategic: 'from-strategic-400/10 via-transparent to-strategic-600/5',
  };

  return (
    <BrandCard
      variant="glass"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-30',
          accentColors[accent]
        )}
      />
      <div className="relative z-10 space-y-4">
        <OperationalTitle as="h3">{title}</OperationalTitle>
        <StrategicBody className="text-strategic-200">
          {children || content}
        </StrategicBody>
      </div>
    </BrandCard>
  );
};

// Mission Card Variants - Simplified styling
interface MissionCardProps extends Omit<BrandCardProps, 'variant'> {
  missionId: string;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed' | 'failed';
  progress?: number;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  actions?: React.ReactNode;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  missionId,
  title,
  description,
  status,
  progress,
  assignedTo,
  priority = 'medium',
  actions,
  className,
  ...props
}) => {
  const statusColors = {
    planned: 'text-strategic-400',
    active: 'text-command-400',
    completed: 'text-intelligence-success-400',
    failed: 'text-intelligence-danger-400',
  };

  const priorityIcons = {
    low: '●',
    medium: '●●',
    high: '●●●',
    critical: '●●●●',
  };

  const progressWidthClass = progress ? `w-[${progress}%]` : 'w-0';

  return (
    <BrandCard variant="mission" className={className} {...props}>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <IntelligenceBrief>Mission {missionId}</IntelligenceBrief>
              <OperationalTitle as="h3">{title}</OperationalTitle>
            </div>
            <div className="text-right space-y-1">
              <BrandTypography
                variant="intelligence-brief"
                className={cn('font-bold uppercase', statusColors[status])}
              >
                {status}
              </BrandTypography>
              <BrandTypography variant="label" className="text-tactical-400">
                {priorityIcons[priority]}
              </BrandTypography>
            </div>
          </div>
          <FieldReport>{description}</FieldReport>
        </div>

        {progress !== undefined && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <IntelligenceBrief>Completion</IntelligenceBrief>
              <IntelligenceBrief>{progress}%</IntelligenceBrief>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-strategic-700/30">
              <div
                className={cn(
                  'h-full bg-gradient-to-r from-command-400 to-command-600 transition-all duration-500',
                  progressWidthClass
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {(assignedTo || actions) && (
          <div className="flex items-center justify-between border-t border-strategic-700/30 pt-4">
            {assignedTo && (
              <IntelligenceBrief>
                Assigned:{' '}
                <BrandTypography variant="body" className="font-medium text-command-300">
                  {assignedTo}
                </BrandTypography>
              </IntelligenceBrief>
            )}
            {actions && <div className="flex gap-3">{actions}</div>}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Hero Card Variants - Featured cards with gradient top border
interface HeroCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  actions?: React.ReactNode;
  gradient?: 'command' | 'tactical' | 'strategic';
}

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  badge,
  actions,
  gradient = 'command',
  className,
  ...props
}) => {
  const gradientClasses = {
    command: 'from-command-600 via-tactical-500 to-command-600',
    tactical: 'from-tactical-600 via-command-500 to-tactical-600',
    strategic: 'from-strategic-600 via-command-500 to-strategic-600',
  };

  return (
    <BrandCard className={cn('relative overflow-hidden', className)} {...props}>
      {/* Gradient top border - inspired by ComingSoon component */}
      <div
        className={cn(
          'absolute left-0 top-0 h-1 w-full bg-gradient-to-r',
          gradientClasses[gradient]
        )}
      />

      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start gap-4">
            {icon && <div className="flex-shrink-0 text-4xl">{icon}</div>}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <CommandDirective as="h3">{title}</CommandDirective>
                {badge && (
                  <StatusIndicator className="rounded-full bg-command-500/20 px-3 py-1 text-command-300">
                    {badge}
                  </StatusIndicator>
                )}
              </div>
              {subtitle && (
                <TacticalHeading className="text-tactical-300">
                  {subtitle}
                </TacticalHeading>
              )}
            </div>
          </div>
        </div>

        <StrategicBody className="text-strategic-300">
          {description}
        </StrategicBody>

        {actions && (
          <div className="flex gap-4 border-t border-strategic-700/30 pt-4">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Featured Hero Card Variants - Larger, more prominent
interface FeaturedHeroCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  tagline?: string;
  description: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
  actions?: React.ReactNode;
  gradient?: 'command' | 'tactical' | 'strategic';
}

export const FeaturedHeroCard: React.FC<FeaturedHeroCardProps> = ({
  title,
  tagline,
  description,
  features,
  metrics,
  actions,
  gradient = 'command',
  className,
  ...props
}) => {
  const gradientClasses = {
    command: 'from-command-600 via-tactical-500 to-command-600',
    tactical: 'from-tactical-600 via-command-500 to-tactical-600',
    strategic: 'from-strategic-600 via-command-500 to-strategic-600',
  };

  return (
    <BrandCard className={cn('relative overflow-hidden', className)} {...props}>
      {/* Gradient top border */}
      <div
        className={cn(
          'absolute left-0 top-0 h-2 w-full bg-gradient-to-r',
          gradientClasses[gradient]
        )}
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <BrandTypography variant="briefing-title" as="h3">
            {title}
          </BrandTypography>
          {tagline && (
            <TacticalHeading className="text-tactical-300">
              {tagline}
            </TacticalHeading>
          )}
          <StrategicBody className="text-strategic-300">
            {description}
          </StrategicBody>
        </div>

        {features && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-command-500" />
                <FieldReport className="text-strategic-300">{feature}</FieldReport>
              </div>
            ))}
          </div>
        )}

        {metrics && (
          <div className="grid grid-cols-2 gap-6 border-t border-strategic-700/30 pt-6 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center space-y-1">
                <BrandTypography variant="briefing-title" className="text-command-300">
                  {metric.value}
                </BrandTypography>
                <IntelligenceBrief>{metric.label}</IntelligenceBrief>
              </div>
            ))}
          </div>
        )}

        {actions && (
          <div className="flex gap-4 border-t border-strategic-700/30 pt-6">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Alert Card Variants - Simplified styling
interface AlertCardProps extends Omit<BrandCardProps, 'variant'> {
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  source?: string;
  timestamp?: string;
  actions?: React.ReactNode;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  severity,
  title,
  message,
  source,
  timestamp,
  actions,
  className,
  ...props
}) => {
  const severityIcons = {
    low: 'ℹ',
    medium: '⚠',
    high: '⚠',
    critical: '🚨',
  };

  return (
    <BrandCard variant="alert" className={className} {...props}>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold',
              severity === 'low' &&
                'bg-intelligence-success-500/20 text-intelligence-success-400',
              severity === 'medium' &&
                'bg-intelligence-warning-500/20 text-intelligence-warning-400',
              severity === 'high' && 'bg-tactical-500/20 text-tactical-400',
              severity === 'critical' &&
                'bg-intelligence-danger-500/20 text-intelligence-danger-400'
            )}
          >
            {severityIcons[severity]}
          </div>
          <div className="flex-1 space-y-3">
            <OperationalTitle as="h3">{title}</OperationalTitle>
            <FieldReport>{message}</FieldReport>
          </div>
        </div>

        {(source || timestamp) && (
          <div className="flex items-center justify-between border-t border-strategic-700/30 pt-4">
            {source && (
              <IntelligenceBrief>
                Source:{' '}
                <BrandTypography variant="body" className="font-medium text-command-300">
                  {source}
                </BrandTypography>
              </IntelligenceBrief>
            )}
            {timestamp && (
              <IntelligenceBrief>{timestamp}</IntelligenceBrief>
            )}
          </div>
        )}

        {actions && (
          <div className="flex gap-3 border-t border-strategic-700/30 pt-4">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};

// Stats Card Variants - Simplified styling
interface StatsCardProps extends Omit<BrandCardProps, 'variant'> {
  title: string;
  metrics: {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  period?: string;
  actions?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  metrics,
  period,
  actions,
  className,
  ...props
}) => {
  return (
    <BrandCard variant="stats" className={className} {...props}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <OperationalTitle as="h3">{title}</OperationalTitle>
          {period && <IntelligenceBrief>{period}</IntelligenceBrief>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2 text-center">
              <BrandTypography variant="command-directive" className="text-command-300">
                {metric.value}
              </BrandTypography>
              <IntelligenceBrief>{metric.label}</IntelligenceBrief>
              {metric.change && (
                <BrandTypography
                  variant="label"
                  className={cn(
                    'font-medium',
                    metric.trend === 'up' && 'text-intelligence-success-400',
                    metric.trend === 'down' && 'text-intelligence-danger-400',
                    metric.trend === 'neutral' && 'text-strategic-400'
                  )}
                >
                  {metric.change}
                </BrandTypography>
              )}
            </div>
          ))}
        </div>

        {actions && (
          <div className="flex gap-3 border-t border-strategic-700/30 pt-4">
            {actions}
          </div>
        )}
      </div>
    </BrandCard>
  );
};
