export default function toggleContentEditable(el, parent, entries, key) {
  // Toggle edit mode
  el.toggleAttribute("contenteditable")

  const entry = entries.find((p) => p.id === parent.dataset.entryId)

  // If we have just exited edit mode, we save
  entry.edited = !el.hasAttribute("contenteditable")

  if (entry.edited) {
    // Convert <br> back to newline for storing clean text
    entry[key] = el.innerHTML.replace(/<br\s*\/?>/gi, "\n").trim()
  }
}
