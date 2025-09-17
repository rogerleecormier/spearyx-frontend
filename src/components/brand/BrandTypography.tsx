import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  block?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

// Hero Typography - Large display text
export const Hero = ({
  children,
  className,
  block = true,
  as: Component = 'h1',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-7xl font-bold text-precision-900 dark:text-precision-50',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Display Typography - Large headings
export const Display = ({
  children,
  className,
  block = true,
  as: Component = 'h1',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-5xl font-semibold text-precision-900 dark:text-precision-50',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Headline Typography - Section headings
export const Headline = ({
  children,
  className,
  block = true,
  as: Component = 'h2',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-4xl font-semibold text-precision-900 dark:text-precision-50',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Title Typography - Card and component titles
export const Title = ({
  children,
  className,
  block = true,
  as: Component = 'h3',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-2xl font-semibold text-precision-900 dark:text-precision-50',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Body Large Typography - Important body text
export const BodyLarge = ({
  children,
  className,
  block = true,
  as: Component = 'p',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-xl font-normal text-precision-700 dark:text-precision-300',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Body Typography - Standard body text
export const Body = ({
  children,
  className,
  block = true,
  as: Component = 'p',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-base font-normal text-precision-700 dark:text-precision-300',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Caption Typography - Small supporting text
export const Caption = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-sm font-normal text-precision-600 dark:text-precision-400',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Label Typography - Form labels and small UI text
export const Label = ({
  children,
  className,
  block = true,
  as: Component = 'label',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-xs font-medium uppercase tracking-wide text-precision-700 dark:text-precision-300',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Primary Accent Typography - Using brand red
export const PrimaryAccent = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-body font-medium text-primary-500',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Secondary Accent Typography - Using brand blue
export const AccentText = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-body font-medium text-accent-500',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Success Typography - Green text for positive states
export const SuccessText = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-body font-medium text-success-600',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Warning Typography - Yellow text for caution states
export const WarningText = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-body font-medium text-warning-600',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Muted Typography - Subtle text
export const MutedText = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-body font-normal text-precision-500 dark:text-precision-500',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Gradient Typography - Text with gradient effect
export const GradientText = ({
  children,
  className,
  block = true,
  as: Component = 'span',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'font-semibold text-gradient-primary',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Code Typography - Monospace text
export const Code = ({
  children,
  className,
  block = true,
  as: Component = 'code',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'rounded-md bg-precision-100 px-2 py-1 font-mono text-sm text-precision-900 dark:bg-precision-800 dark:text-precision-100',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};

// Quote Typography - Styled for quotations
export const Quote = ({
  children,
  className,
  block = true,
  as: Component = 'blockquote',
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        'border-l-4 border-primary-500 pl-4 text-body-lg font-normal italic text-precision-700 dark:text-precision-300',
        block ? 'block' : 'inline',
        className
      )}
    >
      {children}
    </Component>
  );
};
