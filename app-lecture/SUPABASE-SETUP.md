# Configuration Supabase pour l'Application de Lecture

## 1. Création du Projet Supabase

### Étapes sur supabase.com :

1. **Aller sur [supabase.com](https://supabase.com)**
2. **Se connecter ou créer un compte**
3. **Cliquer sur "New Project"**
4. **Configurer le projet :**
   - **Name** : `enaa-litteratie-app`
   - **Database Password** : Générer un mot de passe fort (le noter précieusement)
   - **Region** : Europe (Frankfurt) - le plus proche de la France
   - **Pricing Plan** : Free tier (suffisant pour commencer)

5. **Attendre la création du projet** (quelques minutes)

## 2. Configuration des Variables d'Environnement

Une fois le projet créé, aller dans **Settings > API** et copier :

- **Project URL** (commence par `https://xxxxx.supabase.co`)
- **Project API Key** (anon, public - commence par `eyJ...`)

### Fichier `.env.local` à créer :

```env
# Configuration Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Configuration optionnelle pour le développement
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Migration de la Base de Données

### Option A : Via l'interface Supabase (Recommandée)

1. **Aller dans SQL Editor** dans le dashboard Supabase
2. **Exécuter le script de migration** : Copier-coller le contenu de `supabase/migrations/20240101000000_initial_schema.sql`
3. **Exécuter le script de données** : Copier-coller le contenu de `supabase/migrations/20240101000001_seed_data.sql`

### Option B : Via Supabase CLI (Avancée)

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Initialiser le projet local
supabase init

# Lier au projet distant
supabase link --project-ref votre-project-id

# Appliquer les migrations
supabase db push
```

## 4. Configuration de l'Authentification

### Dans le Dashboard Supabase :

1. **Aller dans Authentication > Settings**
2. **Configuration recommandée :**
   - **Enable email confirmations** : Désactivé pour simplifier (optionnel)
   - **Enable phone confirmations** : Désactivé
   - **Enable custom SMTP** : Optionnel pour l'envoi d'emails

### Providers d'authentification :

Pour commencer, gardez seulement **Email** activé.

## 5. Configuration RLS (Row Level Security)

Les politiques RLS sont déjà configurées dans le script de migration pour :
- Sécuriser l'accès aux données utilisateur
- Permettre l'accès public aux phonèmes et activités
- Protéger les données de progression individuelle

## 6. Test de la Configuration

Une fois configuré :

1. **Redémarrer le serveur de développement**
2. **Vérifier dans la console** qu'il n'y a plus de warning "Supabase non configuré"
3. **Tester la création d'un profil utilisateur**

## 7. Variables d'Environnement pour Vercel

Dans le dashboard Vercel, ajouter les variables d'environnement :

1. **Aller dans Settings > Environment Variables**
2. **Ajouter :**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Prochaines Étapes

Une fois la configuration terminée, nous pourrons :
- Implémenter l'authentification utilisateur
- Tester la sauvegarde de progression
- Ajouter les fonctionnalités de suivi d'apprentissage
- Configurer les analytics

---

**Note importante** : Ne jamais commiter le fichier `.env.local` dans git ! Il est déjà dans le `.gitignore`.
