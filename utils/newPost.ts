import selectors from "../Selectors";
import { addStyles, removeStyles } from "./style";

export function hiddenNewPost(pathname: string) {
  if (pathname === "/") {
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
