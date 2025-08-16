'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppStore } from '@/stores/appStore'
import { createClient } from '@/lib/supabase/client'

// Hook pour détection connexion lente (spécifique Congo)
function useConnectionQuality() {
  const [connectionQuality, setConnectionQuality] = useState<'fast' | 'slow' | 'offline'>('fast')
  
  useEffect(() => {
    const connection = (navigator as any).connection
    if (connection) {
      const updateConnectionQuality = () => {
        const effectiveType = connection.effectiveType
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setConnectionQuality('slow')
        } else if (effectiveType === '3g') {
          setConnectionQuality('slow')
        } else {
          setConnectionQuality('fast')
        }
      }
      
      updateConnectionQuality()
      connection.addEventListener('change', updateConnectionQuality)
      
      return () => {
        connection.removeEventListener('change', updateConnectionQuality)
      }
    }
  }, [])
  
  return connectionQuality
}

export default function HomePage() {
  const [nom, setNom] = useState('')
  const [age, setAge] = useState('')
  const [codeClasse, setCodeClasse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const { setUser, setAuthenticated, user, isAuthenticated } = useAppStore()
  const router = useRouter()
  const supabase = createClient()
  const connectionQuality = useConnectionQuality()

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/eleve')
    }
  }, [isAuthenticated, user, router])

  // Optimisation animations selon connexion
  const shouldUseAnimations = useMemo(() => {
    return connectionQuality === 'fast'
  }, [connectionQuality])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validation basique optimisée
      if (!nom.trim() || !age || !codeClasse.trim()) {
        throw new Error('Tous les champs sont obligatoires')
      }

      const ageNum = parseInt(age)
      if (ageNum < 3 || ageNum > 12) {
        throw new Error('L\'âge doit être entre 3 et 12 ans')
      }

      // Email simplifié pour l'Afrique (pas de caractères spéciaux)
      const email = `${nom.toLowerCase().replace(/[^a-z]/g, '')}@classe${codeClasse.toLowerCase()}.enaa`
      
      // Tentative de connexion avec timeout adapté Congo
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connexion trop lente. Réessayez.')), 
        connectionQuality === 'slow' ? 15000 : 10000)
      )

      const authPromise = supabase.auth.signInWithPassword({
        email,
        password: codeClasse
      })

      const { data: authData, error: authError } = await Promise.race([
        authPromise,
        timeoutPromise
      ]) as any

      if (authError && authError.message.includes('Invalid login credentials')) {
        // Création automatique simplifiée
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password: codeClasse,
          options: {
            data: { nom, age: ageNum, code_classe: codeClasse }
          }
        })

        if (signupError) throw signupError

        if (signupData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: signupData.user.id,
              nom,
              age: ageNum,
              code_classe: codeClasse,
              niveau_scolaire: getNiveauFromAge(ageNum)
            })

          if (profileError) throw profileError
        }
      } else if (authError) {
        throw authError
      }

      // Récupération profil optimisée
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('nom', nom)
        .eq('code_classe', codeClasse)
        .single()

      if (profileError) throw profileError

      // Cache local pour mode offline
      if (typeof window !== 'undefined') {
        localStorage.setItem('enaa_user_cache', JSON.stringify(profile))
      }

      setUser(profile)
      setAuthenticated(true)
      router.push('/eleve')

    } catch (err: any) {
      console.error('Erreur connexion:', err)
      
      // Messages d'erreur adaptés Congo
      if (err.message.includes('timeout') || err.message.includes('network')) {
        setError('🌐 Connexion lente détectée. Vérifiez votre réseau et réessayez.')
      } else {
        setError(err.message || 'Erreur de connexion')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getNiveauFromAge = (age: number): string => {
    if (age <= 4) return 'PS'
    if (age <= 5) return 'MS'
    if (age <= 6) return 'GS'
    if (age <= 7) return 'CP'
    if (age <= 8) return 'CE1'
    if (age <= 9) return 'CE2'
    if (age <= 10) return 'CM1'
    return 'CM2'
  }

  // Interface allégée pour connexions lentes
  if (connectionQuality === 'slow') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        {/* Mode simplifié Congo */}
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">
              📚 ENAA Littératie
            </CardTitle>
            <p className="text-gray-600">
              Apprentissage de la lecture - Congo 🇨🇬
            </p>
            {connectionQuality === 'slow' && (
              <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                🌐 Mode connexion lente activé
              </div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="nom" className="text-base font-semibold">
                  👤 Mon prénom
                </Label>
                <Input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Prénom"
                  className="text-lg py-2"
                  autoComplete="given-name"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-base font-semibold">
                  🎂 Mon âge
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="3"
                  max="12"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="6"
                  className="text-lg py-2"
                />
              </div>

              <div>
                <Label htmlFor="codeClasse" className="text-base font-semibold">
                  🏫 Code classe
                </Label>
                <Input
                  id="codeClasse"
                  type="text"
                  value={codeClasse}
                  onChange={(e) => setCodeClasse(e.target.value.toUpperCase())}
                  placeholder="Ex: CP1"
                  className="text-lg py-2 font-mono"
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? '⏳ Connexion...' : '🚀 Commencer'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Interface complète pour connexions rapides
  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 relative overflow-hidden">
        {/* Éléments décoratifs conditionnels */}
        {shouldUseAnimations && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 text-4xl animate-bounce">🌟</div>
            <div className="absolute top-32 right-20 text-4xl animate-pulse">📚</div>
            <div className="absolute bottom-40 left-20 text-3xl animate-bounce delay-300">🎨</div>
            <div className="absolute bottom-20 right-32 text-4xl animate-pulse delay-500">✨</div>
          </div>
        )}

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          {/* Titre optimisé */}
          <div className="text-center mb-8">
            <h1 className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4 ${shouldUseAnimations ? 'animate-pulse' : ''}`}>
              📖 ENAA Littératie
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
              Apprends à lire en français ! 🇫🇷🇨🇬
            </p>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Découvre les lettres et les mots avec notre méthode syllabique adaptée aux enfants du Congo.
            </p>
          </div>

          {/* Bouton d'entrée */}
          <div className="mb-8">
            <Button
              onClick={() => setShowForm(true)}
              className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 ${shouldUseAnimations ? 'transform hover:scale-105' : ''}`}
            >
              🚀 Commencer l'apprentissage !
            </Button>
          </div>

          {/* Cartes allégées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            <Card className="bg-white/90 border-2 border-purple-200">
              <CardContent className="text-center p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-lg font-bold text-purple-600 mb-1">Méthode Syllabique</h3>
                <p className="text-sm text-gray-600">Apprentissage étape par étape</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 border-2 border-pink-200">
              <CardContent className="text-center p-4">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-lg font-bold text-pink-600 mb-1">Hors-ligne</h3>
                <p className="text-sm text-gray-600">Fonctionne sans internet</p>
              </CardContent>
            </Card>
          </div>

          {/* Indicateur connexion */}
          <div className="text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                connectionQuality === 'fast' ? 'bg-green-500' : 
                connectionQuality === 'slow' ? 'bg-orange-500' : 'bg-red-500'
              }`}></div>
              <span>
                Connexion {connectionQuality === 'fast' ? 'rapide' : connectionQuality === 'slow' ? 'lente' : 'hors ligne'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Formulaire standard (reste identique mais optimisé)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 flex items-center justify-center p-4 relative">
      <Button
        variant="ghost"
        onClick={() => setShowForm(false)}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
      >
        ← Retour
      </Button>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎯 Inscription
          </CardTitle>
          <p className="text-gray-600">
            Remplis ces informations pour commencer
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="nom" className="text-base font-semibold text-gray-700">
                👤 Mon prénom
              </Label>
              <Input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Écris ton prénom"
                className="text-lg py-2 border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                autoComplete="given-name"
              />
            </div>

            <div>
              <Label htmlFor="age" className="text-base font-semibold text-gray-700">
                🎂 Mon âge
              </Label>
              <Input
                id="age"
                type="number"
                min="3"
                max="12"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="6"
                className="text-lg py-2 border-2 border-pink-200 focus:border-pink-400 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="codeClasse" className="text-base font-semibold text-gray-700">
                🏫 Code de ma classe
              </Label>
              <Input
                id="codeClasse"
                type="text"
                value={codeClasse}
                onChange={(e) => setCodeClasse(e.target.value.toUpperCase())}
                placeholder="Demande à ton enseignant"
                className="text-lg py-2 border-2 border-blue-200 focus:border-blue-400 rounded-lg font-mono"
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border-2 border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-md transition-all duration-300"
            >
              {isLoading ? '⏳ Connexion...' : '🚀 Commencer à apprendre !'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>✨ Première fois ? Ton compte sera créé automatiquement !</p>
            <p className="text-xs mt-1">🌍 Optimisé pour le Congo Brazzaville</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
