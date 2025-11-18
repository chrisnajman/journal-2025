import updateAttributes from "../helpers/update-attributes.js"
import renderJournalEntry from "./entry-display-helpers/render-entry.js"
import {
  updateDeleteAllButton,
  editHeading,
  editText,
} from "./entry-display-helpers/index.js"
import { dbDeleteEntry, dbDeleteAllEntries, dbUpdateEntry } from "./storage.js"
import lazyLoad from "../observers/lazy-load-intersection-observer.js"

export default function journalEntryDisplay({
  entries = [],
  updateExportButton,
} = {}) {
  const journalForm = document.getElementById("journal-form")
  const template = document.getElementById("journal-item-template")
  const journalList = document.createElement("ul")
  const deleteAllButton = document.getElementById("delete-all-entries")

  updateAttributes(journalList, {
    class: "journal-list",
    id: "journal-list",
  })

  journalForm.after(journalList)

  // Render stored entries
  entries.forEach((entry) => renderJournalEntry(entry, template, journalList))

  // Initialize buttons
  updateDeleteAllButton(entries)
  if (updateExportButton) updateExportButton()

  // Ensure lazy-loading runs on any existing images
  lazyLoad(journalList)

  // Add a new entry (UI + in-memory array)
  function addEntry(newEntry) {
    entries.push(newEntry)
    renderJournalEntry(newEntry, template, journalList)

    // Lazy-load new images
    lazyLoad(journalList)

    updateDeleteAllButton(entries)
    if (updateExportButton) updateExportButton()

    const newItem = journalList.firstElementChild
    if (newItem) {
      updateAttributes(newItem, {
        role: "status",
        "aria-live": "polite",
        tabindex: "-1",
      })

      newItem.focus()
      newItem.classList.add("focus-highlight")
      setTimeout(() => newItem.classList.remove("focus-highlight"), 2000)

      const secondItem = newItem.nextElementSibling
      if (secondItem) {
        updateAttributes(secondItem, {
          role: null,
          "aria-live": null,
          tabindex: null,
        })
      }
    }
  }

  // ===================== EVENT LISTENER =====================
  journalList.addEventListener("click", async (e) => {
    const parent = e.target.closest(".journal-item")
    if (!parent) return

    const entry = entries.find((p) => p.id === parent.dataset.entryId)

    // EDIT HEADING
    if (e.target.matches("[data-button-heading-edit]")) {
      editHeading(e, parent, entries)
      if (entry) {
        try {
          await dbUpdateEntry(entry)
        } catch (err) {
          console.error("Failed to update entry", err)
        }
      }
      updateDeleteAllButton(entries)
      if (updateExportButton) updateExportButton()
      return
    }

    // EDIT TEXT
    if (e.target.matches("[data-button-text-edit]")) {
      editText(e, parent, entries)
      if (entry) {
        try {
          await dbUpdateEntry(entry)
        } catch (err) {
          console.error("Failed to update entry", err)
        }
      }
      updateDeleteAllButton(entries)
      if (updateExportButton) updateExportButton()
      return
    }

    // REMOVE IMAGE
    if (e.target.matches("[data-remove-image-button]")) {
      if (!confirm("Are you sure you want to delete the image?")) return
      const imageWrapper = parent.querySelector("[data-journal-image-wrapper]")
      if (imageWrapper) imageWrapper.innerHTML = ""
      if (entry) {
        entry.imageBlob = null
        entry.imageType = null
        entry.imageAlt = ""
        try {
          await dbUpdateEntry(entry)
        } catch (err) {
          console.error("Failed to remove image in DB", err)
        }
      }
      updateDeleteAllButton(entries)
      if (updateExportButton) updateExportButton()
      return
    }

    // DELETE ENTRY
    if (e.target.matches("[data-button-journal-delete]")) {
      if (!confirm("Are you sure you want to delete this entry?")) return
      parent.remove()
      const idToDelete = parent.dataset.entryId
      const idx = entries.findIndex((e) => e.id === idToDelete)
      if (idx > -1) entries.splice(idx, 1)
      try {
        await dbDeleteEntry(idToDelete)
      } catch (err) {
        console.error("Failed to delete entry from DB", err)
      }
      updateDeleteAllButton(entries)
      if (updateExportButton) updateExportButton()
      return
    }
  })

  // DELETE ALL listener
  deleteAllButton.addEventListener("click", async () => {
    if (!confirm("Delete ALL entries? This cannot be undone.")) return
    try {
      await dbDeleteAllEntries()
    } catch (err) {
      console.error("Failed to clear DB", err)
    }
    entries.length = 0
    journalList.innerHTML = ""
    updateDeleteAllButton(entries)
    if (updateExportButton) updateExportButton()
  })

  return { addEntry }
}
