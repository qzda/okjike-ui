export function removeElementById(id: string) {
  document.getElementById(id)?.remove()
}

export function removeElement(selector: string) {
  document.querySelector(selector)?.remove()
}

export function getYDistance(element1: Element, element2: Element) {
  const rect1 = element1.getBoundingClientRect()
  const recr2 = element2.getBoundingClientRect()

  return rect1.bottom - recr2.top
}
