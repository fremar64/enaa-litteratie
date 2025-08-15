# Cahier des charges - Application d'initiation à la lecture et à l'écriture en français

## 1. Présentation du projet

### 1.1 Contexte
Application web adaptative d'apprentissage de la lecture et de l'écriture en français, destinée aux élèves de l'école élémentaire (3-11 ans), de la petite section de maternelle au cours moyen.

### 1.2 Objectifs pédagogiques
- Développer les compétences de décodage et d'encodage selon une méthode syllabique pure
- Accompagner la progression des apprentissages selon les programmes officiels
- Personnaliser les parcours d'apprentissage grâce à l'IA
- Fournir des données d'apprentissage exploitables pour la recherche en ingénierie cognitive

### 1.3 Publics cibles
- **Élèves** : 3-11 ans (maternelle PS à CM2)
- **Enseignants** : Professeurs des écoles, maîtres spécialisés
- **Parents** : Accompagnement à domicile
- **Chercheurs** : Données anonymisées pour la recherche

## 2. Méthode pédagogique - Progression syllabique systématique

### 2.1 Principe pédagogique
L'application implémente une **méthode syllabique pure** suivant une progression rigoureuse des correspondances phonème-graphème, du simple au complexe, permettant un apprentissage systématique et explicite du code alphabétique.

### 2.2 Progression en 6 phases

#### Phase 1 : Phonèmes voyelles simples (Maternelle MS/GS)
**Ordre de présentation :**
1. **a** [a] - Reconnaissance auditive et visuelle
2. **i** [i] - Association phonème-graphème
3. **o** [o] - Discrimination fine
4. **u** [y] - Production orale et écrite
5. **e** [ə] - Intégration progressive
6. **é** [e] - Extension vocalique

#### Phase 2 : Consonnes continues simples (GS/CP début)
**Ordre de présentation :**
7. **l** [l] - Première consonne (continue, fréquente)
8. **s** [s] - Consonne sifflante
9. **r** [ʁ] - Consonne liquide
10. **m** [m] - Consonne nasale
11. **n** [n] - Extension nasale
12. **f** [f] - Consonne fricative

#### Phase 3 : Consonnes occlusives (CP)
**Ordre de présentation :**
13. **t** [t] - Consonne sourde
14. **p** [p] - Bilabiale sourde
15. **d** [d] - Sonore correspondante
16. **b** [b] - Extension sonore
17. **c/k** [k] - Vélaire sourde
18. **g** [g] - Vélaire sonore

#### Phase 4 : Graphèmes complexes simples (CP)
**Ordre de présentation :**
19. **ch** [ʃ] - Premier digraphe
20. **ou** [u] - Voyelle complexe fréquente
21. **on** [ɔ̃] - Première nasale
22. **an/en** [ɑ̃] - Extension nasale
23. **in** [ɛ̃] - Complément nasal
24. **oi** [wa] - Diphtongue

#### Phase 5 : Graphèmes complexes avancés (CP/CE1)
**Ordre de présentation :**
25. **è/ê** [ɛ] - Voyelles accentuées
26. **au/eau** [o] - Homophones graphiques
27. **eu/œu** [ø]/[œ] - Voyelles antérieures
28. **gn** [ɲ] - Consonne palatale
29. **ph** [f] - Graphème étymologique
30. **qu** [k] - Contrainte orthographique

#### Phase 6 : Graphèmes rares et exceptions (CE1/CE2)
**Ordre de présentation :**
31. **y** [i]/[j] - Lettre polyvalente
32. **x** [ks]/[gz] - Consonnes multiples
33. **tion** [sjɔ̃] - Suffixe fréquent
34. **h muet/aspiré** - Contraintes orthographiques
35. **lettres muettes** - Morphologie lexicale

### 2.3 Structure des 7 écrans d'apprentissage par phonème

Chaque phonème/graphème suit une séquence standardisée de 7 activités progressives :

**Écran 1 : "J'entends le son [phonème]"**
- **Objectif** : Identification auditive pure du phonème
- **Activités** : Écoute de mots contenant le phonème, discrimination auditive
- **Critère de réussite** : 8/10 identifications correctes
- **Durée estimée** : 3-5 minutes

**Écran 2 : "Je trouve la place du son [phonème]"**
- **Objectif** : Localisation du phonème dans le mot (début/milieu/fin)
- **Activités** : Placement du phonème sur une frise, segmentation syllabique
- **Critère de réussite** : 7/10 localisations correctes
- **Durée estimée** : 4-6 minutes

**Écran 3 : "Je reconnais la lettre [graphème]"**
- **Objectif** : Association phonème-graphème, discrimination visuelle
- **Activités** : Reconnaissance de la lettre parmi des distracteurs
- **Critère de réussite** : 9/10 reconnaissances correctes
- **Durée estimée** : 3-4 minutes

**Écran 4 : "Je combine [consonne] + voyelles" (INNOVATION)**
- **Objectif** : Décodage/encodage des syllabes CV (ma, me, mi, mo, mu, my)
- **Activités** : Formation de syllabes, lecture flash, dictée de syllabes
- **Critère de réussite** : 8/10 combinaisons réussies
- **Durée estimée** : 5-7 minutes

