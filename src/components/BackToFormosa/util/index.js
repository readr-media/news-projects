export const controlCoveredEffect = function (coveredEl, coverEl) {
  let isCovered = false
  let curtSpace = 0
  
  return function () {
    const wh = window.innerHeight
    const { top } = coverEl.getBoundingClientRect()

    if (isCovered) {
      if (top - wh * 1.5 >= 0) {
        coveredEl.style.position = ''
        document.body.style.paddingTop = `${curtSpace}px`
        coveredEl.style.width = ''
        coveredEl.style.bottom = ''
        coveredEl.style.left = ''
        isCovered = false
      }
    } else {
      if (top - wh <= 0) {
        const coveredElH = coveredEl.clientHeight

        curtSpace = parseFloat(document.body.style.paddingTop || 0)
        coveredEl.style.width = '100%'
        coveredEl.style.bottom = 0
        coveredEl.style.left = 0
        coveredEl.style.position = 'fixed'
        document.body.style.paddingTop = `${curtSpace + (coveredElH + wh * 0.5)}px`
        isCovered = true
      }
    }
  }
}

export const raf = function (func) {
  let isTicking = false

  return function () {
    if (isTicking) { return }

    isTicking = true

    requestAnimationFrame(function () {
      func()
      isTicking = false
    })
  }
}
