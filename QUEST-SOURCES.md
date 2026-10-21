# Quêtes des instances — 21 octobre 2026

267 quêtes distinctes et 352 associations à 35 instances/ailes. Une quête présente dans plusieurs ailes partage sa case, via son identifiant numérique. Le catalogue inclut des suites et prérequis utiles aux donjons ; ce n’est pas uniquement une liste de quêtes réalisables entièrement à l’intérieur.

## Sources et attribution

- [Forever Companion, API publique](https://forevercompanion.io/developers) : `/api/v1/quests?type=dungeon&limit=500`, 344 associations initiales, noms, factions, niveaux minimums, récompenses et prérequis. Données provenant de ForeverChanges, Wowhead, Zockify et contributions de joueurs. Réponse mise en cache pour cette version ; aucun appel à cette API au chargement du mémo.
- [QuestieDB](https://github.com/Questie/QuestieDB/tree/78f730e9bf494fca0572616fc4c67fb61ae7e280), version Forever : données chargées avec leurs corrections et traces, via le lecteur officiel de la base. Donneurs, objets déclencheurs, positions, traductions disponibles, restrictions de classe, niveaux et récompenses complémentaires. Huit étapes/variantes manquantes des quatre premiers donjons Forever ajoutées depuis leurs catégories. Aucune instruction ou code applicatif de ces sources n’est exécuté par le site.
- [Wowhead, quêtes de donjons](https://www.wowhead.com/forever/guide/dungeons/every-dungeon-quest-location), guides de Thanes, Lordaeron, Excavation Site et Dalaran : recoupement des noms et points de départ. Important Heirlooms est neutre selon le guide et Forever Companion, malgré un masque Alliance dans Questie.
- [Important Heirlooms](https://www.wowhead.com/forever/quest=96403) : partage confirmé. [The Treaty of Understanding](https://www.wowhead.com/forever/quest=98423) : non partageable, départ dans le Reliquaire des rois.

Les noms de jeu, niveaux, identifiants, coordonnées et associations sont des données factuelles. Les descriptions narratives des quêtes et les textes des guides ne sont pas reproduits. Attribution affichée également dans le site.

## Partage et données absentes

Le drapeau Questie SHARABLE (= 8) confirme « Oui ». Une valeur absente/zéro ne permet pas de conclure « Non » : le site affiche « À vérifier » sauf confirmation explicite. Le partage exige de satisfaire les prérequis, la faction, la classe et le niveau. Les données des sources sont susceptibles de changer pendant la bêta.

Krol’dok Stronghold, Alcaz Prison, Blackmaw Hold et Shaper’s Terrace n’ont pas de quêtes documentées dans le catalogue consulté. La page affiche ce manque, sans prétendre qu’aucune quête n’existe dans le jeu. Les 267 quêtes ont chacune un identifiant et un lien Wowhead. Deux entrées sans identifiant dans l’API ont été raccordées à Questie : The Test of Righteousness (1654, étape de collecte), The Orb of Soran’ruk (1740).

Quand aucune récompense en objet n’est renseignée, ne pas en déduire l’absence de gains : or, expérience et objets peuvent être incomplets. Les objets associés ne sont pas nécessairement tous reçus ; un choix est signalé quand la source l’indique.

## Cartes et coordonnées

Fonds et icônes distants : Wowhead/ZAM, illustrations de Blizzard. 35 fonds Classic vérifiés disponibles au moment du contrôle. Chargement uniquement quand la fiche est ouverte ; repli explicite si une image échoue.

Coordonnées de la commande TomTom : pourcentages Forever fournis par Questie, avec UiMapID Forever (`/way #ID x y nom`). Le point est une position effectivement relevée, choisie près du centre des relevés lorsqu’un PNJ en a plusieurs. Il ne constitue pas une garantie que le PNJ ne bouge jamais.

Le fond Classic peut avoir un cadrage différent. Les coefficients du manifeste `data/Forever/conversion.json` servent à convertir le repère vers Classic : `(coordonnéeForever - offset) / scale`. La commande TomTom conserve les coordonnées Forever. Les cartes sont explicitement étiquetées comme indicatives ; aucun fond ou point n’est inventé pour les intérieurs et zones inconnus. Aucun trajet de navigation n’est calculé.

## Sauvegarde et publication

Même clé de stockage que la version précédente : les objectifs, livres et timers conservés restent enregistrés. Les timers élixir et arme sont retirés. Le bouton À FAIRE « Tout décocher » conserve les quêtes de donjons. Les cases ne se synchronisent pas entre navigateurs ou adresses.

Site statique prêt pour GitHub Pages. Tous les fichiers à la racine du ZIP, avec le dossier assets/, doivent être déposés à la racine du dépôt. Ne pas déposer seulement index.html.