**Écran 5 : "Je lis des mots avec [phonème]"**
- **Objectif** : Lecture de mots contenant le phonème étudié
- **Activités** : Décodage progressif, lecture à voix haute
- **Critère de réussite** : 8/10 mots décodés correctement
- **Durée estimée** : 6-8 minutes

**Écran 6 : "J'écris des mots avec [phonème]"**
- **Objectif** : Encodage orthographique et écriture manuscrite tactile
- **Activités** : Dictée de mots, écriture guidée sur canvas tactile
- **Critère de réussite** : 7/10 mots écrits correctement
- **Durée estimée** : 8-10 minutes

**Écran 7 : "Je lis des phrases avec [phonème]"**
- **Objectif** : Compréhension en contexte
- **Activités** : Lecture de phrases, questions de compréhension
- **Critère de réussite** : 8/10 phrases comprises
- **Durée estimée** : 10-12 minutes

### 2.4 Niveaux scolaires et objectifs

#### Maternelle (3-6 ans)
**Petite Section (PS) :**
- Conscience phonologique (rimes, syllabes)
- Reconnaissance des lettres en majuscule
- Vocabulaire oral (250 mots de base)

**Moyenne Section (MS) :**
- Phases 1-2 de la progression syllabique
- Lettres minuscules et cursives
- Vocabulaire oral (500 mots)

**Grande Section (GS) :**
- Phases 2-3 de la progression
- Lecture de mots simples (CVC)
- Écriture des graphèmes maîtrisés

#### Élémentaire (6-11 ans)
**CP :** Phases 3-5 (décodage systématique complet)
**CE1 :** Phase 6 + fluence + compréhension
**CE2-CM :** Perfectionnement orthographique + littérature

## 3. Spécifications techniques générales

### 3.1 Stack technologique

#### Frontend
- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS + Shadcn/ui
- **État global** : Zustand
- **Animations** : Framer Motion
- **Audio/Vidéo** : Howler.js, Web Speech API
- **Forms** : React Hook Form + Zod

#### Backend & Infrastructure
- **API** : Next.js API Routes + tRPC
- **Base de données** : Supabase PostgreSQL
- **Authentification** : Supabase Auth
- **Storage** : Supabase Storage (médias)
- **Hosting** : Vercel
- **Analytics** : Vercel Analytics + Custom xAPI

#### IA et Machine Learning

##### Stratégie MVP vs Production

**Phase MVP (coûts maîtrisés, validation concept) :**
- **LLM Principal** : Llama 3.2-8B via Hugging Face Inference API (gratuit, 30-60 req/jour)
- **Reconnaissance vocale** : Whisper API OpenAI (0,006$/min, acceptable pour tests)
- **Synthèse vocale** : Web Speech API + fallback gTTS (gratuit)
- **Vision/OCR** : YOLOv8 + EasyOCR (gratuit, simple intégration)

**Phase Production (performance optimisée, coûts réduits) :**
- **LLM Principal** : Llama 3.2-8B via Groq API (latence <0,5s) ou serveur dédié VPS
- **Reconnaissance vocale** : faster-whisper auto-hébergé sur VPS (~10€/mois)
- **Synthèse vocale** : Coqui TTS auto-hébergé (voix naturelles, hors ligne)
- **Vision/OCR** : YOLOv8 + TrOCR (lecture précise manuscrit enfants)

##### Tableau comparatif des technologies IA

| **Fonction** | **Technologie** | **Coût** | **Latence** | **Pertinence pédagogique** | **Remarques** |
|--------------|-----------------|----------|-------------|---------------------------|---------------|
| **LLM principal** | **Gemma 3-8B** via HF | Gratuit (limité) | 1-4s (cold start) | Génération consignes, adaptation exercices | Bon pour prototype, serveur dédié si usage intensif |
| | **Llama 3.2-8B** via HF | Gratuit (mêmes limites) | 1-3s | Idem Gemma, plus stable en français | Groq API pour <0,5s latence |
| **Reconnaissance vocale** | **Whisper (API OpenAI)** | 0,006$/min | 1-2s | Excellente transcription voix enfant | Coût proportionnel usage |
| | **faster-whisper** sur VPS | VPS ~10€/mois | <1s | Même précision que Whisper API | Installation Python/CUDA |
| **Synthèse vocale** | **Web Speech API** | Gratuit | <0,5s | Lecture consignes instantanée | Non supportée uniformément |
| | **gTTS** (Google TTS) | Gratuit | 1-2s | Fallback fiable multi-plateforme | Qualité un peu robotique |
| | **Coqui TTS** | Gratuit | 0,5-2s | Voix naturelles, hors ligne | Installation plus lourde |
| **Vision/OCR** | **YOLOv8** | Gratuit | <1s | Détection zones manuscrites | Ne lit pas les lettres |
| | **TrOCR** (Microsoft) | Gratuit | 1-2s | Lecture précise manuscrit/imprimé | Peut corriger lettres mal formées |
| | **EasyOCR** | Gratuit | 1-2s | Simple intégration, multi-langues | Moins précis pour écriture enfant |

##### Recommandations par phase

