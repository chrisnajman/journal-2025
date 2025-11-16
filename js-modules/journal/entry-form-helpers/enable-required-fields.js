export default function enableRequiredFields(el1, el2, el3, el4, el5) {
  el1.setAttribute("required", "")
  el2.setAttribute("required", "")
  el3.setAttribute("required", "")
  if (!el4.classList.contains("hide")) {
    el5.setAttribute("required", "")
  }
}
