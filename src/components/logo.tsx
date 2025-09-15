import React from 'react'
import { cn } from '../lib/utils'

interface LogoProps {
  className?: string
  size?: number
}

export const Logo: React.FC<LogoProps> = ({ className, size = 64 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
    >
      {/* Targeting Reticle (Crosshairs) */}
      <circle
        cx="32"
        cy="32"
        r="20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Crosshairs */}
      <line
        x1="32"
        y1="12"
        x2="32"
        y2="52"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
      <line
        x1="12"
        y1="32"
        x2="52"
        y2="32"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Spear shaft at 30-degree angle */}
      <line
        x1="32"
        y1="32"
        x2="54"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Spear tip */}
      <polygon
        points="54,20 57,17 55,19"
        fill="currentColor"
        transform="rotate(30 54 20)"
      />

      {/* Spear base/handle */}
      <line
        x1="32"
        y1="32"
        x2="18"
        y2="38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
