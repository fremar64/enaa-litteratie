'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AnimatedIcon, FloatingElement, MagicButton } from '@/components/ui/animated-elements'
import { KidsProgressBar } from '@/components/ui/kids-progress'
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
      case 'mastered': return 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300 shadow-lg'
      case 'in-progress': return 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-300 shadow-md'
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
        {/* Éléments décoratifs pendant le chargement */}
        <FloatingElement emoji="⌛" position={{ top: '20%', left: '15%' }} animation="spin" />
        <FloatingElement emoji="📚" position={{ top: '30%', right: '20%' }} animation="float" delay="500ms" />
        <FloatingElement emoji="✨" position={{ bottom: '25%', left: '20%' }} animation="pulse" delay="1s" />
        
        <div className="text-center">
          <AnimatedIcon animation="spin" size="2xl" className="mb-4">⚡</AnimatedIcon>
          <div className="text-2xl font-bold text-gray-700">Chargement de tes activités magiques...</div>
        </div>
      </div>
    )
  }

  const masteredCount = Object.values(progressData).filter(score => score >= 80).length
  const inProgressCount = Object.values(progressData).filter(score => score > 0 && score < 80).length
  const totalProgress = phonemes.length > 0 ? (masteredCount / phonemes.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 relative overflow-hidden">
      {/* Éléments décoratifs flottants */}
      <FloatingElement emoji="🌟" position={{ top: '10%', left: '5%' }} animation="wiggle" />
      <FloatingElement emoji="🎨" position={{ top: '15%', right: '10%' }} animation="float" delay="1s" />
      <FloatingElement emoji="🦋" position={{ bottom: '20%', left: '8%' }} animation="bounce" delay="1.5s" />
      <FloatingElement emoji="🌈" position={{ bottom: '15%', right: '15%' }} animation="pulse" delay="2s" />
      <FloatingElement emoji="✨" position={{ top: '40%', left: '3%' }} animation="float" delay="0.5s" />
      
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Bannière demo si données de démo utilisées */}
          {user?.id === 'demo-student-123' && (
            <div className="bg-green-100/80 backdrop-blur-sm border-2 border-green-300 text-green-800 px-6 py-3 rounded-2xl mb-6 text-center shadow-lg">
              <AnimatedIcon animation="bounce" size="sm" className="inline mr-2">🎮</AnimatedIcon>
              <strong>Mode Démonstration</strong> - Données temporaires, idéal pour tester l'interface !
            </div>
          )}

          {/* En-tête avec animation */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4 child-friendly">
              <AnimatedIcon animation="wiggle" size="lg" className="inline mr-3">👋</AnimatedIcon>
              Salut {user?.prenom || user?.nom} !
            </h1>
            <p className="text-2xl font-bold text-gray-700 mb-6">
              Choisis un son magique pour commencer ton aventure !
            </p>
            
            {/* Barre de progression globale */}
            <KidsProgressBar 
              currentStep={masteredCount}
              totalSteps={phonemes.length}
              title="Ton aventure dans le monde des sons"
            />
          </div>

          {/* Grille des phonèmes avec design amélioré */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {phonemes.map((phoneme, index) => {
              const status = getPhonemeStatus(phoneme.id)
              const score = progressData[phoneme.id] || 0

              return (
                <Card 
                  key={phoneme.id}
                  className={`cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-2xl transform border-3 ${getStatusColor(status)} backdrop-blur-sm`}
                  onClick={() => handlePhonemeSelect(phoneme)}
                >
                  <CardHeader className="text-center relative">
                    {/* Icône de statut animée */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <AnimatedIcon 
                        animation={status === 'mastered' ? 'bounce' : status === 'in-progress' ? 'pulse' : 'float'} 
                        size="lg"
                      >
                        {getStatusIcon(status)}
                      </AnimatedIcon>
                    </div>
                    
                    <CardTitle className="text-5xl font-black mb-2">
                      <AnimatedIcon animation="float" delay={`${index * 200}ms`}>
                        {phoneme.symbole}
                      </AnimatedIcon>
                    </CardTitle>
                    <div className="flex justify-center items-center gap-2 text-sm font-semibold">
                      <span className="bg-white/70 px-3 py-1 rounded-full">Phase {phoneme.phase}</span>
                      <span className="bg-white/70 px-3 py-1 rounded-full">{phoneme.niveau_min}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Exemples de graphèmes avec style amélioré */}
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700 mb-2">🔤 Mes lettres :</p>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {phoneme.graphemes.slice(0, 4).map((grapheme, idx) => (
                          <span 
                            key={idx}
                            className="inline-block px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-xl font-black shadow-md border-2 border-purple-200 hover:scale-105 transition-transform"
                          >
                            {grapheme}
                          </span>
                        ))}
                        {phoneme.graphemes.length > 4 && (
                          <span className="text-gray-500 text-lg">...</span>
                        )}
                      </div>
                    </div>

                    {/* Progression avec design enfant */}
                    <div className="bg-white/50 rounded-xl p-3">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>🎯 Ma progression</span>
                        <span className="text-purple-600">{Math.round(score)}%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        />
                        {score > 20 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatedIcon animation="bounce" size="sm">🌟</AnimatedIcon>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {phoneme.description && (
                      <p className="text-sm text-gray-600 text-center bg-white/30 rounded-lg p-2">
                        {phoneme.description}
                      </p>
                    )}

                    {/* Bouton d'action magique */}
                    <MagicButton
                      onClick={() => handlePhonemeSelect(phoneme)}
                      variant={status === 'mastered' ? 'secondary' : 'magical'}
                      size="md"
                      className="w-full"
                    >
                      {status === 'mastered' ? '🔄 Réviser la magie' : 
                       status === 'in-progress' ? '📚 Continuer l\'aventure' : 
                       '🎯 Découvrir le son'}
                    </MagicButton>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Statistiques globales avec design enfant */}
          <Card className="bg-white/80 backdrop-blur-sm border-3 border-purple-300 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-black">
                <AnimatedIcon animation="rainbow" size="lg" className="mr-3">📊</AnimatedIcon>
                Mes Super Progrès !
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-300">
                  <AnimatedIcon animation="bounce" size="xl" className="mb-2">⭐</AnimatedIcon>
                  <div className="text-4xl font-black text-yellow-600">{masteredCount}</div>
                  <div className="text-lg font-bold text-gray-700">Sons maîtrisés</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-300">
                  <AnimatedIcon animation="pulse" size="xl" className="mb-2">📚</AnimatedIcon>
                  <div className="text-4xl font-black text-blue-600">{inProgressCount}</div>
                  <div className="text-lg font-bold text-gray-700">En cours</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-6 border-2 border-green-300">
                  <AnimatedIcon animation="wiggle" size="xl" className="mb-2">🚀</AnimatedIcon>
                  <div className="text-4xl font-black text-green-600">{phonemes.length - Object.keys(progressData).length}</div>
                  <div className="text-lg font-bold text-gray-700">À découvrir</div>
                </div>
              </div>
              
              {/* Message d'encouragement */}
              <div className="mt-6 text-center">
                {totalProgress === 100 ? (
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                    🎉 Bravo champion ! Tu as maîtrisé tous les sons ! 🎉
                  </p>
                ) : totalProgress >= 50 ? (
                  <p className="text-xl font-bold text-purple-600">
                    🌟 Excellent travail ! Tu progresses super bien ! 🌟
                  </p>
                ) : (
                  <p className="text-xl font-bold text-blue-600">
                    🚀 C'est parti pour l'aventure des sons ! 🚀
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bouton déconnexion avec style enfant */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => {
                useAppStore.getState().setUser(null)
                useAppStore.getState().setAuthenticated(false)
                router.push('/')
              }}
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:bg-white/90 text-gray-700 font-bold text-lg px-8 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <AnimatedIcon animation="wiggle" size="sm" className="mr-2">👋</AnimatedIcon>
              Me déconnecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
