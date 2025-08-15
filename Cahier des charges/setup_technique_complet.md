# Guide Setup Technique Complet - Application Lecture

## 1. Prérequis et environnement

### 1.1 Outils requis
```bash
# Node.js (version LTS recommandée)
node --version  # v20.x.x minimum
npm --version   # v10.x.x minimum

# Git
git --version

# VS Code (recommandé) + extensions
code --list-extensions | grep -E "(bradlc.vscode-tailwindcss|ms-vscode.vscode-typescript-next|esbenp.prettier-vscode)"
```

### 1.2 Extensions VS Code recommandées
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-playwright.playwright",
    "supabase.supabase",
    "github.copilot",
    "ms-vscode.vscode-eslint"
  ]
}
```

## 2. Setup Repository et Next.js

### 2.1 Initialisation du projet
```bash
# Création du projet Next.js
npx create-next-app@latest app-lecture \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --eslint

cd app-lecture

# Installation des dépendances principales
npm install \
  @supabase/supabase-js \
  @supabase/auth-helpers-nextjs \
  zustand \
  framer-motion \
  howler \
  @radix-ui/react-avatar \
  @radix-ui/react-button \
  @radix-ui/react-card \
  @radix-ui/react-dialog \
  @radix-ui/react-progress \
  @radix-ui/react-select \
  @radix-ui/react-slot \
  @tanstack/react-query \
  react-hook-form \
  @hookform/resolvers \
  zod \
  lucide-react \
  class-variance-authority \
  clsx \
  tailwind-merge

# Dépendances de développement
npm install -D \
  @types/howler \
  @types/node \
  @types/react \
  @types/react-dom \
  @playwright/test \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event \
  autoprefixer \
  eslint \
  eslint-config-next \
  jest \
  jest-environment-jsdom \
  postcss \
  prettier \
  tailwindcss \
  typescript
```

### 2.2 Configuration TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/stores/*": ["./src/stores/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2.3 Configuration Tailwind CSS
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "phoneme-bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" }
        },
        "syllable-form": {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "50%": { transform: "translateX(0)", opacity: "0.5" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "phoneme-bounce": "phoneme-bounce 1s infinite",
        "syllable-form": "syllable-form 0.8s ease-out"
      },
      fontFamily: {
        'dyslexic': ['OpenDyslexic', 'sans-serif'],
        'child-friendly': ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 2.4 Variables CSS pour l'accessibilité
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
    
    /* Variables spécifiques app lecture */
    --phoneme-primary: 199 89% 48%;
    --phoneme-secondary: 142 76% 73%;
    --success-color: 142 76% 36%;
    --warning-color: 38 92% 50%;
    --error-color: 0 84% 60%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... autres variables dark mode */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
  
  /* Styles pour accessibilité enfants */
  .child-mode {
    font-size: 1.25rem;
    line-height: 1.8;
    letter-spacing: 0.05em;
  }
  
  .dyslexic-mode {
    font-family: 'OpenDyslexic', sans-serif;
    font-size: 1.4rem;
    line-height: 2;
    letter-spacing: 0.1em;
    word-spacing: 0.2em;
  }
}

@layer components {
  /* Composants réutilisables */
  .phoneme-button {
    @apply px-6 py-4 text-2xl font-bold rounded-xl border-4 
           transition-all duration-300 hover:scale-105 
           focus:ring-4 focus:ring-offset-2;
  }
  
  .syllable-card {
    @apply bg-white shadow-lg rounded-2xl p-6 border-2 
           hover:shadow-xl transition-all duration-300;
  }
  
  .activity-container {
    @apply min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
           p-4 flex flex-col items-center justify-center;
  }
}
```

## 3. Configuration Supabase

### 3.1 Création du projet Supabase
```bash
# Installation CLI Supabase
npm install -g @supabase/cli

# Login (nécessite compte Supabase)
supabase login

# Initialisation projet local
supabase init

# Création nouveau projet sur Supabase Cloud
# Via interface web : https://supabase.com/dashboard
# Nom: app-lecture-production
# Région: West Europe (eu-west-1)
# Plan: Pro (pour production) ou Free (pour tests)
```

