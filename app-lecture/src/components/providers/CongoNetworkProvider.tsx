'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type ConnectionQuality = 'fast' | 'slow' | 'offline'

interface CongoNetworkContextType {
  connectionQuality: ConnectionQuality
  isOnline: boolean
  shouldUseAnimations: boolean
  shouldUseLowBandwidthMode: boolean
}

const CongoNetworkContext = createContext<CongoNetworkContextType | undefined>(undefined)

export function useCongoNetwork() {
  const context = useContext(CongoNetworkContext)
  if (context === undefined) {
    throw new Error('useCongoNetwork must be used within a CongoNetworkProvider')
  }
  return context
}

interface CongoNetworkProviderProps {
  children: ReactNode
}

export function CongoNetworkProvider({ children }: CongoNetworkProviderProps) {
  const [connectionQuality, setConnectionQuality] = useState<ConnectionQuality>('fast')
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Détection initiale du statut en ligne/hors ligne
    setIsOnline(navigator.onLine)

    // Détection de la qualité de connexion
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    const updateConnectionQuality = () => {
      if (!navigator.onLine) {
        setConnectionQuality('offline')
        return
      }

      if (connection) {
        const effectiveType = connection.effectiveType
        const downlink = connection.downlink
        
        // Classification basée sur les conditions typiques du Congo
        if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 0.5) {
          setConnectionQuality('slow')
        } else if (effectiveType === '3g' || downlink < 2) {
          setConnectionQuality('slow')
        } else {
          setConnectionQuality('fast')
        }
      } else {
        // Fallback si l'API Connection n'est pas disponible
        // Test simple de latence
        const start = Date.now()
        fetch('/favicon.ico', { cache: 'no-cache' })
          .then(() => {
            const latency = Date.now() - start
            if (latency > 2000) {
              setConnectionQuality('slow')
            } else {
              setConnectionQuality('fast')
            }
          })
          .catch(() => {
            setConnectionQuality('slow')
          })
      }
    }

    // Mise à jour initiale
    updateConnectionQuality()

    // Écouters d'événements
    const handleOnline = () => {
      setIsOnline(true)
      updateConnectionQuality()
    }

    const handleOffline = () => {
      setIsOnline(false)
      setConnectionQuality('offline')
    }

    const handleConnectionChange = () => {
      updateConnectionQuality()
    }

    // Enregistrement des écouteurs
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange)
    }

    // Nettoyage
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange)
      }
    }
  }, [])

  // Application des classes CSS selon la connexion
  useEffect(() => {
    const body = document.body
    
    // Suppression des classes précédentes
    body.classList.remove('congo-low-bandwidth', 'congo-high-bandwidth')
    
    // Application de la classe appropriée
    if (connectionQuality === 'slow' || connectionQuality === 'offline') {
      body.classList.add('congo-low-bandwidth')
    } else {
      body.classList.add('congo-high-bandwidth')
    }
  }, [connectionQuality])

  const shouldUseAnimations = connectionQuality === 'fast'
  const shouldUseLowBandwidthMode = connectionQuality === 'slow' || connectionQuality === 'offline'

  const value = {
    connectionQuality,
    isOnline,
    shouldUseAnimations,
    shouldUseLowBandwidthMode
  }

  return (
    <CongoNetworkContext.Provider value={value}>
      {children}
      
      {/* Indicateur de connexion Congo */}
      <div className={`
        fixed bottom-4 right-4 z-50 px-3 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300
        ${connectionQuality === 'fast' ? 'bg-green-100 text-green-700' :
          connectionQuality === 'slow' ? 'bg-orange-100 text-orange-700' :
          'bg-red-100 text-red-700'}
        ${isOnline ? 'opacity-75 hover:opacity-100' : 'opacity-100'}
      `}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            connectionQuality === 'fast' ? 'bg-green-500' :
            connectionQuality === 'slow' ? 'bg-orange-500' :
            'bg-red-500'
          }`} />
          <span>
            {connectionQuality === 'fast' ? 'Connexion rapide' :
             connectionQuality === 'slow' ? 'Connexion lente' :
             'Hors ligne'}
          </span>
          {connectionQuality === 'slow' && (
            <span className="text-xs">🇨🇬</span>
          )}
        </div>
      </div>
    </CongoNetworkContext.Provider>
  )
}
