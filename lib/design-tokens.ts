/**
 * Design Tokens - Election Civic Tech Fund
 * 
 * Système centralisé de tokens pour garantir la cohérence visuelle
 * à travers toute l'application.
 */

// ============================================================================
// COULEURS - Thèmes par section
// ============================================================================

export const themes = {
  hero: {
    name: 'hero',
    primary: 'amber',
    gradient: 'from-yellow-400 via-blue-400 to-green-400',
    accent: 'yellow-400',
    accentHex: '#facc15',
    container: 'from-yellow-500/10 to-orange-500/10',
    containerBorder: 'yellow-400/20',
    textSecondary: 'text-slate-300',
    textTertiary: 'text-slate-400',
    bgHover: 'hover:bg-yellow-400/10',
    borderHover: 'hover:border-yellow-400/40',
  },
  youth: {
    name: 'youth',
    primary: 'emerald',
    gradient: 'from-green-400 to-emerald-500',
    accent: 'green-400',
    accentHex: '#4ade80',
    container: 'from-green-500/10 to-emerald-500/10',
    containerBorder: 'green-400/20',
    textSecondary: 'text-green-200/80',
    textTertiary: 'text-green-300/60',
    bgHover: 'hover:bg-green-400/10',
    borderHover: 'hover:border-green-400/40',
  },
  innovation: {
    name: 'innovation',
    primary: 'blue',
    gradient: 'from-blue-400 to-cyan-500',
    accent: 'blue-400',
    accentHex: '#60a5fa',
    container: 'from-blue-500/10 to-cyan-500/10',
    containerBorder: 'blue-400/20',
    textSecondary: 'text-blue-200/80',
    textTertiary: 'text-blue-300/60',
    bgHover: 'hover:bg-blue-400/10',
    borderHover: 'hover:border-blue-400/40',
  },
  testimonials: {
    name: 'testimonials',
    primary: 'violet',
    gradient: 'from-violet-400 to-pink-500',
    accent: 'violet-400',
    accentHex: '#a78bfa',
    container: 'from-violet-500/10 to-pink-500/10',
    containerBorder: 'violet-400/20',
    textSecondary: 'text-violet-200/80',
    textTertiary: 'text-violet-300/60',
    bgHover: 'hover:bg-violet-400/10',
    borderHover: 'hover:border-violet-400/40',
  },
  stats: {
    name: 'stats',
    primary: 'amber',
    gradient: 'from-yellow-400 to-orange-500',
    accent: 'yellow-400',
    accentHex: '#facc15',
    container: 'from-yellow-500/10 to-orange-500/10',
    containerBorder: 'yellow-400/20',
    textSecondary: 'text-amber-200/80',
    textTertiary: 'text-amber-300/60',
    bgHover: 'hover:bg-yellow-400/10',
    borderHover: 'hover:border-yellow-400/40',
  },
  cta: {
    name: 'cta',
    primary: 'multi',
    gradient: 'from-yellow-400 via-blue-400 to-green-400',
    accent: 'white',
    accentHex: '#ffffff',
    container: 'from-yellow-500/10 via-blue-500/10 to-green-500/10',
    containerBorder: 'white/20',
    textSecondary: 'text-blue-200/80',
    textTertiary: 'text-blue-300/60',
    bgHover: 'hover:bg-white/10',
    borderHover: 'hover:border-white/40',
  },
  contact: {
    name: 'contact',
    primary: 'slate',
    gradient: 'from-blue-400 via-indigo-400 to-purple-400',
    accent: 'blue-400',
    accentHex: '#60a5fa',
    container: 'from-blue-500/10 to-indigo-500/10',
    containerBorder: 'blue-400/20',
    textSecondary: 'text-slate-300',
    textTertiary: 'text-slate-400',
    bgHover: 'hover:bg-blue-400/10',
    borderHover: 'hover:border-blue-400/40',
  },
} as const

export type ThemeName = keyof typeof themes
export type ThemeConfig = typeof themes[ThemeName]

// ============================================================================
// COULEURS - Palettes générales
// ============================================================================

