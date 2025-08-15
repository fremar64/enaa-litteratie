#!/bin/bash

# Script de test de configuration Supabase
# Usage: ./test-supabase-config.sh

echo "🔧 Test de Configuration Supabase"
echo "================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction d'affichage avec couleurs
success() { echo -e "${GREEN}✅ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# Test 1: Vérification des fichiers
echo "1. Vérification des fichiers..."
if [ -f ".env.local" ]; then
    success ".env.local trouvé"
else
    warning ".env.local non trouvé - Mode démonstration actif"
fi

if [ -f ".env.local.example" ]; then
    success ".env.local.example disponible"
else
    error ".env.local.example manquant"
fi

# Test 2: Vérification des variables d'environnement
echo ""
echo "2. Vérification des variables d'environnement..."

if [ -f ".env.local" ]; then
    source .env.local
    
    if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then
        if [[ $NEXT_PUBLIC_SUPABASE_URL == *"supabase.co"* ]]; then
            success "NEXT_PUBLIC_SUPABASE_URL configurée"
        else
            warning "NEXT_PUBLIC_SUPABASE_URL semble incorrecte"
        fi
    else
        warning "NEXT_PUBLIC_SUPABASE_URL non définie"
    fi
    
    if [ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
        if [[ $NEXT_PUBLIC_SUPABASE_ANON_KEY == eyJ* ]]; then
            success "NEXT_PUBLIC_SUPABASE_ANON_KEY configurée"
        else
            warning "NEXT_PUBLIC_SUPABASE_ANON_KEY semble incorrecte"
        fi
    else
        warning "NEXT_PUBLIC_SUPABASE_ANON_KEY non définie"
    fi
else
    warning "Variables d'environnement non configurées - Mode démo"
fi

# Test 3: Vérification des dépendances Supabase
echo ""
echo "3. Vérification des dépendances..."

if npm list @supabase/supabase-js @supabase/ssr &>/dev/null; then
    success "Packages Supabase installés"
else
    error "Packages Supabase manquants"
    echo "   Installer avec: npm install @supabase/supabase-js @supabase/ssr"
fi

# Test 4: Test de compilation
echo ""
echo "4. Test de compilation..."

if npm run build &>/dev/null; then
    success "Compilation réussie"
else
    error "Erreur de compilation"
    echo "   Détails: npm run build"
fi

# Test 5: Vérification des migrations
echo ""
echo "5. Vérification des migrations..."

if [ -f "supabase/migrations/20240101000000_initial_schema.sql" ]; then
    success "Migration de schéma trouvée"
else
    error "Migration de schéma manquante"
fi

if [ -f "supabase/migrations/20240101000001_seed_data.sql" ]; then
    success "Migration de données trouvée"
else
    error "Migration de données manquante"
fi

# Test 6: Vérification de la structure
echo ""
echo "6. Vérification de la structure..."

required_files=(
    "src/lib/supabase/client.ts"
    "src/components/providers/AuthProvider.tsx"
    "src/hooks/useStudentData.ts"
    "src/types/database.ts"
    "src/app/test-supabase/page.tsx"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        success "$file présent"
    else
        error "$file manquant"
    fi
done

# Résumé et recommandations
echo ""
echo "📋 RÉSUMÉ ET RECOMMANDATIONS"
echo "============================"

if [ -f ".env.local" ] && [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo ""
    success "Configuration Supabase détectée !"
    echo "✅ Redémarrer le serveur : npm run dev"
    echo "✅ Tester sur : http://localhost:3000/test-supabase"
    echo "✅ Vérifier l'authentification et la sauvegarde"
else
    echo ""
    warning "Mode démonstration actif"
    echo "📖 Pour activer Supabase :"
    echo "   1. Lire le guide : SUPABASE-GUIDE.md"
    echo "   2. Créer un projet sur supabase.com"
    echo "   3. Copier .env.local.example vers .env.local"
    echo "   4. Configurer les variables d'environnement"
    echo "   5. Appliquer les migrations SQL"
    echo "   6. Redémarrer le serveur"
fi

echo ""
echo "🔗 LIENS UTILES"
echo "==============="
echo "📚 Guide complet : SUPABASE-GUIDE.md"
echo "🌐 Supabase : https://supabase.com"
echo "🧪 Page de test : /test-supabase"
echo "📊 Dashboard : https://app.supabase.com"

echo ""
echo "Test terminé !"
