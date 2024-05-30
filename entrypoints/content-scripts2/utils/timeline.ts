import addStyles from "./style"
import selectors from "../selectors"

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

/**
 * @param layout "default" or "waterfall"
 */
export function changeTimelineLayout(layout: string, timelineWidth: number) {
  const gap = 8

  if (layout === "waterfall") {
    const cardMinWidth = 400

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

    initWaterFall(timelineWidth, cardMinWidth)
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
  }
}

function initWaterFall(timelineWidth: number, cardMinWidth: number) {
  const posts = [
    ...document.querySelectorAll<HTMLDivElement>(
      `${selectors.mainColumnItems.posts}  > div`
    ),
  ]

  const cols = (timelineWidth / cardMinWidth) >> 0
  const postsGroupByCol = new Array(cols)
    .fill(0)
    .map<HTMLDivElement[]>(() => [])
  let [postsGroupByColIndex, postsIndex] = [0, 0]
  while (postsGroupByColIndex < cols && postsIndex < posts.length) {
    postsGroupByCol[postsGroupByColIndex].push(posts[postsIndex])

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
        ((previousElement.firstChild as HTMLDivElement)?.getBoundingClientRect()
          .height || 0) - previousElement.getBoundingClientRect().height

      element.style.marginTop = `${heightDiff}px`
    }
  })
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

export function addEventScrollend(layout: string, timelineWidth: number) {
  document.addEventListener("scrollend", (e) => {
    changeTimelineLayout(layout, timelineWidth)

    setTimeout(() => {
      changeTimelineLayout(layout, timelineWidth)
    }, 2000)
  })
}
