import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Phoneme } from '@/types/database'
import { mockSupabaseOperations } from '@/lib/demo-data'

export function usePhoneme(phonemeId: number) {
  const {
    data: phoneme,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['phoneme', phonemeId],
    queryFn: async (): Promise<Phoneme> => {
      try {
        const supabase = createClient()
        
        // Si Supabase n'est pas configuré, utiliser directement les données de démonstration
        if (!supabase) {
          return await mockSupabaseOperations.getPhoneme(phonemeId)
        }

        const { data, error } = await supabase
          .from('phonemes')
          .select('*')
          .eq('id', phonemeId)
          .single()

        if (error) {
          console.warn('Supabase indisponible, utilisation des données de démonstration:', error)
          // Fallback vers les données de démonstration
          return await mockSupabaseOperations.getPhoneme(phonemeId)
        }

        if (!data) {
          throw new Error('Phonème non trouvé')
        }

        return data
      } catch (err) {
        console.warn('Erreur Supabase, fallback vers démo:', err)
        return await mockSupabaseOperations.getPhoneme(phonemeId)
      }
    },
    enabled: !isNaN(phonemeId) && phonemeId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1 // Réduire les tentatives pour passer plus vite au fallback
  })

  return {
    phoneme,
    isLoading,
    error: error?.message,
    refetch
  }
}

export function usePhonemes() {
  const {
    data: phonemes = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['phonemes'],
    queryFn: async (): Promise<Phoneme[]> => {
      try {
        const supabase = createClient()
        
        // Si Supabase n'est pas configuré, utiliser directement les données de démonstration
        if (!supabase) {
          return await mockSupabaseOperations.getPhonemes()
        }

        const { data, error } = await supabase
          .from('phonemes')
          .select('*')
          .order('phase', { ascending: true })
          .order('ordre_phase', { ascending: true })

        if (error) {
          console.warn('Supabase indisponible, utilisation des données de démonstration:', error)
          // Fallback vers les données de démonstration
          return await mockSupabaseOperations.getPhonemes()
        }

        return data || []
      } catch (err) {
        console.warn('Erreur Supabase, fallback vers démo:', err)
        return await mockSupabaseOperations.getPhonemes()
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1 // Réduire les tentatives pour passer plus vite au fallback
  })

  const phonemesByPhase = phonemes.reduce((acc, phoneme) => {
    const phase = phoneme.phase
    if (!acc[phase]) acc[phase] = []
    acc[phase].push(phoneme)
    return acc
  }, {} as Record<number, Phoneme[]>)

  return {
    phonemes,
    phonemesByPhase,
    isLoading,
    error: error?.message,
    refetch
  }
}
