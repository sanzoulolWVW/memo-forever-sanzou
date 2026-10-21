/* Repères communautaires au 21 octobre 2026. Les niveaux sont des plages de progression, pas des conditions d'entrée. */
const SOURCES = {
 zones:'https://www.icy-veins.com/wow-forever/zones-and-maps',
 dungeons:'https://www.icy-veins.com/wow-forever/dungeons-overview/',
 newDungeons:'https://senseos.gg/guides/wow-forever/dungeons-and-raids/',
 camp:'https://www.wow-professions.com/forever/camping-guide',
 bag:'https://wowhandbook.com/news/cozy-sleeping-bag-in-wow-forever/',
 books:'https://conquestcapped.com/guides/wow-forever/wow-forever-library-books/',
 library:'https://wowforever.wclbox.com/en/shuji',
 xp:'https://www.warcrafttavern.com/forever/guides/experience/'
};
// nom français, niveau bas/haut, nom anglais, zone Wowhead, note
const ZONES = [
 ['Dun Morogh',1,10,'Dun Morogh',1,'Alliance'],['Forêt d’Elwynn',1,10,'Elwynn Forest',12,'Alliance'],['Teldrassil',1,10,'Teldrassil',141,'Alliance'],['Zephras Isle',1,12,'Zephras Isle',0,'Forever · départ Skyborne'],
 ['Durotar',1,10,'Durotar',14,'Horde · hors parcours Alliance'],['Mulgore',1,10,'Mulgore',215,'Horde · hors parcours Alliance'],['Clairières de Tirisfal',1,10,'Tirisfal Glades',85,'Horde · hors parcours Alliance'],
 ['Marche de l’Ouest',10,20,'Westfall',40,'Alliance'],['Loch Modan',10,20,'Loch Modan',38,'Alliance'],['Sombrivage',10,20,'Darkshore',148,'Alliance'],['Forêt des Pins argentés',10,20,'Silverpine Forest',130,'Horde · accès donjons / livres'],['Les Tarides',10,25,'The Barrens',17,'Horde · quelques objectifs neutres'],
 ['Les Carmines',15,25,'Redridge Mountains',44,'Alliance'],['Serres-Rocheuses',15,27,'Stonetalon Mountains',406,'Contesté'],['Bois de la Pénombre',18,30,'Duskwood',10,'Alliance'],['Orneval',18,30,'Ashenvale',331,'Contesté'],['Les Paluns',20,30,'Wetlands',11,'Alliance'],['Contreforts de Hautebrande',20,30,'Hillsbrad Foothills',267,'Contesté'],['Mille pointes',25,35,'Thousand Needles',400,'Contesté'],
 ['Montagnes d’Alterac',30,40,'Alterac Mountains',36,'Contesté'],['Hautes-terres d’Arathi',30,40,'Arathi Highlands',45,'Contesté'],['Désolace',30,40,'Desolace',405,'Contesté'],['Vallée de Strangleronce',30,45,'Stranglethorn Vale',33,'Contesté'],['Terres ingrates',35,45,'Badlands',3,'Contesté'],['Marais des Chagrins',35,45,'Swamp of Sorrows',8,'Contesté'],['Marécage d’Âprefange',35,45,'Dustwallow Marsh',15,'Contesté'],['Riverglades',35,45,'Riverglades',0,'Forever · plage indicative'],
 ['Féralas',40,50,'Feralas',357,'Contesté'],['Tanaris',40,50,'Tanaris',440,'Contesté'],['Les Hinterlands',40,50,'The Hinterlands',47,'Contesté'],['Azshara',45,55,'Azshara',16,'Contesté'],['Gorge des Vents brûlants',43,50,'Searing Gorge',51,'Contesté'],['Terres foudroyées',47,55,'Blasted Lands',4,'Contesté'],['Gangrebois',48,55,'Felwood',361,'Contesté'],['Cratère d’Un’Goro',48,55,'Un Goro Crater',490,'Contesté'],['Steppes ardentes',50,59,'Burning Steppes',46,'Contesté'],['Maleterres de l’Ouest',51,58,'Western Plaguelands',28,'Contesté'],['Maleterres de l’Est',54,60,'Eastern Plaguelands',139,'Contesté'],['Défilé de Deuillevent',55,60,'Deadwind Pass',41,'Exploration · peu de quêtes'],['Berceau-de-l’Hiver',55,60,'Winterspring',618,'Contesté'],['Silithus',55,60,'Silithus',1377,'Contesté'],['Mont Hyjal',60,60,'Mount Hyjal',0,'Forever · niveau maximum'],['Reflet-de-Lune',null,null,'Moonglade',493,'Sanctuaire · quêtes de druide'],['Shen’dralas',null,null,'Shen dralas',0,'Forever · niveaux non confirmés']
].sort((a,b)=>(a[1]??99)-(b[1]??99)||a[0].localeCompare(b[0],'fr'));
const DUNGEONS = [
 ['Gouffre de Ragefeu',13,18,'Ragefire Chasm',2437,'Orgrimmar · capitale Horde'],['Hall of Thanes',13,18,'Hall of Thanes',0,'Sous Forgefer · Forever'],['Ruins of Lordaeron',15,20,'Ruins of Lordaeron',0,'Lordaeron, au-dessus de Fossoyeuse · Forever'],['Cavernes des lamentations',17,24,'Wailing Caverns',718,'Les Tarides · oasis des Eaux stagnantes'],['Les Mortemines',17,26,'The Deadmines',1581,'Marche de l’Ouest · Ruisselune'],['Donjon d’Ombrecroc',20,30,'Shadowfang Keep',209,'Pins argentés · au-dessus de Bois-du-Bûcher'],['Profondeurs de Brassenoire',24,32,'Blackfathom Deeps',719,'Orneval · grève de Zoram'],['La Prison',24,32,'The Stockade',717,'Hurlevent · quartier des Mages'],['Excavation Site: Wetlands',26,31,'Excavation Site Wetlands',0,'Paluns · site de fouilles · Forever'],['City of Dalaran',28,33,'City of Dalaran',0,'Montagnes d’Alterac · Dalaran · Forever'],['Gnomeregan',29,38,'Gnomeregan',721,'Dun Morogh · ouest'],['Kraal de Tranchebauge',29,38,'Razorfen Kraul',491,'Sud des Tarides'],['Monastère écarlate · Cimetière',30,38,'Scarlet Monastery Graveyard',796,'Tirisfal · nord-est'],['Monastère écarlate · Bibliothèque',33,41,'Scarlet Monastery Library',796,'Tirisfal · nord-est'],['The Drowned City',35,40,'The Drowned City',0,'Strangleronce · Forever'],['Monastère écarlate · Armurerie',36,44,'Scarlet Monastery Armory',796,'Tirisfal · nord-est'],['Souilles de Tranchebauge',37,46,'Razorfen Downs',722,'Sud des Tarides'],['Monastère écarlate · Cathédrale',38,46,'Scarlet Monastery Cathedral',796,'Tirisfal · nord-est'],['Krol’dok Stronghold',40,45,'Krol dok Stronghold',0,'Riverglades · Forever'],['Uldaman',41,51,'Uldaman',1337,'Terres ingrates · nord'],['Zul’Farrak',44,54,'Zul Farrak',1176,'Tanaris · nord-ouest'],['Maraudon',46,55,'Maraudon',2100,'Désolace · vallée des Lances'],['Alcaz Prison',48,53,'Alcaz Prison',0,'Île d’Alcaz · Âprefange · Forever'],['Temple englouti',50,60,'Temple of Atal Hakkar',1477,'Marais des Chagrins · bassin des Larmes'],['Profondeurs de Rochenoire',52,60,'Blackrock Depths',1584,'Mont Rochenoire · descendre les chaînes'],['Hache-tripes · Est',54,60,'Dire Maul East',2557,'Féralas · Eldre’Thalas'],['Pic de Rochenoire · Bas',55,60,'Lower Blackrock Spire',1583,'Mont Rochenoire · accès supérieur'],['Blackmaw Hold',55,60,'Blackmaw Hold',0,'Azshara · Forever'],['Hache-tripes · Ouest',56,60,'Dire Maul West',2557,'Féralas · Eldre’Thalas'],['Hache-tripes · Nord',56,60,'Dire Maul North',2557,'Féralas · Eldre’Thalas'],['Scholomance',58,60,'Scholomance',2057,'Maleterres de l’Ouest · Caer Darrow'],['Stratholme · Entrée principale',58,60,'Stratholme',2017,'Maleterres de l’Est · nord-ouest'],['Stratholme · Entrée de service',58,60,'Stratholme',2017,'Maleterres de l’Est · porte est'],['Shaper’s Terrace',58,60,'Shapers Terrace',0,'Un’Goro · Forever'],['Pic de Rochenoire · Haut',59,60,'Upper Blackrock Spire',1583,'Mont Rochenoire · taille du groupe à vérifier sur Forever']
].sort((a,b)=>a[1]-b[1]);
const CAMP = [
 ['Alchimie','Mana Well','Régénération de mana'],['Forge','Sharpening Wheel','Force'],['Enchantement','Enchanted Lute','Armure, caractéristiques et résistances'],['Herboristerie','Incense Candle','Intelligence'],['Minage','Lodestone','Puissance d’attaque en mêlée'],['Dépeçage','Camp Chair','Critique'],['Couture','Faction Banner','Esprit'],['Secourisme','First Aid Kit','Endurance'],['Travail du cuir','Camp Tent','Réserve d’XP reposée · recharge horaire'],['Ingénierie','Reagent Bot','Service de vente de composants'],['Cuisine','Campfire / repas','Installation du feu et nourriture'],['Pêche','Fish Bowl','Caractéristiques +8 %']
];
const BUFFS = [
 ['bag','Sleeping Bag',120],
 ['food','Nourriture',15],
 ['tent','Campement',60],
 ['elixir','Élixir / potion',60],
 ['weapon','Huile / pierre / poison',30],
 ['custom','Rappel personnel',10]
];
const OVERVIEW_GUIDE = 'https://www.wowhead.com/forever/guide/dungeons-overview-locations-details';
const DUNGEON_GUIDES = {
 'Hall of Thanes': {url:'https://www.wowhead.com/forever/guide/hall-of-thanes-dungeon-overview-location-rewards',quests:'Every Quest for the Hall of Thanes'},
 'Ruins of Lordaeron': {url:'https://www.wowhead.com/forever/guide/ruins-of-lordaeron-dungeon-overview-location-rewards',quests:'Every Quest for the Ruins of Lordaeron'},
 'Excavation Site Wetlands': {url:'https://www.wowhead.com/forever/guide/excavation-site-wetlands-dungeon-overview-location-rewards',quests:'Every Quest in Excavation Site'},
 'City of Dalaran': {url:'https://www.wowhead.com/forever/guide/city-of-dalaran-dungeon-overview-location-rewards',quests:'Every Quest in City of Dalaran'},
 'The Drowned City': {heading:'The Drowned City Dungeon in Forever'},
 'Krol dok Stronghold': {heading:"Krol'dok Stronghold Dungeon in Forever"},
 'Alcaz Prison': {heading:'Alcaz Prison Dungeon in Forever'},
 'Blackmaw Hold': {heading:'Blackmaw Hold Dungeon in Forever'},
 'Shapers Terrace': {heading:'The Shapers Terrace Dungeon in Forever'}
};
// Sélection de départ, pas un catalogue exhaustif des livres. Noms abrégés pour faciliter la lecture.
const BOOKS = [
 ['theocritus','Journal de Theocritus','Elwynn · tour d’Azora','65.4 70.1'],['antonidas','Autobiographie d’Antonidas','Forgefer · Hall des Explorateurs','76.3 10.8'],['rumi','Œuvres de Rumi','Loch Modan · auberge de Thelsamar','35.6 48.9'],['runes','Runes of the Sorcerer-Kings','Loch Modan · Mo’grosh','77.5 14.1'],['bewitch','Bewitchments and Glamours','Marche de l’Ouest · Ruisselune','45.4 70.5'],['dalaran','Dalaran Digest, vol. 23','Pins argentés · Moulin-de-l’Ambre','63.5 63.1'],['narthalas','Almanach de Nar’thalas','Sombrivage · Mathystra','59.6 22.2'],['goaz','Goaz Scrolls','Paluns · fouilles de Whelgar','33.6 47.9'],['baxtan','Baxtan · magie destructrice','Tarides · Cabestan','62.7 36.3'],['arcanic','Arcanic Systems Manual','Tarides · les Fenus','56.3 8.8'],['fury','Fury of the Land','Serres-Rocheuses · poste Totem-Sinistre','74.4 85.7'],['demons','Demons and You','Désolace · forteresse de Hache-Tonnerre','55.0 28.0']
];
