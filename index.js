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
  // Check if the main journal buttons exist:
  const journalButtonGroup = document.getElementById("journal-button-group")
  if (!journalButtonGroup) return

  // 1️Get stored entries from IndexedDB
  let entries = []
  try {
    entries = await dbGetAllEntries()
  } catch (err) {
    console.error("Failed to load entries from IndexedDB", err)
  }

  // Initialize Export button
  const { updateButtonState: updateExportButton } = exportEntriesButton()

  // Initialize journal display
  const { addEntry } = journalEntryDisplay({
    entries,
    updateExportButton,
  })

  // Initialize journal form
  journalEntryForm({
    addEntry,
    updateExportButton,
  })
}

// Initialize app
init()
