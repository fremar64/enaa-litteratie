'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePhoneme } from '@/hooks/usePhoneme'

interface EcranLocalisationProps {
  phonemeId: number
  onComplete: (score: number, timeSpent: number) => void
}

interface WordPosition {
  word: string
  syllables: string[]
  phonemePosition: 'debut' | 'milieu' | 'fin'
  phonemeInSyllable: number // index de la syllabe contenant le phonème
}

export function EcranLocalisation({ phonemeId, onComplete }: EcranLocalisationProps) {
  const { phoneme } = usePhoneme(phonemeId)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const [words, setWords] = useState<WordPosition[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!phoneme) return

    const generateWords = () => {
      return getWordsWithPositions(phoneme.symbole)
    }

    setWords(generateWords())
    setIsLoading(false)
  }, [phoneme])

  const currentWord = words[currentWordIndex]

  const handlePositionClick = useCallback((clickedSyllableIndex: number) => {
    if (!currentWord || isComplete) return

    const isCorrect = clickedSyllableIndex === currentWord.phonemeInSyllable
    setAttempts(prev => prev + 1)
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('incorrect')
    }

    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1)
        setFeedback(null)
      } else {
        setIsComplete(true)
        const finalScore = (score + (isCorrect ? 1 : 0)) / words.length * 100
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        onComplete(finalScore, timeSpent)
      }
    }, 1500)
  }, [currentWord, currentWordIndex, words.length, score, startTime, onComplete, isComplete])

  const playWordAudio = useCallback(() => {
    if (!currentWord) return

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.7
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
            {finalScore >= 80 ? '🎉 Excellent !' : finalScore >= 60 ? '👍 Bien joué !' : '💪 Continue !'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {score}/{words.length}
          </div>
          <p>Tu as trouvé {finalScore.toFixed(0)}% des positions !</p>
          
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
              🔍 Je trouve la place du son {phoneme.symbole}
            </h2>
            <p className="text-blue-700">
              Écoute le mot et clique sur la syllabe où tu entends le son <strong>{phoneme.symbole}</strong>
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
              className="w-24 h-24 rounded-full text-xl bg-blue-600 hover:bg-blue-700"
            >
              <Volume2 className="w-8 h-8" />
            </Button>
            
            {/* Mot écrit */}
            <div className="text-3xl font-bold text-gray-800 mb-6">
              {currentWord?.word}
            </div>

            {/* Question */}
            <div className="text-lg text-gray-700 mb-6">
              Dans quelle syllabe entends-tu le son <span className="font-bold text-blue-600">{phoneme.symbole}</span> ?
            </div>

            {/* Syllabes cliquables */}
            <div className="flex justify-center gap-3 flex-wrap">
              {currentWord?.syllables.map((syllable, index) => (
                <Button
                  key={index}
                  onClick={() => handlePositionClick(index)}
                  disabled={feedback !== null}
                  size="lg"
                  variant="outline"
                  className={cn(
                    "min-w-[80px] h-16 text-xl font-bold border-2 transition-all duration-300",
                    feedback === null && "hover:bg-blue-50 hover:border-blue-300",
                    feedback === 'correct' && index === currentWord.phonemeInSyllable && 
                      "bg-green-100 border-green-500 text-green-700",
                    feedback === 'incorrect' && index === currentWord.phonemeInSyllable && 
                      "bg-green-100 border-green-500 text-green-700",
                    feedback === 'incorrect' && index !== currentWord.phonemeInSyllable && 
                      "bg-red-100 border-red-500 text-red-700"
                  )}
                >
                  {syllable}
                  {feedback === 'correct' && index === currentWord.phonemeInSyllable && (
                    <CheckCircle className="w-5 h-5 ml-2 text-green-600" />
                  )}
                </Button>
              ))}
            </div>

            {/* Indicateur visuel de position */}
            <div className="flex justify-center gap-2 mt-4">
              {currentWord?.syllables.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-8 h-2 rounded-full transition-all duration-300",
                    feedback === null && "bg-gray-300",
                    feedback === 'correct' && index === currentWord.phonemeInSyllable && "bg-green-500",
                    feedback === 'incorrect' && index === currentWord.phonemeInSyllable && "bg-green-500",
                    feedback !== null && index !== currentWord.phonemeInSyllable && "bg-gray-300"
                  )}
                />
              ))}
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
                  <span>🎉 Parfait ! Tu as trouvé la bonne syllabe !</span>
                ) : (
                  <span>
                    💪 Pas tout à fait ! Le son {phoneme.symbole} est dans la syllabe "{currentWord.syllables[currentWord.phonemeInSyllable]}"
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

// Fonction utilitaire pour générer des mots avec positions
function getWordsWithPositions(phoneme: string): WordPosition[] {
  const wordsByPhoneme: Record<string, WordPosition[]> = {
    '/a/': [
      { word: 'chat', syllables: ['chat'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'papa', syllables: ['pa', 'pa'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'gâteau', syllables: ['gâ', 'teau'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'table', syllables: ['ta', 'ble'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'arbre', syllables: ['ar', 'bre'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'maman', syllables: ['ma', 'man'], phonemePosition: 'debut', phonemeInSyllable: 0 }
    ],
    '/i/': [
      { word: 'lit', syllables: ['lit'], phonemePosition: 'milieu', phonemeInSyllable: 0 },
      { word: 'ami', syllables: ['a', 'mi'], phonemePosition: 'fin', phonemeInSyllable: 1 },
      { word: 'souris', syllables: ['sou', 'ris'], phonemePosition: 'fin', phonemeInSyllable: 1 },
      { word: 'midi', syllables: ['mi', 'di'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'ici', syllables: ['i', 'ci'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'vie', syllables: ['vie'], phonemePosition: 'milieu', phonemeInSyllable: 0 }
    ],
    '/o/': [
      { word: 'pot', syllables: ['pot'], phonemePosition: 'milieu', phonemeInSyllable: 0 },
      { word: 'dos', syllables: ['dos'], phonemePosition: 'milieu', phonemeInSyllable: 0 },
      { word: 'mot', syllables: ['mot'], phonemePosition: 'milieu', phonemeInSyllable: 0 },
      { word: 'beau', syllables: ['beau'], phonemePosition: 'fin', phonemeInSyllable: 0 },
      { word: 'zoo', syllables: ['zoo'], phonemePosition: 'fin', phonemeInSyllable: 0 },
      { word: 'auto', syllables: ['au', 'to'], phonemePosition: 'fin', phonemeInSyllable: 1 }
    ],
    '/m/': [
      { word: 'maman', syllables: ['ma', 'man'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'ami', syllables: ['a', 'mi'], phonemePosition: 'debut', phonemeInSyllable: 1 },
      { word: 'maison', syllables: ['mai', 'son'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'mouton', syllables: ['mou', 'ton'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'lime', syllables: ['li', 'me'], phonemePosition: 'fin', phonemeInSyllable: 1 },
      { word: 'plume', syllables: ['plu', 'me'], phonemePosition: 'fin', phonemeInSyllable: 1 }
    ],
    '/l/': [
      { word: 'lit', syllables: ['lit'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'lune', syllables: ['lu', 'ne'], phonemePosition: 'debut', phonemeInSyllable: 0 },
      { word: 'table', syllables: ['ta', 'ble'], phonemePosition: 'fin', phonemeInSyllable: 1 },
      { word: 'école', syllables: ['é', 'co', 'le'], phonemePosition: 'fin', phonemeInSyllable: 2 },
      { word: 'belle', syllables: ['bel', 'le'], phonemePosition: 'fin', phonemeInSyllable: 1 },
      { word: 'sol', syllables: ['sol'], phonemePosition: 'fin', phonemeInSyllable: 0 }
    ]
  }
  
  const defaultWords: WordPosition[] = [
    { word: 'mot', syllables: ['mot'], phonemePosition: 'milieu', phonemeInSyllable: 0 }
  ]
  
  return (wordsByPhoneme[phoneme] || defaultWords).sort(() => Math.random() - 0.5)
}
