"use strict";
import { devLog, log } from "../utils/log";
import {
  changeTimelineStyle,
  hiddenTimeline,
  isTimelineUrl,
  observerPosts,
  updatePostLocation,
} from "../utils/timeline";

import { initMenuCommand } from "./initMenuCommand";

import { changeStyles } from "../utils/style";
import { hiddenBody } from "../utils/element";
import { hiddenSidebar } from "../utils/sidebar";
import { hiddenNewPost } from "../utils/newPost";

function main() {
  changeStyles(location.pathname);

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
hiddenBody(true);

window.addEventListener("load", (event) => {
  devLog("window load");
  if (isTimelineUrl(location.pathname)) {
    hiddenSidebar(true);
    hiddenNewPost(true);
    changeTimelineStyle(true);

    observerPosts();
    hiddenBody(false);
  } else {
    changeTimelineStyle(false);
  }

  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    const url = new URL(info.url as string);

    changeStyles(url.pathname);

    const interval = setInterval(() => {
      if (isTimelineUrl(url.pathname)) {
        hiddenTimeline(true);
        if (observerPosts()) {
          hiddenTimeline(false);
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 200);
  });
});
