import selectors from "../selectors"
import addStyles from "./style"

export function hiddenNewPost() {
  addStyles(
    "hiddenNewPost",
    `
    ${selectors.mainColumnItems.newPost} {
      display: none;
    }
    `
  )
}