### 3.2 Configuration de la base de données
```sql
-- migrations/20240101000000_initial_schema.sql

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs (étend auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100),
  age INTEGER CHECK (age >= 3 AND age <= 12),
  niveau_scolaire VARCHAR(20) CHECK (niveau_scolaire IN ('PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2')),
  code_classe VARCHAR(20),
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des phonèmes
CREATE TABLE public.phonemes (
  id SERIAL PRIMARY KEY,
  symbole VARCHAR(10) NOT NULL UNIQUE, -- [a], [m], etc.
  graphemes TEXT[] NOT NULL,            -- ['a', 'A', 'à', 'â']
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 6),
  ordre_phase INTEGER NOT NULL,
  niveau_min VARCHAR(20) NOT NULL,
  difficulte INTEGER DEFAULT 1 CHECK (difficulte BETWEEN 1 AND 5),
  prerequisites INTEGER[],              -- IDs des phonèmes prérequis
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des activités par écran
CREATE TABLE public.activites (
  id SERIAL PRIMARY KEY,
  phoneme_id INTEGER REFERENCES phonemes(id) ON DELETE CASCADE,
  ecran_numero INTEGER NOT NULL CHECK (ecran_numero BETWEEN 1 AND 7),
  titre VARCHAR(200) NOT NULL,
  type_activite VARCHAR(50) NOT NULL, -- 'identification', 'localisation', etc.
  contenu JSONB NOT NULL,              -- Configuration spécifique
  difficulte INTEGER DEFAULT 1,
  duree_estimee INTEGER,               -- en secondes
  criteres_reussite JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(phoneme_id, ecran_numero)
);

-- Table de progression des élèves
CREATE TABLE public.progression_eleves (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eleve_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  phoneme_id INTEGER REFERENCES phonemes(id) ON DELETE CASCADE,
  ecran_numero INTEGER NOT NULL,
  tentatives INTEGER DEFAULT 0,
  meilleur_score DECIMAL(5,2),
  score_actuel DECIMAL(5,2),
  temps_total INTEGER DEFAULT 0,      -- en secondes
  maitrise BOOLEAN DEFAULT FALSE,
  derniere_tentative TIMESTAMP WITH TIME ZONE,
  maitrise_atteinte TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(eleve_id, phoneme_id, ecran_numero)
);

-- Table des sessions d'apprentissage
CREATE TABLE public.sessions_apprentissage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eleve_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  phoneme_id INTEGER REFERENCES phonemes(id),
  ecran_numero INTEGER,
  debut_session TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fin_session TIMESTAMP WITH TIME ZONE,
  duree_totale INTEGER,               -- en secondes
  activites_terminees INTEGER DEFAULT 0,
  score_session DECIMAL(5,2),
  donnees_session JSONB,              -- Métadonnées spécifiques
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des interactions détaillées (pour analytics)
CREATE TABLE public.interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions_apprentissage(id) ON DELETE CASCADE,
  eleve_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  phoneme_id INTEGER REFERENCES phonemes(id),
  ecran_numero INTEGER,
  type_interaction VARCHAR(50) NOT NULL, -- 'click', 'audio_play', 'response', etc.
  donnees JSONB NOT NULL,                 -- Données spécifiques de l'interaction
  timestamp_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duree_reaction INTEGER,                 -- temps de réaction en ms
  succes BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_progression_eleve_phoneme ON progression_eleves(eleve_id, phoneme_id);
CREATE INDEX idx_sessions_eleve_date ON sessions_apprentissage(eleve_id, debut_session);
CREATE INDEX idx_interactions_session ON interactions(session_id);
CREATE INDEX idx_interactions_eleve_timestamp ON interactions(eleve_id, timestamp_interaction);
CREATE INDEX idx_phonemes_phase_ordre ON phonemes(phase, ordre_phase);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progression_eleves ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions_apprentissage ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON progression_eleves
  FOR ALL USING (auth.uid() = eleve_id);

CREATE POLICY "Users can view own sessions" ON sessions_apprentissage
  FOR ALL USING (auth.uid() = eleve_id);

CREATE POLICY "Users can view own interactions" ON interactions
  FOR ALL USING (auth.uid() = eleve_id);

-- Les phonèmes et activités sont publics en lecture
CREATE POLICY "Phonemes are viewable by everyone" ON phonemes
  FOR SELECT USING (true);

CREATE POLICY "Activities are viewable by everyone" ON activites
  FOR SELECT USING (true);
```

