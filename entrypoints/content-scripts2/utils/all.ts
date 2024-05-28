import { KeyTimelineWidth } from "../../../storage-keys"
import { changeTimelineWidth } from "./timeline"

export function injectAllChanges(data: Record<string, string | number>) {
  changeTimelineWidth(+data[KeyTimelineWidth])
}
