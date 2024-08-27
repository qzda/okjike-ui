import selectors from "../../../selectors"
import { addStyles } from "./style"
import { isTimelineUrl } from "./timeline"

export function changeKeyHiddenSidebar(hidden: string, pathname: string) {
  if (isTimelineUrl(pathname) && hidden === "off") {
    addStyles(
      "hiddenSidebar",
      `
      @keyframes showSideBar {
        0% {
          right: -100%;
        }
        100% {
          right: 0%;
        }
      }
      ${selectors.sideBar} {
        position: fixed;
        right: -100%;
        height: fit-content;
        padding: 8px;
        margin: 0;
        gap: 8px;
        animation: showSideBar 0.2s ease-in-out forwards;
      }
      ${selectors.sideBar} > div {
        margin: 0;
        border-radius: 10px;
        overflow: hidden;
        box-shadow:
          4px 8px 8px rgba(128, 128, 128, 0.5);
      }
      ${selectors.sideBar} > footer {
        display: none;
      }
      `
    )
  } else {
    addStyles(
      "hiddenSidebar",
      `
      ${selectors.sideBar} {
        display: none;
      }
      `
    )
  }
}
