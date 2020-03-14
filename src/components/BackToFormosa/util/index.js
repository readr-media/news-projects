export class ScrollController {
  constructor(args) {
    const def = {
      wEl: window,
      beforeScrollH: 0,
      curtIntervalOrder: 0,
      curtOnceOrder: 0,
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

  onceScene ({ order, triggerEl, whOffset = 0, fn }) {
    let isTriggered = false

    this.wEl.addEventListener('scroll', raf(() => {
      if (isTriggered || (this.curtOnceOrder !== order - 1)) { return }

      const triggerT = triggerEl.getBoundingClientRect().top

      if (triggerT - whOffset * this.wEl.innerHeight <= 0) {
        this.curtOnceOrder = order
        isTriggered = true
        fn()
      }
    }))

    return this
  }

  intervalScene ({ order }, { startEl, enterStartFn, leaveStartFn, startWhOffset = 0 }, { endEl, enterEndFn, leaveEndFn, endWhOffset = 0 } = {}) {
    let inInterval = false

    this.wEl.addEventListener('scroll', raf(() => {
      const isScrollDown = (this.scrollDirection === 'down')

      if (!inInterval) {
        if (isScrollDown) {
          if (this.curtIntervalOrder !== order - 1) { return }
        } else {
          if (this.curtIntervalOrder !== order) { return }
        }
      }

      let startT
      let endT
      
      if (!endEl || endEl.isEqualNode(startEl)) {
        const startElBcr = startEl.getBoundingClientRect()
        startT = startElBcr.top
        endT = startElBcr.bottom
      } else {
        startT = startEl.getBoundingClientRect().top
        endT = endEl.getBoundingClientRect().bottom
      }
      
      if (isScrollDown) {
        if (!inInterval && startT - startWhOffset * this.wEl.innerHeight <= 0) {
          // console.log(`${order}: Enter Start`)

          inInterval = true
          enterStartFn()
        }
        if (endT - endWhOffset * this.wEl.innerHeight <= 0) {
          // console.log(`${order}: Leave End`)

          this.curtIntervalOrder = order
          inInterval = false
          leaveEndFn ? leaveEndFn() : leaveStartFn()
        }
      } else {
        if (!inInterval && endT - endWhOffset * this.wEl.innerHeight > 0) {
          // console.log(`${order}: Enter End`)

          inInterval = true
          enterEndFn ? enterEndFn() : enterStartFn()
        }
        if (startT - startWhOffset * this.wEl.innerHeight > 0) {
          // console.log(`${order}: Leave Start`)

          this.curtIntervalOrder = order - 1
          inInterval = false
          leaveStartFn()
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
