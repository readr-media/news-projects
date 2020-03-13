export class ScrollController {
  constructor(args) {
    const def = {
      wEl: window,
      beforeScrollH: 0,
      curtOrder: 0,
      scrollDirection: 'down'
    }
    Object.assign(def, args)
    Object.assign(this, def)

    this.wEl.addEventListener('scroll', raf(() => {
      const curtScrollH = this.wEl.pageYOffset
      const diff = curtScrollH - this.beforeScrollH
      this.scrollDirection = (diff >= 0 ? 'down' : 'up')
      this.beforeScrollH = curtScrollH
    }))
  }
  setScrollScene (order, { startEl, includeBottom = false, enterStartFn, leaveStartFn }, { endEl, enterEndFn, leaveEndFn } = {}, { once = false } = {}) {
    let inTriggerInterval = false
    let isTriggerOnce = false

    this.wEl.addEventListener('scroll', raf(() => {
      if (isTriggerOnce) { return }

      const isScrollDown = (this.scrollDirection === 'down')

      if (!inTriggerInterval) {
        if (isScrollDown) {
          if (this.curtOrder !== (order - 1)) { return }
        } else {
          if (this.curtOrder !== order) { return }
        }
      }
      
      const { top: startT, bottom: startB } = startEl.getBoundingClientRect()
      let endT = 'no value'

      if (endEl) {
        endT = endEl.getBoundingClientRect().top
      } else if (includeBottom) {
        endT = startB
      }
      
      if (isScrollDown) {
        // enter start
        if (startT <= 0 && !inTriggerInterval) {
          inTriggerInterval = true
          enterStartFn && enterStartFn()
          if (once) { isTriggerOnce = true }
        }
        // leave start
        if (endT !== 'no value' && endT <= 0) {
          this.curtOrder = order
          inTriggerInterval = false
          if (includeBottom) {
            leaveStartFn && leaveStartFn()
          } else {
            leaveEndFn && leaveEndFn()
          }
        }
      } else {
        // enter end
        if (endT !== 'no value' && endT > 0 && !inTriggerInterval) {
          inTriggerInterval = true
          if (includeBottom) {
            enterStartFn && enterStartFn()
          } else {
            enterEndFn && enterEndFn()
          }
        }
        // leave end
        if (startT > 0) {
          this.curtOrder = (order - 1)
          inTriggerInterval = false
          leaveStartFn && leaveStartFn()
        }
      }
    }))
  }
}

export function controlCoveredEffect (coveredEl, coverEl) {
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

export function raf (fn) {
  let isTicking = false

  return function () {
    if (isTicking) { return }

    isTicking = true

    requestAnimationFrame(function () {
      fn()
      isTicking = false
    })
  }
}