**MVP - Validation rapide (Budget <1k€/mois) :**
```typescript
const MVP_AI_CONFIG = {
  llm: {
    provider: 'huggingface',
    model: 'meta-llama/Llama-3.2-8B-Instruct',
    fallback: 'groq' // Si latence critique
  },
  stt: {
    primary: 'openai-whisper', // Coût acceptable pour tests
    fallback: 'web-speech-api'
  },
  tts: {
    primary: 'web-speech-api',
    fallback: 'gtts' // Serveur Python simple
  },
  vision: {
    detection: 'yolov8',
    ocr: 'easyocr' // Plus simple à intégrer
  }
};
```

**Production - Performance optimisée (Budget <100€/mois) :**
```typescript
const PRODUCTION_AI_CONFIG = {
  llm: {
    provider: 'groq', // ou VPS dédié
    model: 'llama-3.2-8b-instruct',
    latency: '<500ms'
  },
  stt: {
    provider: 'self-hosted-whisper',
    infrastructure: 'contabo-vps-gpu',
    cost: '~10€/mois'
  },
  tts: {
    provider: 'coqui-tts',
    voices: ['fr-female-child-friendly', 'fr-male-clear'],
    offline: true
  },
  vision: {
    detection: 'yolov8',
    ocr: 'trocr', // Meilleur pour manuscrit enfants
    accuracy: '>95% lettres isolées'
  }
};
```

### 3.2 Base de données PostgreSQL (Supabase)

#### Schéma principal
```sql
-- Utilisateurs et profils
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100),
  age INTEGER CHECK (age >= 3 AND age <= 12),
  niveau_scolaire VARCHAR(20),
  code_classe VARCHAR(20),
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contenu pédagogique
phonemes (
  id SERIAL PRIMARY KEY,
  symbole VARCHAR(10) NOT NULL UNIQUE,
  graphemes TEXT[] NOT NULL,
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 6),
  ordre_phase INTEGER NOT NULL,
  niveau_min VARCHAR(20) NOT NULL,
  difficulte INTEGER DEFAULT 1 CHECK (difficulte BETWEEN 1 AND 5),
  prerequisites INTEGER[],
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

activites (
  id SERIAL PRIMARY KEY,
  phoneme_id INTEGER REFERENCES phonemes(id),
  ecran_numero INTEGER NOT NULL CHECK (ecran_numero BETWEEN 1 AND 7),
  titre VARCHAR(200) NOT NULL,
  type_activite VARCHAR(50) NOT NULL,
  contenu JSONB NOT NULL,
  difficulte INTEGER DEFAULT 1,
  duree_estimee INTEGER,
  criteres_reussite JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(phoneme_id, ecran_numero)
);

-- Suivi des apprentissages
progression_eleves (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eleve_id UUID REFERENCES profiles(id),
  phoneme_id INTEGER REFERENCES phonemes(id),
  ecran_numero INTEGER NOT NULL,
  tentatives INTEGER DEFAULT 0,
  meilleur_score DECIMAL(5,2),
  score_actuel DECIMAL(5,2),
  temps_total INTEGER DEFAULT 0,
  maitrise BOOLEAN DEFAULT FALSE,
  derniere_tentative TIMESTAMP,
  maitrise_atteinte TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(eleve_id, phoneme_id, ecran_numero)
);

sessions_apprentissage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eleve_id UUID REFERENCES profiles(id),
  phoneme_id INTEGER REFERENCES phonemes(id),
  ecran_numero INTEGER,
  debut_session TIMESTAMP DEFAULT NOW(),
  fin_session TIMESTAMP,
  duree_totale INTEGER,
  activites_terminees INTEGER DEFAULT 0,
  score_session DECIMAL(5,2),
  donnees_session JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Interactions détaillées (pour analytics)
interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions_apprentissage(id),
  eleve_id UUID REFERENCES profiles(id),
  phoneme_id INTEGER REFERENCES phonemes(id),
  ecran_numero INTEGER,
  type_interaction VARCHAR(50) NOT NULL,
  donnees JSONB NOT NULL,
  timestamp_interaction TIMESTAMP DEFAULT NOW(),
  duree_reaction INTEGER,
  succes BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3.4 Architecture technique complète intégrant l'IA

#### Schéma d'architecture Next.js + Supabase + IA

```mermaid
graph TB
    subgraph "Frontend - Next.js 14"
        A[Interface Élève]
        B[Interface Enseignant]
        C[Canvas Écriture]
        D[Audio Components]
    end
    
    subgraph "API Layer - Next.js API Routes"
        E[/api/phonemes]
        F[/api/ai/generate]
        G[/api/ai/analyze]
        H[/api/speech/recognize]
        I[/api/speech/synthesize]
    end
    
    subgraph "Base de données - Supabase"
        J[(PostgreSQL)]
        K[Auth]
        L[Storage]
    end
    
    subgraph "IA Services - Phase MVP"
        M[Hugging Face<br/>Llama 3.2-8B]
        N[OpenAI Whisper API]
        O[Web Speech API]
        P[YOLOv8 + EasyOCR]
    end
    
    subgraph "IA Services - Phase Production"
        Q[Groq API<br/>ou VPS GPU]
        R[faster-whisper<br/>VPS Auto-hébergé]
        S[Coqui TTS<br/>VPS Auto-hébergé]
        T[YOLOv8 + TrOCR<br/>VPS GPU]
    end
    
    subgraph "Analytics - Learning Locker"
        U[VPS Contabo<br/>Learning Locker]
        V[MongoDB]
        W[xAPI Endpoint]
    end
    
    A --> E
    B --> E
    C --> G
    D --> H
    D --> I
    
    E --> J
    F --> M
    F --> Q
    G --> P
    G --> T
    H --> N
    H --> R
    I --> O
    I --> S
    
    E --> U
    G --> W
    
    style M fill:#f9f,stroke:#333,stroke-width:2px
    style Q fill:#9f9,stroke:#333,stroke-width:2px
    style N fill:#f9f,stroke:#333,stroke-width:2px
    style R fill:#9f9,stroke:#333,stroke-width:2px
