import {
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
  changeTimelineCardStyle()
  changeTimelineWidth(+data[KeyTimelineWidth])
  changeTimelineLayout(data[KeyTimelineLayout].toString())
  changeKeyTimelinePostAlign(data[KeyTimelinePostAlign].toString())

  hiddenNewPost()

  hiddenSidebar()
}
