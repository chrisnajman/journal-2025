import updateAttributes from "../helpers/update-attributes.js"
import {
  populatePlaceholder,
  clearPlaceholder,
  validationWarning,
  enableRequiredFields,
  resetForm,
  showAltText,
  hideAltText,
  updateCharacterCounter,
} from "./entry-form-helpers/index.js"

export default function journalEntryForm({ addEntry } = {}) {
  const today = new Date().toISOString().split("T")[0]

  const formElements = {
    form: document.getElementById("journal-form"),
    heading: document.getElementById("journal-heading"),
    text: document.getElementById("journal-text"),
    date: document.getElementById("journal-entry-date"),
    warnings: {
      heading: document.querySelector(".journal-form-heading .warning"),
      text: document.querySelector(".journal-form-text .warning"),
      altText: document.querySelector(".warning.warning-alt-text"),
    },
    image: {
      input: document.getElementById("image-input"),
      wrapper: document.getElementById("alt-text-wrapper"),
      altText: document.getElementById("image-alt"),
      charCounter: document.getElementById("char_count"),
      charLimit: document.getElementById("char_limit_message"),
      cancelButton: document.querySelector("[data-cancel-image-upload-button]"),
    },
    buttons: {
      create: document.getElementById("create-entry"),
      cancel: document.getElementById("cancel"),
    },
  }

  // Initial date
  formElements.date.value = today

  // ===================== INITIALIZATION =====================
  const textFields = [
    formElements.heading,
    formElements.text,
    formElements.image.altText,
  ]
  textFields.forEach(clearPlaceholder)

  validationWarning(formElements.heading, formElements.warnings.heading)
  validationWarning(formElements.text, formElements.warnings.text)
  validationWarning(formElements.image.altText, formElements.warnings.altText)

  formElements.image.altText.addEventListener("input", () => {
    updateCharacterCounter(
      formElements.image.altText,
      formElements.image.charCounter,
      formElements.image.charLimit,
      formElements.warnings.altText
    )
  })

  // ===================== EVENT LISTENERS =====================
  // Open form
  formElements.buttons.create.addEventListener("click", (e) => {
    e.target.setAttribute("disabled", "true")
    formElements.form.classList.remove("hide")

    // === Accessibility: immediately focus the form after clicking 'Create Entry' ===
    updateAttributes(formElements.form, {
      role: "region",
      tabindex: "-1",
      "aria-label": "Journal entry form",
    })

    formElements.form.focus()
    formElements.form.classList.add("form-focus")

    // Remove temporary focus + styling
    setTimeout(() => {
      formElements.form.classList.remove("form-focus")
      updateAttributes(formElements.form, {
        role: null,
        tabindex: null,
        "aria-label": null,
      })
    }, 2000)

    enableRequiredFields(
      formElements.date,
      formElements.heading,
      formElements.text,
      formElements.image.wrapper,
      formElements.image.altText
    )
  })

  // Cancel form
  formElements.buttons.cancel.addEventListener("click", () => {
    resetForm(formElements, today)
  })

  // Image upload
  formElements.image.input.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      showAltText(formElements.image)
    }
  })

  // Cancel image
  formElements.image.cancelButton.addEventListener("click", () => {
    hideAltText(formElements.image)
  })

  // Submit form
  formElements.form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (formElements.image.wrapper.classList.contains("hide")) {
      formElements.image.altText.removeAttribute("required")
    }

    populatePlaceholder(
      formElements.heading,
      formElements.text,
      formElements.image.altText
    )

    if (formElements.heading.value === "")
      formElements.warnings.heading.textContent = "You must enter a title"
    if (formElements.text.value === "")
      formElements.warnings.text.textContent = "You must enter some text"
    if (
      !formElements.image.wrapper.classList.contains("hide") &&
      formElements.image.altText.value === ""
    )
      formElements.warnings.altText.textContent = "You must enter some alt text"

    if (
      formElements.heading.value === "" ||
      formElements.text.value === "" ||
      (!formElements.image.wrapper.classList.contains("hide") &&
        formElements.image.altText.value === "")
    )
      return

    const newEntry = {
      date: formElements.date.value.split("-").reverse().join("/"),
      image: formElements.image.input.value.replace("C:\\fakepath\\", ""),
      imageAlt: formElements.image.altText.value,
      heading: formElements.heading.value,
      text: formElements.text.value,
      edited: false,
      id: new Date().valueOf().toString(),
    }

    addEntry(newEntry)
    resetForm(formElements, today)
  })
}
