export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          nom: string
          prenom: string | null
          age: number | null
          niveau_scolaire: string | null
          code_classe: string | null
          preferences: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nom: string
          prenom?: string | null
          age?: number | null
          niveau_scolaire?: string | null
          code_classe?: string | null
          preferences?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nom?: string
          prenom?: string | null
          age?: number | null
          niveau_scolaire?: string | null
          code_classe?: string | null
          preferences?: any
          created_at?: string
          updated_at?: string
        }
      }
      phonemes: {
        Row: {
          id: number
          symbole: string
          graphemes: string[]
          phase: number
          ordre_phase: number
          niveau_min: string
          difficulte: number
          prerequisites: number[] | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          symbole: string
          graphemes: string[]
          phase: number
          ordre_phase: number
          niveau_min: string
          difficulte?: number
          prerequisites?: number[] | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          symbole?: string
          graphemes?: string[]
          phase?: number
          ordre_phase?: number
          niveau_min?: string
          difficulte?: number
          prerequisites?: number[] | null
          description?: string | null
          created_at?: string
        }
      }
      activites: {
        Row: {
          id: number
          phoneme_id: number
          ecran_numero: number
          titre: string
          type_activite: string
          contenu: any
          difficulte: number
          duree_estimee: number | null
          criteres_reussite: any
          created_at: string
        }
        Insert: {
          id?: number
          phoneme_id: number
          ecran_numero: number
          titre: string
          type_activite: string
          contenu: any
          difficulte?: number
          duree_estimee?: number | null
          criteres_reussite: any
          created_at?: string
        }
        Update: {
          id?: number
          phoneme_id?: number
          ecran_numero?: number
          titre?: string
          type_activite?: string
          contenu?: any
          difficulte?: number
          duree_estimee?: number | null
          criteres_reussite?: any
          created_at?: string
        }
      }
      progression_eleves: {
        Row: {
          id: string
          eleve_id: string
          phoneme_id: number
          ecran_numero: number
          tentatives: number
          meilleur_score: number | null
          score_actuel: number | null
          temps_total: number
          maitrise: boolean
          derniere_tentative: string | null
          maitrise_atteinte: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          eleve_id: string
          phoneme_id: number
          ecran_numero: number
          tentatives?: number
          meilleur_score?: number | null
          score_actuel?: number | null
          temps_total?: number
          maitrise?: boolean
          derniere_tentative?: string | null
          maitrise_atteinte?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          eleve_id?: string
          phoneme_id?: number
          ecran_numero?: number
          tentatives?: number
          meilleur_score?: number | null
          score_actuel?: number | null
          temps_total?: number
          maitrise?: boolean
          derniere_tentative?: string | null
          maitrise_atteinte?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Types métier
export interface Phoneme {
  id: number
  symbole: string
  graphemes: string[]
  phase: number
  ordre_phase: number
  niveau_min: string
  difficulte: number
  prerequisites?: number[]
  description?: string
}

export interface StudentProfile {
  id: string
  nom: string
  prenom?: string
  age?: number
  niveau_scolaire?: string
  code_classe?: string
  preferences: any
}

export interface StudentProgress {
  id: string
  eleve_id: string
  phoneme_id: number
  ecran_numero: number
  tentatives: number
  meilleur_score?: number
  score_actuel?: number
  temps_total: number
  maitrise: boolean
  derniere_tentative?: string
  maitrise_atteinte?: string
}
