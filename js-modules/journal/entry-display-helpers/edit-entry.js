// js-modules/journal/entry-display-helpers/edit-entry.js
import toggleContentEditable from "./toggle-content-editable.js"
import toggleEditButton from "./toggle-edit-button.js"

export function editText(e, parent, entries) {
  const text = parent.querySelector("[data-journal-text]")
  toggleContentEditable(text, parent, entries, "text")
  toggleEditButton(e)
}

export function editHeading(e, parent, entries) {
  const heading = parent.querySelector("[data-journal-heading]")
  heading.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault() // stop multiline behaviour.
    }
  })
  toggleContentEditable(heading, parent, entries, "heading")
  toggleEditButton(e)
}
