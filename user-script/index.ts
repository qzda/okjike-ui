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
    hiddenSidebar(true);
    hiddenNewPost(true);
  } else {
    changeTimelineStyle(false);
    hiddenSidebar(false);
    hiddenNewPost(false);
  }

  hiddenBody(false);

  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    const url = new URL(info.url as string);
    if (isTimelineUrl(url.pathname)) {
      changeTimelineStyle(true);
      hiddenTimeline(true);
    } else {
      changeTimelineStyle(false);
    }

    const interval = setInterval(() => {
      if (isTimelineUrl(url.pathname)) {
        if (observerPosts()) {
          hiddenTimeline(false);
          clearInterval(interval);
        }
      } else {
        if (document.querySelector(selectors.navBar)) {
          clearInterval(interval);
        }
      }
    }, 200);
  });

  window.addEventListener("load", (event) => {
    devLog("window load");
    if (isTimelineUrl(location.pathname)) {
      updatePostLocation();
    }
  });

  let resizeFlag = true;
  window.addEventListener("resize", (e) => {
    if (resizeFlag && isTimelineUrl(location.pathname)) {
      resizeFlag = false;
      devLog("window resize updatePostLocation");
      setTimeout(() => {
        updatePostLocation();
        resizeFlag = true;
      }, 200);
    }
  });
}

log();
initMenuCommand();
hiddenBody(true);

const mainInterval = setInterval(() => {
  if (isTimelineUrl(location.pathname)) {
    if (observerPosts()) {
      main();
      clearInterval(mainInterval);
    }
  } else {
    if (document.querySelector(selectors.navBar)) {
      main();
      clearInterval(mainInterval);
    }
  }
}, 200);
