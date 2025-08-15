#!/bin/bash

# 🔐 Script de configuration des secrets GitHub Actions
# Ce script vous guide pour configurer les secrets nécessaires

echo "🔐 Configuration des secrets GitHub Actions pour ENAA Littératie"
echo "=================================================================="
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Secrets nécessaires pour le déploiement automatisé:${NC}"
echo ""

echo -e "${YELLOW}1. Vercel (déploiement)${NC}"
echo "   - VERCEL_TOKEN: Token d'API Vercel"
echo "   - VERCEL_ORG_ID: ID de votre organisation Vercel" 
echo "   - VERCEL_PROJECT_ID: ID du projet Vercel"
echo ""

echo -e "${YELLOW}2. Supabase (base de données - optionnel)${NC}"
echo "   - NEXT_PUBLIC_SUPABASE_URL: URL de votre projet Supabase"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY: Clé publique Supabase"
echo ""

echo -e "${YELLOW}3. Snyk (sécurité - optionnel)${NC}"
echo "   - SNYK_TOKEN: Token pour l'audit de sécurité"
echo ""

echo -e "${BLUE}🚀 Instructions détaillées:${NC}"
echo ""

echo -e "${GREEN}ÉTAPE 1: Configurer Vercel${NC}"
echo "1. Aller sur https://vercel.com/dashboard"
echo "2. Créer un nouveau projet et lier votre dépôt GitHub"
echo "3. Dans Settings > General, noter PROJECT_ID"
echo "4. Dans Account Settings > Tokens, créer un nouveau token"
echo "5. Dans Team Settings, noter TEAM_ID (ORG_ID)"
echo ""

echo -e "${GREEN}ÉTAPE 2: Ajouter les secrets dans GitHub${NC}"
echo "1. Aller sur: https://github.com/fremar64/enaa-litteratie/settings/secrets/actions"
echo "2. Cliquer 'New repository secret'"
echo "3. Ajouter chaque secret avec sa valeur"
echo ""

echo -e "${GREEN}ÉTAPE 3: Configurer Supabase (optionnel)${NC}"
echo "1. Créer un projet sur https://supabase.com"
echo "2. Dans Settings > API, copier URL et anon key"
echo "3. Ajouter ces valeurs comme secrets GitHub"
echo ""

echo -e "${BLUE}💡 Commandes pour tester:${NC}"
echo ""
echo "# Tester le build local"
echo "cd app-lecture && npm run build"
echo ""
echo "# Déclencher le déploiement manuellement"
echo "git push origin main"
echo ""
echo "# Voir les logs GitHub Actions"
echo "https://github.com/fremar64/enaa-litteratie/actions"
echo ""

echo -e "${GREEN}✅ Une fois configuré, votre application sera disponible sur:${NC}"
echo "🌐 https://enaa-litteratie.vercel.app"
echo ""

echo -e "${YELLOW}📝 Notes importantes:${NC}"
echo "- Les secrets sont chiffrés et sécurisés"
echo "- Le déploiement se fait automatiquement sur chaque push main"
echo "- Les PR créent des previews automatiques"
echo "- L'audit de sécurité s'exécute chaque lundi"
echo ""

echo -e "${RED}🔒 Sécurité:${NC}"
echo "- Ne jamais exposer les secrets dans le code"
echo "- Utiliser des tokens avec permissions minimales"
echo "- Renouveler régulièrement les tokens"
echo ""

echo "=================================================================="
echo -e "${GREEN}🎉 Configuration terminée ! Push votre code pour déclencher le déploiement.${NC}"
