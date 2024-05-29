import selectors from "../selectors"
import addStyles from "./style"

export function changeKeySidebarHidden(hidden: string) {
  if (hidden === "on") {
    addStyles(
      "sidebarHidden",
      `
      ${selectors.sideBar} {
        display: none;
      }
      `
    )
  } else {
    addStyles("sidebarHidden", "")
  }
}
