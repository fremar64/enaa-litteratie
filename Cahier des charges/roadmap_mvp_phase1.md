# Roadmap Technique Phase 1 MVP - Application Lecture
*Durée : 4 mois (16 semaines) | Budget : 120k€ | Scope : 5 phonèmes de base*

## 1. Architecture technique MVP

### 1.1 Stack technologique finalisée

#### Frontend (Next.js 14)
```typescript
// Dépendances principales
{
  "next": "14.2.0",
  "react": "18.3.0",
  "typescript": "5.4.0",
  "tailwindcss": "3.4.0",
  "@radix-ui/react-*": "latest", // Composants Shadcn/ui
  "zustand": "4.5.0",            // State management
  "framer-motion": "11.0.0",     // Animations
  "howler": "2.2.4",            // Audio management
  "react-hook-form": "7.51.0",  // Formulaires
  "zod": "3.23.0",              // Validation
  "@tanstack/react-query": "5.28.0" // Data fetching
}
```

#### Backend & Infrastructure
```yaml
# Infrastructure MVP
Database: Supabase PostgreSQL
Authentication: Supabase Auth
Storage: Supabase Storage
Hosting: Vercel
Analytics: Vercel Analytics + Custom xAPI
Domain: app-lecture.com
SSL: Automatique via Vercel
```

#### Services externes
```typescript
interface ExternalServices {
  llm: 'Hugging Face Inference API (Gemma 3-8B)';
  tts: 'Web Speech API + Fallback ElevenLabs';
  stt: 'Web Speech API avec configuration française';
  images: 'Stable Diffusion via Hugging Face';
  analytics: 'Learning Locker sur VPS (préparation)';
}
```

### 1.2 Architecture de dossiers

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Routes principales
│   │   ├── eleve/                # Interface élève
│   │   │   ├── phoneme/[id]/     # Activités par phonème
│   │   │   │   ├── ecran/[num]/  # 7 écrans d'apprentissage
│   │   │   │   └── page.tsx
│   │   │   └── progression/      # Vue d'ensemble progression
│   │   ├── enseignant/           # Interface enseignant (Phase 2)
│   │   └── parent/               # Interface parent (Phase 2)
│   ├── api/                      # API Routes
│   │   ├── phonemes/             # CRUD phonèmes
│   │   ├── sessions/             # Gestion sessions
│   │   ├── ai/                   # Endpoints IA
│   │   └── xapi/                 # Tracking xAPI
│   └── globals.css
├── components/                   # Composants réutilisables
│   ├── ui/                       # Shadcn/ui components
│   ├── phoneme/                  # Composants spécifiques phonèmes
│   │   ├── EcranIdentification.tsx
│   │   ├── EcranLocalisation.tsx
│   │   ├── EcranReconnaissance.tsx
│   │   ├── EcranCombinaison.tsx
│   │   └── shared/
│   ├── audio/                    # Composants audio
│   ├── navigation/               # Navigation et layout
│   └── gamification/             # Badges, progress, etc.
├── lib/                          # Utilitaires et configuration
│   ├── database/                 # Types et schemas Supabase
│   ├── ai/                       # Integration LLM
│   ├── audio/                    # Gestion audio
│   ├── xapi/                     # Client xAPI
│   └── utils/                    # Helpers génériques
├── hooks/                        # React hooks custom
├── stores/                       # Zustand stores
├── types/                        # Types TypeScript
└── public/                       # Assets statiques
    ├── audio/                    # Fichiers audio phonèmes
    ├── images/                   # Images et illustrations
    └── icons/                    # Iconographie
```

## 2. Sprint Planning - 8 Sprints de 2 semaines

### Sprint 0 : Setup Projet (Semaine 0, pré-développement)
**Objectif** : Environnement prêt pour le développement

**Livrables :**
- [x] Repository GitHub configuré
- [x] Supabase project initialisé
- [x] Vercel deployment configuré
- [x] CI/CD pipeline basique
- [x] Design system Figma initié

```bash
# Script d'initialisation
npx create-next-app@latest app-lecture --typescript --tailwind --app
cd app-lecture
npm install @supabase/supabase-js zustand framer-motion howler
npm install -D @types/howler
```

### Sprint 1 : Fondations (Semaines 1-2)
**Objectif** : Architecture de base + authentification

**User Stories :**
- En tant qu'élève, je peux créer un compte avec aide d'un adulte
- En tant qu'élève, je peux me connecter avec mon nom et un code simple
- En tant que développeur, j'ai une base de données structurée pour les phonèmes

**Tâches techniques :**
```typescript
// 1. Configuration Supabase
interface DatabaseSchema {
  users: {
    id: string;
    email: string;
    nom: string;
    age: number;
    niveau_scolaire: string;
    created_at: string;
  };
  
