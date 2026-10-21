# Vérifications — 21 octobre 2026

Résultat : contrôles locaux réussis.

- Analyse syntaxique de app.js et data.js avec Node : réussie.
- Données : 44 zones triées, 35 entrées de donjons triées, 20 identifiants de timers uniques, 12 identifiants de livres uniques ; plages numériques cohérentes.
- Aucun details ouvert initialement, fichiers CSS et JavaScript présents.
- Chargement réel dans le navigateur intégré via HTTP local, CSS et scripts chargés ; aucune erreur console observée.
- Quatre sections fermées au chargement et après rechargement.
- Timer du sac réglé à trois secondes : expiration et alerte visuelle constatées.
- Timer Nourriture : démarrage, pause, sauvegarde de la pause, reprise et maintien de son état actif après rechargement constatés.
- Refus d'une durée nulle : alerte et absence de démarrage constatées.
- Case du sac : persistante après rechargement.
- Case du livre de Rumi : compteur actualisé à 1 / 12.
- Recherche « penombre » : Bois de la Pénombre retrouvé sans accent.
- Filtre instances au niveau 14 : Ragefeu et Hall of Thanes uniquement.
- Vue mobile 390 × 844 : pas de débordement horizontal global, guides et cases lisibles ; tableaux dans des conteneurs défilables.
- Capture de la page finale effectuée. Données de test remises à zéro par les commandes de l'interface ; durée du sac restaurée à 120 minutes.

Limites : la réception d'une notification système et l'audibilité du son sur le poste utilisateur n'ont pas été confirmées. Le bouton Tester le son permet de les vérifier. Les liens de sources ont été consultés, mais chaque page Wowhead n'a pas fait l'objet d'un contrôle HTTP individuel. Les mécaniques de bêta n'ont pas été testées dans le jeu. Le déploiement distant GitHub Pages n'a pas été effectué : le livrable est un site statique prêt à déposer dans un dépôt.