### 3.3 Données initiales (seed)
```sql
-- migrations/20240101000001_seed_data.sql

-- Insertion des 5 phonèmes MVP
INSERT INTO phonemes (symbole, graphemes, phase, ordre_phase, niveau_min, difficulte, description) VALUES
('/a/', ARRAY['a', 'A', 'à'], 1, 1, 'MS', 1, 'Premier phonème voyelle, le plus simple'),
('/i/', ARRAY['i', 'I', 'î'], 1, 2, 'MS', 1, 'Voyelle fermée simple'),
('/o/', ARRAY['o', 'O', 'ô'], 1, 3, 'MS', 1, 'Voyelle moyenne simple'),
('/m/', ARRAY['m', 'M', 'mm'], 2, 1, 'GS', 2, 'Première consonne continue'),
('/l/', ARRAY['l', 'L', 'll'], 2, 2, 'GS', 2, 'Consonne liquide fréquente');

-- Insertion des activités pour chaque phonème (exemple pour /a/)
INSERT INTO activites (phoneme_id, ecran_numero, titre, type_activite, contenu, criteres_reussite) VALUES
(1, 1, 'J''entends le son /a/', 'identification_auditive', 
 '{"mots_cibles": ["chat", "papa", "gâteau"], "mots_distracteurs": ["chien", "bébé", "vélo"], "repetitions": 3}',
 '{"score_minimum": 0.8, "tentatives_max": 5}'),

(1, 2, 'Je trouve la place du son /a/', 'localisation', 
 '{"mots": [{"mot": "chat", "position": "fin"}, {"mot": "papa", "position": "debut_fin"}], "positions": ["début", "milieu", "fin"]}',
 '{"score_minimum": 0.7, "tentatives_max": 6}'),

(1, 3, 'Je reconnais la lettre a', 'reconnaissance_grapheme',
 '{"graphemes_cibles": ["a", "A"], "distracteurs": ["e", "o", "u"], "polices": ["Arial", "Comic Sans"]}',
 '{"score_minimum": 0.9, "tentatives_max": 4}'),

(1, 4, 'Je combine avec la voyelle a', 'combinaison_cv',
 '{"voyelle": "a", "consonnes_etudiees": [], "syllabes_attendues": []}',
 '{"score_minimum": 0.8, "tentatives_max": 8}'),

(1, 5, 'Je lis des mots avec a', 'lecture_mots',
 '{"mots": ["a", "ah"], "difficulte_progressive": true}',
 '{"score_minimum": 0.8, "tentatives_max": 6}'),

(1, 6, 'J''écris des mots avec a', 'ecriture_mots',
 '{"mots": ["a"], "aide_visuelle": true}',
 '{"score_minimum": 0.7, "tentatives_max": 8}'),

(1, 7, 'Je lis des phrases avec a', 'lecture_phrases',
 '{"phrases": ["A !"], "questions": [{"question": "Qu\'est-ce que tu lis ?", "reponse": "A"}]}',
 '{"score_minimum": 0.8, "tentatives_max": 5}');

-- TODO: Répéter pour les autres phonèmes (i, o, m, l)
```

### 3.4 Configuration client Supabase
```typescript
// src/lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database'

export const createClient = () =>
  createClientComponentClient<Database>()

// src/lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export const createServerClient = () =>
  createServerComponentClient<Database>({
    cookies,
  })

// src/types/database.ts
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
      // ... autres tables
    }
  }
}
```

## 4. Configuration Vercel

### 4.1 Setup projet Vercel
```bash
# Installation CLI Vercel
npm install -g vercel

# Connexion à Vercel
vercel login

# Configuration projet
vercel

# Configuration des variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add HF_API_KEY
vercel env add OPENAI_API_KEY
```

### 4.2 Configuration Vercel (vercel.json)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

