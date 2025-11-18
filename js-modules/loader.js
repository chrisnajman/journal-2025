/**
 * Page-load animation: fades out the loader once the page is ready.
 */
export default function loadingAnimation() {
  const loader = document.getElementById("loader")
  const pageLoaded = document.getElementById("page-loaded")

  window.addEventListener("load", () => {
    // Standard page-load message
    pageLoaded.textContent = "Page has loaded."

    // Hide the loader
    requestAnimationFrame(() => {
      loader.classList.add("loader-hidden")
    })
  })
}

/**
 * Show the loader immediately with a custom message.
 * This is used for tasks like exporting JSON.
 */
export function showLoader(message = "Working…") {
  const loader = document.getElementById("loader")
  const pageLoaded = document.getElementById("page-loaded")

  if (!loader) return

  // Update visible text (only shown if animations disabled)
  const visuallyHiddenSpan = loader.querySelector(".visually-hidden")
  if (visuallyHiddenSpan) visuallyHiddenSpan.textContent = message

  // Update ARIA live region
  if (pageLoaded) pageLoaded.textContent = message

  // Make loader visible (remove hidden class)
  loader.classList.remove("loader-hidden")
}

/**
 * Hide the loader and announce completion.
 */
export function hideLoader(message = "Done.") {
  const loader = document.getElementById("loader")
  const pageLoaded = document.getElementById("page-loaded")

  if (!loader) return

  // Update messages
  const visuallyHiddenSpan = loader.querySelector(".visually-hidden")
  if (visuallyHiddenSpan) visuallyHiddenSpan.textContent = message
  if (pageLoaded) pageLoaded.textContent = message

  // Hide loader using existing fade transition
  requestAnimationFrame(() => {
    loader.classList.add("loader-hidden")
  })
}
