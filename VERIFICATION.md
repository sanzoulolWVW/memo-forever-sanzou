# Vérifications — version 4, 21 octobre 2026

- Syntaxe JavaScript contrôlée : app.js, data.js, instances.js, quests-data.js.
- Contrôle des données : 35 instances raccordées, 267 identifiants de quête uniques, 352 associations ; niveaux minimums et coordonnées numériques ; URLs de quêtes Forever.
- Quatre timers conservés : Sleeping Bag, Nourriture, Campement, Rappel personnel.
- Toutes les rubriques fermées au chargement et après rechargement.
- Hall of Thanes : dépliage de la liste puis d’Important Heirlooms ; deux récompenses, icônes et carte effectivement chargées.
- Copie TomTom : message de succès observé pour /way #1455 32.18 44.5 Thom Filch.
- Case cochée persistante après rechargement, puis décochée pour terminer les essais.
- Filtre Horde sur Thanes : deux quêtes neutres, aucune quête Alliance.
- Même quête cochée dans deux ailes du Monastère : état mis à jour dans les deux listes, puis remis à zéro.
- Niveau 14 : Ragefeu et Thanes uniquement.
- Krol’dok : message explicite de données de quêtes absentes.
- Vue mobile 390 × 844 : pas de débordement horizontal global ; carte, fiche et copie accessibles. Vue bureau 1280 pixels contrôlée.
- Aucun message d’erreur console observé pendant ces interactions.
- Disponibilité HTTP des 35 fonds de cartes contrôlée, sans télécharger les images.

Limites : les quêtes et commandes ne sont pas testées dans le jeu. Certains partages, donneurs, coordonnées et récompenses ne sont pas documentés et sont signalés. La nouvelle version n’est pas déclarée publiée : elle est fournie pour l’envoi manuel GitHub depuis le navigateur de l’utilisateur.
