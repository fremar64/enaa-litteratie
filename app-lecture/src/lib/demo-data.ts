// Données de démonstration pour tester l'application sans Supabase
import type { Phoneme, StudentProfile } from '@/types/database'

export const demoPhonemes: Phoneme[] = [
  {
    id: 1,
    symbole: '/a/',
    graphemes: ['a', 'A', 'à'],
    phase: 1,
    ordre_phase: 1,
    niveau_min: 'MS',
    difficulte: 1,
    description: 'Premier phonème voyelle, le plus simple et fréquent'
  },
  {
    id: 2,
    symbole: '/i/',
    graphemes: ['i', 'I', 'î'],
    phase: 1,
    ordre_phase: 2,
    niveau_min: 'MS',
    difficulte: 1,
    description: 'Voyelle fermée antérieure simple'
  },
  {
    id: 3,
    symbole: '/o/',
    graphemes: ['o', 'O', 'ô'],
    phase: 1,
    ordre_phase: 3,
    niveau_min: 'MS',
    difficulte: 1,
    description: 'Voyelle moyenne postérieure simple'
  },
  {
    id: 4,
    symbole: '/m/',
    graphemes: ['m', 'M', 'mm'],
    phase: 2,
    ordre_phase: 1,
    niveau_min: 'GS',
    difficulte: 2,
    description: 'Première consonne continue, bilabiale'
  },
  {
    id: 5,
    symbole: '/l/',
    graphemes: ['l', 'L', 'll'],
    phase: 2,
    ordre_phase: 2,
    niveau_min: 'GS',
    difficulte: 2,
    description: 'Consonne liquide latérale fréquente'
  }
]

export const demoStudent: StudentProfile = {
  id: 'demo-student-123',
  nom: 'Demo',
  prenom: 'Élève',
  age: 6,
  niveau_scolaire: 'CP',
  code_classe: 'DEMO2024',
  preferences: {}
}

export const demoProgress = {
  1: 85, // /a/ maîtrisé
  2: 60, // /i/ en cours
  3: 0,  // /o/ pas commencé
  4: 0,  // /m/ pas commencé
  5: 0   // /l/ pas commencé
}

// Fonction pour simuler un délai réseau
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock des fonctions Supabase pour la démonstration
export const mockSupabaseOperations = {
  async getPhonemes(): Promise<Phoneme[]> {
    await delay(500) // Simule un délai réseau
    return demoPhonemes
  },

  async getPhoneme(phonemeId: number): Promise<Phoneme> {
    await delay(300)
    const phoneme = demoPhonemes.find(p => p.id === phonemeId)
    if (!phoneme) {
      throw new Error(`Phonème avec l'ID ${phonemeId} non trouvé`)
    }
    return phoneme
  },

  async getProgress(userId: string) {
    await delay(300)
    return { data: demoProgress, error: null }
  },

  async saveProgress(userId: string, phonemeId: number, screenNum: number, score: number) {
    await delay(200)
    // Mettre à jour le progress local pour la demo
    if (score > demoProgress[phonemeId as keyof typeof demoProgress]) {
      (demoProgress as any)[phonemeId] = score
    }
    return { data: null, error: null }
  },

  async createProfile(profile: Partial<StudentProfile>) {
    await delay(400)
    return { data: { ...demoStudent, ...profile }, error: null }
  }
}
