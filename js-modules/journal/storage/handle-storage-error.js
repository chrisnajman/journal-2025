export function handleStorageError(err) {
  const name = err?.name || ""
  const msg = err?.message || ""

  // Typical IndexedDB quota failure cases:
  const quotaHit =
    name === "QuotaExceededError" ||
    name === "NS_ERROR_DOM_QUOTA_REACHED" || // Firefox
    msg.includes("QUOTA") ||
    msg.includes("disk is full")

  if (quotaHit) {
    alert(`
Your browser's storage is full.

Try:
• Deleting large images
• Removing older entries
• Exporting entries to JSON, then clearing the journal

(IndexedDB does not have unlimited space on your device.)
    `)
    return
  }

  // Fallback — unexpected failure
  console.error(err)
  alert("A storage error occurred. See console for details.")
}
