import addStyles from "./style"
import selectors from "../selectors"

export function changeTimelineWidth(width: number) {
  addStyles(
    "timelineWidth",
    `
    ${selectors.mainColumn} {
      width: ${width}px !important;
      max-width: ${width}px !important;
      min-width: ${width}px !important;
    }
    `
  )
}

/**
 * @param layout "default" or "waterfall"
 */
export function changeTimelineLayout(layout: string) {
  if (layout === "waterfall") {
    addStyles(
      "timelineLayout",
      `
      ${selectors.mainColumnItems.posts} {
        display: flex;
        flex-flow: column wrap;
        align-content: space-between;
        height: 100vh;
      }

      ${selectors.mainColumnItems.posts}::before,
      ${selectors.mainColumnItems.posts}::after {
        content: "";
        flex-basis: 100%;
        width: 0;
        order: 2;
      }

      ${selectors.mainColumnItems.posts} > div {
        width: 33%;
        min-width: 300px;
      }

      /* 将内容块重排为3列 */
      ${selectors.mainColumnItems.posts} > div:nth-child(3n+1) { order: 1; }
      ${selectors.mainColumnItems.posts} > div:nth-child(3n+2) { order: 2; }
      ${selectors.mainColumnItems.posts} > div:nth-child(3n)   { order: 3; }
      `
    )
  } else {
    addStyles("timelineLayout", "")
  }
}
