import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface AuthComponentProps {
  onAuthSuccess?: () => void
}

export function AuthComponent({ onAuthSuccess }: AuthComponentProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  // Si Supabase n'est pas configuré, afficher un message
  if (!supabase) {
    return (
      <Card className="max-w-md mx-auto p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Mode Démonstration</h2>
          <p className="text-gray-600 mb-4">
            L'application fonctionne en mode démonstration sans authentification.
          </p>
          <p className="text-sm text-gray-500">
            Pour activer l'authentification, configurez Supabase selon le guide SUPABASE-SETUP.md
          </p>
          <Button 
            onClick={onAuthSuccess} 
            className="mt-4"
          >
            Continuer en mode démo
          </Button>
        </div>
      </Card>
    )
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        // Connexion
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        // Inscription
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (authError) throw authError

        // Créer le profil utilisateur
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              nom,
              prenom,
            })
          
          if (profileError) throw profileError
        }
      }

      onAuthSuccess?.()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h2>
        <p className="text-gray-600 mt-2">
          {isLogin 
            ? 'Connectez-vous pour sauvegarder votre progression' 
            : 'Créez un compte pour commencer votre apprentissage'
          }
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required={!isLogin}
                placeholder="Votre nom de famille"
              />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Votre prénom"
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <Label htmlFor="password">Mot de passe *</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading 
            ? 'Chargement...' 
            : isLogin 
              ? 'Se connecter' 
              : 'Créer le compte'
          }
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
            }}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin 
              ? "Pas encore de compte ? S'inscrire" 
              : 'Déjà un compte ? Se connecter'
            }
          </button>
        </div>

        {isLogin && (
          <div className="text-center">
            <button
              type="button"
              onClick={onAuthSuccess}
              className="text-gray-500 hover:underline text-sm"
            >
              Continuer sans compte (mode démo)
            </button>
          </div>
        )}
      </form>
    </Card>
  )
}
