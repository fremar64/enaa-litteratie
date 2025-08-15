-- Création des tables pour l'application d'apprentissage de la lecture

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des profils utilisateurs (étend auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100),
  age INTEGER CHECK (age >= 3 AND age <= 12),
  niveau_scolaire VARCHAR(10) CHECK (niveau_scolaire IN ('PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2')),
  code_classe VARCHAR(20),
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des phonèmes
CREATE TABLE public.phonemes (
  id SERIAL PRIMARY KEY,
  symbole VARCHAR(10) NOT NULL UNIQUE, -- Ex: /a/, /i/, /m/
  graphemes TEXT[] NOT NULL, -- Ex: ['a', 'A', 'à']
  phase INTEGER NOT NULL CHECK (phase >= 1 AND phase <= 6),
  ordre_phase INTEGER NOT NULL,
  niveau_min VARCHAR(10) NOT NULL,
  difficulte INTEGER DEFAULT 1 CHECK (difficulte >= 1 AND difficulte <= 5),
  prerequisites INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(phase, ordre_phase)
);

-- Table des activités par écran
CREATE TABLE public.activites (
  id SERIAL PRIMARY KEY,
  phoneme_id INTEGER REFERENCES phonemes(id) ON DELETE CASCADE NOT NULL,
  ecran_numero INTEGER NOT NULL CHECK (ecran_numero >= 1 AND ecran_numero <= 7),
  titre VARCHAR(200) NOT NULL,
  type_activite VARCHAR(50) NOT NULL,
  contenu JSONB NOT NULL,
  difficulte INTEGER DEFAULT 1 CHECK (difficulte >= 1 AND difficulte <= 5),
  duree_estimee INTEGER, -- en secondes
  criteres_reussite JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(phoneme_id, ecran_numero)
);

-- Table de progression des élèves
CREATE TABLE public.progression_eleves (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eleve_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  phoneme_id INTEGER REFERENCES phonemes(id) ON DELETE CASCADE NOT NULL,
  ecran_numero INTEGER NOT NULL CHECK (ecran_numero >= 1 AND ecran_numero <= 7),
  tentatives INTEGER DEFAULT 0,
  meilleur_score DECIMAL(3,2) CHECK (meilleur_score >= 0 AND meilleur_score <= 1),
  score_actuel DECIMAL(3,2) CHECK (score_actuel >= 0 AND score_actuel <= 1),
  temps_total INTEGER DEFAULT 0, -- en secondes
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
  eleve_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  phoneme_id INTEGER REFERENCES phonemes(id) ON DELETE CASCADE NOT NULL,
  debut_session TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fin_session TIMESTAMP WITH TIME ZONE,
  ecrans_completes INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  score_global DECIMAL(3,2),
  duree_totale INTEGER, -- en secondes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des interactions détaillées (pour analytics)
CREATE TABLE public.interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eleve_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES sessions_apprentissage(id) ON DELETE CASCADE,
  phoneme_id INTEGER REFERENCES phonemes(id) ON DELETE CASCADE NOT NULL,
  ecran_numero INTEGER NOT NULL,
  type_interaction VARCHAR(50) NOT NULL,
  donnees_interaction JSONB NOT NULL,
  timestamp_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
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

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

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

-- Fonctions de mise à jour automatique des timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour les timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progression_updated_at BEFORE UPDATE ON progression_eleves
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
