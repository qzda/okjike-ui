import { removeElementById } from "./element.ts"

export function addStyles(id: string, css: string) {
  const styleID = "okjike-ui-" + id
  const oldStyle = document.getElementById(styleID)
  const head = document.querySelector("head")

  if (oldStyle) {
    if (oldStyle.textContent !== css) {
      oldStyle.textContent = css
    }
  } else {
    const style = document.createElement("style")
    style.id = styleID
    style.textContent = css
    head?.appendChild(style)
  }
}

export function removeStyles(id: string) {
  const styleID = "okjike-ui-" + id

  removeElementById(styleID)
}
