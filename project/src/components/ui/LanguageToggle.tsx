'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface LanguageToggleProps {
  onChange: (language: 'en' | 'hi') => void
  className?: string
}

export function LanguageToggle({ onChange, className }: LanguageToggleProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en'
    setLanguage(newLanguage)
    onChange(newLanguage)
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("text-sm font-medium mr-2", language === 'en' ? 'text-primary-700' : 'text-gray-500')}>
        English
      </span>
      <button
        type="button"
        className={cn(
          "lang-switch",
          language === 'hi' ? 'bg-primary-600' : 'bg-gray-200'
        )}
        onClick={toggleLanguage}
        aria-pressed={language === 'hi'}
      >
        <span className="sr-only">
          {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        </span>
        <motion.span
          className="lang-switch-slider"
          animate={{ translateX: language === 'hi' ? '24px' : '0px' }}
        />
      </button>
      <span className={cn("text-sm font-medium ml-2", language === 'hi' ? 'text-primary-700' : 'text-gray-500')}>
        हिंदी
      </span>
    </div>
  )
}