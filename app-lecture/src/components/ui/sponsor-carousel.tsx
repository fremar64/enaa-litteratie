'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const sponsors = [
  {
    id: 1,
    name: "Ministère de l'Éducation",
    logo: "/sponsors/ministere-education.png",
    description: "Partenaire officiel"
  },
  {
    id: 2,
    name: "UNESCO",
    logo: "/sponsors/unesco.png", 
    description: "Soutien international"
  },
  {
    id: 3,
    name: "Université de Brazzaville",
    logo: "/sponsors/universite-brazzaville.png",
    description: "Recherche pédagogique"
  },
  {
    id: 4,
    name: "Fondation pour l'Éducation",
    logo: "/sponsors/fondation-education.png",
    description: "Financement"
  },
  {
    id: 5,
    name: "CEREDIS Partenaires",
    logo: "/sponsors/ceredis-partners.png",
    description: "Réseau éducatif"
  }
]

export function SponsorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-scroll toutes les 3 secondes
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sponsors.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Redémarrer l'auto-play après 5 secondes
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sponsors.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sponsors.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nos Partenaires
          </h2>
          <p className="text-gray-600 text-lg">
            Ils nous accompagnent dans notre mission éducative
          </p>
        </div>

        <div className="relative">
          {/* Carrousel principal */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="w-full flex-shrink-0 px-8 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center h-32">
                    {/* Placeholder pour les logos des sponsors */}
                    <div className="w-32 h-20 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                      <span className="text-gray-500 text-sm font-medium">
                        {sponsor.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {sponsor.name}
                    </h3>
                    <p className="text-gray-600">
                      {sponsor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200 z-10"
            aria-label="Sponsor précédent"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200 z-10"
            aria-label="Sponsor suivant"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {sponsors.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? 'bg-cyan-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au sponsor ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Version mobile - grille simple */}
        <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
          {sponsors.slice(0, 4).map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-white rounded-xl p-4 shadow-md text-center"
            >
              <div className="w-full h-16 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mb-3 border border-gray-200">
                <span className="text-gray-500 text-xs font-medium">
                  {sponsor.name}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                {sponsor.name}
              </h4>
              <p className="text-xs text-gray-600">
                {sponsor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}