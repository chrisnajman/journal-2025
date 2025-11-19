import exportEntriesToJSON from "./export-entries-to-json.js"
import { dbGetAllEntries } from "../storage/storage.js"
import { showLoader, hideLoader } from "../../loader.js"

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
    // Show loader immediately
    showLoader("Creating JSON file…")

    try {
      // Export entries to JSON
      await exportEntriesToJSON()
      // Announce success
      hideLoader("JSON file ready.")
    } catch (err) {
      console.error("Export failed:", err)
      hideLoader("Failed to create JSON file.")
      alert("Export failed. See console for details.")
    }
  })

  // Initialize button state
  updateButtonState()

  return { updateButtonState }
}
