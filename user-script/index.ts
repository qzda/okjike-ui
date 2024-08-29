"use strict";
import { devLog, log } from "../utils/log";
import Selectors from "../Selectors";
import { isTimelineUrl } from "../utils/timeline";
import { hiddenSidebar } from "../utils/sidebar";
import { initMenuCommand } from "./initMenuCommand";
import selectors from "../Selectors";
import { hiddenBody } from "../utils/element";

const posts = new Set<Element>();

function initPost() {
  const postsContainer = document.querySelector(
    Selectors.mainColumnItems.posts
  );
  if (postsContainer) {
    postsContainer.childNodes.forEach((child) => {
      posts.add(child as Element);
    });
  }
  devLog("posts init", posts);
}

function mutationObserverPostsContainer() {
  const postsContainer = document.querySelector(
    Selectors.mainColumnItems.posts
  );
  if (postsContainer) {
    initPost();
    new MutationObserver((recordList) => {
      recordList.forEach((record) => {
        record.addedNodes.forEach((node) => {
          posts.add(node as Element);
        });
      });
      devLog("posts update", posts);
    }).observe(postsContainer, {
      childList: true,
    });

    return true;
  }

  return false;
}

function main() {
  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    posts.clear();
    devLog("posts clear", posts);

    const url = new URL(info.url as string);

    const interval = setInterval(() => {
      if (isTimelineUrl(url.pathname)) {
        if (mutationObserverPostsContainer()) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 200);
  });

  initMenuCommand();
  hiddenSidebar(true);
  hiddenBody(false);
}

log();
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
    }
  }
}, 200);
