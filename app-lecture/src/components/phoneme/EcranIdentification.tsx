'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePhoneme } from '@/hooks/usePhoneme'

interface EcranIdentificationProps {
  phonemeId: number
  onComplete: (score: number, timeSpent: number) => void
}

interface WordStimulus {
  word: string
  hasPhoneme: boolean
  audioUrl?: string
}

export function EcranIdentification({ phonemeId, onComplete }: EcranIdentificationProps) {
  const { phoneme } = usePhoneme(phonemeId)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const [words, setWords] = useState<WordStimulus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Génération des mots d'exemple
  useEffect(() => {
    if (!phoneme) return

    const generateWords = () => {
      // Mots contenant le phonème
      const wordsWithPhoneme = getWordsWithPhoneme(phoneme.symbole)
      // Mots ne contenant pas le phonème
      const wordsWithoutPhoneme = getWordsWithoutPhoneme(phoneme.symbole)

      // Mélanger et prendre 6 de chaque
      const selectedWords: WordStimulus[] = [
        ...wordsWithPhoneme.slice(0, 6).map(word => ({ word, hasPhoneme: true })),
        ...wordsWithoutPhoneme.slice(0, 6).map(word => ({ word, hasPhoneme: false }))
      ]

      // Mélanger l'ordre de présentation
      return selectedWords.sort(() => Math.random() - 0.5)
    }

    setWords(generateWords())
    setIsLoading(false)
  }, [phoneme])

  const currentWord = words[currentWordIndex]

  const handleAnswer = useCallback((answer: boolean) => {
    if (!currentWord || isComplete) return

    const isCorrect = answer === currentWord.hasPhoneme
    setAttempts(prev => prev + 1)
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }

    // Passer au mot suivant après un délai
    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1)
        setFeedback(null)
      } else {
        // Fin de l'activité
        setIsComplete(true)
        const finalScore = (score + (isCorrect ? 1 : 0)) / words.length * 100
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        onComplete(finalScore, timeSpent)
      }
    }, 1500)
  }, [currentWord, currentWordIndex, words.length, score, startTime, onComplete, isComplete])

  const playWordAudio = useCallback(() => {
    if (!currentWord) return

    // Utilisation de l'API Speech Synthesis pour prononcer le mot
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
  }, [currentWord])

  const restartActivity = () => {
    setCurrentWordIndex(0)
    setScore(0)
    setAttempts(0)
    setFeedback(null)
    setIsComplete(false)
    // Remélanger les mots
    setWords(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  if (isLoading || !phoneme) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Préparation de l'activité...</p>
        </div>
      </div>
    )
  }

  if (isComplete) {
    const finalScore = (score / words.length) * 100

    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {finalScore >= 80 ? '🎉 Bravo !' : finalScore >= 60 ? '👍 Bien joué !' : '💪 Continue !'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {score}/{words.length}
          </div>
          <p>Tu as reconnu {finalScore.toFixed(0)}% des sons !</p>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={restartActivity} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
            <Button onClick={() => onComplete(finalScore, Math.floor((Date.now() - startTime) / 1000))}>
              Continuer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentWordIndex + 1) / words.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              🎯 J'entends le son {phoneme.symbole}
            </h2>
            <p className="text-blue-700">
              Écoute bien le mot et dis-moi si tu entends le son <strong>{phoneme.symbole}</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progression */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Mot {currentWordIndex + 1} sur {words.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Mot actuel */}
      <Card className="relative">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            {/* Bouton lecture */}
            <Button
              onClick={playWordAudio}
              size="lg"
              className="w-32 h-32 rounded-full text-2xl bg-blue-600 hover:bg-blue-700"
            >
              <Volume2 className="w-12 h-12" />
            </Button>
            
            {/* Mot écrit (optionnel selon le niveau) */}
            <div className="text-3xl font-bold text-gray-800">
              {currentWord?.word}
            </div>

            {/* Question */}
            <div className="text-lg text-gray-700">
              Est-ce que tu entends le son <span className="font-bold text-blue-600">{phoneme.symbole}</span> ?
            </div>

            {/* Boutons de réponse */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => handleAnswer(true)}
                disabled={feedback !== null}
                size="lg"
                variant={feedback === 'correct' && currentWord?.hasPhoneme ? 'default' : 'outline'}
                className={cn(
                  "w-32 h-16 text-lg",
                  feedback === 'correct' && currentWord?.hasPhoneme && "bg-green-600 hover:bg-green-700",
                  feedback === 'incorrect' && currentWord?.hasPhoneme && "bg-red-600 hover:bg-red-700"
                )}
              >
                {feedback === 'correct' && currentWord?.hasPhoneme ? (
                  <CheckCircle className="w-6 h-6 mr-2" />
                ) : feedback === 'incorrect' && currentWord?.hasPhoneme ? (
                  <XCircle className="w-6 h-6 mr-2" />
                ) : null}
                ✅ Oui
              </Button>

              <Button
                onClick={() => handleAnswer(false)}
                disabled={feedback !== null}
                size="lg"
                variant={feedback === 'correct' && !currentWord?.hasPhoneme ? 'default' : 'outline'}
                className={cn(
                  "w-32 h-16 text-lg",
                  feedback === 'correct' && !currentWord?.hasPhoneme && "bg-green-600 hover:bg-green-700",
                  feedback === 'incorrect' && !currentWord?.hasPhoneme && "bg-red-600 hover:bg-red-700"
                )}
              >
                {feedback === 'correct' && !currentWord?.hasPhoneme ? (
                  <CheckCircle className="w-6 h-6 mr-2" />
                ) : feedback === 'incorrect' && !currentWord?.hasPhoneme ? (
                  <XCircle className="w-6 h-6 mr-2" />
                ) : null}
                ❌ Non
              </Button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={cn(
                "p-4 rounded-lg text-lg font-medium",
                feedback === 'correct' 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              )}>
                {feedback === 'correct' ? (
                  <span>🎉 Très bien !</span>
                ) : (
                  <span>
                    💪 Continue ! Le mot "{currentWord.word}" {currentWord.hasPhoneme ? 'contient' : 'ne contient pas'} le son {phoneme.symbole}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Score actuel */}
      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <div className="text-center text-sm text-gray-600">
            Score actuel : {score}/{currentWordIndex + (feedback ? 1 : 0)} 
            {attempts > 0 && ` (${Math.round((score / Math.max(attempts, 1)) * 100)}%)`}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Fonctions utilitaires pour générer des mots
function getWordsWithPhoneme(phoneme: string): string[] {
  const wordsByPhoneme: Record<string, string[]> = {
    '/a/': ['chat', 'papa', 'gâteau', 'arbre', 'table', 'maman', 'bal', 'rat'],
    '/i/': ['lit', 'ami', 'souris', 'midi', 'ici', 'vie', 'six', 'nid'],
    '/o/': ['pot', 'dos', 'mot', 'beau', 'zoo', 'photo', 'eau', 'auto'],
    '/m/': ['maman', 'ami', 'maison', 'mouton', 'lime', 'plume', 'pomme', 'mime'],
    '/l/': ['lit', 'lune', 'table', 'ball', 'école', 'belle', 'sol', 'bol']
  }
  
  return wordsByPhoneme[phoneme] || ['mot', 'son', 'eau']
}

function getWordsWithoutPhoneme(phoneme: string): string[] {
  const distractors: Record<string, string[]> = {
    '/a/': ['lit', 'tes', 'roi', 'deux', 'bois', 'mer', 'feu', 'nez'],
    '/i/': ['pot', 'dos', 'mot', 'beau', 'zoo', 'chat', 'eau', 'auto'],
    '/o/': ['lit', 'ami', 'ici', 'vie', 'six', 'nid', 'mer', 'feu'],
    '/m/': ['pot', 'dos', 'lit', 'chat', 'eau', 'auto', 'roi', 'nez'],
    '/l/': ['pot', 'ami', 'chat', 'roi', 'deux', 'mer', 'feu', 'nez']
  }
  
  return distractors[phoneme] || ['roi', 'nez', 'deux']
}
