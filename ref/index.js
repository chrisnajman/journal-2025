import { loadEntries } from "./js-modules/journal/storage.js"
import journalEntryDisplay from "./js-modules/journal/entry-display.js"
import journalEntryForm from "./js-modules/journal/entry-form.js"

// Load entries from localStorage
const entries = loadEntries()

// Start display module and get access to addEntry()
const { addEntry } = journalEntryDisplay({ entries })

// Start form module and give it a way to add new entries
journalEntryForm({ addEntry })
