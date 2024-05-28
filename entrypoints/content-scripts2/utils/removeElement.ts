export function removeElementById(id: string) {
  document.getElementById(id)?.remove()
}

export function removeElement(selector: string) {
  document.querySelector(selector)?.remove()
}
