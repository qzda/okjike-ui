import { removeElementById } from "./element.ts"

export default function addStyles(id: string, css: string) {
  removeElementById("okjike-ui-" + id)

  const head = document.querySelector("head")
  const style = document.createElement("style")
  style.id = "okjike-ui-" + id
  style.textContent = css.trim()
  head?.appendChild(style)
}
