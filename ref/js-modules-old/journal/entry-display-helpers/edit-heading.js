import { saveEntries } from "../storage.js"

export default function editHeading(e, parent, entries) {
  e.target.textContent =
    e.target.textContent === "Edit heading" ? "Save edit" : "Edit heading"

  const heading = parent.querySelector("[data-journal-heading]")
  heading.toggleAttribute("contenteditable")

  const entry = entries.find((p) => p.id === parent.dataset.entryId)
  entry.edited = !heading.hasAttribute("contenteditable")
  if (entry.edited) entry.heading = heading.textContent

  e.target.classList.toggle("save-edit")
  saveEntries(entries)
}