  phonemes: {
    id: number;
    symbole: string;      // [a], [m], etc.
    graphemes: string[];  // ['a', 'A', 'à']
    ordre: number;        // Ordre dans la progression
    niveau: string;       // 'maternelle' | 'cp' | 'ce1'
  };
  
  student_progress: {
    id: string;
    user_id: string;
    phoneme_id: number;
    ecran_numero: number; // 1-7
    score: number;
    temps_passe: number;
    termine: boolean;
    updated_at: string;
  };
}

// 2. Configuration authentification simplifiée
interface SimpleAuth {
  loginWithCode(nom: string, codeClasse: string): Promise<User>;
  createStudent(nom: string, age: number, codeClasse: string): Promise<User>;
  getCurrentUser(): User | null;
}

// 3. Store Zustand principal
interface AppStore {
  user: User | null;
  currentPhoneme: Phoneme | null;
  currentEcran: number;
  sessionData: SessionData;
  
  // Actions
  setUser: (user: User) => void;
  startPhonemeSession: (phonemeId: number) => void;
  updateProgress: (ecran: number, score: number) => void;
}
```

**Definition of Done :**
- [ ] Connexion/inscription fonctionnelle
- [ ] Base de données avec 5 phonèmes (a, i, o, m, l)
- [ ] Navigation de base entre écrans
- [ ] Tests unitaires pour l'auth
- [ ] Déployment automatique sur Vercel

### Sprint 2 : Écran 1 - Identification Auditive (Semaines 3-4)
**Objectif** : Premier écran fonctionnel pour tous les phonèmes

**User Stories :**
- En tant qu'élève, j'entends un mot et je dois dire si j'entends le son [a]
- En tant qu'élève, je reçois un feedback immédiat sur ma réponse
- En tant qu'élève, je vois ma progression sur l'écran

**Composant principal :**
```typescript
interface EcranIdentificationProps {
  phonemeId: number;
  onComplete: (score: number, timeSpent: number) => void;
}

const EcranIdentification: FC<EcranIdentificationProps> = ({ phonemeId, onComplete }) => {
  const [currentWord, setCurrentWord] = useState<WordStimulus>();
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startTime] = useState(Date.now());

  // Logique d'activité
  const handleResponse = (userResponse: boolean) => {
    const isCorrect = userResponse === currentWord.containsPhoneme;
    setScore(prev => prev + (isCorrect ? 1 : 0));
    
    // Animation feedback
    playFeedbackAnimation(isCorrect);
    
    // Question suivante ou fin
    if (questionIndex < QUESTIONS_PER_SCREEN - 1) {
      setQuestionIndex(prev => prev + 1);
      loadNextWord();
    } else {
      const timeSpent = Date.now() - startTime;
      onComplete(score / QUESTIONS_PER_SCREEN, timeSpent);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <PhonemeHeader phoneme={phoneme} screenNumber={1} />
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          J'entends le son {phoneme.symbole}
        </h2>
        <p className="text-lg text-gray-600">
          Écoute bien et dis-moi si tu entends le son {phoneme.symbole}
        </p>
      </div>

      <AudioPlayer 
        src={currentWord?.audioUrl} 
        autoPlay={false}
        onEnded={() => setCanAnswer(true)}
      />

      <div className="flex gap-6 mt-8">
        <ResponseButton
          type="yes"
          onClick={() => handleResponse(true)}
          disabled={!canAnswer}
        >
          👍 Oui, j'entends {phoneme.symbole}
        </ResponseButton>
        
        <ResponseButton
          type="no"
          onClick={() => handleResponse(false)}
          disabled={!canAnswer}
        >
          👎 Non, je n'entends pas {phoneme.symbole}
        </ResponseButton>
      </div>

      <ProgressBar 
        current={questionIndex + 1} 
        total={QUESTIONS_PER_SCREEN} 
      />
    </div>
  );
};
```

**Contenu requis :**
- 12 mots par phonème (6 avec phonème, 6 sans)
- Enregistrements audio professionnels
- Validation pédagogique du vocabulaire

**Definition of Done :**
- [ ] Écran 1 fonctionnel pour les 5 phonèmes
- [ ] Audio de qualité intégré
- [ ] Scoring et progression sauvegardés
- [ ] Tests d'intégration
- [ ] Validation par enseignant référent

### Sprint 3 : Écran 2 - Localisation (Semaines 5-6)
**Objectif** : Activité de positionnement du phonème dans le mot

**User Stories :**
- En tant qu'élève, j'entends un mot et je clique où j'entends le son
- En tant qu'élève, je vois une représentation visuelle du mot en syllabes

**Composant spécialisé :**
```typescript
interface EcranLocalisationProps {
  phonemeId: number;
  onComplete: (score: number, timeSpent: number) => void;
}

