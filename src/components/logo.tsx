import React from 'react';

import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 64 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      <defs>
        <linearGradient id="spearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient
          id="reticleGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Spear (behind reticle), centered at 30 degrees */}
      <g>
        <line
          x1="8"
          y1="46"
          x2="52"
          y2="20"
          stroke="url(#spearGradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <g transform="translate(52,20) rotate(-30)">
          <polygon
            points="0,0 8,2.5 12,0 8,-2.5"
            fill="url(#spearGradient)"
            filter="url(#glow)"
          />
          <line
            x1="0"
            y1="0"
            x2="12"
            y2="0"
            stroke="#7c2d12"
            strokeOpacity="0.7"
            strokeWidth="0.6"
          />
          <path
            d="M8 2.5 L 12 0 L 8 -2.5"
            stroke="#ffffff"
            strokeOpacity="0.32"
            strokeWidth="0.5"
            fill="none"
          />
        </g>
        <g transform="translate(8,46) rotate(-30)">
          <polygon
            points="0 0 -6 2 -2 0"
            fill="url(#spearGradient)"
            opacity="0.9"
          />
          <polygon
            points="0 0 -6 -2 -2 0"
            fill="url(#spearGradient)"
            opacity="0.8"
          />
          <line
            x1="-6"
            y1="2"
            x2="-2"
            y2="0"
            stroke="#ea580c"
            strokeWidth="0.4"
            strokeOpacity="0.6"
          />
          <line
            x1="-6"
            y1="-2"
            x2="-2"
            y2="0"
            stroke="#ea580c"
            strokeWidth="0.4"
            strokeOpacity="0.6"
          />
        </g>
      </g>
      {/* Outer precision ring */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="url(#reticleGradient)"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="2 4"
        opacity="0.4"
      />

      {/* Main targeting reticle */}
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="url(#reticleGradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />

      {/* Inner precision circle */}
      <circle
        cx="32"
        cy="32"
        r="10"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Precision crosshairs */}
      <line
        x1="32"
        y1="8"
        x2="32"
        y2="56"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <line
        x1="8"
        y1="32"
        x2="56"
        y2="32"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.7"
      />

      {/* Range markers */}
      <rect
        x="31.5"
        y="6"
        width="1"
        height="4"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="31.5"
        y="54"
        width="1"
        height="4"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="6"
        y="31.5"
        width="4"
        height="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="54"
        y="31.5"
        width="4"
        height="1"
        fill="currentColor"
        opacity="0.5"
      />

      {/* Center precision dot */}
      <circle
        cx="32"
        cy="32"
        r="1.5"
        fill="url(#spearGradient)"
        opacity="1"
        filter="url(#glow)"
      />
    </svg>
  );
};
