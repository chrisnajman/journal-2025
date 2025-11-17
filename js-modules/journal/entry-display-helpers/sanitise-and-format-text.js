export default function sanitiseAndFormatText(textEl) {
  // Insert <br> on Enter (instead of <div>)
  textEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return
    e.preventDefault()

    const sel = window.getSelection()
    if (!sel.rangeCount) return

    const range = sel.getRangeAt(0)
    range.deleteContents()

    const br = document.createElement("br")
    range.insertNode(br)

    range.setStartAfter(br)
    range.setEndAfter(br)
    sel.removeAllRanges()
    sel.addRange(range)
  })

  // Convert pasted multi-line text into <br> separated lines
  textEl.addEventListener("paste", (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    const lines = text.split(/\r?\n/)

    const sel = window.getSelection()
    const range = sel.getRangeAt(0)
    range.deleteContents()

    lines.forEach((line, i) => {
      if (i > 0) {
        range.insertNode(document.createElement("br"))
        range.collapse(false)
      }
      range.insertNode(document.createTextNode(line))
      range.collapse(false)
    })

    sel.removeAllRanges()
    sel.addRange(range)
  })
}