### 4.3 Configuration Next.js
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['supabase.co', 'huggingface.co'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
```

## 5. Services externes

### 5.1 Configuration Hugging Face
```typescript
// src/lib/ai/huggingface.ts
interface HuggingFaceConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

class HuggingFaceClient {
  private config: HuggingFaceConfig;

  constructor(config: HuggingFaceConfig) {
    this.config = config;
  }

  async generateContent(prompt: string, options?: any) {
    const response = await fetch(
      `${this.config.baseUrl}/models/${this.config.model}`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            do_sample: true,
            ...options,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HF API Error: ${response.status}`);
    }

    return response.json();
  }
}

export const huggingFaceClient = new HuggingFaceClient({
  apiKey: process.env.HF_API_KEY!,
  model: 'google/gemma-3-8b',
  baseUrl: 'https://api-inference.huggingface.co',
});

// src/lib/ai/content-generator.ts
export async function generatePhonemeWords(
  phoneme: string,
  difficulty: number,
  count: number = 10,
  studentAge: number = 6
) {
  const prompt = `
Génère ${count} mots français simples pour un enfant de ${studentAge} ans.
Contraintes:
- Contiennent le phonème ${phoneme}
- Niveau de difficulté: ${difficulty}/5
- Vocabulaire courant adapté à l'âge
- Éviter les mots complexes ou techniques

Format de réponse JSON:
[
  {
    "mot": "chat",
    "phoneme_position": "fin",
    "syllables": ["chat"],
    "difficulte": 2
  }
]
`;

  try {
    const response = await huggingFaceClient.generateContent(prompt);
    // Parse et valide la réponse
    return parseAndValidateWords(response, phoneme);
  } catch (error) {
    console.error('Erreur génération contenu:', error);
    // Fallback vers contenu statique
    return getFallbackWords(phoneme, difficulty, count);
  }
}
```

### 5.2 Configuration Audio (Web Speech API + Howler)
```typescript
// src/lib/audio/speech-recognition.ts
interface SpeechRecognitionConfig {
  language: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
}

class SpeechRecognitionService {
  private recognition: any;
  private config: SpeechRecognitionConfig;

  constructor(config: SpeechRecognitionConfig) {
    this.config = config;
    this.initializeRecognition();
  }

  private initializeRecognition() {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      throw new Error('Speech Recognition not supported');
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = this.config.language;
    this.recognition.continuous = this.config.continuous;
    this.recognition.interimResults = this.config.interimResults;
    this.recognition.maxAlternatives = this.config.maxAlternatives;
  }

  async recognizeSpeech(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        resolve(result);
      };

      this.recognition.onerror = (event: any) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.start();
    });
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export const speechRecognition = new SpeechRecognitionService({
  language: 'fr-FR',
  continuous: false,
  interimResults: false,
  maxAlternatives: 3,
});

// src/lib/audio/audio-player.ts
import { Howl } from 'howler';

class AudioPlayerService {
  private sounds: Map<string, Howl> = new Map();

  async playAudio(url: string, options?: any): Promise<void> {
    return new Promise((resolve, reject) => {
      let sound = this.sounds.get(url);

      if (!sound) {
        sound = new Howl({
          src: [url],
          format: ['mp3', 'wav'],
          volume: options?.volume || 0.8,
          onload: () => {
            sound!.play();
          },
          onend: () => {
            resolve();
          },
          onloaderror: (id, error) => {
            reject(new Error(`Audio load error: ${error}`));
          },
          onplayerror: (id, error) => {
            reject(new Error(`Audio play error: ${error}`));
          },
        });

        this.sounds.set(url, sound);
      } else {
        sound.play();
        sound.on('end', () => resolve());
      }
    });
  }

  stopAll() {
    this.sounds.forEach(sound => sound.stop());
  }

  preloadAudio(urls: string[]) {
    urls.forEach(url => {
      if (!this.sounds.has(url)) {
        const sound = new Howl({
          src: [url],
          preload: true,
        });
        this.sounds.set(url, sound);
      }
    });
  }
}

export const audioPlayer = new AudioPlayerService();
```

## 6. Variables d'environnement

### 6.1 Fichier .env.local (développement)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Hugging Face
HF_API_KEY=your-huggingface-api-key

# OpenAI (fallback)
OPENAI_API_KEY=your-openai-api-key

# Learning Locker (Phase 2)
LEARNING_LOCKER_ENDPOINT=https://ll.your-vps.com
LEARNING_LOCKER_USERNAME=your-username
LEARNING_LOCKER_PASSWORD=your-password

# Analytics
VERCEL_ANALYTICS_ID=your-analytics-id

# Environnement
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Debugging
DEBUG=true
```

### 6.2 Configuration environnement
```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  HF_API_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  HF_API_KEY: process.env.HF_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
```

## 7. Outils de développement

### 7.1 Configuration ESLint
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": "warn"
  },
  "ignorePatterns": ["node_modules/", ".next/", "out/"]
}
```

### 7.2 Configuration Prettier
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 7.3 Configuration Jest
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
}

module.exports = createJestConfig(customJestConfig)

// jest.setup.js
import '@testing-library/jest-dom'

// Mock Howler.js
jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    stop: jest.fn(),
    on: jest.fn(),
  })),
}))

