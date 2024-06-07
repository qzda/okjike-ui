import selectors from "../selectors"
import addStyles from "./style"

export function hiddenNewPost(pathname: string) {
  if (pathname === "/") {
    addStyles(
      "hiddenNewPost",
      `
      ${selectors.mainColumnItems.newPost} {
        display: none;
      }
      `
    )
  } else {
    addStyles("hiddenNewPost", "")
  }
}
