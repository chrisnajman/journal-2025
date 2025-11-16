// Update character counter for alt text
export function updateCharacterCounter(
  altText,
  charCounter,
  charLimit
  // warning
) {
  const len = altText.value.length
  charCounter.textContent = `${len}/150`
  charLimit.textContent = len === 150 ? "No more characters allowed!" : ""
  // warning.textContent = ""
}
