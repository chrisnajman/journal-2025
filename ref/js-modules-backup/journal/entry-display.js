import { saveEntries } from "./storage.js"
import updateAttributes from "../helpers/update-attributes.js"
import {
  renderJournalEntry,
  editHeading,
  editText,
  removeImage,
  deleteEntry,
} from "./entry-display-helpers/index.js"

export default function journalEntryDisplay({ entries }) {
  // ===================== GLOBALS =====================
  const journalForm = document.getElementById("journal-form")
  const template = document.getElementById("journal-item-template")
  const journalList = document.createElement("ul")

  updateAttributes(journalList, {
    class: "journal-list",
    id: "journal-list",
  })

  journalForm.after(journalList)

  // Render stored entries
  entries.forEach((entry) => renderJournalEntry(entry, template, journalList))

  // Add a new entry
  function addEntry(newEntry) {
    entries.push(newEntry)
    saveEntries(entries)
    renderJournalEntry(newEntry, template, journalList)

    const newItem = journalList.firstElementChild
    if (newItem) {
      updateAttributes(newItem, {
        role: "status",
        "aria-live": "polite",
        tabindex: "-1",
      })

      newItem.focus()

      newItem.classList.add("newly-added")
      setTimeout(() => newItem.classList.remove("newly-added"), 2000)

      const secondItem = newItem.nextElementSibling
      if (secondItem) {
        // Remove attributes
        updateAttributes(secondItem, {
          role: null,
          "aria-live": null,
          tabindex: null,
        })
      }
    }
  }

  // ===================== EVENT LISTENER =====================
  journalList.addEventListener("click", (e) => {
    const parent = e.target.closest(".journal-item")
    if (!parent) return

    // Delegate to modular helpers
    if (e.target.matches("[data-button-heading-edit]")) {
      editHeading(e, parent, entries)
      return
    }

    if (e.target.matches("[data-button-text-edit]")) {
      editText(e, parent, entries)
      return
    }

    if (e.target.matches("[data-remove-image-button]")) {
      removeImage(e, parent, entries, saveEntries)
      return
    }

    if (e.target.matches("[data-button-journal-delete]")) {
      deleteEntry(e, parent, entries)
      return
    }
  })

  return { addEntry }
}
