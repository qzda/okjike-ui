import { name, description, version } from "./package.json";

const icon =
  "https://raw.githubusercontent.com/qzda/okjike-ui/refs/heads/main/image/okjike-logo.png";

const userScriptUrl =
  "https://raw.githubusercontent.com/qzda/okjike-ui/main/dist/okjike-ui.user.js";

type configValue = string | number;
export const UserScriptConfig: Record<string, configValue | configValue[]> = {
  name,
  description,
  author: "qzda",
  version,
  match: "https://web.okjike.com/*",
  namespace: "https://github.com/qzda/okjike-ui/",
  supportURL: "https://github.com/qzda/okjike-ui/issues/new",
  downloadURL: userScriptUrl,
  updateURL: userScriptUrl,
  icon,
  "run-at": "document-start",
  grant: [
    "unsafeWindow",
    "window.onurlchange",
    "GM_addStyle",
    "GM_addElement",
    "GM_registerMenuCommand",
  ],
};
