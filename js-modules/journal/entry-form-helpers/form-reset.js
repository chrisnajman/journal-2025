// Reset input fields
export function resetFormFields(formElements, today) {
  formElements.date.value = today
  formElements.heading.value = ""
  formElements.text.value = ""
  formElements.image.input.value = ""
  formElements.image.altText.value = ""
  formElements.image.wrapper.classList.add("hide")
}

// Reset image alt text counter & char limit
export function resetCounter(imageElements) {
  imageElements.charCounter.textContent = "0/150"
  imageElements.charLimit.textContent = ""
  imageElements.cancelButton.setAttribute("disabled", "")
}

// Combined full form reset
export function resetForm(formElements, today) {
  resetFormFields(formElements, today)
  resetCounter(formElements.image)
  formElements.form.classList.add("hide")
  formElements.buttons.create.removeAttribute("disabled")
}
