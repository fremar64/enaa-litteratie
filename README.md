# 📚 ENAA Littératie - Application d'Apprentissage Adaptatif

Une application d'apprentissage de la lecture et de l'écriture utilisant la méthode syllabique, conçue pour les enfants de 3 à 11 ans.

## 🎯 Aperçu du Projet

Cette application offre un parcours d'apprentissage personnalisé de la lecture en suivant la progression pédagogique de la méthode syllabique. Chaque phonème est enseigné à travers 7 écrans d'activités progressives.

### 🏗️ Architecture

- **Frontend :** Next.js 14, TypeScript, Tailwind CSS
- **Backend :** Supabase (PostgreSQL + Auth)
- **État :** Zustand avec persistance
- **Requêtes :** React Query
- **UI :** Radix UI + Components personnalisés

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Git

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/fremar64/enaa-litteratie.git
cd enaa-litteratie/app-lecture

# Installer les dépendances
npm install

# Mode démonstration (sans configuration)
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Mode Démonstration

L'application fonctionne immédiatement en mode démonstration avec des données factices, permettant de tester toutes les fonctionnalités sans configuration préalable.

## 📁 Structure du Projet

```
enaa-litteratie/
├── app-lecture/              # Application principale Next.js
│   ├── src/
│   │   ├── app/             # Pages et layout (App Router)
│   │   ├── components/      # Composants React réutilisables
│   │   ├── hooks/           # Hooks personnalisés
│   │   ├── lib/             # Utilitaires et configuration
│   │   ├── stores/          # Gestion d'état (Zustand)
│   │   └── types/           # Types TypeScript
│   ├── supabase/            # Migrations et configuration BDD
│   └── README.md            # Documentation technique
└── Cahier des charges/      # Spécifications et documentation
```

## 🎮 Fonctionnalités

### ✅ Implémentées
- **Interface enfant** adaptée (3-11 ans)
- **5 phonèmes MVP** (/a/, /i/, /o/, /m/, /l/)
- **2 écrans d'apprentissage** complets par phonème
- **Système de progression** avec sauvegarde
- **Mode démonstration** sans configuration
- **Navigation intuitive** et responsive

### 🚧 En Développement
- **5 écrans d'apprentissage** supplémentaires
- **Intégration IA** pour adaptation de contenu
- **Analytics détaillées** des interactions
- **Interface enseignant** pour suivi

### 🔮 Planifiées
- **Phonèmes avancés** (consonnes complexes)
- **Génération vocale** professionnelle
- **Gamification** avancée
- **Rapports de progression** détaillés

## 🛠️ Développement

### Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Production
npm run start        # Serveur production
npm run lint         # Vérification code
npm run type-check   # Vérification TypeScript
```

### Configuration Supabase (Optionnelle)

1. Créer un projet sur [Supabase](https://supabase.com)
2. Copier `.env.example` vers `.env.local`
3. Remplir les variables d'environnement Supabase
4. Lancer les migrations : `npm run db:migrate`

## 📚 Documentation

- **[Guide Technique](app-lecture/README.md)** - Setup et développement
- **[Démonstration](app-lecture/DEMO.md)** - Guide de test
- **[Résolution Problèmes](app-lecture/RESOLUTION-PROBLEMES.md)** - Troubleshooting
- **[Cahier des Charges](Cahier%20des%20charges/)** - Spécifications complètes

## 🧪 Tests

```bash
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
npm run test:coverage # Couverture de code
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📊 État du Projet

**Version :** 0.1.0 (MVP Phase 1)  
**Statut :** 🟡 En développement actif  
**Couverture :** 65% des fonctionnalités MVP  
**Tests :** Mode démonstration opérationnel  

## 🎯 Roadmap

### Phase 1 (Actuelle) - MVP
- [x] Architecture technique
- [x] 5 phonèmes de base
- [x] Interface utilisateur
- [ ] 7 écrans par phonème (2/7 terminés)

### Phase 2 - Enrichissement
- [ ] 10 phonèmes supplémentaires
- [ ] Intégration IA adaptative
- [ ] Interface enseignant
- [ ] Analytics avancées

### Phase 3 - Production
- [ ] Déploiement
- [ ] Tests utilisateurs
- [ ] Optimisations performance
- [ ] Support multi-langues

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE).

## 👥 Équipe

- **Développement Principal :** GitHub Copilot
- **Direction Projet :** ENAA Ceredis
- **Méthode Pédagogique :** Experts en littératie

---

**🎉 Application fonctionnelle et déployée !**

🌐 **Démo en ligne :** https://enaa-litteratie.ceredis.net

Pour toute question ou suggestion, ouvrir une [issue](https://github.com/fremar64/enaa-litteratie/issues).
