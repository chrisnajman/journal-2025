// js-modules/journal/entry-display-helpers/delete-all.js
export function updateDeleteAllButton(entries) {
  const deleteAllButton = document.getElementById("delete-all-entries")
  if (!deleteAllButton) return
  if (entries.length > 1) {
    deleteAllButton.removeAttribute("disabled")
  } else {
    deleteAllButton.setAttribute("disabled", "")
  }
}

export function handleDeleteAll(entries, journalList) {
  // Kept for API compatibility; actual DB clear performed in entry-display.js
  if (!confirm("Delete ALL entries? This cannot be undone.")) return
  entries.length = 0
  journalList.innerHTML = ""
  updateDeleteAllButton(entries)
}