export const colors = {
  // Brand colors
  primary: {
    DEFAULT: '#f59e0b',
    light: '#fcd34d',
    dark: '#d97706',
  },
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  // Neutral scale
  white: '#ffffff',
  slate: {
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
  },
} as const

// ============================================================================
// TYPOGRAPHIE
// ============================================================================

export const typography = {
  // Font sizes
  size: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  // Font weights
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  // Line heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  // Responsive heading classes
  heading: {
    hero: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    section: 'text-2xl md:text-3xl lg:text-4xl font-bold',
    card: 'text-lg md:text-xl font-bold',
    subheading: 'text-xl md:text-2xl font-semibold',
  },
  // Body text classes
  body: {
    large: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
  },
} as const

// ============================================================================
// ESPACEMENTS
// ============================================================================

export const spacing = {
  // Base scale
  scale: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  // Section spacing
  section: {
    py: 'py-20',
    px: 'px-4',
  },
  // Container spacing
  container: {
    maxWidth: 'max-w-6xl',
    mx: 'mx-auto',
    padding: 'px-4 sm:px-6 lg:px-8',
  },
  // Grid gaps
  grid: {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  },
  // Card padding
  card: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
} as const

// ============================================================================
// BORDURES ET OMBRES
// ============================================================================

export const borders = {
  radius: {
    none: '0',
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },
  width: {
    none: '0',
    thin: '1px',
    normal: '2px',
    thick: '4px',
  },
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: {
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
    blue: '0 0 20px rgba(59, 130, 246, 0.3)',
    green: '0 0 20px rgba(16, 185, 129, 0.3)',
  },
} as const

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  // Durations
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.6s',
    slower: '0.8s',
  },
  // Easings
  easing: {
    default: 'ease-out',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    quint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  // Framer Motion variants
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const

// ============================================================================
// UTILITAIRES DE CLASSE
// ============================================================================

export const uiClasses = {
  // Card glassmorphism de base
  card: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl',
  cardHover: 'hover:bg-white/15 hover:border-white/30 transition-all duration-300',
  
  // Bouton primary
  buttonPrimary: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105',
  
  // Bouton secondary
  buttonSecondary: 'bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white font-medium px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300',
  
  // Input style
  input: 'bg-white/5 border border-white/20 focus:border-white/40 text-white placeholder:text-slate-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300',
  
  // Badge styles
  badge: {
    primary: 'px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30',
    secondary: 'px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30',
    success: 'px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  },
} as const

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Génère les classes CSS pour un conteneur thématique
 */
export function getThemeContainerClasses(themeName: ThemeName, options?: {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}): string {
  const theme = themes[themeName]
  const padding = options?.padding ? spacing.card[options.padding] : spacing.card.md
  const hoverClasses = options?.hover ? `${theme.bgHover} ${theme.borderHover}` : ''
  
  return `bg-gradient-to-r ${theme.container} backdrop-blur-md border ${theme.containerBorder} rounded-xl ${padding} ${hoverClasses} transition-all duration-300`
}

/**
 * Génère les classes CSS pour un badge thématique
 */
export function getThemeBadgeClasses(themeName: ThemeName): string {
  const theme = themes[themeName]
  return `px-3 py-1 rounded-full text-xs font-medium bg-${theme.primary}-500/20 text-${theme.primary}-300 border border-${theme.primary}-500/30`
}

/**
 * Génère les classes CSS pour un bouton avec thème
 */
export function getThemeButtonClasses(themeName: ThemeName, variant: 'primary' | 'secondary' | 'outline' = 'primary'): string {
  const theme = themes[themeName]
  
  switch (variant) {
    case 'primary':
      return `bg-gradient-to-r ${theme.gradient} text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`
    case 'secondary':
      return `bg-white/10 hover:bg-white/20 border-2 ${theme.containerBorder} hover:border-${theme.accent}/50 text-white font-medium px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300`
    case 'outline':
      return `border-2 border-${theme.accent}/60 bg-${theme.primary}-500/10 hover:bg-${theme.primary}-500/20 text-${theme.accent} font-medium px-4 py-2 rounded-lg transition-all duration-300`
    default:
      return ''
  }
}
