// Service Worker pour ENAA Lecture Congo
// Version optimisée pour connexions lentes et mode offline

const CACHE_NAME = 'enaa-lecture-congo-v1'
const STATIC_CACHE = 'enaa-static-v1'
const DYNAMIC_CACHE = 'enaa-dynamic-v1'

// Ressources critiques à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/eleve',
  '/globals.css',
  '/manifest.json',
  // Ajoutez d'autres ressources critiques
]

// Installation du SW
self.addEventListener('install', event => {
  console.log('SW: Installation pour Congo...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SW: Mise en cache des ressources statiques')
        return cache.addAll(STATIC_ASSETS)
      })
      .catch(err => {
        console.log('SW: Erreur cache initial:', err)
      })
  )
  
  // Force l'activation immédiate
  self.skipWaiting()
})

// Activation du SW
self.addEventListener('activate', event => {
  console.log('SW: Activation pour Congo')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('SW: Suppression ancien cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Prendre le contrôle immédiatement
  self.clients.claim()
})

// Stratégie de cache pour Congo (connexions lentes)
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Ignorer les requêtes non-HTTP
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return
  }
  
  // Stratégie Cache First pour les ressources statiques
  if (request.url.includes('/static/') || 
      request.url.includes('.css') ||
      request.url.includes('.js') ||
      request.url.includes('.png') ||
      request.url.includes('.jpg') ||
      request.url.includes('.jpeg') ||
      request.url.includes('.gif') ||
      request.url.includes('.svg')) {
    
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response
          }
          
          return fetch(request)
            .then(fetchResponse => {
              // Cloner la réponse
              const responseClone = fetchResponse.clone()
              
              caches.open(STATIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone)
                })
              
              return fetchResponse
            })
            .catch(() => {
              // Fallback pour images
              if (request.url.includes('.png') || request.url.includes('.jpg')) {
                return new Response('Image non disponible', {
                  headers: { 'Content-Type': 'text/plain' }
                })
              }
            })
        })
    )
    return
  }
  
  // Stratégie Network First avec fallback pour les pages
  if (request.mode === 'navigate' || 
      request.headers.get('accept').includes('text/html')) {
    
    event.respondWith(
      fetch(request)
        .then(response => {
          // Mettre en cache les pages réussies
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone)
            })
          
          return response
        })
        .catch(() => {
          // Fallback vers le cache
          return caches.match(request)
            .then(response => {
              if (response) {
                return response
              }
              
              // Page offline par défaut
              return caches.match('/')
                .then(fallback => fallback || new Response('App ENAA hors ligne', {
                  headers: { 'Content-Type': 'text/html' }
                }))
            })
        })
    )
    return
  }
  
  // Stratégie par défaut: Network First
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request)
      })
  )
})

// Gestion des messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const { urls } = event.data
    caches.open(DYNAMIC_CACHE)
      .then(cache => {
        return cache.addAll(urls)
      })
  }
})

// Notification de mise à jour
self.addEventListener('updatefound', () => {
  console.log('SW: Nouvelle version disponible')
  
  // Notifier l'app principale
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'UPDATE_AVAILABLE'
      })
    })
  })
})

console.log('SW: Service Worker ENAA Congo chargé')
