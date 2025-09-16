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
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	fontSize: {
  		'mission-briefing': [
  			'4.5rem',
  			{
  				lineHeight: '1',
  				letterSpacing: '-0.025em',
  				fontWeight: '900'
  			}
  		],
  		'command-directive': [
  			'2.25rem',
  			{
  				lineHeight: '1.1',
  				letterSpacing: '-0.02em',
  				fontWeight: '700'
  			}
  		],
  		'tactical-heading': [
  			'1.875rem',
  			{
  				lineHeight: '1.2',
  				letterSpacing: '-0.015em',
  				fontWeight: '600'
  			}
  		],
  		'operational-title': [
  			'1.5rem',
  			{
  				lineHeight: '1.3',
  				letterSpacing: '-0.01em',
  				fontWeight: '600'
  			}
  		],
  		'strategic-body': [
  			'1.25rem',
  			{
  				lineHeight: '1.7',
  				fontWeight: '400'
  			}
  		],
  		'field-report': [
  			'1rem',
  			{
  				lineHeight: '1.6',
  				fontWeight: '400'
  			}
  		],
  		'intelligence-brief': [
  			'0.875rem',
  			{
  				lineHeight: '1.4',
  				fontWeight: '400'
  			}
  		],
  		'status-indicator': [
  			'0.75rem',
  			{
  				lineHeight: '1.3',
  				letterSpacing: '0.05em',
  				fontWeight: '500'
  			}
  		],
  		xs: [
  			'0.75rem',
  			{
  				lineHeight: '1rem'
  			}
  		],
  		sm: [
  			'0.875rem',
  			{
  				lineHeight: '1.25rem'
  			}
  		],
  		base: [
  			'1rem',
  			{
  				lineHeight: '1.5rem'
  			}
  		],
  		lg: [
  			'1.125rem',
  			{
  				lineHeight: '1.75rem'
  			}
  		],
  		xl: [
  			'1.25rem',
  			{
  				lineHeight: '1.75rem'
  			}
  		],
  		'2xl': [
  			'1.5rem',
  			{
  				lineHeight: '2rem'
  			}
  		],
  		'3xl': [
  			'1.875rem',
  			{
  				lineHeight: '2.25rem'
  			}
  		],
  		'4xl': [
  			'2.25rem',
  			{
  				lineHeight: '2.5rem'
  			}
  		],
  		'5xl': [
  			'3rem',
  			{
  				lineHeight: '1'
  			}
  		],
  		'6xl': [
  			'3.75rem',
  			{
  				lineHeight: '1'
  			}
  		],
  		'7xl': [
  			'4.5rem',
  			{
  				lineHeight: '1'
  			}
  		],
  		'8xl': [
  			'6rem',
  			{
  				lineHeight: '1'
  			}
  		],
  		'9xl': [
  			'8rem',
  			{
  				lineHeight: '1'
  			}
  		]
  	},
  	extend: {
  		colors: {
  			command: {
  				'50': '#f0f9ff',
  				'100': '#e0f2fe',
  				'200': '#bae6fd',
  				'300': '#7dd3fc',
  				'400': '#38bdf8',
  				'500': '#0ea5e9',
  				'600': '#0284c7',
  				'700': '#0369a1',
  				'800': '#075985',
  				'900': '#0c4a6e',
  				'950': '#082f49'
  			},
  			tactical: {
  				'50': '#fff7ed',
  				'100': '#ffedd5',
  				'200': '#fed7aa',
  				'300': '#fdba74',
  				'400': '#fb923c',
  				'500': '#f97316',
  				'600': '#ea580c',
  				'700': '#c2410c',
  				'800': '#9a3412',
  				'900': '#7c2d12',
  				'950': '#431407'
  			},
  			strategic: {
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a',
  				'950': '#020617'
  			},
  			intelligence: {
  				success: {
  					'50': '#f0fdf4',
  					'100': '#dcfce7',
  					'200': '#bbf7d0',
  					'300': '#86efac',
  					'400': '#4ade80',
  					'500': '#22c55e',
  					'600': '#16a34a',
  					'700': '#15803d',
  					'800': '#166534',
  					'900': '#14532d',
  					'950': '#052e16'
  				},
  				warning: {
  					'50': '#fffbeb',
  					'100': '#fef3c7',
  					'200': '#fde68a',
  					'300': '#fcd34d',
  					'400': '#fbbf24',
  					'500': '#f59e0b',
  					'600': '#d97706',
  					'700': '#b45309',
  					'800': '#92400e',
  					'900': '#78350f',
  					'950': '#451a03'
  				},
  				danger: {
  					'50': '#fef2f2',
  					'100': '#fee2e2',
  					'200': '#fecaca',
  					'300': '#fca5a5',
  					'400': '#f87171',
  					'500': '#ef4444',
  					'600': '#dc2626',
  					'700': '#b91c1c',
  					'800': '#991b1b',
  					'900': '#7f1d1d',
  					'950': '#450a0a'
  				}
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Fira Code',
  				'monospace'
  			],
  			display: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
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
  			black: '900'
  		},
  		letterSpacing: {
  			tighter: '-0.05em',
  			tight: '-0.025em',
  			normal: '0em',
  			wide: '0.025em',
  			wider: '0.05em',
  			widest: '0.1em'
  		},
  		spacing: {
  			'1': '0.25rem',
  			'2': '0.5rem',
  			'3': '0.75rem',
  			'4': '1rem',
  			'5': '1.25rem',
  			'6': '1.5rem',
  			'7': '1.75rem',
  			'8': '2rem',
  			'9': '2.25rem',
  			'10': '2.5rem',
  			'11': '2.75rem',
  			'12': '3rem',
  			'14': '3.5rem',
  			'16': '4rem',
  			'20': '5rem',
  			'24': '6rem',
  			'28': '7rem',
  			'32': '8rem',
  			'36': '9rem',
  			'40': '10rem',
  			'44': '11rem',
  			'48': '12rem',
  			'52': '13rem',
  			'56': '14rem',
  			'60': '15rem',
  			'64': '16rem',
  			'72': '18rem',
  			'80': '20rem',
  			'96': '24rem',
  			squad: '0.125rem',
  			fireteam: '0.25rem',
  			patrol: '0.375rem',
  			platoon: '0.5rem',
  			'squad-leader': '0.625rem',
  			company: '1rem',
  			battalion: '1.25rem',
  			brigade: '1.5rem',
  			division: '2rem',
  			corps: '2.5rem',
  			army: '3rem',
  			theater: '4rem',
  			command: '5rem',
  			strategic: '6rem',
  			operational: '8rem',
  			campaign: '12rem',
  			'theater-wide': '14rem',
  			continental: '16rem',
  			global: '24rem',
  			'0.5': '0.125rem',
  			'1.5': '0.375rem',
  			'2.5': '0.625rem',
  			'3.5': '0.875rem'
  		},
  		borderRadius: {
  			none: '0px',
  			xs: '0.125rem',
  			sm: '0.25rem',
  			DEFAULT: '0.375rem',
  			md: '0.5rem',
  			lg: '0.75rem',
  			xl: '1rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem',
  			full: '9999px',
  			'shadcn-lg': 'var(--radius)',
  			'shadcn-md': 'calc(var(--radius) - 2px)',
  			'shadcn-sm': 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  			'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  			inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  			none: 'none',
  			recon: '0 1px 3px 0 rgb(14 165 233 / 0.1), 0 1px 2px -1px rgb(14 165 233 / 0.1)',
  			patrol: '0 4px 6px -1px rgb(14 165 233 / 0.1), 0 2px 4px -2px rgb(14 165 233 / 0.1)',
  			'command-post': '0 10px 15px -3px rgb(14 165 233 / 0.1), 0 4px 6px -4px rgb(14 165 233 / 0.1)',
  			fortress: '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  			bunker: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  			'target-lock': '0 0 20px rgb(14 165 233 / 0.3)',
  			'spear-tip': '0 0 20px rgb(249 115 22 / 0.3)',
  			'stealth-mode': '0 0 15px rgb(14 165 233 / 0.2), inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
  			'alert-status': '0 0 25px rgb(249 115 22 / 0.4), 0 0 50px rgb(249 115 22 / 0.2)',
  			'mission-critical': '0 0 30px rgb(14 165 233 / 0.5), 0 10px 25px -5px rgb(0 0 0 / 0.15)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'recon-fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'intel-drop': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'flank-maneuver': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'comms-pulse': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.8'
  				}
  			},
  			'target-acquisition': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgb(14 165 233 / 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 30px rgb(14 165 233 / 0.5)'
  				}
  			},
  			'alert-flare': {
  				'0%, 100%': {
  					boxShadow: '0 0 25px rgb(249 115 22 / 0.4)'
  				},
  				'50%': {
  					boxShadow: '0 0 35px rgb(249 115 22 / 0.6)'
  				}
  			},
  			'deployment-sequence': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'50%': {
  					opacity: '0.7',
  					transform: 'scale(1.02)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'strike-force': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-10px) scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0) scale(1)'
  				}
  			},
  			'stealth-insert': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-5px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
			'extraction-sequence': {
				'0%': {
					opacity: '1',
					transform: 'translateY(0)'
				},
				'100%': {
					opacity: '0',
					transform: 'translateY(-5px)'
				}
			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'recon-fade-in': 'recon-fade-in 0.5s ease-out',
  			'intel-drop': 'intel-drop 0.6s ease-out',
  			'flank-maneuver': 'flank-maneuver 0.5s ease-out',
  			'comms-pulse': 'comms-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'target-acquisition': 'target-acquisition 2s ease-in-out infinite',
  			'alert-flare': 'alert-flare 1.5s ease-in-out infinite',
  			'deployment-sequence': 'deployment-sequence 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
			'strike-force': 'strike-force 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
			'stealth-insert': 'stealth-insert 0.4s ease-out',
			'extraction-sequence': 'extraction-sequence 0.3s ease-in'
  		},
  		backdropBlur: {
  			xs: '2px',
  			sm: '4px',
  			DEFAULT: '8px',
  			md: '12px',
  			lg: '16px',
  			xl: '24px',
  			'2xl': '40px',
  			'3xl': '64px'
  		},
  		zIndex: {
  			'0': '0',
  			'10': '10',
  			'20': '20',
  			'30': '30',
  			'40': '40',
  			'50': '50',
  			auto: 'auto',
  			dropdown: '1000',
  			sticky: '1020',
  			fixed: '1030',
  			'modal-backdrop': '1040',
  			modal: '1050',
  			popover: '1060',
  			tooltip: '1070',
  			toast: '1080'
  		}
  	}
  },
  plugins: [
    tailwindcssAnimate,
    // Military-Professional Component System
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function({ addUtilities }: { addUtilities: (utilities: any) => void }) {
      const newUtilities = {
        // === MISSION-CRITICAL TYPOGRAPHY ===
        '.mission-briefing': {
          fontSize: '4.5rem',
          lineHeight: '1',
          letterSpacing: '-0.025em',
          fontWeight: '900',
        },
        '.command-directive': {
          fontSize: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        },
        '.tactical-heading': {
          fontSize: '1.875rem',
          lineHeight: '1.2',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
        '.operational-title': {
          fontSize: '1.5rem',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        },
        '.strategic-body': {
          fontSize: '1.25rem',
          fontWeight: '400',
        },
        '.field-report': {
          fontSize: '1rem',
          lineHeight: '1.6',
          fontWeight: '400',
        },
        '.intelligence-brief': {
          fontSize: '0.875rem',
          lineHeight: '1.4',
          fontWeight: '400',
        },
        '.status-indicator': {
          fontSize: '0.75rem',
          lineHeight: '1.3',
          letterSpacing: '0.05em',
          fontWeight: '500',
          textTransform: 'uppercase',
        },

        // === MISSION STATUS TEXT TRANSFORMS ===
        '.text-uppercase': {
          textTransform: 'uppercase',
        },
        '.text-lowercase': {
          textTransform: 'lowercase',
        },
        '.text-capitalize': {
          textTransform: 'capitalize',
        },

        // === TACTICAL VISUAL EFFECTS ===
        '.target-gradient': {
          background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #fb923c 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.spear-gradient': {
          background: 'linear-gradient(135deg, #fb923c 0%, #0ea5e9 50%, #38bdf8 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.precision-glass': {
          background: '#020617e6',
          'backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        },

        // === COMMAND CENTER COMPONENTS ===
        '.command-card': {
          borderRadius: '1rem',
          border: '1px solid rgba(30, 41, 59, 0.5)',
          background: '#020617e6',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(0.5rem)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
            borderColor: 'rgba(14, 165, 233, 0.3)',
            background: '#020617f0',
          },
        },
        '.command-post': {
          '@apply command-card': {},
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
          },
        },
        '.intelligence-glass': {
          borderRadius: '1rem',
          border: '1px solid rgba(30, 41, 59, 0.5)',
          background: '#020617e6',
          backdropFilter: 'blur(16px)',
        },

        // === TACTICAL ACCENT ELEMENTS ===
        '.strike-line': {
          height: '4px',
          background: 'linear-gradient(90deg, #0284c7 0%, #fb923c 50%, #0284c7 100%)',
          borderRadius: '2px',
        },
        '.target-lock': {
          'box-shadow': '0 0 20px rgba(14, 165, 233, 0.3)',
        },
        '.spear-tip': {
          'box-shadow': '0 0 20px rgba(249, 115, 22, 0.3)',
        },
        '.command-focus': {
          '&:focus': {
            outline: 'none',
            'box-shadow': '0 0 0 3px rgba(14, 165, 233, 0.3)',
          },
        },

        // === STRATEGIC ACTION BUTTONS ===
        '.strike-primary': {
          borderRadius: '0.5rem',
          background: '#0ea5e9',
          padding: '0.75rem 1.5rem',
          fontWeight: '600',
          color: 'white',
          transition: 'background-color 0.2s ease',
          '@apply command-focus': {},
          '&:hover': {
            background: '#0284c7',
          },
        },
        '.recon-secondary': {
          borderRadius: '0.5rem',
          background: '#f1f5f9',
          padding: '0.75rem 1.5rem',
          fontWeight: '600',
          color: '#0f172a',
          transition: 'background-color 0.2s ease',
          '@apply command-focus': {},
          '&:hover': {
            background: '#e2e8f0',
          },
        },
        '.assault-accent': {
          borderRadius: '0.5rem',
          background: '#f97316',
          padding: '0.75rem 1.5rem',
          fontWeight: '600',
          color: 'white',
          transition: 'background-color 0.2s ease',
          '@apply command-focus': {},
          '&:hover': {
            background: '#ea580c',
          },
        },
        '.stealth-ghost': {
          borderRadius: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontWeight: '600',
          color: '#0ea5e9',
          transition: 'background-color 0.2s ease',
          '@apply command-focus': {},
          '&:hover': {
            background: 'rgba(14, 165, 233, 0.1)',
          },
        },

        // === INTELLIGENCE INPUT COMPONENTS ===
        '.intel-input': {
          width: '100%',
          borderRadius: '0.5rem',
          border: '1px solid #64748b',
          background: 'hsl(var(--background))',
          padding: '0.5rem 1rem',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:focus': {
            borderColor: '#0ea5e9',
            boxShadow: '0 0 0 2px rgba(14, 165, 233, 0.2)',
          },
        },
        '.intel-error': {
          '@apply intel-input': {},
          borderColor: 'hsl(var(--destructive))',
          '&:focus': {
            borderColor: 'hsl(var(--destructive))',
            boxShadow: '0 0 0 2px hsl(var(--destructive) / 0.2)',
          },
        },

        // === OPERATIONAL NAVIGATION ===
        '.command-nav': {
          borderBottom: '1px solid rgba(148, 163, 184, 0.5)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(0.5rem)',
        },
        '.nav-objective': {
          fontWeight: '500',
          color: 'hsl(var(--foreground))',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: '#0ea5e9',
          },
        },
        '.nav-active-mission': {
          fontWeight: '600',
          color: '#0ea5e9',
        },

        // === STRATEGIC BADGE SYSTEM ===
        '.tactical-badge': {
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '9999px',
          padding: '0.25rem 0.75rem',
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        '.badge-command': {
          '@apply tactical-badge': {},
          border: '1px solid rgba(14, 165, 233, 0.2)',
          background: 'rgba(14, 165, 233, 0.1)',
          color: '#0ea5e9',
        },
        '.badge-intelligence': {
          '@apply tactical-badge': {},
          background: '#f1f5f9',
          color: '#1e293b',
        },
        '.badge-assault': {
          '@apply tactical-badge': {},
          border: '1px solid rgba(249, 115, 22, 0.2)',
          background: 'rgba(249, 115, 22, 0.1)',
          color: '#f97316',
        },

        // === MISSION STATUS INDICATORS ===
        '.status-objective-complete': {
          border: '1px solid rgba(34, 197, 94, 0.2)',
          background: 'rgba(34, 197, 94, 0.1)',
          color: '#22c55e',
        },
        '.status-caution': {
          border: '1px solid rgba(251, 191, 36, 0.2)',
          background: 'rgba(251, 191, 36, 0.1)',
          color: '#fbbf24',
        },
        '.status-threat': {
          border: '1px solid rgba(239, 68, 68, 0.2)',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
        },
        '.status-intelligence': {
          border: '1px solid rgba(14, 165, 233, 0.2)',
          background: 'rgba(14, 165, 233, 0.1)',
          color: '#0ea5e9',
        },

        // === TACTICAL LOADING STATES ===
        '.loading-pulse': {
          animation: 'comms-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          borderRadius: '0.25rem',
          background: '#e2e8f0',
        },
        '.skeleton-intel': {
          '@apply loading-pulse': {},
          height: '1rem',
          width: '100%',
        },
        '.skeleton-avatar': {
          '@apply loading-pulse': {},
          height: '3rem',
          width: '3rem',
          borderRadius: '9999px',
        },

        // === STRATEGIC HOVER EFFECTS ===
        '.hover-elevation': {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            'box-shadow': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          },
        },
        '.hover-target': {
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            'box-shadow': '0 0 20px rgba(14, 165, 233, 0.3)',
          },
        },

        // === ADVANCED TACTICAL UTILITIES ===
        '.border-strike-gradient': {
          borderImage: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #fb923c 100%) 1',
        },
        '.shadow-command': {
          boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.1), 0 8px 10px -6px rgba(14, 165, 233, 0.1)',
        },
        '.shadow-assault': {
          boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)',
        },
        '.target-glow': {
          boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)',
        },
        '.assault-glow': {
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)',
        },
        '.precision-blur': {
          backdropFilter: 'blur(12px)',
        },
        '.tactical-blur': {
          backdropFilter: 'blur(20px)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config
 