```

#### Flux de données par type d'interaction

**1. Génération de contenu adaptatif**
```typescript
// Frontend → API → LLM → Validation → Base
const contentFlow = async (phonemeId: number, difficulty: number) => {
  // 1. Requête depuis composant React
  const request = await fetch('/api/ai/generate', {
    method: 'POST',
    body: JSON.stringify({ phonemeId, difficulty, studentAge: 6 })
  });
  
  // 2. API Route → LLM Service
  const llmResponse = await huggingFaceClient.generateContent(prompt);
  
  // 3. Validation et enrichissement
  const validatedContent = await validateEducationalContent(llmResponse);
  
  // 4. Sauvegarde Supabase
  await supabase.from('generated_content').insert(validatedContent);
  
  return validatedContent;
};
```

**2. Reconnaissance vocale en temps réel**
```typescript
// Frontend → API → STT → Analyse → Feedback
const speechFlow = async (audioBlob: Blob, targetWord: string) => {
  // 1. Capture audio côté client
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('target', targetWord);
  
  // 2. Envoi vers API de reconnaissance
  const response = await fetch('/api/speech/recognize', {
    method: 'POST',
    body: formData
  });
  
  // 3. Traitement Whisper (MVP) ou faster-whisper (Prod)
  const transcription = await whisperService.transcribe(audioBlob);
  
  // 4. Analyse phonétique
  const analysis = await analyzePhoneticAccuracy(transcription, targetWord);
  
  // 5. Feedback adaptatif
  return generateSpeechFeedback(analysis);
};
```

**3. Analyse d'écriture manuscrite**
```typescript
// Canvas → Image → Vision AI → Analyse → Feedback
const writingFlow = async (canvasImageData: ImageData, targetLetter: string) => {
  // 1. Conversion canvas vers image
  const imageBlob = await canvasToBlob(canvasImageData);
  
  // 2. Détection zones d'écriture (YOLOv8)
  const detectedRegions = await yoloDetector.detectWritingRegions(imageBlob);
  
  // 3. OCR sur régions détectées (EasyOCR → TrOCR en prod)
  const recognizedLetters = await ocrService.recognizeLetters(detectedRegions);
  
  // 4. Analyse qualité vs modèle idéal
  const qualityAnalysis = await analyzeWritingQuality(recognizedLetters, targetLetter);
  
  // 5. Feedback temps réel
  return generateWritingFeedback(qualityAnalysis);
};
```

#### Configuration environnement par phase

**Variables d'environnement MVP**
```bash
# LLM
HUGGINGFACE_API_KEY=hf_xxx
GROQ_API_KEY=gsk_xxx  # Fallback pour latence

# Speech
OPENAI_API_KEY=sk-xxx  # Whisper API
WEB_SPEECH_ENABLED=true

# Vision
YOLO_MODEL_PATH=/models/yolov8n.pt
EASYOCR_LANGUAGES=["fr"]

# Infrastructure
NEXT_PUBLIC_AI_MODE=mvp
```

**Variables d'environnement Production**
```bash
# LLM (Auto-hébergé ou Groq)
GROQ_API_KEY=gsk_xxx
CUSTOM_LLM_ENDPOINT=https://gpu-vps.contabo.com:8000

# Speech (Auto-hébergé)
WHISPER_ENDPOINT=https://speech.contabo.com/transcribe
COQUI_TTS_ENDPOINT=https://speech.contabo.com/synthesize

# Vision (Auto-hébergé)
VISION_API_ENDPOINT=https://vision.contabo.com
TROCR_MODEL_PATH=/models/trocr-base-handwritten

