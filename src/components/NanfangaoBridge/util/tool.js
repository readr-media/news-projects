'use strict'

export function throttle(fn, wait, mustRun) {
  let timer
  let startTime = new Date()
  return () => {
    let currentTime = new Date()
    clearTimeout(timer)
    if (currentTime - startTime >= mustRun) {
      fn()
      startTime = currentTime
    } else {
      timer = setTimeout(fn, wait)
    }
  }
}
