import stickyShadow from "./js-modules/helpers/sticky-shadow.js"
import themeSwitcher from "./js-modules/theme.js"
import loadingAnimation from "./js-modules/loader.js"
import pageHeaderResizeObserver from "./js-modules/observers/page-header-resize-observer.js"

import journalEntryForm from "./js-modules/journal/entry-form.js"
import journalEntryDisplay from "./js-modules/journal/entry-display.js"
import exportEntriesButton from "./js-modules/journal/export-entries/export-entries-button.js"
import { dbGetAllEntries } from "./js-modules/journal/storage/storage.js"

stickyShadow()
themeSwitcher()
loadingAnimation()
pageHeaderResizeObserver()

async function init() {
  // 1️⃣ Get stored entries from IndexedDB
  let entries = []
  try {
    entries = await dbGetAllEntries()
  } catch (err) {
    console.error("Failed to load entries from IndexedDB", err)
  }

  // 2️⃣ Initialize Export button
  const { updateButtonState: updateExportButton } = exportEntriesButton()

  // 3️⃣ Initialize journal display
  const { addEntry } = journalEntryDisplay({
    entries,
    updateExportButton,
  })

  // 4️⃣ Initialize journal form
  journalEntryForm({
    addEntry,
    updateExportButton,
  })
}

// Initialize app
init()
