// Show alt text input
export function showAltText(imageElements) {
  imageElements.wrapper.classList.remove("hide")
  imageElements.cancelButton.removeAttribute("disabled")
}

// Hide alt text input
export function hideAltText(imageElements) {
  imageElements.input.value = ""
  imageElements.wrapper.classList.add("hide")
  imageElements.altText.value = ""
  imageElements.charCounter.textContent = "0/150"
  imageElements.charLimit.textContent = ""
  imageElements.cancelButton.setAttribute("disabled", "")
}
