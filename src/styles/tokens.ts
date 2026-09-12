/**
 * Design Tokens for BoliEnglish
 * Centralized design system constants for colors, radiuses, typography, and spacing.
 */

export const tokens = {
  colors: {
    primary: {
      light: '#059669', // emerald-600
      hover: '#047857', // emerald-700
      subtle: '#ecfdf5', // emerald-50
      darkSubtle: 'rgba(6, 78, 59, 0.4)', // emerald-950
    },
    neutral: {
      bgLight: '#f8fafc', // slate-50
      bgDark: '#020617', // slate-950
      surfaceLight: '#ffffff',
      surfaceDark: '#0f172a', // slate-900
      borderLight: '#e2e8f0', // slate-200
      borderDark: '#1e293b', // slate-800
      textMainLight: '#0f172a', // slate-900
      textMainDark: '#f8fafc', // slate-50
      textMutedLight: '#64748b', // slate-500
      textMutedDark: '#94a3b8', // slate-400
    },
    accent: {
      amber: '#f59e0b',
      amberBg: '#fffbeb',
      blue: '#2563eb',
      blueBg: '#eff6ff',
      purple: '#7c3aed',
      purpleBg: '#f5f3ff',
    },
  },
  radii: {
    button: 'rounded-xl',
    card: 'rounded-2xl',
    cardLg: 'rounded-3xl',
    pill: 'rounded-full',
    input: 'rounded-xl',
  },
  transitions: {
    default: 'transition-all duration-200 ease-out',
    fast: 'transition-colors duration-150 ease-in-out',
  },
  shadows: {
    card: 'shadow-xs hover:shadow-md transition-shadow duration-200',
    elevated: 'shadow-md shadow-slate-200/50 dark:shadow-slate-950/50',
    subtle: 'shadow-2xs',
  },
} as const;
