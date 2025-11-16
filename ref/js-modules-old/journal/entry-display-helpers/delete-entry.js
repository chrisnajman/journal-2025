import { saveEntries } from "../storage.js"

export default function deleteEntry(e, parent, entries) {
  if (!confirm("Are you sure you want to delete this entry?")) return

  parent.remove()

  const entryIndex = entries.findIndex(
    (entry) => entry.id === parent.dataset.entryId
  )
  if (entryIndex > -1) entries.splice(entryIndex, 1)

  saveEntries(entries)
}
