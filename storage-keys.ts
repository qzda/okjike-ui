export const KeyExtensionStatus = "extensionStatus"
export const KeyTimelineWidth = "timelineWidth"
export const KeyTimelineLayout = "timelineLayout"
export const KeySidebarHidden = "sidebarHidden"

export const AllSettingsKeys = [
  KeyExtensionStatus,
  KeyTimelineWidth,
  KeyTimelineLayout,
  KeySidebarHidden,
]

export const defaultPreferences: Record<string, string | number> = {
  [KeyExtensionStatus]: "on",
  [KeyTimelineWidth]: 1400,
  [KeyTimelineLayout]: "default",
  [KeySidebarHidden]: "on",
}
