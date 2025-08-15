'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/stores/appStore'
import { usePhoneme } from '@/hooks/usePhoneme'
import { PhonemeHeader } from '@/components/phoneme/shared/PhonemeHeader'
import { EcranIdentification } from '@/components/phoneme/EcranIdentification'
import { EcranLocalisation } from '@/components/phoneme/EcranLocalisation'
import { EcranReconnaissance } from '@/components/phoneme/EcranReconnaissance'
import { EcranCombinaison } from '@/components/phoneme/EcranCombinaison'
import { EcranLecture } from '@/components/phoneme/EcranLecture'
import { EcranEcriture } from '@/components/phoneme/EcranEcriture'
import { EcranPhrase } from '@/components/phoneme/EcranPhrase'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function EcranPhonemePage() {
  const params = useParams()
  const router = useRouter()
  const phonemeId = parseInt(params.id as string)
  const ecranNum = parseInt(params.num as string)

  const { user, isAuthenticated, updateSessionProgress, sessionData } = useAppStore()
  const { phoneme, isLoading, error } = usePhoneme(phonemeId)
  const [sessionStartTime] = useState(Date.now())

  // Vérification auth et validité des paramètres
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/')
      return
    }

    if (isNaN(phonemeId) || isNaN(ecranNum) || ecranNum < 1 || ecranNum > 7) {
      router.push('/eleve')
      return
    }
  }, [isAuthenticated, user, phonemeId, ecranNum, router])

  // Gestion de la completion d'un écran
  const handleScreenComplete = async (score: number, timeSpent: number) => {
    try {
      // Mise à jour du store local
      updateSessionProgress(ecranNum, score)

      // Sauvegarde en base de données
      await saveProgress(phonemeId, ecranNum, score, timeSpent)

      // Navigation vers l'écran suivant ou fin
      if (ecranNum < 7) {
        router.push(`/eleve/phoneme/${phonemeId}/ecran/${ecranNum + 1}`)
      } else {
        // Fin du phonème - retour à la sélection
        router.push('/eleve')
      }
    } catch (err) {
      console.error('Erreur sauvegarde progression:', err)
      // Continuer malgré l'erreur de sauvegarde
      if (ecranNum < 7) {
        router.push(`/eleve/phoneme/${phonemeId}/ecran/${ecranNum + 1}`)
      } else {
        router.push('/eleve')
      }
    }
  }

  const saveProgress = async (phonemeId: number, ecranNum: number, score: number, timeSpent: number) => {
    if (!user) return

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    // Vérifier si une progression existe déjà
    const { data: existingProgress } = await supabase
      .from('progression_eleves')
      .select('id, tentatives, meilleur_score, temps_total')
      .eq('eleve_id', user.id)
      .eq('phoneme_id', phonemeId)
      .eq('ecran_numero', ecranNum)
      .single()

    const newScore = score / 100 // Conversion en pourcentage
    const maitrise = newScore >= 0.8

    if (existingProgress) {
      // Mise à jour progression existante
      const { error } = await supabase
        .from('progression_eleves')
        .update({
          tentatives: existingProgress.tentatives + 1,
          score_actuel: newScore,
          meilleur_score: Math.max(existingProgress.meilleur_score || 0, newScore),
          temps_total: existingProgress.temps_total + timeSpent,
          maitrise,
          derniere_tentative: new Date().toISOString(),
          maitrise_atteinte: maitrise && !existingProgress.meilleur_score ? new Date().toISOString() : undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id)

      if (error) throw error
    } else {
      // Création nouvelle progression
      const { error } = await supabase
        .from('progression_eleves')
        .insert({
          eleve_id: user.id,
          phoneme_id: phonemeId,
          ecran_numero: ecranNum,
          tentatives: 1,
          score_actuel: newScore,
          meilleur_score: newScore,
          temps_total: timeSpent,
          maitrise,
          derniere_tentative: new Date().toISOString(),
          maitrise_atteinte: maitrise ? new Date().toISOString() : null
        })

      if (error) throw error
    }
  }

  // Rendu du bon composant selon l'écran
  const renderScreen = () => {
    if (!phoneme) return null

    const commonProps = {
      phonemeId,
      onComplete: handleScreenComplete
    }

    switch (ecranNum) {
      case 1:
        return <EcranIdentification {...commonProps} />
      case 2:
        return <EcranLocalisation {...commonProps} />
      case 3:
        return <EcranReconnaissance {...commonProps} />
      case 4:
        return <EcranCombinaison {...commonProps} />
      case 5:
        return <EcranLecture {...commonProps} />
      case 6:
        return <EcranEcriture {...commonProps} />
      case 7:
        return <EcranPhrase {...commonProps} />
      default:
        return <div>Écran non trouvé</div>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !phoneme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oups ! 😅</h2>
          <p className="text-gray-700 mb-4">
            {error || 'Ce phonème n\'existe pas'}
          </p>
          <button 
            onClick={() => router.push('/eleve')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retour aux activités
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PhonemeHeader 
        phoneme={phoneme}
        currentScreen={ecranNum}
        totalScreens={7}
        onExit={() => router.push('/eleve')}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderScreen()}
      </main>
    </div>
  )
}
