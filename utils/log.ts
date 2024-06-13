/**
 * @example log(1, 2, 3) // "okjike-ui", 1, 2, 3
 */
export function log(...arg: any[]) {
  console.log(logBgBlack(logColorYellowLight("okjike-ui")), ...arg)
}

export function logColorCyan(str: string) {
  return `\x1b[36m${str}\x1b[0m`
}

export function logColorYellowLight(str: string) {
  return `\x1b[93m${str}\x1b[0m`
}

export function logBgBlack(str: string) {
  return `\x1b[40m${str}\x1b[0m`
}
