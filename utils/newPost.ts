import selectors from "../Selectors";
import { devLog } from "./log";
import { addStyles, removeStyles } from "./style";

export function hiddenNewPost(hidden: boolean) {
  if (hidden) {
    addStyles(
      "hiddenNewPost",
      `
      ${selectors.mainColumnItems.newPost} {
        display: none;
      }
      `
    );
    devLog("hiddenNewPost true");
  } else {
    removeStyles("hiddenNewPost");
    devLog("hiddenNewPost false");
  }
}