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
        flex-flow: row wrap;
        gap: 8px;
        margin-top: 8px;
      }

      ${selectors.mainColumnItems.posts} > div {
        flex: 1;
        min-width: 400px;
      }
      `
    )
  } else {
    addStyles("timelineLayout", "")
  }
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
