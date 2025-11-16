export default function removeImage(e, parent, entries, saveEntries) {
  if (!confirm("Are you sure you want to remove this image?")) return
  parent.querySelector("[data-journal-image-wrapper]").remove()
  const entry = entries.find((p) => p.id === parent.dataset.entryId)
  entry.image = ""
  entry.imageAlt = ""
  saveEntries(entries)
}
