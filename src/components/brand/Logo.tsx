import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'default' | 'monochrome' | 'inverted'
}

const sizeClasses = {
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto', 
  lg: 'h-10 w-auto',
  xl: 'h-12 w-auto'
}

export function Logo({ 
  className, 
  size = 'md', 
  showText = true, 
  variant = 'default' 
}: LogoProps) {
  const sizeClass = sizeClasses[size]
  
  // Fallback: If the image fails to load, show a text-based logo
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.style.display = 'none'
    
    // Show fallback text logo
    const fallback = target.nextElementSibling as HTMLElement
    if (fallback) {
      fallback.style.display = 'flex'
    }
  }

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {/* Image Logo */}
      <div className="relative">
        <img
          src="/images/spearyx-logo.svg"
          alt="Spearyx"
          className={cn(
            sizeClass,
            variant === 'monochrome' && 'brightness-0 dark:brightness-100 dark:invert',
            variant === 'inverted' && 'brightness-0 invert dark:brightness-100 dark:invert-0'
          )}
          onError={handleImageError}
        />
        
        {/* Fallback Text Logo */}
        <div 
          className={cn(
            'hidden items-center justify-center rounded-lg font-bold text-primary-500',
            size === 'sm' && 'h-6 w-6 text-xs',
            size === 'md' && 'h-8 w-8 text-sm', 
            size === 'lg' && 'h-10 w-10 text-base',
            size === 'xl' && 'h-12 w-12 text-lg'
          )}
          style={{ display: 'none' }}
        >
          S
        </div>
      </div>
      
      {/* Text Logo */}
      {showText && (
        <span className={cn(
          'font-bold text-precision-900 dark:text-precision-50',
          size === 'sm' && 'text-lg',
          size === 'md' && 'text-xl',
          size === 'lg' && 'text-2xl', 
          size === 'xl' && 'text-3xl'
        )}>
          Spearyx
        </span>
      )}
    </div>
  )
}

// Alternative: Pure SVG Logo Component (more reliable)
export function LogoSvg({ 
  className, 
  size = 'md',
  showText = true 
}: Omit<LogoProps, 'variant'>) {
  const sizeClass = sizeClasses[size]
  
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {/* SVG Logo */}
      <svg
        className={cn(
          sizeClass,
          'text-primary-500'
        )}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Spearhead Shape */}
        <path
          d="M50 10 L90 50 L70 70 L50 50 L30 70 L10 50 Z"
          fill="currentColor"
          className="text-primary-500"
        />
        {/* Spear shaft */}
        <rect
          x="48"
          y="50"
          width="4"
          height="40"
          fill="currentColor"
          className="text-precision-600 dark:text-precision-400"
        />
      </svg>
      
      {/* Text Logo */}
      {showText && (
        <span className={cn(
          'font-bold text-precision-900 dark:text-precision-50',
          size === 'sm' && 'text-lg',
          size === 'md' && 'text-xl',
          size === 'lg' && 'text-2xl', 
          size === 'xl' && 'text-3xl'
        )}>
          Spearyx
        </span>
      )}
    </div>
  )
}
