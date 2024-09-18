"use strict";
import { devLog, log } from "../utils/log";
import {
  isTimelineUrl,
  observerPosts,
  updatePostLocation,
} from "../utils/timeline";

import { initMenuCommand } from "./initMenuCommand";

import { changeStyles } from "../utils/style";

function main() {
  changeStyles(location.pathname);

  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    const url = new URL(info.url as string);

    changeStyles(url.pathname);

    const interval = setInterval(() => {
      if (isTimelineUrl(url.pathname)) {
        if (observerPosts()) {
          // hiddenTimeline(false);
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 200);
  });

  window.addEventListener("load", (event) => {
    devLog("window load");
    if (isTimelineUrl(location.pathname)) {
      updatePostLocation();
    }
  });

  // let resizeFlag = true;
  // window.addEventListener("resize", (e) => {
  //   if (resizeFlag && isTimelineUrl(location.pathname)) {
  //     resizeFlag = false;
  //     devLog("window resize updatePostLocation");
  //     setTimeout(() => {
  //       changeTimelineStyle(true);
  //       updatePostLocation();
  //       resizeFlag = true;
  //     }, 200);
  //   }
  // });
}

log();
initMenuCommand();

const mainInterval = setInterval(() => {
  if (isTimelineUrl(location.pathname)) {
    if (observerPosts()) {
      main();
      clearInterval(mainInterval);
    }
  } else {
    main();
    clearInterval(mainInterval);
  }
}, 200);
