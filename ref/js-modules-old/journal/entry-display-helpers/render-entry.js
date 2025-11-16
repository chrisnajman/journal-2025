import { setMultipleAttributes } from "./index.js"

export default function renderJournalEntry(entry, template, journalList) {
  const templateClone = template.content.cloneNode(true)
  const journalItem = templateClone.querySelector(".journal-item")

  journalItem.dataset.entryId = entry.id
  templateClone.querySelector("[data-journal-date]").textContent = entry.date
  templateClone.querySelector("[data-journal-heading]").textContent =
    entry.heading
  templateClone.querySelector("[data-journal-text]").textContent = entry.text

  if (entry.image) {
    const imageWrapper = templateClone.querySelector(
      "[data-journal-image-wrapper]"
    )
    imageWrapper.classList.add("journal-image-wrapper")

    const image = document.createElement("img")
    setMultipleAttributes(image, {
      src: `images/${entry.image}`,
      alt: entry.imageAlt,
    })
    image.onload = () =>
      setMultipleAttributes(image, {
        width: image.naturalWidth,
        height: image.naturalHeight,
      })

    imageWrapper.appendChild(image)

    const removeImageButton = document.createElement("button")
    setMultipleAttributes(removeImageButton, {
      "data-remove-image-button": "",
      class: "remove-image-button",
    })
    removeImageButton.textContent = "Delete image"
    image.after(removeImageButton)
  }

  journalList.prepend(templateClone)
}
