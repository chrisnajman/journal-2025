8) js-modules/journal/entry-display-helpers/delete-entry.js — (kept for completeness; DB deletion is handled in entry-display.js)
9) js-modules/journal/entry-display-helpers/delete-all.js — adjusted to keep interface but actual DB clearing happens in entry-display.js
10) js-modules/journal/entry-display-helpers/edit-entry.js — update to not call saveEntries; entry-display will persist via dbUpdateEntry




TL;DR: addEntry is indeed used; the greyed-out appearance can be ignored.
If you want, I can show a tiny tweak to make VSCode recognize it and remove the greyed-out look. It’s cosmetic. Do you want me to do that?


If you like, I can provide the entry-display.js tweak afterwards for proper cleanup, but it’s optional.



Modular optimisations!


import stickyShadow from "./js-modules/helpers/sticky-shadow.js"
import themeSwitcher from "./js-modules/theme.js"
import loadingAnimation from "./js-modules/loader.js"
import pageHeaderResizeObserver from "./js-modules/observers/page-header-resize-observer.js"


stickyShadow()
themeSwitcher()
loadingAnimation()
pageHeaderResizeObserver()
