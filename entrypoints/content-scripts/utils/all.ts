import {
  KeyPathname,
  KeyTimelineLayout,
  KeyTimelinePostAlign,
  KeyTimelineWidth,
} from "../../../storage-keys"
import { hiddenNewPost } from "./newPost"
import { hiddenSidebar } from "./sidebar"
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

  hiddenSidebar()
  hiddenNewPost(pathname)

  changeTimelineCardStyle(pathname)
  changeTimelineWidth(timelineWidth, pathname)
  changeTimelineLayout(timelineLayout, pathname)
  changeKeyTimelinePostAlign(timelinePostAlign)
}
