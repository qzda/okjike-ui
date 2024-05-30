import { KeyTimelineLayout, KeyTimelineWidth } from "../../../storage-keys"
import { hiddenNewPost } from "./newPost"
import { hiddenSidebar } from "./sidebar"
import {
  changeTimelineLayout,
  changeTimelineWidth,
  changeTimelineCardStyle,
  addEventScrollend,
} from "./timeline"

export function injectAllChanges(data: Record<string, string | number>) {
  changeTimelineCardStyle()
  changeTimelineWidth(+data[KeyTimelineWidth])
  changeTimelineLayout(
    data[KeyTimelineLayout].toString(),
    +data[KeyTimelineWidth]
  )
  addEventScrollend(data[KeyTimelineLayout].toString(), +data[KeyTimelineWidth])

  hiddenNewPost()

  hiddenSidebar()
}
