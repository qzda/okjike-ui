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
        opacity: 0.5; /* todo 正式环境需要去掉opacity */
        min-width: 600px;
        max-width: 100%;
      }

      @media (max-width: 1536px) {
        ${selectors.mainColumn} { padding: 0px 48px; }
      }

      ${selectors.mainColumnItems.posts} {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding-top: 0.5rem;
      }

      ${selectors.mainColumnItems.posts} > div {
        flex: 1;
        min-width: 400px;
        height: fit-content;
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
  changePostMargin([...posts]);
}

export function changePostMargin(posts: HTMLDivElement[]) {
  if (!posts.length) {
    return;
  }

  const firstPostWidth = posts[0].getBoundingClientRect().width;
  const parentElementWidth =
    posts[0].parentElement!.getBoundingClientRect().width;

  const cols = (parentElementWidth / firstPostWidth) >> 0;
  devLog("cols", cols);

  /**
   * 以3列为例
   * 0 1 2
   * 3 4 5
   * 6 7 8
   */
  for (let i = cols; i < posts.length; i++) {
    const [thisPost, lastPost] = [posts[i], posts[i - cols]];
    thisPost.style.marginTop = `calc(${
      lastPost.getBoundingClientRect().bottom -
      thisPost.getBoundingClientRect().top
    }px + 0.5rem)`;
  }
  devLog("marginTop done");
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
      changePostMargin([...posts]);
    }).observe(postsContainer, {
      childList: true,
    });

    return true;
  }

  return false;
}
