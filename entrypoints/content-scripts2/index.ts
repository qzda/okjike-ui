import { KeyExtensionStatus } from "../../storage-keys"
import { getStorage } from "../../utils/chromeStorage"

chrome.storage.onChanged.addListener(async (changes) => {
  if (
    changes[KeyExtensionStatus]?.oldValue &&
    changes[KeyExtensionStatus]?.newValue !==
      changes[KeyExtensionStatus]?.oldValue
  ) {
    window.location.reload()
  }

  const status = await getStorage(KeyExtensionStatus)
  if (status === "off") return
})
