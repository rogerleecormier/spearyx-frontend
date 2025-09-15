import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      // Brand-specific display sizes (based on home page usage)
      'hero': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],      // 72px - Hero text (text-7xl equivalent)
      'display': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 36px - Display text (text-4xl equivalent)
      'headline': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }], // 30px - Section headers (text-3xl equivalent)
      'title': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],    // 24px - Card titles (text-2xl equivalent)
      'body-lg': ['1.25rem', { lineHeight: '1.7' }],                          // 20px - Large body text (text-xl equivalent)
      'body': ['1rem', { lineHeight: '1.6' }],                                // 16px - Regular body text
      'caption': ['0.875rem', { lineHeight: '1.4' }],                         // 14px - Captions
      'label': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.05em' }],   // 12px - Labels
      // Standard Tailwind sizes
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      // Brand Color System
      colors: {
        // Spearyx Brand Colors - Targeting/Precision Theme
        brand: {
          // Primary targeting colors
          target: {
            50: '#f0f9ff',
            100: '#e0f2fe', 
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9', // Primary brand blue
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
          },
          // Spear/accent colors
          spear: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316', // Primary spear orange
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            950: '#431407',
          },
          // Precision grays
          precision: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
        },
        // Shadcn design tokens (integrated with brand colors)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // Typography System
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      // Spacing System (8px base unit)
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1': '0.25rem',      // 4px
        '1.5': '0.375rem',   // 6px
        '2': '0.5rem',       // 8px
        '2.5': '0.625rem',   // 10px
        '3': '0.75rem',      // 12px
        '3.5': '0.875rem',   // 14px
        '4': '1rem',         // 16px
        '5': '1.25rem',      // 20px
        '6': '1.5rem',       // 24px
        '7': '1.75rem',      // 28px
        '8': '2rem',         // 32px
        '9': '2.25rem',      // 36px
        '10': '2.5rem',      // 40px
        '11': '2.75rem',     // 44px
        '12': '3rem',        // 48px
        '14': '3.5rem',      // 56px
        '16': '4rem',        // 64px
        '20': '5rem',        // 80px
        '24': '6rem',        // 96px
        '28': '7rem',        // 112px
        '32': '8rem',        // 128px
        '36': '9rem',        // 144px
        '40': '10rem',       // 160px
        '44': '11rem',       // 176px
        '48': '12rem',       // 192px
        '52': '13rem',       // 208px
        '56': '14rem',       // 224px
        '60': '15rem',       // 240px
        '64': '16rem',       // 256px
        '72': '18rem',       // 288px
        '80': '20rem',       // 320px
        '96': '24rem',       // 384px
      },
      // Border Radius System
      borderRadius: {
        'none': '0px',
        'xs': '0.125rem',    // 2px
        'sm': '0.25rem',     // 4px
        'DEFAULT': '0.375rem', // 6px
        'md': '0.5rem',      // 8px
        'lg': '0.75rem',     // 12px
        'xl': '1rem',        // 16px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        'full': '9999px',
        // Shadcn compatibility
        'shadcn-lg': "var(--radius)",
        'shadcn-md': "calc(var(--radius) - 2px)",
        'shadcn-sm': "calc(var(--radius) - 4px)",
      },
      // Box Shadow System
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
        // Brand-specific shadows
        'brand-sm': '0 1px 3px 0 rgb(14 165 233 / 0.1), 0 1px 2px -1px rgb(14 165 233 / 0.1)',
        'brand-md': '0 4px 6px -1px rgb(14 165 233 / 0.1), 0 2px 4px -2px rgb(14 165 233 / 0.1)',
        'brand-lg': '0 10px 15px -3px rgb(14 165 233 / 0.1), 0 4px 6px -4px rgb(14 165 233 / 0.1)',
        'brand-glow': '0 0 20px rgb(14 165 233 / 0.3)',
        'spear-glow': '0 0 20px rgb(249 115 22 / 0.3)',
      },
      // Animation System
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-brand": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgb(14 165 233 / 0.3)" },
          "50%": { boxShadow: "0 0 30px rgb(14 165 233 / 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "pulse-brand": "pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      // Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      // Z-Index Scale
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'auto': 'auto',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    // Custom brand utilities
    function({ addUtilities }) {
      const newUtilities = {
        // Brand gradient text
        '.text-brand-gradient': {
          background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #fb923c 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-brand-gradient-reverse': {
          background: 'linear-gradient(135deg, #fb923c 0%, #0ea5e9 50%, #38bdf8 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        // Brand glass effect
        '.glass-brand': {
          background: 'rgba(15, 23, 42, 0.8)',
          'backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        },
        // Brand accent line
        '.accent-line': {
          height: '4px',
          background: 'linear-gradient(90deg, #0284c7 0%, #fb923c 50%, #0284c7 100%)',
          borderRadius: '2px',
        },
        // Brand glow effect
        '.glow-brand': {
          'box-shadow': '0 0 20px rgba(14, 165, 233, 0.3)',
        },
        '.glow-spear': {
          'box-shadow': '0 0 20px rgba(249, 115, 22, 0.3)',
        },
        // Brand focus ring
        '.focus-brand': {
          '&:focus': {
            outline: 'none',
            'box-shadow': '0 0 0 3px rgba(14, 165, 233, 0.3)',
          },
        },
        // Brand hover effects
        '.hover-lift': {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            'box-shadow': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          },
        },
        '.hover-glow': {
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            'box-shadow': '0 0 20px rgba(14, 165, 233, 0.3)',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config
 
