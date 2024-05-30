import { AllSettingsKeys, KeyExtensionStatus } from "../../storage-keys"
import { getStorage } from "../../utils/chromeStorage"
import { injectAllChanges } from "./utils/all"

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
  console.log("allSettings", JSON.stringify(allSettings))
  Object.keys(changes).forEach((key) => {
    allSettings[key] = changes[key].newValue
  })
  console.log("allSettings", JSON.stringify(allSettings))
  injectAllChanges(allSettings)
})

async function init() {
  const status = await getStorage(KeyExtensionStatus)
  if (status === "off") return

  const allSettings = await getStorage(AllSettingsKeys)
  injectAllChanges(allSettings)
}

init()
