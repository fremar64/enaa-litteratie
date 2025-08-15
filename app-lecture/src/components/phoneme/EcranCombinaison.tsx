'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EcranCombinaisonProps {
  phonemeId: number
  onComplete: (score: number, timeSpent: number) => void
}

export function EcranCombinaison({ phonemeId, onComplete }: EcranCombinaisonProps) {
  const [startTime] = useState(Date.now())

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-blue-50">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-bold text-blue-800">
            🔤 Je combine les lettres
          </h2>
          <p>Activité de combinaison en cours de développement...</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6 text-center">
          <Button onClick={() => onComplete(85, Math.floor((Date.now() - startTime) / 1000))}>
            Continuer (temporaire)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
