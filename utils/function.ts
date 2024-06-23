export function createThrottler() {
  let inThrottle: NodeJS.Timeout | null = null

  return {
    throttle(fn: Function, limit: number) {
      return () => {
        if (!inThrottle) {
          fn()
          inThrottle = setTimeout(() => (inThrottle = null), limit)
        }
      }
    },
  }
}
