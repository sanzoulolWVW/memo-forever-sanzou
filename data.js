/* Community data, consulted October 21, 2026. Levels are recommended ranges. */
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
// Display name, level range, lookup key, Wowhead zone ID, notes
const ZONES = [
 ['Dun Morogh',1,10,'Dun Morogh',1,'Alliance'],['Elwynn Forest',1,10,'Elwynn Forest',12,'Alliance'],['Teldrassil',1,10,'Teldrassil',141,'Alliance'],['Zephras Isle',1,12,'Zephras Isle',0,'Forever · Skyborne starting zone'],
 ['Durotar',1,10,'Durotar',14,'Horde · outside the Alliance route'],['Mulgore',1,10,'Mulgore',215,'Horde · outside the Alliance route'],['Tirisfal Glades',1,10,'Tirisfal Glades',85,'Horde · outside the Alliance route'],
 ['Westfall',10,20,'Westfall',40,'Alliance'],['Loch Modan',10,20,'Loch Modan',38,'Alliance'],['Darkshore',10,20,'Darkshore',148,'Alliance'],['Silverpine Forest',10,20,'Silverpine Forest',130,'Horde · dungeon / book access'],['The Barrens',10,25,'The Barrens',17,'Horde · some neutral objectives'],
 ['Redridge Mountains',15,25,'Redridge Mountains',44,'Alliance'],['Stonetalon Mountains',15,27,'Stonetalon Mountains',406,'Contested'],['Duskwood',18,30,'Duskwood',10,'Alliance'],['Ashenvale',18,30,'Ashenvale',331,'Contested'],['Wetlands',20,30,'Wetlands',11,'Alliance'],['Hillsbrad Foothills',20,30,'Hillsbrad Foothills',267,'Contested'],['Thousand Needles',25,35,'Thousand Needles',400,'Contested'],
 ['Alterac Mountains',30,40,'Alterac Mountains',36,'Contested'],['Arathi Highlands',30,40,'Arathi Highlands',45,'Contested'],['Desolace',30,40,'Desolace',405,'Contested'],['Stranglethorn Vale',30,45,'Stranglethorn Vale',33,'Contested'],['Badlands',35,45,'Badlands',3,'Contested'],['Swamp of Sorrows',35,45,'Swamp of Sorrows',8,'Contested'],['Dustwallow Marsh',35,45,'Dustwallow Marsh',15,'Contested'],['Riverglades',35,45,'Riverglades',0,'Forever · approximate range'],
 ['Feralas',40,50,'Feralas',357,'Contested'],['Tanaris',40,50,'Tanaris',440,'Contested'],['The Hinterlands',40,50,'The Hinterlands',47,'Contested'],['Azshara',45,55,'Azshara',16,'Contested'],['Searing Gorge',43,50,'Searing Gorge',51,'Contested'],['Blasted Lands',47,55,'Blasted Lands',4,'Contested'],['Felwood',48,55,'Felwood',361,'Contested'],['Un Goro Crater',48,55,'Un Goro Crater',490,'Contested'],['Burning Steppes',50,59,'Burning Steppes',46,'Contested'],['Western Plaguelands',51,58,'Western Plaguelands',28,'Contested'],['Eastern Plaguelands',54,60,'Eastern Plaguelands',139,'Contested'],['Deadwind Pass',55,60,'Deadwind Pass',41,'Exploration · few quests'],['Winterspring',55,60,'Winterspring',618,'Contested'],['Silithus',55,60,'Silithus',1377,'Contested'],['Mount Hyjal',60,60,'Mount Hyjal',0,'Forever · max level'],['Moonglade',null,null,'Moonglade',493,'Sanctuary · Druid quests'],['Shen dralas',null,null,'Shen dralas',0,'Forever · levels unconfirmed']
].sort((a,b)=>(a[1]??99)-(b[1]??99)||a[0].localeCompare(b[0],'en'));
const DUNGEONS = [
 ['Ragefire Chasm',13,18,'Ragefire Chasm',2437,'Orgrimmar · Horde capital'],['Hall of Thanes',13,18,'Hall of Thanes',0,'Beneath Ironforge · Forever'],['Ruins of Lordaeron',15,20,'Ruins of Lordaeron',0,'Lordaeron, above Undercity · Forever'],['Wailing Caverns',17,24,'Wailing Caverns',718,'The Barrens · Lushwater Oasis'],['The Deadmines',17,26,'The Deadmines',1581,'Westfall · Moonbrook'],['Shadowfang Keep',20,30,'Shadowfang Keep',209,'Silverpine Forest · above Pyrewood Village'],['Blackfathom Deeps',24,32,'Blackfathom Deeps',719,'Ashenvale · The Zoram Strand'],['The Stockade',24,32,'The Stockade',717,'Stormwind City · Mage Quarter'],['Excavation Site Wetlands',26,31,'Excavation Site Wetlands',0,'Wetlands · excavation site · Forever'],['City of Dalaran',28,33,'City of Dalaran',0,'Alterac Mountains · Dalaran · Forever'],['Gnomeregan',29,38,'Gnomeregan',721,'Dun Morogh · west'],['Razorfen Kraul',29,38,'Razorfen Kraul',491,'Southern Barrens'],['Scarlet Monastery Graveyard',30,38,'Scarlet Monastery Graveyard',796,'Tirisfal · northeast'],['Scarlet Monastery Library',33,41,'Scarlet Monastery Library',796,'Tirisfal · northeast'],['The Drowned City',35,40,'The Drowned City',0,'Stranglethorn · Forever'],['Scarlet Monastery Armory',36,44,'Scarlet Monastery Armory',796,'Tirisfal · northeast'],['Razorfen Downs',37,46,'Razorfen Downs',722,'Southern Barrens'],['Scarlet Monastery Cathedral',38,46,'Scarlet Monastery Cathedral',796,'Tirisfal · northeast'],['Krol dok Stronghold',40,45,'Krol dok Stronghold',0,'Riverglades · Forever'],['Uldaman',41,51,'Uldaman',1337,'Badlands · north'],['Zul Farrak',44,54,'Zul Farrak',1176,'Tanaris · northwest'],['Maraudon',46,55,'Maraudon',2100,'Desolace · Valley of Spears'],['Alcaz Prison',48,53,'Alcaz Prison',0,'Alcaz Island · Dustwallow Marsh · Forever'],['Temple of Atal Hakkar',50,60,'Temple of Atal Hakkar',1477,'Swamp of Sorrows · Pool of Tears'],['Blackrock Depths',52,60,'Blackrock Depths',1584,'Blackrock Mountain · descend the chains'],['Dire Maul East',54,60,'Dire Maul East',2557,'Feralas · Eldre’Thalas'],['Lower Blackrock Spire',55,60,'Lower Blackrock Spire',1583,'Blackrock Mountain · upper entrance'],['Blackmaw Hold',55,60,'Blackmaw Hold',0,'Azshara · Forever'],['Dire Maul West',56,60,'Dire Maul West',2557,'Feralas · Eldre’Thalas'],['Dire Maul North',56,60,'Dire Maul North',2557,'Feralas · Eldre’Thalas'],['Scholomance',58,60,'Scholomance',2057,'Western Plaguelands · Caer Darrow'],['Stratholme · Main Entrance',58,60,'Stratholme',2017,'Eastern Plaguelands · northwest'],['Stratholme · Service Entrance',58,60,'Stratholme',2017,'Eastern Plaguelands · east gate'],['Shapers Terrace',58,60,'Shapers Terrace',0,'Un’Goro · Forever'],['Upper Blackrock Spire',59,60,'Upper Blackrock Spire',1583,'Blackrock Mountain · check group size on Forever']
].sort((a,b)=>a[1]-b[1]);
const CAMP = [
 ['Alchemy','Mana Well','Mana regeneration'],['Blacksmithing','Sharpening Wheel','Strength'],['Enchanting','Enchanted Lute','Armor, stats and resistances'],['Herbalism','Incense Candle','Intellect'],['Mining','Lodestone','Melee attack power'],['Skinning','Camp Chair','Critical strike'],['Tailoring','Faction Banner','Spirit'],['First Aid','First Aid Kit','Stamina'],['Leatherworking','Camp Tent','Rested XP pool · hourly cooldown'],['Engineering','Reagent Bot','Reagent vendor service'],['Cooking','Campfire / meal','Campfire setup and food'],['Fishing','Fish Bowl','Stats +8%']
];
const BUFFS = [
 ['bag','Sleeping Bag',120],
 ['food','Food',15],
 ['tent','Camping',60],
 ['custom','Personal reminder',10]
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
// Starter book selection; not an exhaustive catalog.
const BOOKS = [
 ['theocritus','Archmage Theocritus’ Research Journal','Elwynn · Tower of Azora','65.4 70.1'],['antonidas','Archmage Antonidas: The Unabridged Autobiography','Ironforge · Hall of Explorers','76.3 10.8'],['rumi','Rumi of Gnomeregan: The Collected Works','Loch Modan · Thelsamar inn','35.6 48.9'],['runes','Runes of the Sorcerer-Kings','Loch Modan · Mo’grosh','77.5 14.1'],['bewitch','Bewitchments and Glamours','Westfall · Moonbrook','45.4 70.5'],['dalaran','The Dalaran Digest, Vol. 23','Silverpine Forest · Ambermill','63.5 63.1'],['narthalas','Nar’thalas Almanac, Vol. 74','Darkshore · Mathystra','59.6 22.2'],['goaz','Goaz Scrolls','Wetlands · Whelgar’s Excavation Site','33.6 47.9'],['baxtan','Baxtan: On Destructive Magics','The Barrens · Ratchet','62.7 36.3'],['arcanic','Arcanic Systems Manual','The Barrens · The Sludge Fen','56.3 8.8'],['fury','Fury of the Land','Stonetalon Mountains · Grimtotem Post','74.4 85.7'],['demons','Demons and You','Desolace · Thunder Axe Fortress','55.0 28.0']
];
