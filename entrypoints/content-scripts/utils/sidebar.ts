import selectors from "../selectors"
import { addStyles, removeStyles } from "./style"

export function changeKeySidebar(hidden: string) {
  if (hidden === "on") {
    addStyles(
      "hiddenSidebar",
      `
      ${selectors.sideBar} {
        display: none;
      }
      `
    )
  } else {
    removeStyles("hiddenSidebar")
  }
}
