"use strict";
import { devLog, log } from "../utils/log";
import {
  isTimelineUrl,
  observerPosts,
  updatePostLocation,
} from "../utils/timeline";

import { changeStyles } from "../utils/style";
import selectors from "../selectors";

log();

devLog("selectors", selectors);

window.onload = () => {
  devLog("onload");

  setTimeout(() => {
    updatePostLocation();

    observerPosts();
  }, 500);
};

// window.addEventListener("urlchange", (info: any) => {
//   devLog("urlchange", info);
//   const url = new URL(info.url as string);

//   changeStyles(url.pathname);

//   if (isTimelineUrl(url.pathname)) {
//     observerPosts();
//   }
// });

window.addEventListener(
  "click",
  (e) => {
    devLog("window click", e);
  },
  true
);