// Mock Web Speech API
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    onresult: null,
    onerror: null,
  })),
})
```

### 7.4 Configuration Playwright
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## 8. Scripts npm

### 8.1 Configuration package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:types": "supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts",
    "db:reset": "supabase db reset",
    "db:seed": "supabase db seed",
    "db:migrate": "supabase db push",
    "setup": "npm install && npm run db:types",
    "prepare": "husky install"
  }
}
```

## 9. Scripts d'automatisation

### 9.1 Script de setup initial
```bash
#!/bin/bash
# setup.sh

echo "🚀 Setup Application Lecture - Phase 1 MVP"

# Vérification des prérequis
echo "📋 Vérification des prérequis..."
node --version || { echo "❌ Node.js requis"; exit 1; }
npm --version || { echo "❌ npm requis"; exit 1; }
git --version || { echo "❌ Git requis"; exit 1; }

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Configuration des hooks Git
echo "🔧 Configuration des hooks Git..."
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
npx husky add .husky/pre-push "npm run test"

# Génération des types Supabase
echo "🔄 Génération des types TypeScript..."
npm run db:types

# Configuration des variables d'environnement
if [ ! -f .env.local ]; then
  echo "⚙️ Configuration des variables d'environnement..."
  cp .env.example .env.local
  echo "✏️ Veuillez remplir le fichier .env.local avec vos clés API"
fi

# Test de l'environnement
echo "🧪 Test de l'environnement..."
npm run lint
npm run type-check

echo "✅ Setup terminé avec succès!"
echo "👉 Prochaines étapes:"
echo "   1. Remplir .env.local avec vos clés API"
echo "   2. npm run dev pour démarrer le serveur"
echo "   3. Ouvrir http://localhost:3000"
```

### 9.2 Script de déploiement
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement Application Lecture"

# Vérification de la branche
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
  echo "❌ Déploiement uniquement depuis la branche main"
  exit 1
fi

# Tests avant déploiement
echo "🧪 Exécution des tests..."
npm run lint || { echo "❌ Erreurs de linting"; exit 1; }
npm run type-check || { echo "❌ Erreurs TypeScript"; exit 1; }
npm run test || { echo "❌ Tests unitaires échoués"; exit 1; }
npm run build || { echo "❌ Build échoué"; exit 1; }

# Mise à jour de la base de données
echo "🔄 Mise à jour de la base de données..."
npm run db:migrate

# Déploiement Vercel
echo "📤 Déploiement vers Vercel..."
vercel --prod

echo "✅ Déploiement terminé avec succès!"
```

## 10. Configuration CI/CD

### 10.1 GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  deploy:
    runs-on: ubuntu-latest
    needs: [test, e2e]
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 11. Checklist de setup final

### 11.1 Vérification complète
```bash
# Liste de vérification setup technique

✅ Repository Git initialisé
✅ Next.js 14 configuré avec TypeScript
✅ Tailwind CSS + Shadcn/ui installé
✅ Supabase project créé et configuré
✅ Base de données avec schéma complet
✅ Données de seed pour 5 phonèmes
✅ Vercel project configuré
✅ Variables d'environnement définies
✅ Tests unitaires configurés (Jest)
✅ Tests E2E configurés (Playwright)
✅ CI/CD pipeline configuré
✅ Hugging Face API configurée
✅ Audio services configurés
✅ Linting et formatting configurés
✅ Scripts de développement prêts

# Commandes de vérification
npm run lint        # ✅ Pas d'erreurs
npm run type-check  # ✅ Types valides
npm run test        # ✅ Tests passent
npm run build       # ✅ Build réussie
npm run dev         # ✅ Serveur démarre
```

Cette configuration technique complète vous permet de démarrer immédiatement le développement avec un environnement robuste et scalable ! 🚀