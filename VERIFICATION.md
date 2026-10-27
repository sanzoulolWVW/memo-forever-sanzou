# Version 7 verification — October 25, 2026

- JavaScript syntax checks passed for app.js, data.js, instances.js and quests-data.js.
- Data checks passed: 35 dungeon entries, 267 unique quests, 352 associations and 35 map backgrounds.
- All quest display names match the original English source names. All quest links use the English Wowhead Forever base.
- Compared with version 6: quest IDs, dungeon associations, minimum levels, sharing flags, reward IDs and map/TomTom coordinates are unchanged.
- All 35 dungeon mappings remain distinct, including the two Stratholme entrances.
- Interface, guides, profession buffs, books, zones, dungeon notes, alerts, accessibility labels and documentation translated to English. HTML language set to en.
- English source entity names used for rewards, quest givers, starting objects/items and prerequisites.
- Browser checks: five sections initially closed; Stratholme search shows two distinct wings with 12 and 13 quest associations; Hall of Thanes quest details show English labels, rewards, NPC, map and Forever URLs; Copy TomTom reports success in English; no console errors observed.
- Existing storage key and task/book/quest IDs preserved. Asset cache version increased to 7.

This is a static GitHub Pages package. Publication still requires uploading the package contents to the GitHub repository.

## V8 validation
- JavaScript syntax checks passed for modified runtime files.
- Dataset assertions passed: 35 dungeons, 267 unique quests, 352 associations, stable quest names/minimum levels/group membership; 37 valid map backgrounds.
- All 20 TO DO locations have bounded map coordinates and explicit uiMap IDs; 18 recorded Forever positions and 2 guide-only references.
- Actual browser: Important Heirlooms displays objective, Dwarven Tome (+1 Spirit / +3 Spell Power), gloves, Ironforge map and TomTom command. Westfall TO DO map opens and copy status confirms success.
- 390px viewport checked: no horizontal page overflow. Existing sections begin closed.
- Remaining unverified data is documented in QUEST-SOURCES.md, not silently filled from Classic.
