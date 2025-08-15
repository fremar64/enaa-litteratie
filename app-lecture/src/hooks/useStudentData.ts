import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/providers/AuthProvider'
import type { StudentProgress } from '@/types/database'

// Hook pour récupérer la progression d'un élève
export function useStudentProgress(phonemeId?: number) {
  const { user } = useAuth()
  const supabase = createClient()

  return useQuery({
    queryKey: ['student-progress', user?.id, phonemeId],
    queryFn: async (): Promise<StudentProgress[]> => {
      if (!supabase || !user) {
        throw new Error('Authentification requise')
      }

      let query = supabase
        .from('progression_eleves')
        .select('*')
        .eq('eleve_id', user.id)

      if (phonemeId) {
        query = query.eq('phoneme_id', phonemeId)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    },
    enabled: !!user && !!supabase,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook pour sauvegarder la progression
export function useUpdateProgress() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async ({
      phonemeId,
      ecranNumero,
      scoreActuel,
      tempsTotal,
      maitrise = false
    }: {
      phonemeId: number
      ecranNumero: number
      scoreActuel: number
      tempsTotal: number
      maitrise?: boolean
    }) => {
      if (!supabase || !user) {
        throw new Error('Authentification requise')
      }

      // Vérifier si une progression existe déjà
      const { data: existing } = await supabase
        .from('progression_eleves')
        .select('*')
        .eq('eleve_id', user.id)
        .eq('phoneme_id', phonemeId)
        .eq('ecran_numero', ecranNumero)
        .single()

      const progressData = {
        eleve_id: user.id,
        phoneme_id: phonemeId,
        ecran_numero: ecranNumero,
        score_actuel: scoreActuel,
        temps_total: (existing?.temps_total || 0) + tempsTotal,
        tentatives: (existing?.tentatives || 0) + 1,
        maitrise,
        derniere_tentative: new Date().toISOString(),
        ...(maitrise && !existing?.maitrise_atteinte && {
          maitrise_atteinte: new Date().toISOString()
        }),
        ...((!existing?.meilleur_score || scoreActuel > existing.meilleur_score) && {
          meilleur_score: scoreActuel
        })
      }

      if (existing) {
        // Mise à jour
        const { data, error } = await supabase
          .from('progression_eleves')
          .update(progressData)
          .eq('id', existing.id)
          .select()
          .single()

        if (error) throw error
        return data
      } else {
        // Création
        const { data, error } = await supabase
          .from('progression_eleves')
          .insert(progressData)
          .select()
          .single()

        if (error) throw error
        return data
      }
    },
    onSuccess: (data) => {
      // Invalider les requêtes de progression pour rafraîchir
      queryClient.invalidateQueries({
        queryKey: ['student-progress', user?.id]
      })
    },
  })
}

// Hook pour créer une session d'apprentissage
export function useCreateSession() {
  const { user } = useAuth()
  const supabase = createClient()

  return useMutation({
    mutationFn: async ({
      phonemeId,
      ecransCompletes = [],
      scoreGlobal,
      dureeTotale
    }: {
      phonemeId: number
      ecransCompletes?: number[]
      scoreGlobal?: number
      dureeTotale?: number
    }) => {
      if (!supabase || !user) {
        throw new Error('Authentification requise')
      }

      const { data, error } = await supabase
        .from('sessions_apprentissage')
        .insert({
          eleve_id: user.id,
          phoneme_id: phonemeId,
          ecrans_completes: ecransCompletes,
          score_global: scoreGlobal,
          duree_totale: dureeTotale,
          fin_session: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
  })
}

// Hook pour sauvegarder une interaction (pour analytics)
export function useLogInteraction() {
  const { user } = useAuth()
  const supabase = createClient()

  return useMutation({
    mutationFn: async ({
      phonemeId,
      ecranNumero,
      typeInteraction,
      donneesInteraction,
      sessionId
    }: {
      phonemeId: number
      ecranNumero: number
      typeInteraction: string
      donneesInteraction: any
      sessionId?: string
    }) => {
      if (!supabase || !user) {
        // En mode démo, on ne sauvegarde pas les interactions
        return null
      }

      const { data, error } = await supabase
        .from('interactions')
        .insert({
          eleve_id: user.id,
          session_id: sessionId || null,
          phoneme_id: phonemeId,
          ecran_numero: ecranNumero,
          type_interaction: typeInteraction,
          donnees_interaction: donneesInteraction
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
  })
}
