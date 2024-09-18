import Selectors from "../Selectors";
import selectors from "../Selectors";
import { devLog, devLogError } from "./log";
import { addStyles, removeStyles } from "./style";

import Masonry from "masonry-layout";

export const PostMinWidth = 400;

export function isTimelineUrl(url: string) {
  return url === "/" || url === "/recommend";
}

export function changeTimelineStyle(open: boolean) {
  devLog("changeTimelineStyle start");
  if (open) {
    const navBarWidth = document
      .querySelector(`${selectors.navBar} > div`)
      ?.getBoundingClientRect().width;
    const postWidth = navBarWidth
      ? navBarWidth / ((navBarWidth / PostMinWidth) >> 0)
      : PostMinWidth;

    devLog("navBarWidth", navBarWidth);
    devLog("postWidth", postWidth);

    const style = addStyles(
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
          height: fit-content;
          min-width: ${PostMinWidth}px;
          width: ${postWidth}px;
        }
        ${selectors.mainColumnItems.posts} > div > div {
          border-color: transparent;
          border-top-width: 10px;
          border-left-width: 5px;
          border-right-width: 5px;
        }

        /* 帖子宽度过小时帖子的操作栏会溢出 */
        ${selectors.mainColumnItems.postAction} { justify-content: space-between; }
        ${selectors.mainColumnItems.postAction} > div { min-width: unset; }
        ${selectors.mainColumnItems.postAction} > div.flex-1 { flex: 0; }
        `
    );
    devLog("style", style);
  } else {
    removeStyles("timelineStyle");
  }
  devLog("changeTimelineStyle", open);
  devLog("changeTimelineStyle done");
}

let updatePostLocationFlag = true;

export function updatePostLocation() {
  devLog("updatePostLocation start");
  const homeLink = document.querySelector(selectors.navBarItems.linksItem.home);
  if (homeLink) {
    const navBar = document.querySelector(`${selectors.navBar} > div`)!;
    const navBarWidth = navBar?.getBoundingClientRect().width;
    const postWidth = navBarWidth / ((navBarWidth / PostMinWidth) >> 0);
    const cols = navBarWidth / postWidth;
    devLog("navBarWidth", navBarWidth);
    devLog("postWidth", postWidth);
    devLog("cols", cols);

    const interval = setInterval(() => {
      if (updatePostLocationFlag) {
        updatePostLocationFlag = false;
        const posts = document.querySelector(selectors.mainColumnItems.posts);
        if (posts && posts.getBoundingClientRect().width === navBarWidth) {
          clearInterval(interval);
          const masonry = new Masonry(selectors.mainColumnItems.posts, {
            columnWidth: postWidth,
            itemSelector: `${selectors.mainColumnItems.posts} > div`,
            transitionDuration: 0,
          });
          devLog("masonry", masonry);
          updatePostLocationFlag = true;
        }
      }
    }, 100);
  } else {
    devLogError("updatePostLocation can not found homeLink", homeLink);
  }
  devLog("updatePostLocation done");
}

export function observerPosts() {
  const postsContainer = document.querySelector(
    Selectors.mainColumnItems.posts
  );
  const homeLink = document.querySelector(selectors.navBarItems.linksItem.home);
  devLog("homeLink", homeLink);
  if (postsContainer && homeLink) {
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
    addStyles("hiddenTimeline", `${selectors.mainColumn} { opacity: 0; };`);
  } else {
    removeStyles("hiddenTimeline");
  }
  devLog("hiddenTimeline", hidden);
}