const EcranLocalisation: FC<EcranLocalisationProps> = ({ phonemeId, onComplete }) => {
  const [currentWord, setCurrentWord] = useState<WordWithPosition>();
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const positions = ['Début', 'Milieu', 'Fin'];
  
  const handlePositionSelect = (position: number) => {
    setSelectedPosition(position);
    const isCorrect = position === currentWord.phonemePosition;
    
    // Feedback visuel
    playPositionFeedback(position, isCorrect);
    
    // Continuer logique...
  };

  return (
    <div className="ecran-localisation">
      <h2>Je trouve la place du son {phoneme.symbole}</h2>
      
      <WordVisualization 
        word={currentWord.text}
        syllables={currentWord.syllables}
        highlightPosition={selectedPosition}
      />
      
      <AudioPlayer src={currentWord.audioUrl} />
      
      <div className="position-buttons">
        {positions.map((pos, index) => (
          <PositionButton
            key={pos}
            position={index}
            label={pos}
            selected={selectedPosition === index}
            onClick={() => handlePositionSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};
```

### Sprint 4 : Écran 3 - Reconnaissance Graphème (Semaines 7-8)
**Objectif** : Association phonème-graphème

**User Stories :**
- En tant qu'élève, je reconnais la lettre correspondant au son
- En tant qu'élève, je distingue la bonne lettre parmi des distracteurs

**Innovation technique :**
```typescript
const EcranReconnaissance: FC<EcranReconnaissanceProps> = ({ phonemeId, onComplete }) => {
  const [graphemeOptions, setGraphemeOptions] = useState<GraphemeOption[]>();
  const [selectedGrapheme, setSelectedGrapheme] = useState<string | null>(null);

  // Génération automatique de distracteurs intelligents
  const generateDistractors = (targetGrapheme: string): string[] => {
    const similarGraphemes = GRAPHEME_SIMILARITY_MAP[targetGrapheme];
    return shuffleArray(similarGraphemes).slice(0, 3);
  };

  return (
    <div className="ecran-reconnaissance">
      <h2>Je reconnais la lettre {phoneme.symbole}</h2>
      
      <PhonemeAudio phoneme={phoneme} autoPlay />
      
      <GraphemeGrid 
        options={graphemeOptions}
        onSelect={handleGraphemeSelect}
        showFeedback={selectedGrapheme !== null}
      />
      
      <WritingPractice 
        targetGrapheme={targetGrapheme}
        onComplete={handleWritingComplete}
      />
    </div>
  );
};
```

### Sprint 5 : Écran 4 - Combinaisons CV (Semaines 9-10)
**Objectif** : Innovation majeure - fusion syllabique

**User Stories :**
- En tant qu'élève, je forme la syllabe "ma" en combinant "m" + "a"
- En tant qu'élève, je lis toutes les syllabes possibles avec ma consonne

**Composant innovant :**
```typescript
const EcranCombinaison: FC<EcranCombinaisonProps> = ({ phonemeId, onComplete }) => {
  const [consonant, setConsonant] = useState<string>();
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [formedSyllable, setFormedSyllable] = useState<string>('');
  
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

  const handleVowelSelect = (vowel: string) => {
    setSelectedVowel(vowel);
    const syllable = consonant + vowel;
    setFormedSyllable(syllable);
    
    // Animation de formation de syllabe
    playSyllableFormation(consonant, vowel, syllable);
  };

  const handleSyllableReading = async (syllable: string) => {
    // Test de lecture avec reconnaissance vocale simple
    const reading = await recordSyllableReading(syllable);
    const score = evaluateSyllableReading(syllable, reading);
    
    updateSyllableProgress(syllable, score);
  };

  return (
    <div className="ecran-combinaison">
      <h2>Je combine {consonant} + voyelles</h2>
      
      <SyllableBuilder 
        consonant={consonant}
        vowels={vowels}
        selectedVowel={selectedVowel}
        onVowelSelect={handleVowelSelect}
      />
      
      <SyllableDisplay 
        syllable={formedSyllable}
        animated={true}
      />
      
      <ReadingTest 
        syllable={formedSyllable}
        onRead={handleSyllableReading}
      />
      
      <SyllableGrid 
        consonant={consonant}
        completedSyllables={completedSyllables}
        onSyllableClick={handleSyllableReading}
      />
    </div>
  );
};
```

### Sprint 6 : Écrans 5-7 Basiques (Semaines 11-12)
**Objectif** : Compléter les 7 écrans pour MVP

**User Stories :**
- Écran 5 : Je lis des mots simples avec le phonème
- Écran 6 : J'écris des mots simples (input clavier)
- Écran 7 : Je lis des phrases courtes

**Implémentation simplifiée pour MVP :**
```typescript
// Écran 5 : Lecture de mots
const EcranLecture: FC<EcranLectureProps> = ({ phonemeId, onComplete }) => {
  const [currentWord, setCurrentWord] = useState<WordToRead>();
  
  return (
    <div className="ecran-lecture">
      <h2>Je lis des mots avec {phoneme.symbole}</h2>
      
      <WordDisplay 
        word={currentWord.text}
        syllables={currentWord.syllables}
        phonemeHighlight={phoneme.symbole}
      />
      
      <AudioPlayback 
        src={currentWord.audioUrl}
        onPlay={() => trackAudioPlayback()}
      />
      
      <ReadingAssessment 
        word={currentWord}
        onComplete={handleReadingComplete}
      />
    </div>
  );
};

// Écran 6 : Écriture simplifiée (clavier virtuel)
const EcranEcriture: FC<EcranEcritureProps> = ({ phonemeId, onComplete }) => {
  const [targetWord, setTargetWord] = useState<string>();
  const [userInput, setUserInput] = useState<string>('');
  
  return (
    <div className="ecran-ecriture">
      <h2>J'écris des mots avec {phoneme.symbole}</h2>
      
      <WordToWrite 
        word={targetWord}
        audioHint={true}
      />
      
      <VirtualKeyboard 
        onType={setUserInput}
        simplifiedLayout={true}
      />
      
      <WritingValidation 
        target={targetWord}
        input={userInput}
        onValidate={handleWritingValidation}
      />
    </div>
  );
};
```

### Sprint 7 : Intégration IA (Semaines 13-14)
**Objectif** : Génération de contenu adaptatif

**User Stories :**
- En tant que système, je génère automatiquement des mots adaptés au niveau
- En tant qu'élève, je reçois des exercices personnalisés selon mes difficultés

**Intégration LLM :**
```typescript
// Client Hugging Face
class HuggingFaceClient {
  private apiKey = process.env.HF_API_KEY;
  private model = 'google/gemma-3-8b';

  async generatePhonemeWords(
    phoneme: string,
    difficulty: number,
    count: number,
    studentAge: number
  ): Promise<GeneratedWord[]> {
    
    const prompt = `
Génère ${count} mots français simples pour un enfant de ${studentAge} ans.
Contraintes :
- Contiennent le phonème ${phoneme}
- Niveau de difficulté : ${difficulty}/5
- Vocabulaire courant adapté à l'âge
- Format JSON : [{"mot": "chat", "syllables": ["chat"], "position": "début"}]
    `;

    const response = await fetch(`https://api-inference.huggingface.co/models/${this.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          do_sample: true
        }
      })
    });

    return this.parseAndValidateResponse(await response.json());
  }

  private async parseAndValidateResponse(response: any): Promise<GeneratedWord[]> {
    // Parsing + validation du contenu généré
    // Vérification présence phonème, niveau vocabulaire, etc.
  }
}

// Service d'adaptation
class AdaptationService {
  async adaptContentForStudent(
    studentId: string,
    phonemeId: number,
    screenNumber: number
  ): Promise<AdaptedContent> {
    
    // Récupération profil étudiant
    const profile = await this.getStudentProfile(studentId);
    
    // Calcul niveau de difficulté adapté
    const difficulty = this.calculateOptimalDifficulty(profile, phonemeId);
    
    // Génération contenu via IA
    const content = await this.huggingFace.generatePhonemeWords(
      phoneme.symbole,
      difficulty,
      12, // nombre de mots
      profile.age
    );
    
    return {
      words: content,
      difficulty,
      reasoning: `Adapté selon performance précédente: ${profile.averageScore}`
    };
  }
}
```

### Sprint 8 : Finition MVP (Semaines 15-16)
**Objectif** : Stabilisation et préparation demo

**User Stories :**
- En tant qu'élève, je navigue facilement entre tous les écrans
- En tant qu'enseignant, je peux voir la progression de mes élèves
- En tant que parent, je peux créer le compte de mon enfant

**Tâches finales :**
```typescript
// 1. Interface de progression élève
const ProgressionDashboard: FC = () => {
  const { phonemes, progress } = useStudentProgress();
  
  return (
    <div className="progression-dashboard">
      <h1>Ma progression en lecture</h1>
      
      <PhonemeGrid 
        phonemes={phonemes}
        progress={progress}
        onPhonemeClick={startPhonemeActivity}
      />
      
      <BadgeCollection 
        earnedBadges={progress.badges}
        totalPoints={progress.points}
      />
      
      <WeeklyStats 
        sessionsThisWeek={progress.weeklyStats}
      />
    </div>
  );
};

// 2. Interface basique enseignant
const TeacherDashboard: FC = () => {
  const { students } = useClassData();
  
  return (
    <div className="teacher-dashboard">
      <h1>Ma classe</h1>
      
      <StudentList 
        students={students}
        onStudentClick={viewStudentProgress}
      />
      
      <ClassStatistics 
        averageProgress={classStats.averageProgress}
        strugglingStudents={classStats.struggling}
      />
    </div>
  );
};

// 3. PWA Configuration
const PWAConfig = {
  name: 'App Lecture',
  short_name: 'Lecture',
  description: 'Apprentissage de la lecture avec méthode syllabique',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#3b82f6',
  icons: [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icon-512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};
```

## 3. Prototypes et validations

### 3.1 Prototypes par sprint

**Sprint 1** : Prototype navigation + auth
- Figma interactif des flux principaux
- Maquette responsive mobile/tablette
- Tests utilisateur avec 5 enfants

**Sprint 2** : Prototype Écran 1 complet
- Version fonctionnelle avec vrais contenus
- Test audio sur différents devices
- Validation pédagogique enseignant

**Sprint 4** : Prototype Écran 4 (innovation)
- Demo de la fusion syllabique
- Test reconnaissance vocale basique
- Mesure engagement enfants

**Sprint 8** : Prototype complet MVP
- Démo complète 5 phonèmes
- Test avec une classe pilote
- Validation technique finale

### 3.2 Métriques de validation

```typescript
interface MVPMetrics {
  technique: {
    performance: 'LCP < 2s sur tablette',
    disponibilite: '99% uptime',
    erreurs: '< 1% error rate'
  };
  
  pedagogique: {
    completion: '> 80% completion rate par écran',
    engagement: '> 15min session moyenne',
    progression: '> 70% réussite première tentative'
  };
  
  utilisateur: {
    satisfaction: '> 4/5 rating enfants',
    adoption: '> 60% utilisation hebdomadaire',
    feedback: 'Qualitative par enseignants'
  };
}
```

## 4. Configuration et outils

### 4.1 Environnement de développement

```bash
# Setup initial repository
git clone https://github.com/your-org/app-lecture.git
cd app-lecture

# Installation dépendances
npm install

# Configuration environnement
cp .env.example .env.local
# Remplir les variables Supabase, Hugging Face, etc.

# Base de données
npm run db:setup     # Création tables
npm run db:seed      # Données de test
npm run db:migrate   # Migrations

# Développement
npm run dev          # Serveur de dev
npm run test         # Tests
npm run test:e2e     # Tests E2E
npm run lint         # Linting
npm run type-check   # Vérification TypeScript
```

### 4.2 CI/CD Pipeline

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 4.3 Structure des tests

```typescript
// __tests__/phoneme-activities.test.tsx
describe('Activités Phonèmes', () => {
  test('Écran 1 - Identification auditive', async () => {
    render(<EcranIdentification phonemeId={1} onComplete={jest.fn()} />);
    
    // Test lecture audio
    const playButton = screen.getByRole('button', { name: /écouter/i });
    fireEvent.click(playButton);
    expect(mockAudioPlay).toHaveBeenCalled();
    
    // Test réponse utilisateur
    const yesButton = screen.getByRole('button', { name: /oui/i });
    fireEvent.click(yesButton);
    
    // Vérification feedback
    await waitFor(() => {
      expect(screen.getByText(/bravo/i)).toBeInTheDocument();
    });
  });

  test('Écran 4 - Combinaison syllabique', async () => {
    render(<EcranCombinaison phonemeId={4} onComplete={jest.fn()} />);
    
    // Test formation syllabe
    const vowelA = screen.getByRole('button', { name: 'a' });
    fireEvent.click(vowelA);
    
    expect(screen.getByText('ma')).toBeInTheDocument();
    expect(mockPlaySyllable).toHaveBeenCalledWith('ma');
  });
});

// __tests__/e2e/user-journey.spec.ts (Playwright)
test('Parcours complet phonème /a/', async ({ page }) => {
  await page.goto('/eleve');
  
  // Sélection phonème
  await page.click('[data-testid="phoneme-a"]');
  
  // Écran 1
  await page.click('[data-testid="start-screen-1"]');
  await page.click('[data-testid="response-yes"]');
  await expect(page.locator('[data-testid="success-feedback"]')).toBeVisible();
  
  // Navigation écran 2
  await page.click('[data-testid="next-screen"]');
  await expect(page.locator('h2')).toContainText('Je trouve la place');
  
  // ... Test complet des 7 écrans
});
```

## 5. Risques et mitigation

### 5.1 Risques techniques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Performance audio mobile | Medium | High | Tests cross-platform, fallbacks MP3 |
| Reconnaissance vocale imprécise | High | Medium | Seuils tolérants, validation manuelle |
| Génération IA inadaptée | Medium | Medium | Pipeline validation, contenu de secours |
| Latence réseau écoles | High | High | PWA avec cache, mode offline |

### 5.2 Plan de contingence

```typescript
interface ContingencyPlans {
  audioIssues: {
    fallback: 'Fichiers MP3 pré-enregistrés',
    detection: 'Monitoring erreurs de lecture',
    timeline: '48h pour correction'
  };
  
  aiGeneration: {
    fallback: 'Base de mots statique validée',
    detection: 'Qualité score < 0.8',
    timeline: 'Immédiat (switch automatique)'
  };
  
  performanceIssues: {
    fallback: 'Version allégée sans animations',
    detection: 'LCP > 3s sur 10% devices',
    timeline: '1 semaine optimisation'
  };
}
```

## 6. Jalons et livrables

### 6.1 Démos jalons

**Semaine 4** : Demo Sprint 2
- Authentification + Écran 1 fonctionnel
- Audience : Équipe + Enseignant référent

**Semaine 8** : Demo Sprint 4
- 3 premiers écrans complets + Écran 4 innovant
- Audience : Comité pédagogique élargi

**Semaine 12** : Demo Sprint 6
- 7 écrans complets pour 5 phonèmes
- Audience : Classe pilote (test réel)

**Semaine 16** : Demo MVP Final
- Application complète + Analytics basiques
- Audience : Stakeholders + Décision Phase 2

### 6.2 Critères de succès Phase 1

```typescript
interface SuccessCriteria {
  fonctionnel: {
    phonemesImplemented: 5,                    // /a/, /i/, /o/, /m/, /l/
    screensPerPhoneme: 7,                      // Tous les écrans
    userJourneyComplete: true,                 // Parcours bout en bout
    adaptiveContent: 'basic'                   // IA génération basique
  };
  
  technique: {
    performanceBudget: 'Core Web Vitals Green',
    crossPlatform: 'iOS/Android/Desktop',
    accessibility: 'WCAG 2.1 AA partial',
    offline: 'PWA basic functionality'
  };
  
  pedagogique: {
    contentValidation: 'Expert approval',
    userTesting: '20+ enfants tested',
    teacherFeedback: 'Positive overall',
    learningOutcomes: 'Measurable progress'
  };
  
  business: {
    budget: '≤ 120k€',
    timeline: '≤ 16 semaines',
    teamSatisfaction: 'High morale',
    phase2Readiness: 'Architecture scalable'
  };
}
```

Cette roadmap détaillée vous donne un plan d'exécution concret pour démarrer immédiatement le développement. Chaque sprint a des livrables clairs, des critères de réussite mesurables et des points de validation réguliers.

**Prochaine étape recommandée** : Constitution de l'équipe et démarrage Sprint 0 dès la validation de cette roadmap.

Souhaitez-vous que je détaille un aspect spécifique (setup technique, user stories détaillées, ou stratégie de tests) ?