# Infrastructure
NEXT_PUBLIC_AI_MODE=production
AI_VPS_IP=xxx.xxx.xxx.xxx
```

#### Stratégie de migration MVP → Production

**Phase 1 : MVP (Semaines 1-16)**
- Hugging Face Inference API (gratuit)
- OpenAI Whisper API (coût maîtrisé pour tests)
- Web Speech API + gTTS fallback
- YOLOv8 + EasyOCR (simplicité)

**Phase 2 : Optimisation (Semaines 17-20)**
- Migration LLM vers Groq API (latence <500ms)
- Benchmark faster-whisper vs OpenAI API
- Tests Coqui TTS vs Web Speech API
- Évaluation TrOCR vs EasyOCR sur corpus enfants

**Phase 3 : Production (Semaines 21-24)**
- Déploiement VPS GPU dédiés (Contabo)
- Auto-hébergement complet des modèles IA
- Monitoring performance et coûts
- Optimisation continue des modèles

#### Coûts prévisionnels par phase

| Phase | Infrastructure IA | Coût mensuel | Latence moyenne | Performance |
|-------|------------------|--------------|-----------------|-------------|
| **MVP** | APIs externes | 50-100€/mois | 1-3s | Validation concept |
| **Transition** | Hybride | 100-200€/mois | 0.5-1s | Optimisation |
| **Production** | Auto-hébergé | 50-150€/mois | <0.5s | Performance optimale |

Cette architecture évolutive permet de **valider rapidement le concept** avec des coûts maîtrisés, puis d'**optimiser progressivement** les performances et réduire les coûts d'exploitation.

### 3.5 Architecture de sécurité
#### Row Level Security (RLS)
- **Profiles** : Utilisateurs accèdent uniquement à leurs données
- **Progression** : Élèves voient uniquement leur progression
- **Sessions** : Isolation complète par utilisateur
- **Interactions** : Traçabilité sécurisée

#### Conformité RGPD
- Consentement explicite pour mineurs
- Droit à l'effacement
- Anonymisation pour la recherche
- Chiffrement des données sensibles

## 4. Implémentation de l'IA adaptative

### 4.1 Algorithme d'adaptation multi-critères

#### Modèle de profil de performance
```typescript
interface PerformanceProfile {
  studentId: string;
  timestamp: Date;
  
  // Métriques cognitives
  cognitiveLoad: number;           // 0-1, charge cognitive estimée
  attentionLevel: number;          // 0-1, niveau d'attention détecté
  frustractionLevel: number;       // 0-1, niveau de frustration
  confidenceLevel: number;         // 0-1, confiance dans les réponses
  
  // Métriques de performance
  accuracyScore: number;           // 0-1, précision des réponses
  speedIndex: number;              // 0-1, vitesse relative de réponse
  consistencyScore: number;        // 0-1, régularité des performances
  improvementRate: number;         // Taux d'amélioration par session
  
  // Métriques phonémiques spécifiques
  phoneticDiscrimination: number;  // Capacité de discrimination auditive
  graphemeRecognition: number;     // Reconnaissance visuelle des lettres
  phonemeGraphemeMapping: number;  // Association phonème-graphème
  syllableBlending: number;        // Fusion syllabique
  
  // Métriques comportementales
  sessionDuration: number;         // Temps passé en minutes
  engagementScore: number;         // Niveau d'engagement calculé
  helpRequestFrequency: number;    // Fréquence des demandes d'aide
  errorPatterns: ErrorPattern[];   // Types d'erreurs récurrentes
}
```

#### Zone Proximale de Développement (ZPD)
```typescript
class ProgressionRecommender {
  calculateZPD(profile: StudentProfile, history: PerformanceProfile[]): ZPD {
    // Niveau actuel de maîtrise (ce que l'élève maîtrise seul)
    const currentLevel = this.calculateCurrentMasteryLevel(history);
    
    // Niveau potentiel (extrapolation des tendances d'amélioration)
    const potentialLevel = this.calculatePotentialLevel(history, profile);
    
    // Zone optimale d'apprentissage (entre niveau actuel et potentiel)
    const optimalChallengeLevel = currentLevel + (potentialLevel - currentLevel) * 0.7;
    
    return {
      currentLevel,
      potentialLevel,
      optimalChallengeLevel,
      confidenceInterval: this.calculateConfidenceInterval(history)
    };
  }
}
```

### 4.2 Génération de contenu adaptatif avec LLM

#### Configuration Hugging Face
```typescript
class HuggingFaceClient {
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

