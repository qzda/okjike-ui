import { removeElementById } from "./removeElement.ts"

export default function addStyles(id: string, css: string) {
  removeElementById("okjike-ui-" + id)

  const head = document.querySelector("head")
  const style = document.createElement("style")
  style.id = "okjike-ui-" + id
  style.textContent = css.trim().split("\n").join("")
  head?.appendChild(style)
}

export function removeStyles(id: string) {
  removeElementById("okjike-ui-" + id)
}

export function stylesExist(id: string) {
  return document.getElementById("okjike-ui-" + id)
}
