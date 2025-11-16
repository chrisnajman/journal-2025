// js-modules/journal/export-entries-button.js
import exportEntriesToJSON from "./export-entries-to-json.js"
import { dbGetAllEntries } from "./storage.js"

export default function exportEntriesButton() {
  const button = document.getElementById("export-entries")

  if (!button) return {}

  /** Enable/disable based on whether any entries exist */
  async function updateButtonState() {
    try {
      const entries = await dbGetAllEntries()
      if (Array.isArray(entries) && entries.length > 0) {
        button.removeAttribute("disabled")
      } else {
        button.setAttribute("disabled", "")
      }
    } catch (err) {
      console.error("Failed to check entries for export button", err)
      button.setAttribute("disabled", "")
    }
  }

  button.addEventListener("click", async () => {
    await exportEntriesToJSON()
  })

  // Initialize
  updateButtonState()

  return { updateButtonState }
}
