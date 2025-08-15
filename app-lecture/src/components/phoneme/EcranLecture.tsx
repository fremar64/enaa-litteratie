'use client'

import { useState } from 'react'

interface EcranLectureProps {
  phonemeId: number
  onComplete: (score: number, timeSpent: number) => void
}

export function EcranLecture({ phonemeId, onComplete }: EcranLectureProps) {
  const [startTime] = useState(Date.now())

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold text-blue-800 mb-2">
          📖 Je lis des mots
        </h2>
        <p>Activité de lecture en cours de développement...</p>
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => onComplete(85, Math.floor((Date.now() - startTime) / 1000))}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continuer (temporaire)
        </button>
      </div>
    </div>
  )
}
