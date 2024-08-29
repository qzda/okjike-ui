"use strict";
import { devLog, log } from "../utils/log";
import Selectors from "../Selectors";
import { isTimelineUrl } from "../utils/timeline";
import { hiddenSidebar } from "../utils/sidebar";

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

function init() {
  if (isTimelineUrl(location.pathname)) {
    mutationObserverPostsContainer();

    hiddenSidebar(true);
  }

  // @ts-ignore
  GM_registerMenuCommand(
    "Show Alert",
    function (event: MouseEvent | KeyboardEvent) {
      alert("Menu item selected");
    },
    {
      accessKey: "a",
      autoClose: true,
    }
  );
}

function main() {
  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    posts.clear();
    devLog("posts clear", posts);

    const url = new URL(info.url as string);
    if (isTimelineUrl(url.pathname)) {
      let done = false;
      let interval = setInterval(() => {
        if (done) {
          clearInterval(interval);
        } else {
          done = mutationObserverPostsContainer();
        }
      }, 200);
    }
  });

  init();
}

log();
main();
