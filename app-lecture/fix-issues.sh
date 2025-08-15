#!/bin/bash

# 🔧 Script de résolution des problèmes - App Lecture
# Ce script résout automatiquement les problèmes courants

echo "🔧 Résolution des problèmes de l'App Lecture..."

# Aller dans le répertoire du projet
cd /home/ceredis/enaa-litteratie/app-lecture

echo "📦 Nettoyage des caches et dépendances..."
# Supprimer les caches et node_modules corrompus
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json

echo "📥 Réinstallation des dépendances..."
# Réinstaller proprement
npm install

echo "🛠️ Vérification de la configuration..."
# Vérifier que les fichiers de configuration sont corrects
if [ ! -f ".env.local" ]; then
    echo "⚠️  Fichier .env.local manquant, création..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-role-key

# Autres variables
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEBUG=true
EOF
fi

echo "🔍 Test de compilation..."
# Tester la compilation
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Compilation réussie !"
    echo "🚀 L'application est prête à être lancée avec: npm run dev"
    echo "💡 Mode démonstration disponible sans configuration Supabase"
    echo "🌐 URL locale: http://localhost:3000"
else
    echo "❌ Erreur de compilation détectée"
    echo "🔍 Vérifiez les logs ci-dessus pour plus de détails"
    exit 1
fi

echo "🎉 Résolution terminée avec succès !"
