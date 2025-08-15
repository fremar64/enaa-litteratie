# Configuration Supabase - Guide de Déploiement

## 🎯 Objectif

Ce guide vous accompagne dans la configuration complète de Supabase pour activer la persistance des données et l'authentification dans l'application de lecture.

## 🚀 Configuration Rapide

### 1. Créer un Projet Supabase

1. **Aller sur [supabase.com](https://supabase.com)** et créer un compte
2. **Cliquer sur "New Project"**
3. **Remplir les informations :**
   - **Nom** : `enaa-litteratie-app`
   - **Mot de passe DB** : Générer un mot de passe fort
   - **Région** : Europe (Frankfurt)
   - **Plan** : Free (gratuit)

### 2. Récupérer les Clés API

Une fois le projet créé :
1. **Aller dans Settings > API**
2. **Copier :**
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon/public key** : `eyJhbGc...`

### 3. Configurer les Variables d'Environnement

Créer le fichier `.env.local` dans le dossier `app-lecture/` :

```env
# Coller vos vraies valeurs ici
NEXT_PUBLIC_SUPABASE_URL=https://votre-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...votre-clé-anon
```

### 4. Initialiser la Base de Données

Dans le dashboard Supabase :
1. **Aller dans SQL Editor**
2. **Nouvelle requête** et coller le contenu de `supabase/migrations/20240101000000_initial_schema.sql`
3. **Exécuter** la requête
4. **Nouvelle requête** et coller le contenu de `supabase/migrations/20240101000001_seed_data.sql`
5. **Exécuter** la requête

## ✅ Vérification

1. **Redémarrer le serveur** : `npm run dev`
2. **Aller sur** `/test-supabase` dans l'application
3. **Vérifier** que les indicateurs sont verts
4. **Tester** la création d'un compte et la sauvegarde de progression

## 🔐 Configuration Avancée

### Variables d'Environnement pour Production

Pour Vercel, ajouter dans les Settings > Environment Variables :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Sécurité Row Level Security (RLS)

Les politiques RLS sont déjà configurées pour :
- ✅ Isolation des données par utilisateur
- ✅ Accès public aux phonèmes/activités
- ✅ Protection des progressions individuelles

### Authentification

Par défaut, seule l'authentification par email est activée. Pour ajouter d'autres providers :
1. **Authentication > Providers** dans Supabase
2. **Configurer** Google, GitHub, etc.

## 📊 Structure de Données

### Tables Principales

- **`profiles`** : Profils utilisateurs (nom, âge, classe, etc.)
- **`phonemes`** : Les 5 phonèmes MVP avec leurs métadonnées
- **`activites`** : 7 écrans d'activités par phonème
- **`progression_eleves`** : Suivi individuel des apprentissages
- **`sessions_apprentissage`** : Historique des sessions
- **`interactions`** : Analytics détaillées

### Données de Démonstration

Les 5 phonèmes MVP sont pré-chargés :
- `/a/` - Phase 1, Ordre 1
- `/i/` - Phase 1, Ordre 2  
- `/o/` - Phase 1, Ordre 3
- `/m/` - Phase 2, Ordre 1
- `/l/` - Phase 2, Ordre 2

## 🔧 Déploiement en Production

### Avant le Déploiement

1. **Tester** localement avec la configuration Supabase
2. **Vérifier** que l'authentification fonctionne
3. **Tester** la sauvegarde de progression

### Après le Déploiement

1. **Ajouter** les variables d'environnement sur Vercel
2. **Tester** la version de production
3. **Vérifier** les logs dans le dashboard Supabase

## 🆘 Dépannage

### Problèmes Courants

**"Supabase non configuré"**
- Vérifier que `.env.local` existe et contient les bonnes valeurs
- Redémarrer le serveur de développement

**Erreurs d'authentification**
- Vérifier que l'email confirmations est désactivé (Settings > Auth)
- S'assurer que RLS est bien configuré

**Données non sauvegardées**
- Vérifier la console du navigateur pour les erreurs
- Tester avec la page `/test-supabase`

### Mode Fallback

L'application fonctionne même sans Supabase grâce au système de fallback :
- ✅ Phonèmes chargés depuis `demo-data.ts`
- ✅ Progression en mémoire (non persistante)
- ✅ Mode démonstration complet

## 📈 Prochaines Étapes

Une fois Supabase configuré :
1. **Analytics** - Visualisation des données d'apprentissage
2. **IA Adaptative** - Personnalisation du contenu
3. **Multi-classes** - Gestion de plusieurs classes
4. **Rapports** - Suivi pour les enseignants

---

**Support** : Pour toute question, consulter la [documentation Supabase](https://supabase.com/docs) ou créer une issue.
