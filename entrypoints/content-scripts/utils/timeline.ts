import addStyles from "./style"
import selectors from "../selectors"
import { getStorage } from "../../../utils/chromeStorage"
import { KeyTimelineWidth } from "../../../storage-keys"

export function changeTimelineWidth(width: number) {
  addStyles(
    "timelineWidth",
    `
    ${selectors.mainColumn} {
      width: ${width}px !important;
      max-width: 100% !important;
      min-width: ${width}px !important;
    }
    `
  )
}

export function changeTimelineCardStyle() {
  addStyles(
    "timelineCardStyle",
    `
    ${selectors.mainColumnItems.posts} > div > div {
      border-radius: 4px;
      overflow: hidden;
    }
    ${selectors.mainColumnItems.posts} > div article {
      padding: 12px !important;
    }
    ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(2),
    ${selectors.mainColumnItems.posts} > div article > div:last-child > div:nth-child(3) {
      width: calc(100% + 56px);
      margin-left: -56px;
    }
    `
  )
}

/**
 * @param layout "default" or "waterfall"
 */
export function changeTimelineLayout(layout: string) {
  const posts = new Set<HTMLDivElement>()
  const cardMinWidth = 400
  const gap = 8
  let pathname = ""

  function updatePosts() {
    if (pathname !== location.pathname) {
      pathname = location.pathname
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
    console.log("posts.size", posts.size)
  }

  function initWaterfall() {
    updatePosts()
    getStorage(KeyTimelineWidth).then((val) => {
      const timelineWidth = +val

      const cols = (timelineWidth / cardMinWidth) >> 0
      const postsGroupByCol = new Array(cols)
        .fill(0)
        .map<HTMLDivElement[]>(() => [])
      let [postsGroupByColIndex, postsIndex] = [0, 0]
      const _posts = [...posts.values()]
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
    document.addEventListener("scroll", initWaterfall)
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
    document.removeEventListener("scroll", initWaterfall)
  }
}
