'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DemoSection } from '@/components/ui/demo-section'
import { SponsorCarousel } from '@/components/ui/sponsor-carousel'
import { AnimatedIcon } from '@/components/ui/animated-elements'
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

  // Optimisation animations selon connexion Congo (utilisé pour les optimisations futures)
  // const shouldUseAnimations = useMemo(() => {
  //   return connectionQuality === 'fast'
  // }, [connectionQuality])

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

      // Email simplifié pour l'Afrique (pas de caractères spéciaux)
      const email = `${nom.toLowerCase().replace(/[^a-z]/g, '')}@classe${codeClasse.toLowerCase()}.enaa`
      
      // Tentative de connexion avec timeout adapté Congo
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connexion trop lente. Réessayez.')), 
        connectionQuality === 'slow' ? 15000 : 10000)
      )

      const authPromise = supabase.auth.signInWithPassword({
        email,
        password: codeClasse // Mot de passe = code classe pour simplifier
      })

      const { error: authError } = await Promise.race([
        authPromise,
        timeoutPromise
      ]) as any

      if (authError && authError.message.includes('Invalid login credentials')) {
        // Création automatique du compte si n'existe pas (avec timeout Congo)
        const signupTimeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Création compte trop lente. Réessayez.')), 
          connectionQuality === 'slow' ? 20000 : 15000)
        )

        const signupPromise = supabase.auth.signUp({
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

        const { data: signupData, error: signupError } = await Promise.race([
          signupPromise,
          signupTimeoutPromise
        ]) as any

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
      
      // Messages d'erreur adaptés Congo
      let errorMessage = 'Erreur de connexion'
      if (err.message?.includes('trop lente')) {
        errorMessage = connectionQuality === 'slow' 
          ? 'Connexion lente détectée. Réessayez dans un moment.'
          : 'Connexion interrompue. Vérifiez votre réseau.'
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        errorMessage = 'Problème de réseau. Vérifiez votre connexion Internet.'
      }
      
      setError(errorMessage)
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

  // Interface d'accueil principale NOUVELLE VERSION
  if (!showForm) {
    return (
      <div className="min-h-screen">
        {/* Section Hero avec background-image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/e-school_accueil2.jpg"
              alt="Enfants apprenant avec des ordinateurs"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/60 to-transparent"></div>
          </div>

          {/* Indicateur de connexion Congo */}
          <div className="absolute top-4 right-4 z-20">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
              connectionQuality === 'fast' ? 'bg-green-100/90 text-green-700' :
              connectionQuality === 'slow' ? 'bg-yellow-100/90 text-yellow-700' :
              'bg-red-100/90 text-red-700'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionQuality === 'fast' ? 'bg-green-500' :
                connectionQuality === 'slow' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
              <span>
                {connectionQuality === 'fast' ? 'Connexion rapide' :
                 connectionQuality === 'slow' ? 'Connexion lente' :
                 'Hors ligne'}
              </span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            {/* Logo CEREDIS */}
            <div className="mb-8">
              <Image
                src="/Logo_ceredis.png"
                alt="Logo CEREDIS"
                width={300}
                height={120}
                className="mx-auto"
                priority
              />
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Bienvenue sur
              <br />
              <span className="text-cyan-300">ENAA Littératie</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl mb-8 font-medium drop-shadow-md max-w-3xl mx-auto">
              Une application d'apprentissage scolaire qui s'inscrit dans le courant 
              de l'éducation basée sur les preuves
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Découvrir
              </Button>
              
              <Button
                onClick={() => router.push('/test-supabase')}
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-full"
              >
                Commencer
              </Button>
            </div>

            {/* Points clés */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Méthode Syllabique</h3>
                <p className="text-white/90">Apprentissage progressif et structuré</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Adaptatif</h3>
                <p className="text-white/90">Personnalisé selon les besoins de chaque enfant</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2">Congo Brazzaville</h3>
                <p className="text-white/90">Optimisé pour les connexions locales</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Section présentation */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                La transformation numérique de l'éducation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Arith-play-game est un environnement numérique développé pour 
                l'apprentissage et le déploiement des technologies élémentaires.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Découvrez ce que tu peux apprendre
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-3xl mb-3">📊</div>
                    <h4 className="font-semibold text-gray-800">Numération</h4>
                    <p className="text-sm text-gray-600">Apprends à découvrir et à reconnaître les nombres</p>
                  </div>
                  
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-3xl mb-3">📖</div>
                    <h4 className="font-semibold text-gray-800">Calcul</h4>
                    <p className="text-sm text-gray-600">Découvre l'addition et la soustraction avec nous</p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="text-3xl mb-3">👥</div>
                    <h4 className="font-semibold text-gray-800">Collaboration</h4>
                    <p className="text-sm text-gray-600">Travaille avec tes camarades et tes enseignants</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Pour les enseignants
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowForm(true)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Pour les élèves
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🎓</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">
                    Prêt à apprendre en s'amusant ?
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Rejoins les milliers d'élèves qui progressent chaque jour grâce à Arith-play-game !
                  </p>
                  <div className="bg-yellow-100 rounded-full px-4 py-2 inline-block">
                    <span className="text-yellow-800 font-semibold">🎯 123 élèves en ligne</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrousel des sponsors */}
        <SponsorCarousel />

        {/* Section CTA finale */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à commencer l'aventure ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoins notre programme d'apprentissage basé sur les preuves et 
              développe tes compétences à ton rythme.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full"
              >
                Commencer maintenant
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full"
                onClick={() => router.push('/test-supabase')}
              >
                🎮 Mode démonstration
              </Button>
            </div>
          </div>
        </section>
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