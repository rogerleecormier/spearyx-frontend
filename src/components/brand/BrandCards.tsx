import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

// Base Card - Clean and minimal
export const Card = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'card-precision',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Elevated Card - More prominent with stronger shadow
export const ElevatedCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'card-elevated',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Glass Card - Translucent with backdrop blur
export const GlassCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'card-glass',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Primary Accent Card - With brand red accent
export const PrimaryCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-primary-200 card-precision hover:border-primary-300',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Accent Card - With brand blue accent
export const AccentCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-accent-200 card-precision hover:border-accent-300',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Success Card - With success green accent
export const SuccessCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-success-200 card-precision hover:border-success-300',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Warning Card - With warning yellow accent
export const WarningCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-warning-200 card-precision hover:border-warning-300',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Feature Card - For showcasing features
export const FeatureCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-precision-50 to-precision-100 card-elevated dark:from-precision-800 dark:to-precision-900',
        hover && 'hover-lift hover:shadow-card-hover',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Tool Card - For project management tools
export const ToolCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 card-precision dark:border-primary-800 dark:from-primary-900/20 dark:to-primary-800/20',
        hover &&
          'hover-lift hover:border-primary-300 dark:hover:border-primary-700',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Coming Soon Card - Special styling for upcoming features
export const ComingSoonCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden border-accent-200 bg-gradient-to-br from-accent-50 to-accent-100 card-precision dark:border-accent-800 dark:from-accent-900/20 dark:to-accent-800/20',
        hover &&
          'hover-lift hover:border-accent-300 dark:hover:border-accent-700',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="absolute right-4 top-4">
        <span className="badge-accent">Coming Soon</span>
      </div>
      {children}
    </div>
  );
};

// Hero Card - Large prominent card for main content
export const HeroCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-precision-50 via-white to-precision-50 p-12 card-elevated dark:from-precision-900 dark:via-precision-800 dark:to-precision-900',
        hover && 'hover-lift hover:shadow-card-hover',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Stats Card - For displaying metrics and statistics
export const StatsCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-success-200 bg-gradient-to-br from-success-50 to-success-100 text-center card-precision dark:border-success-800 dark:from-success-900/20 dark:to-success-800/20',
        hover &&
          'hover-lift hover:border-success-300 dark:hover:border-success-700',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Info Card - For informational content
export const InfoCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'border-accent-200 bg-gradient-to-br from-accent-50 to-accent-100 card-precision dark:border-accent-800 dark:from-accent-900/20 dark:to-accent-800/20',
        hover &&
          'hover-lift hover:border-accent-300 dark:hover:border-accent-700',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Compact Card - Smaller padding for dense content
export const CompactCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'p-4 card-precision',
        hover && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Interactive Card - Enhanced hover effects
export const InteractiveCard = ({
  children,
  className,
  onClick,
  hover = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'transition-all duration-300 card-precision hover:scale-105 hover:shadow-xl',
        hover && 'hover-glow',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