    const response = await fetch(`https://api-inference.huggingface.co/models/google/gemma-3-8b`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_KEY}`,
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
}
```

### 4.3 Détection intelligente des difficultés

#### Algorithmes de détection précoce
```typescript
class DifficultyDetector {
  detectLearningDifficulties(studentId: string): Promise<DifficultyAssessment> {
    const indicators = {
      // Indicateurs de dyslexie
      dyslexiaIndicators: this.detectDyslexiaPatterns(studentId),
      
      // Indicateurs de trouble de l'attention
      attentionIndicators: this.detectAttentionPatterns(studentId),
      
      // Indicateurs de difficultés phonologiques
      phonologicalIndicators: this.detectPhonologicalDifficulties(studentId)
    };
    
    return this.synthesizeDifficultyAssessment(indicators);
  }

  private analyzeMirrorConfusions(sessions: SessionData[]): ConfusionAnalysis {
    const mirrorPairs = [['b', 'd'], ['p', 'q'], ['m', 'w'], ['u', 'n']];
    
    const confusions = sessions.flatMap(session => 
      session.errors.filter(error => 
        mirrorPairs.some(pair => 
          (error.expected === pair[0] && error.actual === pair[1]) ||
          (error.expected === pair[1] && error.actual === pair[0])
        )
      )
    );
    
    const totalErrors = sessions.reduce((sum, session) => sum + session.errors.length, 0);
    const confusionRate = confusions.length / Math.max(totalErrors, 1);
    
    return {
      rate: confusionRate,
      frequency: confusions.length,
      severity: confusionRate > 0.3 ? 'high' : confusionRate > 0.15 ? 'medium' : 'low'
    };
  }
}
```

## 5. Intégration Learning Locker et tracking xAPI

### 5.1 Configuration Learning Locker sur VPS Contabo

#### Architecture xAPI
```yaml
# docker-compose.yml pour Learning Locker
version: '3.8'
services:
  learning_locker:
    image: learninglocker/learninglocker:latest
    ports:
      - "80:80"
      - "443:443"
    environment:
      - MONGODB_URL=mongodb://mongo:27017/learninglocker
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./ssl:/etc/ssl/certs
      - ./uploads:/app/uploads
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:4.4
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
```

### 5.2 Ontologie xAPI spécialisée

#### Verbes xAPI pour la lecture
```typescript
const READING_VERBS = {
  // Verbes standard xAPI
  experienced: 'http://adlnet.gov/expapi/verbs/experienced',
  attempted: 'http://adlnet.gov/expapi/verbs/attempted',
  completed: 'http://adlnet.gov/expapi/verbs/completed',
  passed: 'http://adlnet.gov/expapi/verbs/passed',
  failed: 'http://adlnet.gov/expapi/verbs/failed',
  
  // Verbes spécialisés lecture
  listened: 'http://app-lecture.com/verbs/listened',
  recognized: 'http://app-lecture.com/verbs/recognized',
  decoded: 'http://app-lecture.com/verbs/decoded',
  blended: 'http://app-lecture.com/verbs/blended',
  segmented: 'http://app-lecture.com/verbs/segmented',
  spelled: 'http://app-lecture.com/verbs/spelled',
  pronounced: 'http://app-lecture.com/verbs/pronounced',
  discriminated: 'http://app-lecture.com/verbs/discriminated'
};
```

#### Extensions contextuelles
```typescript
const READING_EXTENSIONS = {
  // Données phonémiques
  'http://app-lecture.com/extensions/phoneme': 'string',
  'http://app-lecture.com/extensions/grapheme': 'string',
  'http://app-lecture.com/extensions/syllable-type': 'string',
  
  // Données de performance
  'http://app-lecture.com/extensions/reaction-time-ms': 'number',
  'http://app-lecture.com/extensions/error-type': 'string',
  'http://app-lecture.com/extensions/help-used': 'boolean',
  
  // Données contextuelles
  'http://app-lecture.com/extensions/session-sequence': 'number',
  'http://app-lecture.com/extensions/difficulty-level': 'number',
  'http://app-lecture.com/extensions/adaptation-trigger': 'string',
  
  // Données cognitives
  'http://app-lecture.com/extensions/cognitive-load': 'number',
  'http://app-lecture.com/extensions/attention-level': 'number',
  'http://app-lecture.com/extensions/frustration-level': 'number'
};
```

### 5.3 Tracking par écran d'apprentissage

#### Exemple Écran 4 - Combinaisons syllabiques
```typescript
async function trackSyllableBlending(
  studentId: string,
  consonant: string,
  vowel: string,
  syllable: string,
  readingSuccess: boolean,
  reactionTime: number
): Promise<void> {
  
  const statement: XAPIStatement = {
    actor: {
      account: {
        name: studentId,
        homePage: 'https://app-lecture.com'
      }
    },
    verb: {
      id: READING_VERBS.blended,
      display: { 'fr': 'a fusionné' }
    },
    object: {
      id: `https://app-lecture.com/syllable/${syllable}/blending`,
      definition: {
        name: { 'fr': `Fusion syllabique ${consonant} + ${vowel} = ${syllable}` },
        type: 'http://app-lecture.com/activities/syllable-activity'
      }
    },
    result: {
      score: { scaled: readingSuccess ? 1.0 : 0.0 },
      success: readingSuccess,
      extensions: {
        [READING_EXTENSIONS['http://app-lecture.com/extensions/reaction-time-ms']]: reactionTime,
        [READING_EXTENSIONS['http://app-lecture.com/extensions/syllable-formed']]: syllable
      }
    },
    timestamp: new Date().toISOString()
  };

  await xapiClient.sendStatement(statement);
}
```

### 5.4 Analytics pour la recherche

#### Anonymisation pour la recherche
```typescript
class DataAnonymization {
  async anonymizeForResearch(
    statements: XAPIStatement[],
    researchPurpose: string
  ): Promise<AnonymizedDataset> {
    
    const anonymizedStatements = statements.map(statement => ({
      ...statement,
      actor: {
        account: {
          name: this.generateStableAnonymousId(statement.actor.account.name),
          homePage: 'https://research.anonymous'
        }
      }
    }));

    return {
      data: anonymizedStatements,
      metadata: {
        researchPurpose,
        anonymizationDate: new Date().toISOString(),
        originalRecordCount: statements.length,
        ethicsApproval: await this.getEthicsApprovalRef(researchPurpose)
      }
    };
  }
}
```

## 6. Écriture manuscrite tactile

### 6.1 Canvas HTML5 optimisé

#### Composant d'écriture avec guides adaptatifs
```typescript
const WritingCanvas: React.FC<WritingCanvasProps> = ({
  targetWord,
  phoneme,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [allStrokes, setAllStrokes] = useState<Stroke[]>([]);

  // Configuration haute résolution pour tablettes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#2563eb';
    
    canvas.style.touchAction = 'none';
  }, []);

  // Gestion événements tactiles unifiés
  const handlePointerStart = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    setIsDrawing(true);
    
    const point = getPointerPosition(event);
    setCurrentStroke([point]);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!isDrawing) return;
    
    event.preventDefault();
    const point = getPointerPosition(event);
    
    setCurrentStroke(prev => {
      const newStroke = [...prev, point];
      drawSmoothLine(ctx, prev[prev.length - 1], point);
      return newStroke;
    });
  }, [isDrawing]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerStart}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      style={{ touchAction: 'none' }}
    />
  );
};
```

### 6.2 Analyse qualité d'écriture

#### Algorithme multi-critères
```typescript
class WritingAnalyzer {
  analyzeWriting(strokes: Stroke[], targetLetter: string): WritingAnalysis {
    const strokeAccuracy = this.analyzeStrokeAccuracy(strokes);
    const directionCorrectness = this.analyzeDirection(strokes);
    const speedConsistency = this.analyzeSpeed(strokes);
    const letterFormation = this.analyzeFormation(strokes, targetLetter);
    
    const overallScore = this.calculateOverallScore({
      strokeAccuracy,
      directionCorrectness,
      speedConsistency,
      letterFormation
    });

    return {
      overallScore,
      strokeAccuracy,
      directionCorrectness,
      speedConsistency,
      letterFormation,
      feedback: this.generateFeedback(overallScore),
      improvements: this.generateImprovements(overallScore)
    };
  }

