import { KeyTimelineLayout, KeyTimelineWidth } from "../../../storage-keys"
import { hiddenNewPost } from "./newPost"
import { hiddenSidebar } from "./sidebar"
import {
  changeTimelineLayout,
  changeTimelineWidth,
  changeTimelineCardStyle,
} from "./timeline"

export function injectAllChanges(data: Record<string, string | number>) {
  changeTimelineCardStyle()
  changeTimelineWidth(+data[KeyTimelineWidth])
  changeTimelineLayout(data[KeyTimelineLayout].toString())

  hiddenNewPost()

  hiddenSidebar()
}
