"use strict";
import { log } from "../../utils/log";
import selectors from "../../selectors";
import { isTimelineUrl } from "../content-scripts/utils/timeline";

function mutationObserverPostsContainer() {
  const postsContainer = document.querySelector(
    selectors.mainColumnItems.posts
  );
  if (postsContainer) {
    new MutationObserver((recordList) => {
      log(recordList, [...postsContainer.childNodes]);
    }).observe(postsContainer, {
      childList: true,
    });

    return true;
  }

  return false;
}

function main() {
  window.addEventListener("urlchange", (info: any) => {
    const url = new URL(info.url as string);
    log("urlchange", info);

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

  mutationObserverPostsContainer();
}

log("hello user-script");
main();
