class Scroll {
  constructor (args) {
    const def = {
      wEl: window,
      beforeScrollH: 0,
      scrollDirection: 'down'
    }
    Object.assign(def, args)
    Object.assign(this, def)
  }

  setScrollDirection () {
    const curtScrollH = this.wEl.pageYOffset
    const diff = curtScrollH - this.beforeScrollH
    this.scrollDirection = (diff >= 0 ? 'down' : 'up')
    this.beforeScrollH = curtScrollH
  }
}


export class ScrollController extends Scroll {
  constructor (args) {
    super()
    const def = {}
    Object.assign(def, args)
    Object.assign(this, def)

    this.curtIntervalOrder = 0
    this.curtOnceOrder = 0

    this.init()
  }

  init () {
    this.wEl.addEventListener('scroll', raf(() => { this.setScrollDirection() }))
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
      const isScrollDown = this.scrollDirection === 'down'

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

    return this
  }
}

export class CoveredEffect extends Scroll {
  constructor (args) {
    super()
    const def = {
      coveredEl: null,
      coverEl: null,
      betweenEl: null,
      bodyEl: document.body
    }
    Object.assign(def, args)
    Object.assign(this, def)

    this.curtSpace = 0
    this.isCovered = false
    this.canBetween = false
    this.curtScrollH = 0

    this.init()
  }

  init () {
    this.wEl.addEventListener('scroll', raf(() => { this.applyCoveredEffect() }))
    if (this.betweenEl) {
      this.wEl.addEventListener('scroll', raf(() => { this.setScrollDirection() }))
      this.wEl.addEventListener('scroll', raf(() => { this.applyBetween() }))
    }
  }

  // todo: add order
  applyCoveredEffect () {
    const wh = this.wEl.innerHeight
    const coverT = this.coverEl.getBoundingClientRect().top

    if (this.isCovered) {
      if (coverT - wh * 1.5 >= 0) {
        this.coveredEl.style.position = ''
        this.bodyEl.style.paddingTop = `${this.curtSpace}px`
        this.coveredEl.style.width = ''
        this.coveredEl.style.bottom = ''
        this.coveredEl.style.left = ''
        this.isCovered = false

        // console.log('uncovered')

        if (this.betweenEl) {
          this.canBetween = false
        }
      }
    } else {
      if (coverT - wh <= 0) {
        const coveredH = this.coveredEl.clientHeight

        this.curtSpace = parseFloat(this.bodyEl.style.paddingTop) || 0
        this.coveredEl.style.width = '100%'
        this.coveredEl.style.bottom = '0'
        this.coveredEl.style.left = '0'
        this.coveredEl.style.position = 'fixed'
        this.bodyEl.style.paddingTop = `${this.curtSpace + (coveredH + wh * 0.5)}px`
        this.isCovered = true

        // console.log('covered')

        if (this.betweenEl) {
          this.curtScrollH = parseFloat(this.bodyEl.style.paddingTop) - wh
          this.canBetween = true
        }
      }
    }
  }

  applyBetween () {
    if (!this.canBetween) { return }

    const isScrollDown = this.scrollDirection === 'down'
    const betweenOpacity = this.betweenEl.style.opacity
    
    if (isScrollDown) {
      if (betweenOpacity === '1') { return }
    } else {
      if (betweenOpacity === '0') { return }
    }

    const afterScrollH = this.wEl.pageYOffset
    const diff = afterScrollH - this.curtScrollH
    const totalH = this.wEl.innerHeight

    if (diff < 0) {
      // console.log('zero')

      if (betweenOpacity !== '0') { this.betweenEl.style.opacity = '0' }
    } else if (diff > totalH) {
      // console.log('one')

      if (betweenOpacity !== '1') { this.betweenEl.style.opacity = '1' }
    } else {
      // console.log('amount')

      this.betweenEl.style.opacity = `${(diff / totalH).toFixed(2)}`
    }
  }
}

// export function lerp (start, end, amount) {
//   return start + (end - start) * amount
// }

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
