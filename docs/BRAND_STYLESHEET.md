# Spearyx Brand Stylesheet Guide

## Overview

This comprehensive brand stylesheet integrates your Spearyx brand colors with Tailwind CSS and shadcn/ui components. It provides a complete design system for building consistent, professional interfaces.

## When to Use shadcn vs Tailwind Directly

### Use shadcn components for:
- **Interactive components**: Buttons, forms, modals, dropdowns, tooltips
- **Complex UI patterns**: Data tables, charts, navigation menus
- **Accessibility**: Components with built-in ARIA support
- **Consistency**: Pre-built components that work together seamlessly

### Use Tailwind directly for:
- **Typography**: Custom text styles and hierarchies
- **Layout**: Spacing, positioning, responsive design
- **Brand-specific elements**: Custom gradients, animations, effects
- **One-off designs**: Unique visual elements that don't need reusability

## Brand Color System

### Primary Colors
```css
/* Target Blue - Primary brand color */
brand-target-500: #0ea5e9
brand-target-400: #38bdf8 (light)
brand-target-600: #0284c7 (dark)

/* Spear Orange - Accent color */
brand-spear-500: #f97316
brand-spear-400: #fb923c (light)
brand-spear-600: #ea580c (dark)

/* Precision Grays - Neutral colors */
brand-precision-900: #0f172a (darkest)
brand-precision-500: #64748b (medium)
brand-precision-100: #f1f5f9 (lightest)
```

### Usage Examples
```tsx
// Primary button
<button className="bg-brand-target-500 hover:bg-brand-target-600 text-white">
  Primary Action
</button>

// Accent element
<div className="bg-brand-spear-500 text-white">
  Call to Action
</div>

// Text hierarchy
<h1 className="text-brand-precision-900">Main Heading</h1>
<p className="text-brand-precision-600">Body text</p>
```

## Typography System

### Font Sizes
```css
/* Brand-specific typography scale */
text-hero: 4.5rem (72px) - Hero headlines
text-display: 2.25rem (36px) - Display text
text-headline: 1.875rem (30px) - Section headers
text-title: 1.5rem (24px) - Card titles
text-body-lg: 1.25rem (20px) - Large body text
text-body: 1rem (16px) - Standard body text
text-caption: 0.875rem (14px) - Captions
text-label: 0.75rem (12px) - Labels
```

### Font Weights
```css
font-thin: 100
font-light: 300
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
font-extrabold: 800
font-black: 900
```

### Usage Examples
```tsx
// Hero headline with gradient
<h1 className="text-hero text-gradient-brand">
  SPEARYX SUITE
</h1>

// Section header
<h2 className="text-headline font-bold text-brand-precision-900">
  TACTICAL ARSENAL
</h2>

// Body text
<p className="text-body text-brand-precision-600">
  Precision-engineered microtools for modern workflows.
</p>
```

## Component Classes

### Cards
```tsx
// Standard brand card
<div className="card-brand p-6">
  <h3 className="text-title text-brand-precision-900">Card Title</h3>
  <p className="text-body text-brand-precision-600">Card content</p>
</div>

// Elevated card with hover effect
<div className="card-brand-elevated p-6">
  <h3 className="text-title text-brand-precision-900">Elevated Card</h3>
</div>

// Glass effect card
<div className="card-brand-glass p-6">
  <h3 className="text-title text-brand-precision-100">Glass Card</h3>
</div>
```

### Buttons
```tsx
// Primary button
<button className="btn-brand-primary">
  Primary Action
</button>

// Secondary button
<button className="btn-brand-secondary">
  Secondary Action
</button>

// Accent button
<button className="btn-brand-accent">
  Call to Action
</button>

// Ghost button
<button className="btn-brand-ghost">
  Ghost Action
</button>
```

### Form Inputs
```tsx
// Standard input
<input className="input-brand" placeholder="Enter text..." />

// Error state input
<input className="input-brand-error" placeholder="Error state..." />
```

### Badges
```tsx
// Primary badge
<span className="badge-brand-primary">Primary</span>

// Secondary badge
<span className="badge-brand-secondary">Secondary</span>

// Accent badge
<span className="badge-brand-accent">Accent</span>
```

