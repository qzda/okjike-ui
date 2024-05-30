import selectors from "../selectors"
import addStyles from "./style"

export function hiddenSidebar() {
  addStyles(
    "hiddenSidebar",
    `
    ${selectors.sideBar} {
      display: none;
    }
    `
  )
}
