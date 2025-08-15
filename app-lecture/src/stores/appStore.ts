import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Phoneme, StudentProfile, StudentProgress } from '@/types/database'

interface SessionData {
  startTime?: Date
  currentPhoneme?: Phoneme
  currentScreen: number
  totalScreens: number
  sessionProgress: Record<number, number> // screenNumber -> score
}

interface AppState {
  // État utilisateur
  user: StudentProfile | null
  isAuthenticated: boolean
  
  // État session courante
  sessionData: SessionData
  
  // Cache des données
  phonemes: Phoneme[]
  userProgress: StudentProgress[]
  
  // État UI
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: StudentProfile | null) => void
  setAuthenticated: (authenticated: boolean) => void
  startPhonemeSession: (phoneme: Phoneme) => void
  updateSessionProgress: (screenNumber: number, score: number) => void
  completeSession: () => void
  setPhonemes: (phonemes: Phoneme[]) => void
  setUserProgress: (progress: StudentProgress[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetSession: () => void
}

const initialSessionData: SessionData = {
  currentScreen: 1,
  totalScreens: 7,
  sessionProgress: {}
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        user: null,
        isAuthenticated: false,
        sessionData: initialSessionData,
        phonemes: [],
        userProgress: [],
        isLoading: false,
        error: null,

        // Actions
        setUser: (user) => set({ user }),
        
        setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
        
        startPhonemeSession: (phoneme) => set({
          sessionData: {
            startTime: new Date(),
            currentPhoneme: phoneme,
            currentScreen: 1,
            totalScreens: 7,
            sessionProgress: {}
          }
        }),
        
        updateSessionProgress: (screenNumber, score) => set((state) => ({
          sessionData: {
            ...state.sessionData,
            currentScreen: Math.min(screenNumber + 1, state.sessionData.totalScreens),
            sessionProgress: {
              ...state.sessionData.sessionProgress,
              [screenNumber]: score
            }
          }
        })),
        
        completeSession: () => {
          const { sessionData } = get()
          // Logique de fin de session (sauvegarde, analytics, etc.)
          console.log('Session terminée:', {
            phoneme: sessionData.currentPhoneme?.symbole,
            scores: sessionData.sessionProgress,
            duration: sessionData.startTime ? Date.now() - sessionData.startTime.getTime() : 0
          })
        },
        
        setPhonemes: (phonemes) => set({ phonemes }),
        
        setUserProgress: (progress) => set({ userProgress: progress }),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        setError: (error) => set({ error }),
        
        resetSession: () => set({ sessionData: initialSessionData })
      }),
      {
        name: 'app-lecture-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          // Ne pas persister sessionData pour éviter les sessions fantômes
        })
      }
    ),
    { name: 'AppStore' }
  )
)

// Sélecteurs optimisés
export const useUser = () => useAppStore((state) => state.user)
export const useAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useSessionData = () => useAppStore((state) => state.sessionData)
export const useCurrentPhoneme = () => useAppStore((state) => state.sessionData.currentPhoneme)
export const useIsLoading = () => useAppStore((state) => state.isLoading)
