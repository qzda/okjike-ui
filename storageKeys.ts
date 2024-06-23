export const KeyExtensionStatus = "extensionStatus"
export const KeyTimelineWidth = "timelineWidth"
export const KeyTimelineLayout = "timelineLayout"
export const KeyTimelinePostAlign = "timelinePostAlign"
export const KeyPathname = "pathname"

export const AllSettingsKeys = [
  KeyExtensionStatus,
  KeyTimelineWidth,
  KeyTimelineLayout,
  KeyTimelinePostAlign,
  KeyPathname,
]

export const defaultPreferences: Record<string, string | number> = {
  [KeyExtensionStatus]: "on",
  [KeyTimelineWidth]: 1000,
  // default or waterfall
  [KeyTimelineLayout]: "waterfall",
  [KeyTimelinePostAlign]: "on",
  [KeyPathname]: "/",
}
