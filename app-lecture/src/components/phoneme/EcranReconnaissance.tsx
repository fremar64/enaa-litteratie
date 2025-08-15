'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePhoneme } from '@/hooks/usePhoneme'

interface EcranReconnaissanceProps {
  phonemeId: number
  onComplete: (score: number, timeSpent: number) => void
}

export function EcranReconnaissance({ phonemeId, onComplete }: EcranReconnaissanceProps) {
  const { phoneme } = usePhoneme(phonemeId)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())

  const exercises = [
    { targetGrapheme: 'a', options: ['a', 'e', 'o', 'u'] },
    { targetGrapheme: 'A', options: ['A', 'E', 'O', 'U'] },
    { targetGrapheme: 'i', options: ['i', 'l', 'j', 't'] },
    { targetGrapheme: 'I', options: ['I', 'L', 'J', 'T'] },
    // Ajouter plus d'exercices selon le phonème
  ]

  const handleAnswer = (selectedGrapheme: string) => {
    const currentExercise = exercises[currentIndex]
    const isCorrect = selectedGrapheme === currentExercise.targetGrapheme
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else {
        setIsComplete(true)
        const finalScore = (score + (isCorrect ? 1 : 0)) / exercises.length * 100
        onComplete(finalScore, Math.floor((Date.now() - startTime) / 1000))
      }
    }, 1000)
  }

  if (isComplete) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="text-2xl">🎉 Bravo !</div>
          <div className="text-4xl font-bold text-blue-600">{score}/{exercises.length}</div>
          <Button onClick={() => onComplete((score / exercises.length) * 100, Math.floor((Date.now() - startTime) / 1000))}>
            Continuer
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-blue-50">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-bold text-blue-800">
            👁️ Je reconnais la lettre {phoneme?.symbole}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Progress value={((currentIndex + 1) / exercises.length) * 100} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-8 text-center space-y-6">
          <div className="text-lg">Trouve la lettre : <strong>{exercises[currentIndex]?.targetGrapheme}</strong></div>
          
          <div className="grid grid-cols-2 gap-4">
            {exercises[currentIndex]?.options.map((option, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswer(option)}
                variant="outline"
                className="h-16 text-2xl font-bold"
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
