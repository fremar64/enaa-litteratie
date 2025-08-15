import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Si les variables d'environnement ne sont pas configurées, utiliser des valeurs par défaut pour éviter les erreurs
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    console.warn('Supabase non configuré, les opérations utiliseront les données de démonstration')
    // Retourner un client factice qui lèvera des erreurs interceptées par le système de fallback
    return null as any
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
