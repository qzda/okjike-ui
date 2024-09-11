import Selectors from "../Selectors";
import selectors from "../Selectors";
import { devLog } from "./log";
import { addStyles, removeStyles } from "./style";

export function isTimelineUrl(url: string) {
  return url === "/" || url === "/recommend";
}

/**
 * @param open 开启关闭瀑布流样式
 */
export function changeTimelineStyle(open: boolean) {
  if (open) {
    addStyles(
      "timelineStyle",
      `
      ${selectors.mainColumn} {
        opacity: 0.5;
        min-width: 600px;
        max-width: 1600px;
      }

      ${selectors.mainColumnItems.posts} {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.5rem;
      }

      ${selectors.mainColumnItems.posts} > div {
        flex: 1;
        min-width: 500px;
      }
      `
    );
    devLog("changeTimelineStyle true");
    changePostMargin([...posts.values()] as HTMLDivElement[]);
  } else {
    removeStyles("timelineStyle");
    devLog("changeTimelineStyle false");
  }
}

export const posts = new Set<Element>();

export function initPost() {
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

export function changePostMargin(posts: HTMLDivElement[]) {
  if (!posts.length) {
    return;
  }

  let [rows, firstPostHeight] = [1, posts[0].getBoundingClientRect().height];
  for (let i = 1; i < posts.length; i++) {
    if (posts[i].getBoundingClientRect().height === firstPostHeight) {
      rows++;
    } else {
      break;
    }
  }

  devLog("rows", rows);
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
