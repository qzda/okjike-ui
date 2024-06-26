import { addStyles, removeStyles } from "./style"
import selectors from "../selectors"
import { getStorage, setStorage } from "../../../utils/chromeStorage"
import { KeyTimelineWidth } from "../../../storageKeys"
import { log } from "../../../utils/log"
import { createThrottler } from "../../../utils/function"

export function changeTimelineWidth(width: number, pathname: string) {
  if (isTimelineUrl(pathname)) {
    addStyles(
      "timelineWidth",
      `
      ${selectors.mainColumn} {
        width: ${width}px !important;
        max-width: 100% !important;
      }
      `
    )
  } else {
    removeStyles("timelineWidth")
  }
}

export function changeKeyTimelinePostAlign(align: string) {
  if (align === "on") {
    addStyles(
      "timelinePostAlign",
      `
      ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(2),
      ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(3) {
        width: calc(100% + 56px);
        margin-left: -56px;
      }
      `
    )
  } else {
    removeStyles("timelinePostAlign")
  }
}

export function changeTimelineCardStyle(pathname: string) {
  if (isTimelineUrl(pathname)) {
    addStyles(
      "timelineCardStyle",
      `
      ${selectors.mainColumnItems.posts} > div > div {
        border-radius: 10px;
        overflow: hidden;
      }
      ${selectors.mainColumnItems.posts} > div article {
        padding: 12px !important;
      }
      /* 动态操作栏 */
      ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(3) > div:last-child {
        justify-content: space-between;
        user-select: none;
      }
      ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(3) > div:last-child > div {
        min-width: auto;
      }
      ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(3) > div:last-child > div.flex-1 {
        display: none;
      }
      `
    )
  } else {
    removeStyles("timelineCardStyle")
  }
}

const posts = new Set<HTMLDivElement>()
const cardMinWidth = 400
const gap = 8
let _pathname = ""
let scrollListeners: ((this: Document, ev: Event) => void)[] = []

/**
 * @param layout "default" or "waterfall"
 */
export function changeTimelineLayout(layout: string, pathname: string) {
  function updatePosts() {
    if (_pathname !== location.pathname) {
      _pathname = location.pathname
      posts.clear()
    }
    const _posts = [
      ...(document.querySelector<HTMLDivElement>(
        `${selectors.mainColumnItems.posts}`
      )?.childNodes || []),
    ].slice(0, -1)
    _posts.forEach((_post) => {
      posts.add(_post as HTMLDivElement)
    })
    log("posts", [...posts])
  }

  function initWaterfall() {
    if (!isTimelineUrl(location.pathname)) {
      cancelWaterfall()
      return
    }
    updatePosts()
    getStorage(KeyTimelineWidth).then((val) => {
      // debugger
      const maxWidth =
        (document
          .querySelector(`${selectors.navBar} > div`)
          ?.getBoundingClientRect().width ||
          document.body.getBoundingClientRect().width * 0.85) >> 0
      const timelineWidth = Math.min(+val, maxWidth)

      if (timelineWidth === maxWidth && +val !== maxWidth) {
        setStorage({
          [KeyTimelineWidth]: maxWidth,
        })
      }

      const cols = (timelineWidth / cardMinWidth) >> 0
      const postsGroupByCol = new Array(cols)
        .fill(0)
        .map<HTMLDivElement[]>(() => [])
      let [postsGroupByColIndex, postsIndex] = [0, 0]
      const _posts = [...posts]
      while (postsGroupByColIndex < cols && postsIndex < _posts.length) {
        postsGroupByCol[postsGroupByColIndex].push(_posts[postsIndex])

        postsIndex++
        postsGroupByColIndex++
        if (postsGroupByColIndex === cols) {
          postsGroupByColIndex = 0
        }
      }

      postsGroupByCol.forEach((posts) => {
        for (let i = 1; i < posts.length; i++) {
          const element = posts[i]
          const previousElement = posts[i - 1]

          const heightDiff =
            ((
              previousElement.firstChild as HTMLDivElement
            )?.getBoundingClientRect().height || 0) -
            previousElement.getBoundingClientRect().height

          element.style.marginTop = `${heightDiff}px`
        }
      })
    })
  }

  function cancelWaterfall() {
    posts.forEach((post) => {
      post.style.marginTop = ""
    })
    posts.clear()
  }

  function resetScrollListener() {
    scrollListeners.forEach((listener) => {
      document.removeEventListener("scroll", listener)
    })
    scrollListeners = []
  }

  // debugger
  if (isTimelineUrl(pathname)) {
    const throttler = createThrottler()
    const throttledFunction = throttler.throttle(() => {
      initWaterfall()
    }, 500) // 节流函数在每500毫秒内最多执行一次
    if (layout === "waterfall") {
      addStyles(
        "timelineLayout",
        `
        ${selectors.mainColumnItems.posts} {
          display: flex;
          flex-flow: row wrap;
          gap: ${gap}px;
          margin-top: ${gap}px;
        }

        ${selectors.mainColumnItems.posts} > div {
          flex: 1;
          min-width: ${cardMinWidth}px;
        }
        `
      )
      initWaterfall()
      // 500ms后再计算一次，确保无误
      setTimeout(() => {
        initWaterfall()
      }, 500)
      resetScrollListener()
      scrollListeners.push(throttledFunction)
      document.addEventListener("scroll", throttledFunction)
    } else {
      addStyles(
        "timelineLayout",
        `
        ${selectors.mainColumnItems.posts} {
          display: flex;
          flex-direction: column;
          gap: ${gap}px;
          margin-top: ${gap}px;
        }
        `
      )
      cancelWaterfall()
      resetScrollListener()
    }
  } else {
    cancelWaterfall()
    removeStyles("timelineLayout")
    resetScrollListener()
  }
}

export function isTimelineUrl(url: string) {
  return url === "/" || url === "/recommend"
}
