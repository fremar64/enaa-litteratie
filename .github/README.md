# 🚀 CI/CD avec GitHub Actions

Ce projet utilise GitHub Actions pour automatiser les tests, builds et déploiements.

## 📋 Workflows Configurés

### 1. 🚀 **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
**Déclenché sur :** Push sur main/develop, Pull Requests

**Étapes :**
- ✅ Installation des dépendances
- 🔍 Vérification lint + TypeScript
- 🧪 Tests unitaires
- 📦 Build de production
- 🚀 Déploiement sur Vercel (main uniquement)
- 🏷️ Création de release automatique

### 2. 🔍 **Preview Deployment** (`.github/workflows/preview-deploy.yml`)
**Déclenché sur :** Pull Requests vers main

**Étapes :**
- 📦 Build de l'application
- 🚀 Déploiement preview sur Vercel
- 🧪 Tests de base sur la preview
- 💬 Commentaire automatique avec lien preview

### 3. 🧪 **E2E Tests** (`.github/workflows/e2e-tests.yml`)
**Déclenché sur :** Push main, programmé quotidiennement

**Étapes :**
- 🚀 Démarrage de l'application
- 🎮 Tests end-to-end avec Playwright
- 📊 Rapports de tests détaillés

### 4. 🔒 **Security Audit** (`.github/workflows/security-audit.yml`)
**Déclenché sur :** Programmé hebdomadaire, changements package.json

**Étapes :**
- 🔍 Audit npm des vulnérabilités
- 🔒 Scan Snyk (si configuré)
- 📊 Analyse de la taille du bundle
- 📝 Rapport de sécurité

## ⚙️ Configuration Requise

### Secrets GitHub (Repository Settings > Secrets)

#### 🚀 **Vercel (Obligatoire pour déploiement)**
```bash
VERCEL_TOKEN=          # Token d'API Vercel
VERCEL_ORG_ID=         # ID organisation/équipe
VERCEL_PROJECT_ID=     # ID du projet Vercel
```

#### 🗄️ **Supabase (Optionnel)**
```bash
NEXT_PUBLIC_SUPABASE_URL=      # URL projet Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Clé publique Supabase
```

#### 🔒 **Snyk (Optionnel - sécurité)**
```bash
SNYK_TOKEN=            # Token Snyk pour audit sécurité
```

### 📋 Variables d'Environnement

Les workflows utilisent automatiquement des fallbacks pour fonctionner sans configuration :
- `NEXT_PUBLIC_SUPABASE_URL`: Défaut vers placeholder pour mode démo
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Défaut vers placeholder pour mode démo

## 🚀 Setup Rapide

### 1. Configuration Vercel

```bash
# 1. Créer un compte Vercel et connecter GitHub
# 2. Importer le projet depuis GitHub
# 3. Configurer le répertoire racine: ./app-lecture
# 4. Récupérer les IDs dans les settings Vercel
```

### 2. Ajouter les Secrets GitHub

```bash
# Aller sur GitHub > Settings > Secrets and variables > Actions
# Ajouter les secrets Vercel (minimum requis)
```

### 3. Déclencher le Premier Déploiement

```bash
git add .github/
git commit -m "🚀 Add CI/CD workflows"
git push origin main
```

## 📊 Surveillance et Monitoring

### 🔍 **Où Voir les Résultats**

- **Actions GitHub :** https://github.com/fremar64/enaa-litteratie/actions
- **Déploiements Vercel :** https://vercel.com/dashboard
- **Application Live :** https://enaa-litteratie.vercel.app

### 📈 **Métriques Surveillées**

- ✅ Succès/échec des builds
- 🕐 Temps de build (~2-3 minutes)
- 📦 Taille du bundle
- 🔒 Vulnérabilités de sécurité
- 🧪 Couverture de tests

## 🔄 Workflow de Développement

### 🌟 **Feature Development**
```bash
git checkout -b feature/nouvelle-fonctionnalite
# Développement...
git push origin feature/nouvelle-fonctionnalite
# Créer PR → Tests automatiques + Preview
```

### 🚀 **Release**
```bash
git checkout main
git merge feature/nouvelle-fonctionnalite
git push origin main
# → Déploiement automatique + Release
```

### 🐛 **Hotfix**
```bash
git checkout -b hotfix/correction-urgente
# Correction...
git push origin hotfix/correction-urgente
# Créer PR vers main → Déploiement rapide
```

## 🛠️ Maintenance

### 📦 **Mise à Jour des Dépendances**
- Les workflows détectent automatiquement les dépendances obsolètes
- Rapport hebdomadaire des mises à jour disponibles
- Audit automatique des vulnérabilités

### 🔒 **Sécurité**
- Scan automatique chaque lundi
- Notifications en cas de vulnérabilité critique
- Mise à jour recommandée des tokens tous les 6 mois

### 📊 **Performance**
- Monitoring de la taille du bundle
- Temps de build surveillé
- Alertes si dégradation des performances

## 🆘 Dépannage

### ❌ **Build qui Échoue**
1. Vérifier les logs dans Actions GitHub
2. Tester localement : `npm run build`
3. Vérifier les types TypeScript : `npm run type-check`

### 🚀 **Déploiement qui Échoue**
1. Vérifier les secrets Vercel dans GitHub
2. Tester la configuration Vercel localement
3. Consulter les logs Vercel

### 🔒 **Erreurs de Sécurité**
1. Consulter le rapport d'audit
2. Mettre à jour les dépendances : `npm update`
3. Corriger les vulnérabilités : `npm audit fix`

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js CI/CD Best Practices](https://nextjs.org/docs/deployment)
- [Playwright Testing](https://playwright.dev/)

---

**🎉 Avec cette configuration, votre application est automatiquement testée, buildée et déployée à chaque modification !**
