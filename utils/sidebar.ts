import selectors from "../Selectors";
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
  } else {
    addStyles(
      "hiddenSidebar",
      `
      ${selectors.sideBar} {
        display: none;
      }
      `
    );
  }
}
