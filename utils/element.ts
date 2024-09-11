import { devLog } from "./log";
import { addStyles, removeStyles } from "./style";

export function removeElementById(id: string) {
  document.getElementById(id)?.remove();
}

export function removeElement(selector: string) {
  document.querySelector(selector)?.remove();
}

export function hiddenBody(hidden: boolean) {
  if (hidden) {
    addStyles(
      "okjike-body",
      `
        body { opacity: 0; };
      `
    );
    devLog("hiddenBody true");
  } else {
    removeStyles("okjike-body");
    devLog("hiddenBody false");
  }
}
