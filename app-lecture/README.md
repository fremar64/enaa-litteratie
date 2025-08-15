# App Lecture - Application d'apprentissage adaptatif de la lecture

> Application web d'initiation à la lecture et à l'écriture en français utilisant la méthode syllabique, destinée aux élèves de 3 à 11 ans.

## 🎯 Vue d'ensemble

Cette application implémente une **méthode syllabique pure** avec une progression rigoureuse des correspondances phonème-graphème. Elle propose 7 écrans d'apprentissage par phonème, avec un système d'IA adaptatif pour personnaliser l'expérience d'apprentissage.

### Fonctionnalités principales

- ✅ **Méthode syllabique systématique** (35 phonèmes)
- ✅ **7 écrans d'apprentissage** par phonème
- ✅ **IA adaptative** avec génération de contenu
- ✅ **Suivi de progression** détaillé
- ✅ **Interface optimisée** pour enfants (3-11 ans)
- ✅ **Authentification simplifiée** par code classe
- ✅ **Analytics d'apprentissage** complets

## 📋 Prérequis

- **Node.js** 18+ 
- **npm** 10+
- **Git**
- **Compte Supabase** (gratuit) - optionnel pour le mode démo

## 🚀 Installation rapide

```bash
# Cloner le repository
git clone [URL_REPO]
cd app-lecture

# Installation des dépendances
npm install

# Démarrage en mode démo (sans Supabase)
npm run dev
```

L'application fonctionnera immédiatement en **mode démonstration** avec des données factices.

## 🔧 Configuration Supabase (Optionnelle)

Pour activer la persistance des données et l'authentification :

### 1. Création du projet Supabase

Suivre le guide détaillé : **[SUPABASE-GUIDE.md](./SUPABASE-GUIDE.md)**

### 2. Configuration rapide

```bash
# Copier le template
cp .env.local.example .env.local

# Éditer avec vos clés Supabase
nano .env.local
```

Variables à configurer :
```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...votre-cle-anon
```

### 3. Test de configuration

Aller sur `/test-supabase` dans l'application pour vérifier la configuration.

## ⚙️ Modes de fonctionnement

### Mode Démonstration (par défaut)
- ✅ Aucune configuration requise
- ✅ Données factices intégrées
- ✅ Toutes les fonctionnalités accessibles
- ❌ Pas de sauvegarde de progression
- ❌ Pas d'authentification

### Mode Production (avec Supabase)
- ✅ Authentification utilisateur
- ✅ Sauvegarde de progression
- ✅ Suivi analytics détaillé
- ✅ Gestion multi-utilisateurs
- ✅ Historique des sessions

## 🏗️ Architecture

### Stack technique

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State**: Zustand
- **Styling**: Tailwind CSS + Radix UI
- **IA**: Hugging Face Inference API
- **Hosting**: Vercel
- **Analytics**: Learning Locker (xAPI)

