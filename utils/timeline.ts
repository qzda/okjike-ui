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

        /* body:has(${selectors.mainColumnItems.posts} > div article + div) { overflow-y: hidden; } */
        ${selectors.mainColumnItems.posts} > div article [class*="AudioContent___StyledFlex"] { width: 100%; }

        /* 帖子宽度过小时帖子的操作栏会溢出 */
        ${selectors.mainColumnItems.postAction} { justify-content: space-between; }
        ${selectors.mainColumnItems.postAction} > div { min-width: unset; }
        ${selectors.mainColumnItems.postAction} > div.flex-1 { flex: 0; }

        ${selectors.mainColumnItems.posts} > div article > div:nth-child(2) > div:nth-child(2),
        ${selectors.mainColumnItems.posts} > div article > div:nth-child(2) > div:nth-child(3) {
          margin-left: calc(-1rem - 40px);
        }

        ${selectors.mainColumnItems.newMessage} {
          padding: 0 5px;
          border: none;
        }
        `
    );
    devLog("style", style);
  } else {
    removeStyles("timelineStyle");
  }
  devLog("changeTimelineStyle", open);
  devLog("changeTimelineStyle done");
}

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
    const masonry = new Masonry(selectors.mainColumnItems.posts, {
      columnWidth: postWidth,
      itemSelector: `${selectors.mainColumnItems.posts} > div`,
      transitionDuration: 0,
    });
    devLog("masonry", masonry);
  } else {
    devLogError("updatePostLocation can not found homeLink", homeLink);
  }
  devLog("updatePostLocation done");
}

export function observerPosts() {
  devLog("observerPosts start");

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
    devLog("observerPosts done");

    return true;
  }
  devLog("observerPosts", false);
  devLog("observerPosts done");
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
