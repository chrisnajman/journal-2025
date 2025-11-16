import { saveEntries } from "../storage.js"

export default function editText(e, parent, entries) {
  e.target.textContent =
    e.target.textContent === "Edit text" ? "Save edit" : "Edit text"

  const text = parent.querySelector("[data-journal-text]")
  text.toggleAttribute("contenteditable")

  const entry = entries.find((p) => p.id === parent.dataset.entryId)
  entry.edited = !text.hasAttribute("contenteditable")
  if (entry.edited) entry.text = text.textContent

  e.target.classList.toggle("save-edit")
  saveEntries(entries)
}