### Structure du projet

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Pages d'authentification
│   ├── eleve/             # Interface élève
│   │   └── phoneme/[id]/ecran/[num]/  # Écrans d'apprentissage
│   └── api/               # API Routes
├── components/            # Composants React
│   ├── ui/               # Composants UI génériques
│   ├── phoneme/          # Composants spécifiques phonèmes
│   └── shared/           # Composants partagés
├── hooks/                # React hooks custom
├── lib/                  # Utilitaires et configuration
├── stores/               # Stores Zustand
└── types/                # Types TypeScript
```

## 📚 Progression syllabique

### Phase 1 - Voyelles simples (MS/GS)
1. **a** [a] - Premier phonème, le plus simple
2. **i** [i] - Voyelle fermée antérieure
3. **o** [o] - Voyelle moyenne postérieure

### Phase 2 - Consonnes continues (GS/CP)
4. **m** [m] - Première consonne, bilabiale
5. **l** [l] - Consonne liquide latérale

*Note: Seuls ces 5 phonèmes sont implémentés dans le MVP actuel*

### 7 écrans d'apprentissage par phonème

1. **Identification auditive** - "J'entends le son"
2. **Localisation** - "Je trouve sa place"
3. **Reconnaissance graphème** - "Je reconnais la lettre"
4. **Combinaison** - "Je combine"
5. **Lecture de mots** - "Je lis des mots"
6. **Écriture** - "J'écris des mots"
7. **Lecture de phrases** - "Je lis des phrases"

## 🎮 Utilisation

### Connexion élève

1. Ouvrir l'application
2. Saisir :
   - **Prénom** de l'élève
   - **Âge** (3-12 ans)
   - **Code classe** (fourni par l'enseignant)
3. Le compte est créé automatiquement

### Interface élève

- **Sélection phonème** : Visualisation des phonèmes avec progression
- **Navigation écrans** : 7 activités par phonème
- **Suivi progression** : Scores et badges de réussite
- **Adaptation IA** : Contenu personnalisé selon les performances

## 🔧 Développement

### Commandes disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run type-check       # Vérification TypeScript
npm run lint             # Vérification ESLint
npm run lint:fix         # Correction automatique

# Tests
npm run test             # Tests unitaires
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Couverture de code
npm run test:e2e         # Tests end-to-end

# Base de données
npm run db:types         # Génération types Supabase
npm run db:reset         # Reset de la DB locale
npm run db:migrate       # Application migrations

# Build
npm run build            # Build production
npm run start            # Serveur production
```

### Ajout d'un nouveau phonème

1. **Base de données** : Ajouter le phonème dans `supabase/migrations/`
2. **Contenu** : Créer les 7 activités associées
3. **Tests** : Ajouter les mots d'exemple dans les composants
4. **Validation** : Tester chaque écran

### Ajout d'un nouvel écran

1. **Composant** : Créer dans `src/components/phoneme/`
2. **Route** : Ajouter dans le router d'écrans
3. **Types** : Mettre à jour les interfaces
4. **Tests** : Ajouter les tests unitaires

## 📊 Analytics et suivi

### Données collectées

- **Progression par phonème** : Scores, temps passé, tentatives
- **Patterns d'erreurs** : Types d'erreurs récurrentes
- **Engagement** : Temps de session, abandons
- **Performance** : Courbes d'apprentissage individuelles

### Tableaux de bord

- **Élève** : Progression personnelle, badges
- **Enseignant** : Vue classe, alertes difficultés
- **Parent** : Suivi enfant, recommandations

## 🔐 Sécurité et confidentialité

- **RLS Supabase** : Isolation données par utilisateur
- **Authentification sécurisée** : Codes classe chiffrés
- **RGPD compliant** : Consentement, droit à l'oubli
- **Données minimales** : Collecte strictement nécessaire

## 🚀 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployment
vercel

# Variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Docker

```bash
# Build image
docker build -t app-lecture .

# Run container
docker run -p 3000:3000 app-lecture
```

## 📝 Contribution

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer** une Pull Request

### Guidelines

- **Code style** : Prettier + ESLint
- **Tests** : Coverage > 80%
- **Documentation** : Commentaires JSDoc
- **Types** : TypeScript strict

## 🐛 Dépannage

### Erreurs courantes

**Erreur Supabase :**
```bash
# Vérifier la connexion
supabase status

# Relancer les migrations
supabase db push --reset
```

**Erreur TypeScript :**
```bash
# Régénérer les types
npm run db:types

# Vérification complète
npm run type-check
```

**Erreur de build :**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- **Issues GitHub** : Signaler bugs et demandes de fonctionnalités
- **Documentation** : Wiki du projet
- **Email** : [contact@app-lecture.fr]

## 📄 Licence

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Équipe pédagogique** : Conception de la progression syllabique
- **Recherche ENAA** : Validation scientifique de la méthode
- **Communauté open source** : Outils et bibliothèques utilisés

---

> **Note** : Cette application est développée dans un but éducatif et de recherche. Tous les retours et contributions sont les bienvenus pour améliorer l'apprentissage de la lecture chez les enfants.
