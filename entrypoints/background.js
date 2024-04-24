// Used by the manifest v3 extension

chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason === "install") {
    chrome.tabs.create({
      url: "https://liyiji.netlify.app/projects/okjike-ui",
    });
    chrome.tabs.query({ url: "*://*.okjike.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
  }
});
