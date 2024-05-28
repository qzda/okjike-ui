import { defaultPreferences } from "../storage-keys"

/**
 * Use storage.local to allow user to store customizations
 * @link https://developer.chrome.com/docs/extensions/reference/storage/
 */
export function getStorage(
  value: string
): ReturnType<typeof getSingleStorageKey>
export function getStorage(
  value: string[]
): ReturnType<typeof getMultipleStorageKeys>
export function getStorage(storageKeyOrKeys: string | string[]) {
  if (typeof storageKeyOrKeys === "string") {
    return getSingleStorageKey(storageKeyOrKeys)
  }

  return getMultipleStorageKeys(storageKeyOrKeys)
}

function getSingleStorageKey(key: string) {
  return new Promise<string | number>((resolve, _reject) => {
    chrome?.storage?.local.get([key], (data) => {
      resolve(data[key] ?? defaultPreferences[key])
    })
  })
}

function getMultipleStorageKeys(keysArray: string[]) {
  return new Promise<Record<string, string | number>>((resolve, _reject) => {
    chrome?.storage?.local.get(keysArray, (data) => {
      const res = keysArray.reduce((acc, cur) => {
        acc[cur] = data[cur] ?? defaultPreferences[cur] // For each key, fallback to the default preference
        return acc
      }, {} as Record<string, string | number>)
      resolve(res)
    })
  })
}

/**
 * Set storage with storage.local
 */
export function setStorage(kv: Record<string, string | number>) {
  return new Promise<Record<string, string | number>>((resolve, _reject) => {
    chrome?.storage?.local.set(kv, () => {
      return resolve(kv)
    })
  })
}
