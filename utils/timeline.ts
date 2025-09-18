import selectors from "../selectors";
import { devLog, devLogError } from "./log";

import Masonry from "masonry-layout";
import { addStyles } from "./style";

export function isTimelineUrl(url: string) {
  return url === "/following" || url === "/explore";
}

export function updatePostLocation() {
  devLog("updatePostLocation start");

  addStyles(
    "hidden-addNewPost",
    `
      ${selectors.addNewPost} {
        display: none;
      }
    `
  );

  const postsWrapper = document.querySelector(selectors.postsWrapper);
  if (postsWrapper) {
    const postWidth = postsWrapper.getBoundingClientRect().width;
    devLog("postWidth", postWidth);
    const masonry = new Masonry(selectors.postsWrapper, {
      columnWidth: (postWidth / 3) >> 0,
      itemSelector: selectors.posts,
      transitionDuration: 0,
    });
    devLog("masonry", masonry);
  } else {
    devLogError(
      "updatePostLocation can not found postsWrapper",
      selectors.postsWrapper
    );
  }
  devLog("updatePostLocation done");
}

export function observerPosts() {
  devLog("observerPosts start");

  const postsWrapper = document.querySelector(selectors.postsWrapper);
  if (postsWrapper) {
    updatePostLocation();
    new MutationObserver(() => {
      updatePostLocation();
    }).observe(postsWrapper, {
      childList: true,
    });
  }
}
