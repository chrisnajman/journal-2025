export function setMultipleAttributes(element, attributesToSet) {
  for (let i in attributesToSet) element.setAttribute(i, attributesToSet[i])
}

/**
 * Updates multiple attributes on a DOM element.
 * - If an attribute value is non-null, it is added or updated.
 * - If an attribute value is null or undefined, it is removed.
 */
function updateAttributes(element, attributes) {
  for (const [name, value] of Object.entries(attributes)) {
    if (value == null) {
      element.removeAttribute(name)
    } else {
      element.setAttribute(name, value)
    }
  }
}

/*

// Usage
const someElement = document.querySelector(".some-element")

// Usage: Set attributes
updateAttributes(someElement, {
  id: "1",
  "aria-label": "introduction"
})

// Usage: Remove attributes
updateAttributes(someElement, {
  id: null,
  "aria-label": null
})

// Usage: Mix setting and removing
updateAttributes(someElement, {
  id: "2",             // set or update
  "aria-label": null   // remove
})
*/
