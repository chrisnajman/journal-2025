// js-modules/journal/entry-display-helpers/delete-entry.js
// This helper is left to preserve file structure; the actual DB deletion happens in entry-display.js
export default function deleteEntry(e, parent, entries) {
  if (!confirm("Are you sure you want to delete this entry?")) return
  parent.remove()
  const entryIndex = entries.findIndex(
    (entry) => entry.id === parent.dataset.entryId
  )
  if (entryIndex > -1) entries.splice(entryIndex, 1)
}
