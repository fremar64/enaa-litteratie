'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { X, Home, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Phoneme } from '@/types/database'

interface PhonemeHeaderProps {
  phoneme: Phoneme
  currentScreen: number
  totalScreens: number
  onExit: () => void
  onRestart?: () => void
  className?: string
}

const screenTitles = [
  '', // Index 0 non utilisé
  "J'entends le son",
  "Je trouve sa place",
  "Je reconnais la lettre", 
  "Je combine",
  "Je lis des mots",
  "J'écris des mots",
  "Je lis des phrases"
]

export function PhonemeHeader({ 
  phoneme, 
  currentScreen, 
  totalScreens, 
  onExit,
  onRestart,
  className 
}: PhonemeHeaderProps) {
  const progress = ((currentScreen - 1) / totalScreens) * 100

  return (
    <header className={cn(
      "bg-white shadow-md border-b-2 border-blue-200 sticky top-0 z-50",
      className
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Section gauche - Info phonème */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {phoneme.symbole}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  {screenTitles[currentScreen]} {phoneme.symbole}
                </h1>
                <p className="text-sm text-gray-600">
                  Écran {currentScreen} sur {totalScreens} • Phase {phoneme.phase}
                </p>
              </div>
            </div>
          </div>

          {/* Section centre - Progression */}
          <div className="flex-1 max-w-md mx-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progression</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-200"
              />
              <div className="flex justify-center space-x-1">
                {Array.from({ length: totalScreens }, (_, i) => (
                  <div
                    key={i + 1}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      i + 1 < currentScreen 
                        ? "bg-green-500" 
                        : i + 1 === currentScreen 
                        ? "bg-blue-500" 
                        : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section droite - Actions */}
          <div className="flex items-center space-x-2">
            {onRestart && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRestart}
                className="text-orange-600 border-orange-300 hover:bg-orange-50"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Recommencer
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={onExit}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Home className="w-4 h-4 mr-1" />
              Accueil
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Graphèmes associés */}
        <div className="mt-3 flex justify-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Lettres :</span>
            <div className="flex space-x-1">
              {phoneme.graphemes.slice(0, 4).map((grapheme, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-1 bg-blue-50 border border-blue-200 rounded text-sm font-bold text-blue-800"
                >
                  {grapheme}
                </span>
              ))}
              {phoneme.graphemes.length > 4 && (
                <span className="text-gray-500 text-sm">+{phoneme.graphemes.length - 4}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
