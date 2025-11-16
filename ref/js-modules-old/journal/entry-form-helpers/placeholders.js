const headingPlaceholder = "Enter a title..."
const mainTextPlaceholder = "Enter some text..."
const altTextPlaceholder = "Enter alt text..."

export function populatePlaceholder(el1, el2, el3) {
  if (el1.getAttribute("placeholder") === "")
    el1.setAttribute("placeholder", headingPlaceholder)
  if (el2.getAttribute("placeholder") === "")
    el2.setAttribute("placeholder", mainTextPlaceholder)
  if (el3 && el3.getAttribute("placeholder") === "")
    el3.setAttribute("placeholder", altTextPlaceholder)
}

export function clearPlaceholder(el) {
  el.addEventListener("focus", () => el.setAttribute("placeholder", ""))
}
