"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { themes, ThemeName } from "@/lib/design-tokens"
import React from "react"

interface ThemeContainerProps {
  theme: ThemeName
  children: React.ReactNode
  className?: string
  variant?: "card" | "highlight" | "subtle"
  padding?: "sm" | "md" | "lg"
  animate?: boolean
  hover?: boolean
}

export function ThemeContainer({
  theme,
  children,
  className,
  variant = "card",
  padding = "md",
  animate = true,
  hover = true,
}: ThemeContainerProps) {
  const themeConfig = themes[theme]
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }
  
  const variantClasses = {
    card: `bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ${paddingClasses[padding]}`,
    highlight: `bg-gradient-to-r ${themeConfig.container} backdrop-blur-md border ${themeConfig.containerBorder} rounded-xl ${paddingClasses[padding]}`,
    subtle: `bg-gradient-to-r ${themeConfig.container} border ${themeConfig.containerBorder} rounded-xl ${paddingClasses[padding]}`,
  }
  
  const hoverClasses = hover
    ? `${themeConfig.bgHover} ${themeConfig.borderHover}`
    : ""

  const containerClasses = cn(
    variantClasses[variant],
    hoverClasses,
    "transition-all duration-300",
    className
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={containerClasses}>{children}</div>
}

interface ThemeBadgeProps {
  theme: ThemeName
  children: React.ReactNode
  className?: string
}

export function ThemeBadge({ theme, children, className }: ThemeBadgeProps) {
  const themeConfig = themes[theme]
  
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium border",
        `bg-${themeConfig.primary}-500/20`,
        `text-${themeConfig.primary}-300`,
        `border-${themeConfig.primary}-500/30`,
        className
      )}
    >
      {children}
    </span>
  )
}

interface ThemeButtonProps {
  theme: ThemeName
  variant?: "primary" | "secondary" | "outline"
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function ThemeButton({
  theme,
  variant = "primary",
  children,
  className,
  onClick,
  disabled,
  type = "button",
}: ThemeButtonProps) {
  const themeConfig = themes[theme]
  
  const variantClasses = {
    primary: `bg-gradient-to-r ${themeConfig.gradient} text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105`,
    secondary: `bg-white/10 border-2 ${themeConfig.containerBorder} hover:border-${themeConfig.accent}/50 text-white backdrop-blur-sm`,
    outline: `border-2 border-${themeConfig.accent}/60 bg-${themeConfig.primary}-500/10 hover:bg-${themeConfig.primary}-500/20 text-${themeConfig.accent}`,
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-lg transition-all duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  )
}

interface ThemeHeadingProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function ThemeHeading({
  children,
  className,
  as: Component = "h2",
}: ThemeHeadingProps) {
  return (
    <Component className={cn("text-2xl md:text-3xl font-bold text-white", className)}>
      {children}
    </Component>
  )
}

interface ThemeSubheadingProps {
  children: React.ReactNode
  className?: string
}

export function ThemeSubheading({ children, className }: ThemeSubheadingProps) {
  return (
    <h3 className={cn("text-xl md:text-2xl font-semibold text-white", className)}>
      {children}
    </h3>
  )
}

interface ThemeBodyProps {
  theme: ThemeName
  children: React.ReactNode
  className?: string
  muted?: boolean
}

export function ThemeBody({ theme, children, className, muted = false }: ThemeBodyProps) {
  const themeConfig = themes[theme]
  
  return (
    <p className={cn(
      "text-base leading-relaxed",
      muted ? themeConfig.textTertiary : themeConfig.textSecondary,
      className
    )}>
      {children}
    </p>
  )
}
