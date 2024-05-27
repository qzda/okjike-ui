export const KeyExtensionStatus = "extensionStatus"
export const KeyTimelineWidth = "timelineWidth"

export const AllSettingsKeys = [KeyExtensionStatus, KeyTimelineWidth]

export const defaultPreferences: Record<string, string | number> = {
  [KeyExtensionStatus]: "off",
  [KeyTimelineWidth]: 700,
}