  private generateFeedback(score: number): WritingFeedback[] {
    if (score >= 90) {
      return [{ type: 'success', message: '⭐ Magnifique ! Tu écris très bien !' }];
    } else if (score >= 70) {
      return [{ type: 'good', message: '👍 Très bien ! Continue comme ça !' }];
    } else {
      return [{ type: 'encouragement', message: '🌟 Continue à t\'entraîner !' }];
    }
  }
}
```

## 7. UX/UI et accessibilité

### 7.1 Design System adapté à l'âge

#### Configurations par niveau scolaire
```typescript
const DESIGN_THEMES = {
  maternelle: {
    colorPalette: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D'
    },
    typography: {
      fontFamily: '"Comic Sans MS", "OpenDyslexic", cursive',
      fontSize: { large: '2.5rem', medium: '2rem' }
    },
    animations: {
      duration: 'slow',
      bounceOnSuccess: true
    }
  },
  
  elementaire: {
    colorPalette: {
      primary: '#667EEA',
      secondary: '#764BA2'
    },
    typography: {
      fontFamily: '"Poppins", "OpenDyslexic", sans-serif',
      fontSize: { large: '2rem', medium: '1.6rem' }
    }
  }
};
```

### 7.2 Accessibilité renforcée

#### Conformité WCAG 2.1 AA
```typescript
interface AccessibilityFeatures {
  contrastRatio: {
    minimum: 4.5,
    preferred: 7.0  // WCAG AAA pour enfants
  };
  
  fontOptions: {
    standard: 'Poppins',
    dyslexic: 'OpenDyslexic',
    large: 'ScaleFactor: 1.5x'
  };
  
  interactionZones: {
    minimumSize: '44px',  // Cibles tactiles minimum
    spacing: '8px'
  };
}
```

#### Support des troubles DYS
```typescript
interface DysSupport {
  dyslexia: {
    fontFamily: 'OpenDyslexic',
    lineSpacing: 1.8,
    syllableHighlighting: true,
    readingGuide: true
  };
  
  adhd: {
    reducedDistractors: true,
    focusMode: true,
    breakReminders: true
  };
}
```

### 7.3 Gamification et engagement

#### Système de récompenses
```typescript
interface GamificationSystem {
  badges: {
    phonemeExplorer: 'Découverte de 5 phonèmes',
    speedReader: 'Lecture rapide maintenue',
    perfectionist: '10 activités parfaites consécutives'
  };
  
  visualProgression: {
    progressBar: 'Barre de progression par phonème',
    levelSystem: 'Niveaux 1-10 avec seuils clairs',
    avatar: 'Avatar évoluant avec les progrès'
  };
}
```

## 8. Production et validation du contenu

### 8.1 Stratégie de création de contenu

#### Volume estimé par phonème
- **Total par phonème** : ~164 items de contenu
- **Total MVP (5 phonèmes)** : ~820 items
- **Total complet (35 phonèmes)** : ~5,740 items

#### Pipeline de production automatisée
```typescript
interface ContentProductionPipeline {
  generateWordList(phoneme: string, difficulty: number): Promise<Word[]>;
  validateContent(content: GeneratedContent): ValidationResult;
  generateAudio(text: string, voice: VoiceProfile): Promise<AudioAsset>;
  qualityAssurance(content: ContentPackage): Promise<QAResult>;
}
```

#### Validation multi-niveaux
1. **Validation automatique** : Vérification algorithimique
2. **Validation pédagogique** : Comité d'experts (enseignants, orthophonistes)
3. **Validation utilisateur** : Tests avec enfants cibles
4. **Validation technique** : Qualité audio, performance

### 8.2 Reconnaissance vocale : Approche graduelle

#### Configuration adaptée enfants
```typescript
class SpeechRecognitionService {
  private config = {
    language: 'fr-FR',
    continuous: false,
    interimResults: false,
    maxAlternatives: 3,
    confidenceThreshold: 0.7  // Tolérant pour les enfants
  };

  async recognizeSpeech(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        if (confidence >= this.config.confidenceThreshold) {
          resolve(result);
        } else {
          // Retry ou validation manuelle
          this.handleLowConfidence(result, confidence);
        }
      };
      
