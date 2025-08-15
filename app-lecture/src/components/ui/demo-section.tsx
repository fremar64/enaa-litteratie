'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/stores/appStore'
import { demoStudent } from '@/lib/demo-data'
import { useRouter } from 'next/navigation'

export function DemoSection() {
  const [isDemo, setIsDemo] = useState(false)
  const { setUser, setAuthenticated } = useAppStore()
  const router = useRouter()

  const startDemo = () => {
    setUser(demoStudent)
    setAuthenticated(true)
    setIsDemo(true)
    router.push('/eleve')
  }

  return (
    <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-green-800">
          🚀 Mode Démonstration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-green-700">
          Testez l'application immédiatement avec des données de démonstration !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded border">
            <strong>✅ Fonctionnalités disponibles :</strong>
            <ul className="mt-2 text-left space-y-1">
              <li>• 5 phonèmes (a, i, o, m, l)</li>
              <li>• Écrans d'identification auditive</li>
              <li>• Localisation de phonèmes</li>
              <li>• Navigation complète</li>
              <li>• Sauvegarde temporaire</li>
            </ul>
          </div>
          
          <div className="bg-white p-3 rounded border">
            <strong>⚠️ Limitations demo :</strong>
            <ul className="mt-2 text-left space-y-1">
              <li>• Pas de base de données</li>
              <li>• Données temporaires</li>
              <li>• Audio synthétisé uniquement</li>
              <li>• Écrans 3-7 en développement</li>
            </ul>
          </div>
        </div>

        <Button 
          onClick={startDemo}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          🎮 Lancer la démonstration
        </Button>
        
        <p className="text-xs text-gray-600">
          Parfait pour tester l'interface et la navigation !
        </p>
      </CardContent>
    </Card>
  )
}
