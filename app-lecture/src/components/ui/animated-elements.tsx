'use client'

import { ReactNode } from 'react'

interface AnimatedIconProps {
  children: ReactNode
  animation?: 'bounce' | 'float' | 'wiggle' | 'spin' | 'pulse' | 'rainbow'
  delay?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export function AnimatedIcon({ 
  children, 
  animation = 'bounce', 
  delay = '0ms',
  size = 'md',
  className = ''
}: AnimatedIconProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl', 
    lg: 'text-5xl',
    xl: 'text-6xl',
    '2xl': 'text-7xl'
  }

  const animationClasses = {
    bounce: 'animate-bounce',
    float: 'animate-float',
    wiggle: 'animate-wiggle', 
    spin: 'animate-spin-slow',
    pulse: 'animate-pulse',
    rainbow: 'animate-rainbow'
  }

  return (
    <div 
      className={`
        inline-block
        ${sizeClasses[size]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  )
}

interface FloatingElementProps {
  emoji: string
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  animation?: 'bounce' | 'float' | 'wiggle' | 'spin' | 'pulse'
  delay?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function FloatingElement({ 
  emoji, 
  position, 
  animation = 'float',
  delay = '0ms',
  size = 'md'
}: FloatingElementProps) {
  return (
    <div 
      className="absolute pointer-events-none z-10"
      style={position}
    >
      <AnimatedIcon 
        animation={animation} 
        delay={delay}
        size={size}
      >
        {emoji}
      </AnimatedIcon>
    </div>
  )
}

interface MagicButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'magical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function MagicButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: MagicButtonProps) {
  const baseClasses = "font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white focus:ring-purple-300",
    secondary: "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white focus:ring-blue-300",
    magical: "magic-gradient text-white focus:ring-pink-300 animate-pulse"
  }

  const sizeClasses = {
    sm: "text-lg py-2 px-6",
    md: "text-xl py-4 px-8", 
    lg: "text-2xl py-6 px-12"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
