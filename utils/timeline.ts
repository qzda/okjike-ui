import Selectors from "../Selectors";
import selectors from "../Selectors";
import { devLog } from "./log";
import { addStyles, removeStyles } from "./style";

import Masonry from "masonry-layout";

export function isTimelineUrl(url: string) {
  return url === "/" || url === "/recommend";
}

/**
 * @param open 开启关闭瀑布流样式
 */
export function changeTimelineStyle(open: boolean) {
  const navBarWidth = document
    .querySelector(`${selectors.navBar} > div`)
    ?.getBoundingClientRect().width;
  devLog("navBarWidth", navBarWidth);

  const postWidth =
    (navBarWidth || document.body.getBoundingClientRect().width) /
    (((navBarWidth || document.body.getBoundingClientRect().width) / 400) >> 0);
  devLog("postWidth", postWidth);

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
    devLog("changeTimelineStyle true");
  } else {
    removeStyles("timelineStyle");
    devLog("changeTimelineStyle false");
  }
}

export const posts = new Set<HTMLDivElement>();

export function initPost() {
  const postsContainer = document.querySelector(
    Selectors.mainColumnItems.posts
  );
  if (postsContainer) {
    postsContainer.childNodes.forEach((child) => {
      posts.add(child as HTMLDivElement);
    });
  }
  devLog("posts init", posts);
  changePostLocation([...posts]);
}

export function changePostLocation(posts: HTMLDivElement[]) {
  const navBarWidth = document
    .querySelector(`${selectors.navBar} > div`)
    ?.getBoundingClientRect().width;
  devLog("navBarWidth", navBarWidth);

  const postWidth =
    (navBarWidth || document.body.getBoundingClientRect().width) /
    (((navBarWidth || document.body.getBoundingClientRect().width) / 400) >> 0);
  devLog("postWidth", postWidth);
  const masonry = new Masonry(selectors.mainColumnItems.posts, {
    columnWidth: postWidth,
    itemSelector: `${selectors.mainColumnItems.posts} > div`,
    transitionDuration: 0,
    percentPosition: true,
  });
  devLog("masonry", masonry);
}

export function mutationObserverPostsContainer() {
  const postsContainer = document.querySelector(
    Selectors.mainColumnItems.posts
  );
  if (postsContainer) {
    initPost();
    new MutationObserver((recordList) => {
      recordList.forEach((record) => {
        record.addedNodes.forEach((node) => {
          posts.add(node as HTMLDivElement);
        });
      });
      devLog("posts update", posts);
      changePostLocation([...posts]);
    }).observe(postsContainer, {
      childList: true,
    });

    return true;
  }

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
    devLog("hiddenTimeline true");
  } else {
    removeStyles("hiddenTimeline");
    devLog("hiddenTimeline false");
  }
}
