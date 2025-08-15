'use client'

import { useState } from 'react'
import { AuthComponent } from '@/components/auth/AuthComponent'
import { useAuth } from '@/components/providers/AuthProvider'
import { usePhonemes } from '@/hooks/usePhoneme'
import { useStudentProgress, useUpdateProgress } from '@/hooks/useStudentData'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function TestSupabasePage() {
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const { phonemes, isLoading: phonemesLoading } = usePhonemes()
  const { data: progress, isLoading: progressLoading } = useStudentProgress()
  const updateProgress = useUpdateProgress()
  const [authVisible, setAuthVisible] = useState(!user)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user && authVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <AuthComponent onAuthSuccess={() => setAuthVisible(false)} />
      </div>
    )
  }

  const handleTestProgress = async () => {
    try {
      await updateProgress.mutateAsync({
        phonemeId: 1,
        ecranNumero: 1,
        scoreActuel: 0.85,
        tempsTotal: 120,
        maitrise: true
      })
      alert('Progression sauvegardée avec succès !')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Test de Configuration Supabase</h1>
              <p className="text-gray-600">
                Cette page permet de tester l'intégration Supabase
              </p>
            </div>
            {user && (
              <Button onClick={signOut} variant="outline">
                Se déconnecter
              </Button>
            )}
          </div>
        </Card>

        {/* Informations utilisateur */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informations Utilisateur</h2>
          {user ? (
            <div className="space-y-2">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {profile && (
                <>
                  <p><strong>Nom:</strong> {profile.nom}</p>
                  {profile.prenom && <p><strong>Prénom:</strong> {profile.prenom}</p>}
                  {profile.age && <p><strong>Âge:</strong> {profile.age} ans</p>}
                  {profile.niveau_scolaire && <p><strong>Niveau:</strong> {profile.niveau_scolaire}</p>}
                </>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">Mode démonstration - Aucun utilisateur connecté</p>
              <Button onClick={() => setAuthVisible(true)}>
                Se connecter
              </Button>
            </div>
          )}
        </Card>

        {/* Test des phonèmes */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Test des Phonèmes</h2>
          {phonemesLoading ? (
            <p>Chargement des phonèmes...</p>
          ) : (
            <div className="space-y-2">
              <p><strong>Nombre de phonèmes chargés:</strong> {phonemes.length}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {phonemes.map((phoneme) => (
                  <div key={phoneme.id} className="border rounded-lg p-3">
                    <h3 className="font-semibold">{phoneme.symbole}</h3>
                    <p className="text-sm text-gray-600">
                      Phase {phoneme.phase} - Difficulté {phoneme.difficulte}
                    </p>
                    <p className="text-sm">
                      Graphèmes: {phoneme.graphemes.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Test de la progression */}
        {user && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Test de la Progression</h2>
            <div className="space-y-4">
              <Button 
                onClick={handleTestProgress}
                disabled={updateProgress.isPending}
              >
                {updateProgress.isPending ? 'Sauvegarde...' : 'Tester la sauvegarde de progression'}
              </Button>
              
              {progressLoading ? (
                <p>Chargement de la progression...</p>
              ) : (
                <div>
                  <p><strong>Nombre d'entrées de progression:</strong> {progress?.length || 0}</p>
                  {progress && progress.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {progress.slice(0, 5).map((p) => (
                        <div key={p.id} className="border rounded p-2 text-sm">
                          <p>Phonème {p.phoneme_id} - Écran {p.ecran_numero}</p>
                          <p>Score: {p.score_actuel} - Maîtrise: {p.maitrise ? 'Oui' : 'Non'}</p>
                          <p>Tentatives: {p.tentatives} - Temps total: {p.temps_total}s</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Guide de configuration */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">État de la Configuration</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>URL Supabase: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configurée' : 'Non configurée'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>Clé Supabase: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configurée' : 'Non configurée'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${user ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span>Utilisateur: {user ? 'Connecté' : 'Mode démo'}</span>
            </div>
          </div>
          
          {(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800">
                Pour activer Supabase, consultez le fichier <code>SUPABASE-SETUP.md</code> 
                et configurez les variables d'environnement dans <code>.env.local</code>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
