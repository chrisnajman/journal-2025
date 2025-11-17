import sanitiseAndFormatText from "./sanitise-and-format-text.js"
import updateAttributes from "../../helpers/update-attributes.js"

/**
 * Renders a single journal entry into the list
 */
export default function renderJournalEntry(entry, template, list) {
  if (!template || !list || !entry) return

  const clone = template.content.cloneNode(true)
  const li = clone.querySelector("li")
  const headingEl = clone.querySelector("[data-journal-heading]")
  const textEl = clone.querySelector("[data-journal-text]")
  const dateEl = clone.querySelector("[data-journal-date]")
  const imageWrapper = clone.querySelector("[data-journal-image-wrapper]")

  updateAttributes(li, {
    "data-entry-id": entry.id,
    class: "journal-item",
  })

  // Set text content
  if (headingEl) headingEl.textContent = entry.heading
  if (textEl) textEl.textContent = entry.text
  if (dateEl) dateEl.textContent = entry.date

  // Convert \n (from textarea) → <br> for display
  textEl.innerHTML = entry.text.replace(/\n/g, "<br>")

  // Enable clean editing behavior every time this element becomes contenteditable
  sanitiseAndFormatText(textEl)

  // Handle image
  if (entry.imageBlob) {
    imageWrapper.innerHTML = ""

    imageWrapper.classList.add("journal-image-wrapper")

    const img = document.createElement("img")
    img.classList.add("lazy-loaded-image", "lazy")
    img.alt = entry.imageAlt || ""

    // Use Blob URL for lazy loading
    const blobUrl = URL.createObjectURL(entry.imageBlob)
    img.dataset.src = blobUrl
    img.src = blobUrl

    // Set natural width/height to prevent layout shifts
    img.onload = () => {
      updateAttributes(img, {
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }

    // Revoke Blob URL when image is removed to free memory
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node === img) {
            URL.revokeObjectURL(blobUrl)
            observer.disconnect()
          }
        })
      })
    })
    observer.observe(imageWrapper, { childList: true })

    imageWrapper.appendChild(img)

    const removeBtn = document.createElement("button")
    removeBtn.dataset.removeImageButton = ""
    removeBtn.className = "remove-image-button"
    removeBtn.textContent = "Delete image"
    imageWrapper.appendChild(removeBtn)
  } else {
    imageWrapper.innerHTML = ""
  }

  list.prepend(clone)
}
