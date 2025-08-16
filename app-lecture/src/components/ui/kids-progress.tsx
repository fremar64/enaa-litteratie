'use client'

interface ProgressStarProps {
  completed: boolean
  current: boolean
  number: number
}

export function ProgressStar({ completed, current, number }: ProgressStarProps) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all duration-500
          ${completed 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 scale-110 animate-pulse' 
            : current 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-105 animate-bounce'
              : 'bg-gray-300'
          }
        `}
      >
        {completed ? '⭐' : number}
      </div>
      <div className={`
        mt-2 text-xs font-semibold
        ${completed ? 'text-yellow-600' : current ? 'text-blue-600' : 'text-gray-400'}
      `}>
        {completed ? 'Réussi !' : current ? 'En cours' : 'À venir'}
      </div>
    </div>
  )
}

interface KidsProgressBarProps {
  currentStep: number
  totalSteps: number
  title?: string
}

export function KidsProgressBar({ currentStep, totalSteps, title }: KidsProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200">
      {title && (
        <h3 className="text-xl font-bold text-center text-gray-700 mb-4">{title}</h3>
      )}
      
      {/* Barre de progression colorée */}
      <div className="relative h-6 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
          {currentStep} / {totalSteps}
        </div>
      </div>

      {/* Étoiles de progression */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <ProgressStar
            key={index}
            number={index + 1}
            completed={index < currentStep}
            current={index === currentStep}
          />
        ))}
      </div>
    </div>
  )
}

interface CelebrationProps {
  show: boolean
  onComplete?: () => void
}

export function Celebration({ show, onComplete }: CelebrationProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl border-4 border-yellow-300 animate-bounce">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-4">
          Bravo !
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Tu as réussi cette activité !
        </p>
        <button
          onClick={onComplete}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300"
        >
          Continuer ! 🚀
        </button>
      </div>
    </div>
  )
}
