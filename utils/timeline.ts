import Selectors from "../Selectors";
import selectors from "../Selectors";
import { devLog, devLogError } from "./log";
import { addStyles, removeStyles } from "./style";

import Masonry from "masonry-layout";

export function isTimelineUrl(url: string) {
  return url === "/" || url === "/recommend";
}

export function changeTimelineStyle(open: boolean) {
  const navBarWidth = document
    .querySelector(`${selectors.navBar} > div`)
    ?.getBoundingClientRect().width;

  if (navBarWidth) {
    const postWidth = navBarWidth / ((navBarWidth / 400) >> 0);

    if (open) {
      addStyles(
        "timelineStyle",
        `
        ${selectors.mainColumn} {
          min-width: 600px;
          max-width: 100%;
          padding: 0px 160px;
        }
        @media (max-width: 1536px) {
          ${selectors.mainColumn} { padding: 0px 48px; }
        }
        @media (max-width: 1280px) {
          ${selectors.mainColumn} { padding: 0px 32px; }
        }
        @media (max-width: 1024px) {
          ${selectors.mainColumn} { padding: 0px 16px; }
        }

        ${selectors.mainColumnItems.posts} > div {
          width: ${postWidth}px;
          height: fit-content;
          padding: 0 5px;
        }
        ${selectors.mainColumnItems.posts} > div > div {
          border-color: transparent;
          border-top-width: 10px;
        }

        /* 帖子宽度过小时帖子的操作栏会溢出 */
        ${selectors.mainColumnItems.postAction} { justify-content: space-between; }
        ${selectors.mainColumnItems.postAction} > div { min-width: unset; }
        ${selectors.mainColumnItems.postAction} > div.flex-1 { flex: 0; }
        `
      );
      devLog("changeTimelineStyle", true);
    } else {
      removeStyles("timelineStyle");
      devLog("changeTimelineStyle", false);
    }
  } else {
    devLogError("changeTimelineStyle can not found navBarWidth", navBarWidth);
  }
}

export function updatePostLocation() {
  devLog("updatePostLocation start");

  const navBarWidth = document
    .querySelector(`${selectors.navBar} > div`)
    ?.getBoundingClientRect().width;
  devLog("navBarWidth", navBarWidth);

  if (navBarWidth) {
    const postWidth = navBarWidth / ((navBarWidth / 400) >> 0);
    devLog("postWidth", postWidth);
    const masonry = new Masonry(selectors.mainColumnItems.posts, {
      columnWidth: postWidth,
      itemSelector: `${selectors.mainColumnItems.posts} > div`,
      transitionDuration: 0,
      percentPosition: true,
    });
    devLog("masonry", masonry);
  }
  devLog("updatePostLocation done");
}

export function observerPosts() {
  const postsContainer = document.querySelector(
    Selectors.mainColumnItems.posts
  );
  if (postsContainer) {
    updatePostLocation();
    new MutationObserver((recordList) => {
      updatePostLocation();
    }).observe(postsContainer, {
      childList: true,
    });
    devLog("observerPosts", true);
    return true;
  }

  devLog("observerPosts", false);
  return false;
}

export function hiddenTimeline(hidden: boolean) {
  if (hidden) {
    addStyles(
      "hiddenTimeline",
      `
        ${selectors.mainColumn} { opacity: 0; };
      `
    );
    devLog("hiddenTimeline", true);
  } else {
    removeStyles("hiddenTimeline");
    devLog("hiddenTimeline", false);
  }
}
