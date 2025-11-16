// js-modules/journal/entry-display-helpers/remove-image.js
// Note: entry-display.js now handles DB update; keep this helper minimal if still used elsewhere
export default function removeImage(e, parent, entries) {
  if (!confirm("Are you sure you want to remove this image?")) return
  const wrapper = parent.querySelector("[data-journal-image-wrapper]")
  if (wrapper) wrapper.remove()
  const entry = entries.find((p) => p.id === parent.dataset.entryId)
  if (entry) {
    entry.imageBlob = null
    entry.imageType = null
    entry.imageAlt = ""
  }
}
