import {
  KeySidebarHidden,
  KeyTimelineLayout,
  KeyTimelineWidth,
} from "../../../storage-keys"
import { changeKeySidebarHidden } from "./sidebar"
import { changeTimelineLayout, changeTimelineWidth } from "./timeline"

export function injectAllChanges(data: Record<string, string | number>) {
  changeTimelineWidth(+data[KeyTimelineWidth])
  changeTimelineLayout(data[KeyTimelineLayout].toString())

  changeKeySidebarHidden(data[KeySidebarHidden].toString())
}
