'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function TestPage() {
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  if (!showForm) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f9ff' }}>
        {/* Test avec CSS inline pour vérifier si c'est un problème Tailwind */}
        <section style={{ 
          position: 'relative', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}>
            <Image
              src="/e-school_accueil2.jpg"
              alt="Enfants apprenant"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to right, rgba(30, 58, 138, 0.7), rgba(88, 28, 135, 0.6), transparent)'
            }}></div>
          </div>

          {/* Contenu principal */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'white',
            padding: '1rem',
            maxWidth: '64rem',
            margin: '0 auto'
          }}>
            {/* Logo */}
            <div style={{ marginBottom: '2rem' }}>
              <Image
                src="/Logo_ceredis.png"
                alt="Logo CEREDIS"
                width={300}
                height={120}
                style={{ margin: '0 auto' }}
                priority
              />
            </div>

            {/* Titre */}
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              textShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              Bienvenue sur
              <br />
              <span style={{ color: '#67e8f9' }}>ENAA Littératie</span>
            </h1>

            {/* Sous-titre */}
            <p style={{
              fontSize: '1.5rem',
              marginBottom: '2rem',
              fontWeight: '500',
              textShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              maxWidth: '48rem',
              margin: '0 auto 2rem auto'
            }}>
              Une application d'apprentissage scolaire qui s'inscrit dans le courant 
              de l'éducation basée sur les preuves
            </p>

            {/* Boutons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '3rem'
            }}>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  backgroundColor: '#06b6d4',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0891b2'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#06b6d4'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                Découvrir
              </button>
              
              <button
                onClick={() => router.push('/test-supabase')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: '600',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                Commencer
              </button>
            </div>

            {/* Points clés */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '4rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Méthode Syllabique
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Apprentissage progressif et structuré
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Adaptatif
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Personnalisé selon les besoins de chaque enfant
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Congo Brazzaville
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Optimisé pour les connexions locales
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section sponsors simple */}
        <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                Nos Partenaires
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                Ils nous accompagnent dans notre mission éducative
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {['Ministère de l\'Éducation', 'UNESCO', 'Université de Brazzaville', 'Fondation pour l\'Éducation'].map((sponsor, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '4rem',
                    background: 'linear-gradient(to right, #cffafe, #dbeafe)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>
                      {sponsor}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {sponsor}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Partenaire officiel
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Formulaire simple
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #fce7f3, #e0e7ff, #dbeafe)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
        border: '2px solid #a855f7',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #7c3aed, #ec4899)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '0.5rem'
          }}>
            🎯 C'est parti !
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            Dis-nous qui tu es pour commencer
          </p>
          
          <button
            onClick={() => setShowForm(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'transparent',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Retour
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              Formulaire de connexion à implémenter...
            </p>
            <button
              onClick={() => router.push('/eleve')}
              style={{
                width: '100%',
                fontSize: '1.25rem',
                padding: '1rem',
                background: 'linear-gradient(to right, #7c3aed, #ec4899)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              🚀 Aller à l'interface élève
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}