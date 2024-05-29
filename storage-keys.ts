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
  [KeyExtensionStatus]: "off",
  [KeyTimelineWidth]: 700,
  [KeyTimelineLayout]: "default",
  [KeySidebarHidden]: "off",
}
