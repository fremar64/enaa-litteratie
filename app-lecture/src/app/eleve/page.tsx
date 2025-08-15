'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/stores/appStore'
import { createClient } from '@/lib/supabase/client'
import { demoPhonemes, demoProgress, mockSupabaseOperations } from '@/lib/demo-data'
import type { Phoneme } from '@/types/database'

export default function ElevePage() {
  const [phonemes, setPhonemes] = useState<Phoneme[]>([])
  const [progressData, setProgressData] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  const { user, isAuthenticated, startPhonemeSession } = useAppStore()
  const router = useRouter()
  const supabase = createClient()

  // Redirection si non connecté
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/')
      return
    }
    loadPhonemes()
    loadProgress()
  }, [isAuthenticated, user, router])

  const loadPhonemes = async () => {
    try {
      // Tenter d'abord avec Supabase
      const { data, error } = await supabase
        .from('phonemes')
        .select('*')
        .order('phase', { ascending: true })
        .order('ordre_phase', { ascending: true })

      if (error) {
        console.warn('Supabase non disponible, utilisation des données de démo:', error)
        // Fallback vers les données de démonstration
        const demoData = await mockSupabaseOperations.getPhonemes()
        setPhonemes(demoData || [])
      } else {
        setPhonemes(data || [])
      }
    } catch (err) {
      console.warn('Erreur Supabase, utilisation des données de démo:', err)
      // Fallback vers les données de démonstration
      const demoData = await mockSupabaseOperations.getPhonemes()
      setPhonemes(demoData || [])
    }
  }

  const loadProgress = async () => {
    if (!user) return

    try {
      // Tenter d'abord avec Supabase
      const { data, error } = await supabase
        .from('progression_eleves')
        .select('phoneme_id, meilleur_score')
        .eq('eleve_id', user.id)

      if (error) {
        console.warn('Supabase non disponible pour la progression, utilisation démo:', error)
        // Fallback vers les données de démonstration
        const demoData = await mockSupabaseOperations.getProgress(user.id)
        const progress: Record<number, number> = {}
        Object.entries(demoData.data || {}).forEach(([phonemeId, score]) => {
          progress[parseInt(phonemeId)] = score as number
        })
        setProgressData(progress)
      } else {
        const progress: Record<number, number> = {}
        data?.forEach((item: any) => {
          if (item.meilleur_score) {
            progress[item.phoneme_id] = item.meilleur_score * 100
          }
        })
        setProgressData(progress)
      }
    } catch (err) {
      console.warn('Erreur chargement progression, utilisation démo:', err)
      // Fallback vers les données de démonstration
      const demoData = await mockSupabaseOperations.getProgress(user.id)
      const progress: Record<number, number> = {}
      Object.entries(demoData.data || {}).forEach(([phonemeId, score]) => {
        progress[parseInt(phonemeId)] = score as number
      })
      setProgressData(progress)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhonemeSelect = (phoneme: Phoneme) => {
    startPhonemeSession(phoneme)
    router.push(`/eleve/phoneme/${phoneme.id}/ecran/1`)
  }

  const getPhonemeStatus = (phonemeId: number) => {
    const score = progressData[phonemeId] || 0
    if (score >= 80) return 'mastered'
    if (score >= 50) return 'in-progress'
    return 'not-started'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered': return '⭐'
      case 'in-progress': return '📚'
      default: return '🎯'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered': return 'bg-green-100 border-green-300 text-green-800'
      case 'in-progress': return 'bg-blue-100 border-blue-300 text-blue-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-lg">Chargement de tes activités...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Bannière demo si données de démo utilisées */}
        {user?.id === 'demo-student-123' && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg mb-6 text-center">
            🎮 <strong>Mode Démonstration</strong> - Données temporaires, idéal pour tester l'interface !
          </div>
        )}

        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Salut {user?.prenom || user?.nom} ! 👋
          </h1>
          <p className="text-xl text-gray-700">
            Choisis un son pour commencer à apprendre !
          </p>
        </div>

        {/* Grille des phonèmes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phonemes.map((phoneme) => {
            const status = getPhonemeStatus(phoneme.id)
            const score = progressData[phoneme.id] || 0

            return (
              <Card 
                key={phoneme.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${getStatusColor(status)}`}
                onClick={() => handlePhonemeSelect(phoneme)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold">
                    {getStatusIcon(status)} {phoneme.symbole}
                  </CardTitle>
                  <p className="text-sm">
                    Phase {phoneme.phase} • Niveau {phoneme.niveau_min}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Exemples de graphèmes */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Lettres :</p>
                      <div className="flex justify-center gap-1">
                        {phoneme.graphemes.slice(0, 3).map((grapheme, idx) => (
                          <span 
                            key={idx}
                            className="inline-block px-2 py-1 bg-white rounded text-lg font-bold"
                          >
                            {grapheme}
                          </span>
                        ))}
                        {phoneme.graphemes.length > 3 && (
                          <span className="text-gray-500">...</span>
                        )}
                      </div>
                    </div>

                    {/* Progression */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progression</span>
                        <span>{Math.round(score)}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>

                    {/* Description */}
                    {phoneme.description && (
                      <p className="text-xs text-gray-600 text-center">
                        {phoneme.description}
                      </p>
                    )}

                    {/* Bouton d'action */}
                    <Button 
                      className="w-full"
                      variant={status === 'mastered' ? 'outline' : 'default'}
                    >
                      {status === 'mastered' ? '🔄 Réviser' : 
                       status === 'in-progress' ? '📚 Continuer' : 
                       '🎯 Commencer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Statistiques globales */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">📊 Mes progrès</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(progressData).filter(score => score >= 80).length}
                </div>
                <div className="text-sm text-gray-600">Sons maîtrisés</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(progressData).filter(score => score > 0 && score < 80).length}
                </div>
                <div className="text-sm text-gray-600">En cours</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {phonemes.length - Object.keys(progressData).length}
                </div>
                <div className="text-sm text-gray-600">À découvrir</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bouton déconnexion */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              useAppStore.getState().setUser(null)
              useAppStore.getState().setAuthenticated(false)
              router.push('/')
            }}
          >
            👋 Me déconnecter
          </Button>
        </div>
      </div>
    </div>
  )
}
