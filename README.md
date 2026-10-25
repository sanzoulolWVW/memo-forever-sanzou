# MEMO FOREVER SANZOU

English WoW Forever Alliance companion. Version 7, October 25, 2026.

## Publish on GitHub Pages

1. Extract the ZIP.
2. Upload all files and the assets/ folder to the repository root, including .nojekyll.
3. Open Settings → Pages → Deploy from a branch.
4. Select main and /(root), then Save.
5. Wait for GitHub Pages to publish the update.

No build process, API keys or application server are required. Relative paths support project GitHub Pages URLs.

## Features

- Five sections, closed by default: Buffs, Zones, Dungeons, TO DO and Graphics.
- Four independent manual timers, adjustable duration, pause/resume/reset, visual alerts and optional audio with saved volume. Sound tests update a single notice. Browser notifications require permission.
- Keep the page open for alerts. Sleep and background-tab restrictions can delay alerts. Timers use absolute deadlines and continue elapsing while the page is closed. Sound may require another interaction after reloading.
- 44 leveling zones, with Horde territories hidden by default.
- 35 dungeon entries, 267 unique quests and 352 dungeon associations. Filter by name, dungeon level and faction. Quest details include rewards, prerequisites, givers, available coordinates, maps and copyable TomTom commands.
- TO DO: sleeping bag, cooking, camping and books. Twelve book locations form a starter selection, not a complete 25-book route.
- Five graphics commands with explanations and individual copy buttons. Their effects depend on client restrictions.
- English names, labels, guides, alerts and English Wowhead Forever URLs. The existing storage key and record IDs are preserved.

Progress is saved only in the current browser and site address. It does not automatically sync across devices, origins or local files.

## Data and editing

Beta data may be incomplete. Dungeon level ranges are recommendations, not entry requirements. Missing information is explicitly marked. See QUEST-SOURCES.md for sources and limitations; ASSETS.md for artwork attribution.

- data.js: lists, default durations and guide URLs.
- quests-data.js: static quest data.
- app.js: timers, storage, zone filters, guides and copying commands.
- instances.js: dungeon and quest rendering, filters and maps.
- index.html, style.css, instances.css: page structure and presentation.

All quest, item, NPC and zone database links use the English Wowhead Forever base: https://www.wowhead.com/forever/.
