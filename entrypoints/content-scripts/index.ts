import {
  AllSettingsKeys,
  KeyExtensionStatus,
  KeyPathname,
  KeyTimelineLayout,
} from "../../storage-keys"
import { getStorage } from "../../utils/chromeStorage"
import { injectAllChanges } from "./utils/all"
import { changeTimelineLayout, isTimelineUrl } from "./utils/timeline"
import { log } from "../../utils/log"

chrome.storage.onChanged.addListener(async (changes) => {
  if (
    changes[KeyExtensionStatus]?.oldValue &&
    changes[KeyExtensionStatus]?.newValue !==
      changes[KeyExtensionStatus]?.oldValue
  ) {
    window.location.reload()
    return
  }

  const status = await getStorage(KeyExtensionStatus)
  if (status === "off") return

  const allSettings = await getStorage(AllSettingsKeys)
  log("storage changes", JSON.stringify(changes))
  log("storage allSettings", JSON.stringify(allSettings))
  injectAllChanges(allSettings)
})

async function init() {
  const status = await getStorage(KeyExtensionStatus)
  if (status === "off") return

  const allSettings = await getStorage(AllSettingsKeys)
  injectAllChanges(allSettings)

  document.body.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement
    const targetUrl = new URL(target.baseURI)

    log("targetUrl.pathname", targetUrl.pathname)
    log("target", target)

    if (isTimelineUrl(targetUrl.pathname)) {
      const allSettings = await getStorage(AllSettingsKeys)
      const pathname = allSettings[KeyPathname].toString()
      const timelineLayout = allSettings[KeyTimelineLayout].toString()

      setTimeout(() => {
        changeTimelineLayout(timelineLayout, pathname)
      }, 200)
    }
  })
}

init()
