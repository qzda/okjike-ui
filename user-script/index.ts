"use strict";
import { devLog, log } from "../utils/log";
import {
  changeTimelineStyle,
  hiddenTimeline,
  isTimelineUrl,
  observerPosts,
} from "../utils/timeline";

import { initMenuCommand } from "./initMenuCommand";

import { changeStyles } from "../utils/style";
import { hiddenBody } from "../utils/element";
import { hiddenSidebar } from "../utils/sidebar";
import { hiddenNewPost } from "../utils/newPost";

log();
initMenuCommand();
hiddenBody(true);

window.addEventListener("load", (event) => {
  devLog("window load");
  if (isTimelineUrl(location.pathname)) {
    hiddenSidebar(true);
    hiddenNewPost(true);
    changeTimelineStyle(true);

    const interval = setInterval(() => {
      if (observerPosts()) {
        clearInterval(interval);
        hiddenBody(false);
      }
    }, 200);
  } else {
    changeTimelineStyle(false);
    hiddenBody(false);
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
