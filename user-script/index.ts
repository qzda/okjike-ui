"use strict";
import { devLog, log } from "../utils/log";
import Selectors from "../Selectors";
import {
  changeTimelineStyle,
  isTimelineUrl,
  mutationObserverPostsContainer,
  posts,
} from "../utils/timeline";
import { hiddenSidebar } from "../utils/sidebar";
import { initMenuCommand } from "./initMenuCommand";
import selectors from "../Selectors";
import { hiddenBody } from "../utils/element";
import { hiddenNewPost } from "../utils/newPost";

function main() {
  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    posts.clear();
    devLog("posts clear", posts);

    const url = new URL(info.url as string);

    const interval = setInterval(() => {
      if (isTimelineUrl(url.pathname)) {
        if (mutationObserverPostsContainer()) {
          changeTimelineStyle(true);
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
        changeTimelineStyle(false);
      }
    }, 200);
  });

  hiddenSidebar(true);
  hiddenNewPost(true);
  hiddenBody(false);

  if (isTimelineUrl(location.pathname)) {
    changeTimelineStyle(true);
  }
}

log();
devLog("Selectors", Selectors);
initMenuCommand();
hiddenBody(true);

const mainInterval = setInterval(() => {
  if (isTimelineUrl(location.pathname)) {
    if (mutationObserverPostsContainer()) {
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