### Status Indicators
```tsx
// Success status
<div className="status-success px-3 py-1 rounded-full">
  Success
</div>

// Warning status
<div className="status-warning px-3 py-1 rounded-full">
  Warning
</div>

// Error status
<div className="status-error px-3 py-1 rounded-full">
  Error
</div>

// Info status
<div className="status-info px-3 py-1 rounded-full">
  Info
</div>
```

## Utility Classes

### Gradients
```tsx
// Brand gradient text
<h1 className="text-gradient-brand">Gradient Text</h1>

// Reverse gradient text
<h1 className="text-gradient-brand-reverse">Reverse Gradient</h1>

// Brand gradient background
<div className="bg-gradient-brand text-white p-6">
  Gradient Background
</div>

// Subtle gradient background
<div className="bg-gradient-brand-subtle p-6">
  Subtle Gradient
</div>
```

### Effects
```tsx
// Brand glow effect
<div className="glow-brand p-4 rounded-lg">
  Glowing Element
</div>

// Spear glow effect
<div className="glow-spear p-4 rounded-lg">
  Spear Glow
</div>

// Brand shadow
<div className="shadow-brand p-4 rounded-lg">
  Brand Shadow
</div>

// Hover lift effect
<div className="hover-lift p-4 rounded-lg cursor-pointer">
  Hover to Lift
</div>

// Hover glow effect
<div className="hover-glow p-4 rounded-lg cursor-pointer">
  Hover to Glow
</div>
```

### Focus States
```tsx
// Brand focus ring
<button className="focus-brand-ring">
  Focusable Element
</button>

// Inset focus ring
<input className="focus-brand-ring-inset" />
```

## Spacing System

The spacing system is based on an 8px grid:

```css
space-1: 4px    (0.25rem)
space-2: 8px    (0.5rem)
space-4: 16px   (1rem)
space-6: 24px   (1.5rem)
space-8: 32px   (2rem)
space-12: 48px  (3rem)
space-16: 64px  (4rem)
space-20: 80px  (5rem)
space-24: 96px  (6rem)
```

## Animation Classes

```tsx
// Fade in animation
<div className="animate-fade-in">
  Fade In Content
</div>

// Fade in up animation
<div className="animate-fade-in-up">
  Fade In Up Content
</div>

// Slide in right animation
<div className="animate-slide-in-right">
  Slide In Right Content
</div>

// Brand pulse animation
<div className="animate-pulse-brand">
  Pulsing Element
</div>

// Glow pulse animation
<div className="animate-glow-pulse">
  Pulsing Glow
</div>
```

## Integration with shadcn/ui

The brand system is fully compatible with shadcn/ui components. The CSS variables are mapped to your brand colors:

```tsx
// shadcn Button with brand colors
<Button className="bg-primary hover:bg-primary/90">
  shadcn Button
</Button>

// shadcn Card with brand styling
<Card className="card-brand">
  <CardHeader>
    <CardTitle className="text-title">Card Title</CardTitle>
  </CardHeader>
  <CardContent className="text-body">
    Card content with brand styling
  </CardContent>
</Card>
```

## Best Practices

1. **Use semantic color names**: `brand-target-500` instead of `blue-500`
2. **Maintain consistency**: Use the same spacing and typography scales throughout
3. **Leverage component classes**: Use `.card-brand`, `.btn-brand-primary` for consistency
4. **Combine with shadcn**: Use shadcn for complex components, Tailwind for styling
5. **Test accessibility**: Ensure proper contrast ratios and focus states
6. **Use gradients sparingly**: Reserve gradient text for hero elements and CTAs

## Dark Mode Support

The system includes full dark mode support through CSS variables:

```tsx
// Dark mode is automatically handled
<div className="bg-background text-foreground">
  Automatically adapts to dark/light mode
</div>
```

## Customization

To extend the brand system:

1. **Add new colors**: Update the `brand` color palette in `tailwind.config.ts`
2. **Create new components**: Add to the `@layer components` section in `index.css`
3. **Add utilities**: Extend the `@layer utilities` section for one-off styles
4. **Update CSS variables**: Modify the `:root` and `.dark` selectors for global changes

This brand stylesheet provides everything you need to build consistent, professional interfaces that reflect the Spearyx brand identity while leveraging the power of Tailwind CSS and shadcn/ui.
