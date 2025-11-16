export default function validationWarning(el, text) {
  el.addEventListener("input", () => {
    if (el.value !== "") text.textContent = ""
  })
}
