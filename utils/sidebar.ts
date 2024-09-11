import selectors from "../Selectors";
import { devLog } from "./log";
import { addStyles } from "./style";

export function hiddenSidebar(hidden: boolean) {
  if (hidden) {
    addStyles(
      "hiddenSidebar",
      `
      ${selectors.sideBar} {
        display: none;
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
    );
    devLog("hiddenSidebar true");
  } else {
    addStyles(
      "hiddenSidebar",
      `
      ${selectors.sideBar} {
        display: none;
      }
      `
    );
    devLog("hiddenSidebar false");
  }
}
