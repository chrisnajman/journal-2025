export default function toggleEditButton(e) {
  const btn = e.target
  btn.textContent = btn.textContent === "Edit" ? "Save" : "Edit"
  btn.classList.toggle("edit-button")
  btn.classList.toggle("save-edit-button")
}
