# MEMO FOREVER SANZOU

Mémo Alliance WoW Forever, livré le 21 octobre 2026. Reprise du projet fourni dans wow-forever-guide(1).zip.

## Publier sur GitHub Pages

1. Extraire le ZIP.
2. Déposer son contenu à la racine du dépôt GitHub : index.html, style.css, data.js, app.js, instances.js, quests-data.js, instances.css, le dossier assets/ et .nojekyll doivent être au même niveau.
3. Dans le dépôt : Settings → Pages → Deploy from a branch.
4. Choisir la branche contenant les fichiers (par exemple main), dossier /(root), puis Save.
5. Attendre la publication ; GitHub affiche le lien du site dans Pages.

Aucune compilation, dépendance, clé API ou serveur applicatif. Les chemins relatifs fonctionnent aussi sous https://utilisateur.github.io/nom-du-depot/.

Documentation : https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Utilisation

- Les quatre rubriques et leurs guides démarrent fermés.
- Buffs : 4 timers indépendants en liste, durée modifiable, démarrage, pause, reprise, réinitialisation et alerte visuelle. Le son est optionnel, avec volume réglable de 0 à 100 %, mémorisé. Les tests sonores mettent à jour une seule alerte. Les notifications système nécessitent l'autorisation du navigateur.
- Chaque timer est manuel : la page ne lit pas les buffs du jeu. La durée réelle de l'infobulle fait foi.
- Les échéances sont enregistrées avec une date absolue. Fermer la page ne met pas un timer en pause. À la réouverture, un timer arrivé à échéance signale sa fin une fois.
- Les alertes ne peuvent pas se déclencher lorsque la page est fermée. La mise en veille, les onglets suspendus ou les restrictions audio peuvent les retarder. Après rechargement, une interaction peut être nécessaire pour réactiver le son.
- Zones : 44 entrées, dont les territoires Horde masqués par défaut et deux zones sans plage de niveau. Les capitales ne sont pas des zones de progression.
- Instances : 35 entrées dépliables, 267 quêtes distinctes (352 associations aux ailes), filtres par nom, niveau de donjon et faction. Cases communes aux ailes, enregistrées dans le navigateur.
- Chaque quête affiche faction, niveau minimum, zone de départ et partage ; le détail contient les objets de récompense, prérequis, donneurs, coordonnées disponibles, carte et commande TomTom copiable. Les données absentes restent explicitement signalées. Quatre instances nouvelles n’ont pas de quêtes documentées dans ce catalogue.
- À FAIRE : sac, cuisine, campement et livres. Quatre cases principales et douze cases de livres. Les livres disposent de coordonnées, des récompenses par palier et d'un lien vers le catalogue complet. La sélection locale de 12 livres n'est pas une route complète jusqu'à 25.
- La sauvegarde appartient au navigateur et à l'adresse du site. Elle ne se synchronise pas entre appareils. Elle ne migre pas automatiquement depuis une ancienne URL ou un fichier local.

## Données et liens

Les plages sont des repères de progression, pas des niveaux minimums d'accès. Les valeurs Classic et les plages Forever publiées peuvent différer durant la bêta. Les nouveautés non encore testables sont signalées comme Forever ; Shen'dralas ne reçoit aucun niveau inventé.

Toutes les instances utilisent la même présentation et le même libellé « Voir sur Wowhead ». Les quêtes et objets renvoient à la base Forever. Les liens généraux des nouvelles instances sans guide dédié conservent leur section du guide général. Voir QUEST-SOURCES.md pour les données et limites.

Sources principales, consultées le 21 octobre 2026 :
- https://www.icy-veins.com/wow-forever/dungeons-overview/
- https://senseos.gg/guides/wow-forever/dungeons-and-raids/
- https://www.icy-veins.com/wow-forever/zones-and-maps
- https://thewowdb.com/wow-forever/zones/
- https://www.wow-professions.com/forever/camping-guide
- https://www.warcrafttavern.com/forever/guides/experience/
- https://wowhandbook.com/news/cozy-sleeping-bag-in-wow-forever/
- https://conquestcapped.com/guides/wow-forever/wow-forever-library-books/
- https://wowforever.wclbox.com/en/shuji

## Modifier le mémo

- data.js : listes, durées par défaut et sources.
- app.js : timers, filtres, sauvegarde et contenu des guides.
- style.css : présentation responsive.
- index.html : bannière et rubriques.
- instances.js et instances.css : journal de quêtes et cartes.
- quests-data.js : catalogue embarqué, sans appel API à l’utilisation.

Le site n'embarque aucune police ni bibliothèque tierce. Les cartes et icônes de quêtes sont chargées à la demande depuis Wowhead ; les listes restent utilisables hors connexion. La bannière est une illustration générée, embarquée dans assets/azeroth-alliance.png. Voir ASSETS.md pour sa provenance. Les liens externes s'ouvrent séparément.

Voir VERIFICATION.md pour les contrôles effectués et leurs limites.
