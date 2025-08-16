'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DemoSection } from '@/components/ui/demo-section'
import { AnimatedIcon, FloatingElement, MagicButton } from '@/components/ui/animated-elements'
import { useAppStore } from '@/stores/appStore'
import { createClient } from '@/lib/supabase/client'

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

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/eleve')
    }
  }, [isAuthenticated, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validation basique
      if (!nom.trim() || !age || !codeClasse.trim()) {
        throw new Error('Tous les champs sont obligatoires')
      }

      const ageNum = parseInt(age)
      if (ageNum < 3 || ageNum > 12) {
        throw new Error('L\'âge doit être entre 3 et 12 ans')
      }

      // Authentification simplifiée (création automatique si n'existe pas)
      const email = `${nom.toLowerCase().replace(/\s+/g, '')}@classe-${codeClasse}.local`
      
      // Tentative de connexion
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: codeClasse // Mot de passe = code classe pour simplifier
      })

      if (authError && authError.message.includes('Invalid login credentials')) {
        // Création automatique du compte si n'existe pas
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password: codeClasse,
          options: {
            data: {
              nom,
              age: ageNum,
              code_classe: codeClasse
            }
          }
        })

        if (signupError) throw signupError

        // Création du profil
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

      // Récupération du profil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('nom', nom)
        .eq('code_classe', codeClasse)
        .single()

      if (profileError) throw profileError

      // Mise à jour du store
      setUser(profile)
      setAuthenticated(true)

      // Redirection vers l'interface élève
      router.push('/eleve')

    } catch (err: any) {
      console.error('Erreur connexion:', err)
      setError(err.message || 'Erreur de connexion')
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

  // Interface d'accueil principale
  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 relative overflow-hidden">
        {/* Éléments décoratifs flottants */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-bounce">🌟</div>
          <div className="absolute top-32 right-20 text-5xl animate-pulse">📚</div>
          <div className="absolute bottom-40 left-20 text-4xl animate-bounce delay-300">🎨</div>
          <div className="absolute bottom-20 right-32 text-5xl animate-pulse delay-500">✨</div>
          <div className="absolute top-1/2 left-5 text-3xl animate-spin slow">🌈</div>
          <div className="absolute top-1/3 right-10 text-4xl animate-bounce delay-700">🦋</div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          {/* Titre principal avec animation */}
          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse mb-4">
              📖 MagicLecture
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
              Apprends à lire en t'amusant ! 🎉
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvre le monde magique des lettres et des mots avec notre méthode syllabique amusante !
            </p>
          </div>

          {/* Bouton d'entrée principal */}
          <div className="mb-12">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              🚀 Commencer l'aventure !
            </Button>
          </div>

          {/* Cartes de présentation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border-2 border-purple-200">
              <CardContent className="text-center p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">Méthode Syllabique</h3>
                <p className="text-gray-600">Apprends étape par étape avec une méthode éprouvée</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border-2 border-pink-200">
              <CardContent className="text-center p-6">
                <div className="text-5xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">Jeux Interactifs</h3>
                <p className="text-gray-600">Des activités amusantes pour chaque apprentissage</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border-2 border-blue-200">
              <CardContent className="text-center p-6">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">Suivi Personnel</h3>
                <p className="text-gray-600">Ta progression est sauvegardée automatiquement</p>
              </CardContent>
            </Card>
          </div>

          {/* Section âges */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Pour tous les âges !</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { age: '3-4 ans', niveau: 'Petite Section', emoji: '�', color: 'bg-yellow-200' },
                { age: '5-6 ans', niveau: 'Grande Section', emoji: '👧', color: 'bg-green-200' },
                { age: '6-7 ans', niveau: 'CP', emoji: '🧒', color: 'bg-blue-200' },
                { age: '8+ ans', niveau: 'CE1 et +', emoji: '👦', color: 'bg-purple-200' }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} rounded-full px-4 py-2 flex items-center gap-2 font-semibold text-gray-700`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.age}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton démo en bas */}
          <div className="mt-16">
            <Button 
              variant="outline" 
              onClick={() => router.push('/test-supabase')}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              🔧 Mode développeur
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Formulaire de connexion (interface existante améliorée)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 flex items-center justify-center p-4 relative">
      {/* Bouton retour */}
      <Button
        variant="ghost"
        onClick={() => setShowForm(false)}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
      >
        ← Retour
      </Button>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎯 C'est parti !
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Dis-nous qui tu es pour commencer
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="nom" className="text-lg font-semibold text-gray-700">
                🙋‍♀️ Mon prénom
              </Label>
              <Input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Écris ton prénom ici"
                className="text-xl py-3 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                autoComplete="given-name"
              />
            </div>

            <div>
              <Label htmlFor="age" className="text-lg font-semibold text-gray-700">
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
                className="text-xl py-3 border-2 border-pink-200 focus:border-pink-400 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="codeClasse" className="text-lg font-semibold text-gray-700">
                🏫 Code de ma classe
              </Label>
              <Input
                id="codeClasse"
                type="text"
                value={codeClasse}
                onChange={(e) => setCodeClasse(e.target.value.toUpperCase())}
                placeholder="Demande à ton maître/maîtresse"
                className="text-xl py-3 border-2 border-blue-200 focus:border-blue-400 rounded-xl font-mono"
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 border-2 border-red-200 rounded-xl">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-xl py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {isLoading ? '⏳ Chargement...' : '🚀 Commencer à apprendre !'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>✨ Première fois ? Ton compte sera créé automatiquement !</p>
          </div>
        </CardContent>
      </Card>

      {/* Section démonstration */}
      <DemoSection />
    </div>
  )
}
