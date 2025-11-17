export function updateDeleteAllButton(entries) {
  const deleteAllButton = document.getElementById("delete-all-entries")
  if (!deleteAllButton) return
  if (entries.length > 1) {
    deleteAllButton.removeAttribute("disabled")
  } else {
    deleteAllButton.setAttribute("disabled", "")
  }
}
