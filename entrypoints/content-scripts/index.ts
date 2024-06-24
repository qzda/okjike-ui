import {
  AllSettingsKeys,
  KeyExtensionStatus,
  KeyPathname,
  KeyTimelineLayout,
} from "../../storageKeys"
import { getStorage, setStorage } from "../../utils/chromeStorage"
import { injectAllChanges } from "./utils/all"
import { log } from "../../utils/log"
import * as Constant from "./constant"
import { changeTimelineLayout } from "./utils/timeline"

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

  await setStorage({
    [KeyPathname]: location.pathname,
  })
  const allSettings = await getStorage(AllSettingsKeys)
  injectAllChanges(allSettings)

  document.body.addEventListener(
    "click",
    async (e) => {
      const target = e.target as HTMLElement
      log("body onClike target", target)

      // 展开动态评论时
      if (
        (target.tagName === "svg" && target.innerHTML === Constant.Comment) ||
        target.parentElement?.firstElementChild?.firstElementChild
          ?.innerHTML === Constant.Comment
      ) {
        const allSettings = await getStorage(AllSettingsKeys)
        const pathname = allSettings[KeyPathname].toString()
        const timelineLayout = allSettings[KeyTimelineLayout].toString()
        setTimeout(() => {
          changeTimelineLayout(timelineLayout, pathname)
        }, 200)
      }
    },
    true
  )
}

init()
