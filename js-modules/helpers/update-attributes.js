// /**
//  * Updates multiple attributes on a DOM element.
//  * - If an attribute value is non-null, it is added or updated.
//  * - If an attribute value is null or undefined, it is removed.
//  * Note: hyphenated names must be written in quotes, e.g. "aria-disabled".
//  */
export default function updateAttributes(element, attributes) {
  for (const [name, value] of Object.entries(attributes)) {
    if (value == null) {
      element.removeAttribute(name)
    } else {
      element.setAttribute(name, value)
    }
  }
}
