import updateAttributes from "../../helpers/update-attributes.js"
import lazyLoad from "../../observers/lazy-load-intersection-observer.js"

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

    image.classList.add("lazy-loaded-image", "lazy")

    updateAttributes(image, {
      // ✅ Assign the real filename to data-src
      "data-src": `images/${entry.image}`,
      alt: entry.imageAlt,
      // ✅ Placeholder ensures the element has layout before loading
      src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    })

    imageWrapper.appendChild(image)

    const removeImageButton = document.createElement("button")
    updateAttributes(removeImageButton, {
      "data-remove-image-button": "",
      class: "remove-image-button",
    })
    removeImageButton.textContent = "Delete image"
    image.after(removeImageButton)
  }

  // ✅ Insert new entry at top
  journalList.prepend(templateClone)

  // ✅ Run lazy load on the *journal list* (real rendered DOM)
  lazyLoad(journalList)
}
