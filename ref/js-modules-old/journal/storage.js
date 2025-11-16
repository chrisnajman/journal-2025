const LOCAL_STORAGE_PREFIX = "JOURNAL_2025"
const ENTRIES_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-entries`

export function loadEntries() {
  const items = localStorage.getItem(ENTRIES_STORAGE_KEY) || "[]"
  return JSON.parse(items) || []
}

export function saveEntries(entries) {
  localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries))
}
