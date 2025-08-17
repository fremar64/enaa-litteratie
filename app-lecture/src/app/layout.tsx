import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { CongoNetworkProvider } from '@/components/providers/CongoNetworkProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ENAA Lecture - Apprentissage Congo Brazzaville',
  description: 'Application d\'apprentissage de la lecture adaptée pour le Congo Brazzaville. Interface optimisée pour connexions lentes et enfants africains.',
  
  // Métadonnées géographiques Congo
  other: {
    'geo.region': 'CG-BZV', // Congo Brazzaville
    'geo.placename': 'Brazzaville, Congo',
    'geo.position': '-4.2634;15.2429', // Coordonnées Brazzaville
    'DC.coverage': 'Congo Brazzaville',
    'content-language': 'fr-CG', // Français Congo
  },
  
  // Optimisations mobile/tactile Congo
  keywords: [
    'lecture', 'apprentissage', 'congo', 'brazzaville', 
    'enfants', 'syllabique', 'francophone', 'afrique',
    'education', 'phoneme', 'mobile', 'tactile'
  ],
  
  // Configuration progressive web app
  manifest: '/manifest.json',
  
  // Optimisations réseau Congo
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph pour partage mobile
  openGraph: {
    title: 'ENAA Lecture - Congo Brazzaville',
    description: 'App d\'apprentissage lecture optimisée Congo',
    locale: 'fr_CG',
    type: 'website',
    siteName: 'ENAA Education Congo',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5, // Zoom pour enfants Congo
  userScalable: true, // Autoriser zoom tactile
  themeColor: '#3b82f6',
  colorScheme: 'light',
  // Optimisations tactiles Congo
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="congo-optimized">
      <head>
        {/* Preconnect optimisations Congo */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Service Worker pour mode offline */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      
      <body className={`${inter.className} congo-touch-friendly congo-text-optimized`}>
        <CongoNetworkProvider>
          <Providers>
            {/* Indicateur de chargement Congo */}
            <div id="congo-loading" className="fixed inset-0 bg-blue-50 z-50 flex items-center justify-center transition-opacity duration-500">
              <div className="congo-loading-spinner"></div>
              <p className="ml-3 text-lg font-medium text-blue-700">Chargement ENAA...</p>
            </div>
            
            {children}
          </Providers>
        </CongoNetworkProvider>
        
        {/* Script de masquage du loader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                const loader = document.getElementById('congo-loading');
                if (loader) {
                  setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                  }, 1000);
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
