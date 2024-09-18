import { removeElementById } from "./element.ts";
import { hiddenNewPost } from "./newPost.ts";
import { hiddenSidebar } from "./sidebar.ts";
import { changeTimelineStyle, isTimelineUrl } from "./timeline.ts";

export function addStyles(id: string, css: string) {
  const styleID = "okjike-ui-" + id;
  const oldStyle = document.getElementById(styleID) as HTMLStyleElement | null;
  const head = document.querySelector("head");

  if (oldStyle) {
    if (oldStyle.textContent !== css) {
      oldStyle.textContent = css;
    }
    return oldStyle;
  } else {
    const style = document.createElement("style");
    style.id = styleID;
    style.textContent = css;
    head?.appendChild(style);
    return style;
  }
}

export function removeStyles(id: string) {
  const styleID = "okjike-ui-" + id;

  removeElementById(styleID);
}

export function changeStyles(pathname: string) {
  const b = isTimelineUrl(pathname);
  changeTimelineStyle(b);
  hiddenNewPost(b);
  hiddenSidebar(b);
}
