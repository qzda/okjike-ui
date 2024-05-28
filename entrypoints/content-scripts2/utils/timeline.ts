import addStyles from "./style"
import selectors from "../selectors"

export function changeTimelineWidth(width: number) {
  addStyles(
    "timelineWidth",
    `
    @media only screen and (min-width: 988px) {
      ${selectors.mainColumn} {
        width: ${width}px !important;
        max-width: ${width}px !important;
        min-width: ${width}px !important;
      }
    }
    `
  )
}
