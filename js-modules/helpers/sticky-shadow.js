export default function stickyShadow() {
  window.onscroll = () => {
    const classes = [
      [document.getElementById("page-header"), "sticky-shadow-header"],
      [document.getElementById("page-footer"), "sticky-shadow-footer"],
    ]

    const scrolled =
      document.body.scrollTop > 0 || document.documentElement.scrollTop > 0

    classes.forEach(([el, className]) =>
      el.classList[scrolled ? "add" : "remove"](className)
    )
  }
}
