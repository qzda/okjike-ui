// Used by the manifest v3 extension

import { KeyPathname } from "../../storage-keys"
import { setStorage } from "../../utils/chromeStorage"

chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason === "install") {
    chrome.tabs.create({
      url: "https://web.okjike.com/", // todo url
    })
    chrome.tabs.query({ url: "*://*.okjike.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        tab.id && chrome.tabs.reload(tab.id)
      })
    })
  }
})

const setTabIdAndUrl = new Map<number, string>()

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url?.startsWith("https://web.okjike.com/")) {
    setTabIdAndUrl.set(tabId, changeInfo.url)
  }

  if (changeInfo.status === "complete") {
    const url = setTabIdAndUrl.get(tabId)
    if (url) {
      const { pathname } = new URL(url)
      setStorage({
        [KeyPathname]: pathname,
      })
    }
  }
})
