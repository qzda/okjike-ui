export const KeyExtensionStatus = "extensionStatus"
export const KeyTimelineWidth = "timelineWidth"
export const KeyTimelineLayout = "timelineLayout"
export const KeyTimelinePostAlign = "timelinePostAlign"

export const AllSettingsKeys = [
  KeyExtensionStatus,
  KeyTimelineWidth,
  KeyTimelineLayout,
  KeyTimelinePostAlign,
]

export const defaultPreferences: Record<string, string | number> = {
  [KeyExtensionStatus]: "on",
  [KeyTimelineWidth]: 1400,
  [KeyTimelineLayout]: "default",
  [KeyTimelinePostAlign]: "on",
}
