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
  
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {/* Image Logo */}
      <div className="relative">
        <img
          src="/images/spearyx-logo.png"
          alt="Spearyx"
          className={cn(
            sizeClass,
            variant === 'monochrome' && 'brightness-0 dark:brightness-100 dark:invert',
            variant === 'inverted' && 'brightness-0 invert dark:brightness-100 dark:invert-0'
          )}
        />
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

