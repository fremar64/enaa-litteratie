#!/bin/bash

# Script de setup automatisé pour l'application d'apprentissage de la lecture
# Ce script configure l'environnement local et déploie l'application

set -euo pipefail

# Variables de couleur pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage avec couleur
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    fi
    
    local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 18 ]; then
        error "Node.js version 18+ requis. Version actuelle: $(node --version)"
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        error "npm n'est pas installé."
    fi
    
    # Vérifier git
    if ! command -v git &> /dev/null; then
        error "git n'est pas installé."
    fi
    
    log "✅ Tous les prérequis sont satisfaits"
}

# Installation des dépendances
install_dependencies() {
    log "Installation des dépendances npm..."
    
    if [ ! -f "package.json" ]; then
        error "Fichier package.json non trouvé. Êtes-vous dans le bon répertoire ?"
    fi
    
    npm install
    
    log "✅ Dépendances installées"
}

# Configuration de l'environnement
setup_environment() {
    log "Configuration de l'environnement..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            warn "Fichier .env.local créé à partir de .env.example"
            warn "Veuillez éditer .env.local avec vos vraies clés API"
        else
            warn "Aucun fichier .env.example trouvé"
        fi
    else
        info "Fichier .env.local existe déjà"
    fi
}

# Configuration Supabase
setup_supabase() {
    log "Configuration Supabase..."
    
    # Vérifier si Supabase CLI est installé
    if ! command -v supabase &> /dev/null; then
        warn "Supabase CLI n'est pas installé. Installation..."
        npm install -g @supabase/cli
    fi
    
    # Initialiser le projet si pas déjà fait
    if [ ! -f "supabase/config.toml" ]; then
        warn "Initialisation du projet Supabase..."
        supabase init
    fi
    
    info "Pour configurer Supabase :"
    info "1. Créez un projet sur https://supabase.com"
    info "2. Copiez l'URL et la clé dans .env.local"
    info "3. Exécutez: supabase db push --linked"
}

# Construction et test de l'application
build_and_test() {
    log "Construction de l'application..."
    
    # Vérification TypeScript
    npm run type-check || warn "Erreurs TypeScript détectées"
    
    # Construction Next.js
    npm run build
    
    log "✅ Application construite avec succès"
}

# Démarrage du serveur de développement
start_dev_server() {
    log "Démarrage du serveur de développement..."
    info "L'application sera accessible sur http://localhost:3000"
    info "Appuyez sur Ctrl+C pour arrêter"
    
    npm run dev
}

# Affichage de l'aide
show_help() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --help, -h          Afficher cette aide"
    echo "  --check-only        Vérifier seulement les prérequis"
    echo "  --no-dev            Ne pas démarrer le serveur de dev"
    echo "  --supabase-only     Configurer seulement Supabase"
    echo ""
    echo "Exemple:"
    echo "  $0                  Setup complet + démarrage dev"
    echo "  $0 --check-only     Vérification seulement"
    echo "  $0 --no-dev         Setup sans démarrage"
}

# Fonction principale
main() {
    local check_only=false
    local no_dev=false
    local supabase_only=false
    
    # Parsing des arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h)
                show_help
                exit 0
                ;;
            --check-only)
                check_only=true
                shift
                ;;
            --no-dev)
                no_dev=true
                shift
                ;;
            --supabase-only)
                supabase_only=true
                shift
                ;;
            *)
                error "Option inconnue: $1"
                ;;
        esac
    done
    
    echo "🚀 Setup Application d'Apprentissage de la Lecture"
    echo "=================================================="
    
    check_prerequisites
    
    if [ "$check_only" = true ]; then
        log "Vérification terminée ✅"
        exit 0
    fi
    
    if [ "$supabase_only" = true ]; then
        setup_supabase
        exit 0
    fi
    
    install_dependencies
    setup_environment
    setup_supabase
    build_and_test
    
    if [ "$no_dev" = false ]; then
        start_dev_server
    else
        log "🎉 Setup terminé ! Exécutez 'npm run dev' pour démarrer"
    fi
}

# Gestion des signaux
trap 'echo ""; warn "Setup interrompu"; exit 130' INT TERM

# Point d'entrée
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
