import {
  KeyHiddenSidebar,
  KeyPathname,
  KeyTimelineLayout,
  KeyTimelinePostAlign,
  KeyTimelineWidth,
} from "../../../storageKeys"
import { hiddenNewPost } from "./newPost"
import { changeKeySidebar } from "./sidebar"
import {
  changeTimelineLayout,
  changeTimelineWidth,
  changeTimelineCardStyle,
  changeKeyTimelinePostAlign,
} from "./timeline"

export function injectAllChanges(data: Record<string, string | number>) {
  const pathname = data[KeyPathname].toString()
  const timelineLayout = data[KeyTimelineLayout].toString()
  const timelineWidth = +data[KeyTimelineWidth]
  const timelinePostAlign = data[KeyTimelinePostAlign].toString()
  const hiddenSidebar = data[KeyHiddenSidebar].toString()

  hiddenNewPost(pathname)
  changeKeySidebar(hiddenSidebar)

  changeTimelineCardStyle(pathname)
  changeTimelineWidth(timelineWidth, pathname)
  changeTimelineLayout(timelineLayout, pathname)
  changeKeyTimelinePostAlign(timelinePostAlign)
}
