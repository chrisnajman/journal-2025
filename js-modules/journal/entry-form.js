import updateAttributes from "../helpers/update-attributes.js"
import {
  populatePlaceholder,
  enableRequiredFields,
  resetForm,
  showAltText,
  hideAltText,
  updateCharacterCounter,
} from "./entry-form-helpers/index.js"
import { dbAddEntry } from "./storage/storage.js" // IndexedDB addEntry

export default function journalEntryForm({
  addEntry,
  updateExportButton,
} = {}) {
  const today = new Date().toISOString().split("T")[0]

  const formElements = {
    form: document.getElementById("journal-form"),
    heading: document.getElementById("journal-heading"),
    text: document.getElementById("journal-text"),
    date: document.getElementById("journal-entry-date"),
    image: {
      input: document.getElementById("image-input"),
      wrapper: document.getElementById("alt-text-wrapper"),
      altText: document.getElementById("image-alt"),
      charCounter: document.getElementById("character-count"),
      charLimit: document.getElementById("character-limit-message"),
      cancelButton: document.querySelector("[data-cancel-image-upload-button]"),
      fileBlob: null, // store selected image Blob
      fileType: null, // store MIME type
    },
    buttons: {
      create: document.getElementById("create-entry"),
      cancel: document.getElementById("cancel"),
    },
  }

  // Initial date
  formElements.date.value = today
  formElements.image.altText.value = ""

  // Character counter for alt text
  formElements.image.altText.addEventListener("input", () => {
    updateCharacterCounter(
      formElements.image.altText,
      formElements.image.charCounter,
      formElements.image.charLimit
    )
  })

  // ===================== EVENT LISTENERS =====================
  // Open form
  formElements.buttons.create.addEventListener("click", (e) => {
    e.target.setAttribute("disabled", "true")
    formElements.form.classList.remove("hide")

    updateAttributes(formElements.form, {
      role: "region",
      tabindex: "-1",
      "aria-label": "Journal entry form",
    })
    formElements.form.focus()
    formElements.form.classList.add("focus-highlight")

    setTimeout(() => {
      formElements.form.classList.remove("focus-highlight")
      updateAttributes(formElements.form, {
        role: null,
        tabindex: null,
        "aria-label": null,
      })
    }, 2000)

    enableRequiredFields(
      formElements.date,
      formElements.heading,
      formElements.text
    )
  })

  // Cancel form
  formElements.buttons.cancel.addEventListener("click", () => {
    resetForm(formElements, today)
    formElements.image.fileBlob = null
    formElements.image.fileType = null
  })

  // Image upload
  formElements.image.input.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      formElements.image.fileBlob = file
      formElements.image.fileType = file.type
      showAltText(formElements.image)
    }
  })

  // Cancel image
  formElements.image.cancelButton.addEventListener("click", () => {
    hideAltText(formElements.image)
    formElements.image.fileBlob = null
    formElements.image.fileType = null
  })

  // Submit form
  formElements.form.addEventListener("submit", async (e) => {
    e.preventDefault()

    populatePlaceholder(
      formElements.heading,
      formElements.text,
      formElements.image.altText
    )

    const newEntry = {
      date: formElements.date.value.split("-").reverse().join("/"),
      heading: formElements.heading.value,
      text: formElements.text.value,
      edited: false,
      id: new Date().valueOf().toString(),
      imageAlt: formElements.image.altText.value || "",
      imageBlob: formElements.image.fileBlob || null, // store Blob
      imageType: formElements.image.fileType || null, // store MIME type
    }

    try {
      await dbAddEntry(newEntry) // save to IndexedDB
    } catch (err) {
      console.error("Failed to save entry to IndexedDB", err)
    }

    addEntry(newEntry)
    if (updateExportButton) updateExportButton()

    resetForm(formElements, today)
    formElements.image.fileBlob = null
    formElements.image.fileType = null
  })
}
