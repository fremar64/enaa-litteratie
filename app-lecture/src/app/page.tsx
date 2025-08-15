'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DemoSection } from '@/components/ui/demo-section'
import { useAppStore } from '@/stores/appStore'
import { createClient } from '@/lib/supabase/client'

export default function HomePage() {
  const [nom, setNom] = useState('')
  const [age, setAge] = useState('')
  const [codeClasse, setCodeClasse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            📚 App Lecture
          </CardTitle>
          <p className="text-gray-600">
            Apprendre à lire avec la méthode syllabique
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="nom">Mon prénom</Label>
              <Input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ton prénom"
                className="text-lg"
                autoComplete="given-name"
              />
            </div>

            <div>
              <Label htmlFor="age">Mon âge</Label>
              <Input
                id="age"
                type="number"
                min="3"
                max="12"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="6"
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="codeClasse">Code de ma classe</Label>
              <Input
                id="codeClasse"
                type="text"
                value={codeClasse}
                onChange={(e) => setCodeClasse(e.target.value.toUpperCase())}
                placeholder="CP2024"
                className="text-lg font-mono"
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
              className="w-full text-lg py-3"
            >
              {isLoading ? 'Connexion...' : '🚀 Commencer à apprendre !'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Première fois ? Ton compte sera créé automatiquement !</p>
          </div>
        </CardContent>
      </Card>

      {/* Section démonstration */}
      <DemoSection />
    </div>
  )
}
