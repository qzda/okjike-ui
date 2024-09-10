import selectors from "../Selectors";
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
  } else {
    removeStyles("hiddenNewPost");
  }
}