      this.recognition.start();
    });
  }
}
```

## 9. Gestion de projet et ressources

### 9.1 Équipe projet recommandée

#### Composition optimale
```typescript
interface ProjectTeam {
  core: {
    productOwner: 'Expert pédagogique + vision produit',
    scrumMaster: 'Gestion agile + coordination',
    leadDeveloper: 'Fullstack Next.js/TypeScript senior',
    uiuxDesigner: 'Spécialisé enfants + accessibilité'
  };
  
  specialized: {
    contentManager: 'Création/validation contenu pédagogique',
    pedagogicalAdvisor: 'Enseignant(e) CP/CE1 actif',
    speechTherapist: 'Orthophoniste (validation méthode)',
    dataScientist: 'Analytics + algorithmes IA (mi-temps)'
  };
}
```

### 9.2 Planification et budget

#### Phases de développement
```typescript
interface ProjectPhases {
  phase1_mvp: {
    duration: '4 mois',
    scope: [
      'Architecture de base + Auth',
      '5 premiers phonèmes (a, i, o, m, l)',
      'Écrans 1-7 pour chaque phonème',
      'Interface élève complète',
      'Intégration Supabase'
    ],
    budget: '120k€'
  };
  
  phase2_complete: {
    duration: '6 mois',
    scope: [
      '30 phonèmes restants',
      'Algorithme adaptation IA avancé',
      'Interface enseignant complète',
      'Intégration Learning Locker',
      'Reconnaissance vocale premium'
    ],
    budget: '200k€'
  };
  
  phase3_advanced: {
    duration: '4 mois',
    scope: [
      'Analytics prédictifs',
      'Optimisations performance',
      'Tests utilisateurs + ajustements',
      'Déploiement production'
    ],
    budget: '100k€'
  }
}
```

#### Budget détaillé Phase 1 (MVP)
```typescript
interface BudgetBreakdown {
  development: {
    leadDeveloper: '4 mois × 8k€ = 32k€',
    juniorDeveloper: '4 mois × 5k€ = 20k€',
    uiuxDesigner: '2 mois × 6k€ = 12k€'
  };
  
  content: {
    contentManager: '4 mois × 4k€ = 16k€',
    voiceRecording: '10k€',
    illustrations: '8k€'
  };
  
  consulting: {
    pedagogicalAdvisor: '20 jours × 400€ = 8k€',
    speechTherapist: '10 jours × 500€ = 5k€'
  };
  
  infrastructure: {
    vercel: '4 mois × 20€ = 80€',
    supabase: '4 mois × 25€ = 100€',
    contabo: '4 mois × 15€ = 60€'
  };
  
  contingency: '15k€',
  total: '120k€'
}
```

### 9.3 Performance et compatibilité

#### Cibles de performance
```typescript
interface PerformanceTargets {
  // Core Web Vitals
  LCP: '<2.5s',
  FID: '<100ms',
  CLS: '<0.1',
  
  // Métriques spécifiques éducation
  activityLoadTime: '<1s',
  audioPlayback: '<200ms',
  voiceProcessing: '<3s',
  
  // Compatibilité
  browsers: {
    chrome: '>=90',
    firefox: '>=88',
    safari: '>=14',
    edge: '>=90'
  };
  
  devices: {
    tablets: 'iPad (5e gen+), Android 8.0+',
    smartphones: 'iPhone 8+, Android 8.0+',
    desktop: 'Windows 10+, macOS 10.14+'
  };
}
```

#### Mode hors-ligne (PWA)
```typescript
interface OfflineStrategy {
  cacheStrategy: {
    appShell: 'cache-first',
    phonemeActivities: 'stale-while-revalidate',
    audioAssets: 'cache-first',
    userProgress: 'network-first'
  };
  
  offlineCapabilities: {
    availablePhonemes: 'Last 3 studied + current',
    activityCompletion: 'Full tracking stored locally',
    progressVisualization: 'Read-only from cache'
  };
}
```

## 10. Métriques de succès et validation

### 10.1 Critères de réussite Phase 1

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

### 10.2 Métriques d'apprentissage

#### Données collectées
- Progression des compétences (pré/post tests)
- Temps de maîtrise des notions  
- Rétention des acquis
- Engagement (temps passé, régularité)
- Patterns d'erreurs par phonème
- Efficacité des adaptations IA

#### Métriques techniques
- Performance (Core Web Vitals)
- Disponibilité (99.9% uptime)
- Adoption (utilisateurs actifs)
- Satisfaction (NPS > 8/10)

### 10.3 Indicateurs de recherche

#### Valeur scientifique
- Corpus unique de données d'apprentissage
- Validation de l'efficacité de la méthode syllabique digitale
- Patterns d'acquisition des correspondances phonème-graphème
- Efficacité de l'adaptation IA sur les apprentissages

#### Publications potentielles
- Revues en sciences de l'éducation
- Conférences en IA appliquée à l'éducation
- Journaux de psychologie cognitive
- Actes de colloques sur le numérique éducatif

---

*Ce cahier des charges constitue la base contractuelle pour le développement de l'application d'initiation à la lecture et à l'écriture. Il sera mis à jour selon l'évolution du projet et les retours des parties prenantes.*