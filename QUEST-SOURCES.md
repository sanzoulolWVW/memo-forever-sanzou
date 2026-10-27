# Dungeon quest data

Source snapshot: October 21, 2026. English localization: October 25, 2026.
267 unique quests across 35 dungeon entries (352 associations).

## Sources and attribution

- [Forever Companion public API](https://forevercompanion.io/developers): /api/v1/quests?type=dungeon&limit=500. Initial dungeon associations, English quest names, factions, minimum levels, rewards and prerequisites; aggregated from ForeverChanges, Wowhead, Zockify and player contributions. Cached data; no runtime API requests.
- [QuestieDB Forever](https://github.com/Questie/QuestieDB/tree/78f730e9bf494fca0572616fc4c67fb61ae7e280): givers, starting items, locations, class restrictions, rewards and original English entity names. Eight missing steps/variants for the first four new Forever dungeons were added from their categories.
- [Wowhead dungeon quests](https://www.wowhead.com/forever/guide/dungeons/every-dungeon-quest-location) and dedicated guides for Thanes, Lordaeron, Excavation Site and Dalaran: cross-checks of names and starting locations.
- [Important Heirlooms](https://www.wowhead.com/forever/quest=96403): neutral and shareable, despite an Alliance mask in Questie. [The Treaty of Understanding](https://www.wowhead.com/forever/quest=98423): not shareable; starts in the Reliquary of Kings.

Only factual names, IDs, levels, coordinates and associations are included. Narrative quest descriptions and guide prose are not reproduced. No source application code runs on the website.

## Missing data and sharing

Questie SHARABLE (8) confirms Yes. Missing or zero flags do not prove No: display Unconfirmed unless explicitly verified. Sharing still requires meeting faction, class, level and prerequisite restrictions.

Krol’dok Stronghold, Alcaz Prison, Blackmaw Hold and Shaper’s Terrace have no documented quests in this snapshot; this does not mean no quests exist in game. All 267 quests have an ID and a Forever Wowhead link. Two API records without IDs were matched to Questie: The Test of Righteousness (1654, collection step) and The Orb of Soran’ruk (1740).

Missing item rewards do not imply no rewards: gold, XP and items may be incomplete. Choice rewards are marked when documented.

## Maps and coordinates

Remote maps and icons: Wowhead/ZAM, Blizzard artwork. The 35 Classic map backgrounds were checked during the original data validation. Images load when quest details open, with a fallback if unavailable.

TomTom commands preserve observed Forever coordinates and Forever UiMapIDs: /way #ID x y name. For multiple observations, one actual recorded point near the cluster center is selected. NPCs may move.

Markers are converted to Classic map framing using QuestieDB data/Forever/conversion.json: (Forever coordinate - offset) / scale. TomTom coordinates are not converted. Maps are labeled approximate; unknown interiors do not receive invented backgrounds or points. No navigation route is calculated.

## Persistence

The existing browser storage key and quest IDs are unchanged. Shared quests use the same checkbox across wings. Uncheck all in TO DO preserves dungeon quest checks. Translation preserves timers, objectives and book progress on the same site address.

## V8 sources — reviewed 2026-10-27
- QuestieDB Forever: https://github.com/Questie/QuestieDB (revision 7901fee). Objectives, starters, library-book object drops, observed coordinates, and map geometry conversion.
- Forever Companion: https://forevercompanion.io/developers — public dungeon quest and item-detail APIs. Static cached tooltip text, attribution rendered beside rewards. Data date 2026-10-27. Any objective carried only as a Classic reference is visibly labelled.
- Sharing: https://www.wowhead.com/forever/quest=96395/an-ancient-grudge and https://www.wowhead.com/forever/quest=92401/a-frightened-request explicitly say Sharable. Other unknown values stay null.
- Interior directions: https://www.wowhead.com/forever/guide/dungeons/every-dungeon-quest-location
- Gordok sample interaction: https://www.wowhead.com/forever/quest=5528/the-gordok-taste-test
- Map backgrounds: https://wow.zamimg.com/images/wow/classic/maps/enus/normal/ — existing 35 backgrounds plus Elwynn (12) and Stonetalon (406), checked HTTP 200 image/jpeg.

Remaining limits: 77 quests have no recorded pickup coordinates; no fabricated pins are shown. 121 sharing values lack Forever evidence. Three quest objectives have no reliable source. Two reward item endpoints returned 404. The Sleeping Bag dam and wall-cart waypoints still use labelled guide coordinates.
