export const KeyExtensionStatus = "extensionStatus"
export const KeyTimelineWidth = "timelineWidth"
export const KeyTimelineLayout = "timelineLayout"

export const AllSettingsKeys = [
  KeyExtensionStatus,
  KeyTimelineWidth,
  KeyTimelineLayout,
]

export const defaultPreferences: Record<string, string | number> = {
  [KeyExtensionStatus]: "off",
  [KeyTimelineWidth]: 700,
  [KeyTimelineLayout]: "default",
}
