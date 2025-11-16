export default function stickyHeaderShadow() {
  window.onscroll = () => {
    const pageHeader = document.getElementById("page-header")
    document.body.scrollTop > 0 || document.documentElement.scrollTop > 0
      ? pageHeader.classList.add("sticky-shadow")
      : pageHeader.classList.remove("sticky-shadow")
  }
}
