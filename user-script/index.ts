"use strict";
import { devLog, log } from "../utils/log";
import {
  changeTimelineStyle,
  hiddenTimeline,
  isTimelineUrl,
  observerPosts,
  updatePostLocation,
} from "../utils/timeline";
import { hiddenSidebar } from "../utils/sidebar";
import { initMenuCommand } from "./initMenuCommand";
import selectors from "../Selectors";
import { hiddenBody } from "../utils/element";
import { hiddenNewPost } from "../utils/newPost";

function main() {
  if (isTimelineUrl(location.pathname)) {
    changeTimelineStyle(true);
    hiddenNewPost(true);
    hiddenSidebar(true);
  } else {
    changeTimelineStyle(false);
    hiddenNewPost(false);
    hiddenSidebar(false);
  }

  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    const url = new URL(info.url as string);

    if (isTimelineUrl(url.pathname)) {
      changeTimelineStyle(true);
      hiddenNewPost(true);
      hiddenSidebar(true);
    } else {
      changeTimelineStyle(false);
      hiddenNewPost(false);
      hiddenSidebar(false);
    }

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
