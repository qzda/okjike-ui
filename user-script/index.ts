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
import selectors from "../Selectors";

log();
initMenuCommand();
hiddenBody(true);

window.addEventListener("load", (event) => {
  devLog("window load");
  hiddenSidebar(true);
  if (isTimelineUrl(location.pathname)) {
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

  window.addEventListener('click', e => {
    devLog("window click", e);

    if (e.target) {
      const target = e.target as Element;

      // 展开/收起全文
      if (target.innerHTML === "收起全文"
        || target.innerHTML === '展开全文') {
        devLog("展开/收起全文");

        setTimeout(() => {
          updatePostLocation();
        }, 300);
        setTimeout(() => {
          updatePostLocation();
        }, 1000);

        updatePostLocation();

        return
      }

      // 展开/收起评论
      const commentElement = document.querySelectorAll(`${selectors.mainColumnItems.postAction} > div:nth-child(2)`);
      if ([...commentElement].some(item => item.contains(target))) {
        devLog("展开/收起评论");

        setTimeout(() => {
          updatePostLocation();
        }, 300);
        setTimeout(() => {
          updatePostLocation();
        }, 1000);

        return
      }
    }
  }, true);
});
