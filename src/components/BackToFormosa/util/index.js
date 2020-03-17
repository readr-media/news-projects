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
    this.curtLineOrder = 0

    this.init()
  }

  init () {
    this.wEl.addEventListener('scroll', raf(() => { this.setScrollDirection() }))
  }

  lineScene ({ order, triggerEl, whOffset = 0, enterFn, leaveFn }) {
    let isOnceTriggered = false

    this.wEl.addEventListener('scroll', raf(() => {
      if (isOnceTriggered) { return }

      const isScrollDown = this.scrollDirection === 'down'

      if (isScrollDown) {
        if (this.curtLineOrder !== order - 1) { return }
      } else {
        if (this.curtLineOrder !== order) { return }
      }

      const triggerT = triggerEl.getBoundingClientRect().top

      if (isScrollDown) {
        if (triggerT - whOffset * this.wEl.innerHeight <= 0) {
          // console.log(`${order}: Enter Line`)

          this.curtLineOrder = order
          if (!leaveFn) { isOnceTriggered = true }
          enterFn && enterFn()
        }
      } else {
        if (triggerT - whOffset * this.wEl.innerHeight > 0) {
          // console.log(`${order}: Leave Line`)

          this.curtLineOrder = order - 1
          if (!enterFn) { isOnceTriggered = true }
          leaveFn && leaveFn()
        }
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
        endT = endEl.getBoundingClientRect().top
      }
      
      if (isScrollDown) {
        if (!inInterval && startT - startWhOffset * this.wEl.innerHeight <= 0) {
          // console.log(`${order}: Enter Start`)

          inInterval = true
          enterStartFn && enterStartFn()
        }
        if (endT - endWhOffset * this.wEl.innerHeight <= 0) {
          // console.log(`${order}: Leave End`)

          this.curtIntervalOrder = order
          inInterval = false

          if (leaveEndFn) { leaveEndFn() }
          else { if (leaveStartFn) { leaveStartFn() } }
        }
      } else {
        if (!inInterval && endT - endWhOffset * this.wEl.innerHeight > 0) {
          // console.log(`${order}: Enter End`)

          inInterval = true

          if (enterEndFn) { enterEndFn() }
          else { if (enterStartFn) { enterStartFn() } }
        }
        if (startT - startWhOffset * this.wEl.innerHeight > 0) {
          // console.log(`${order}: Leave Start`)

          this.curtIntervalOrder = order - 1
          inInterval = false
          leaveStartFn && leaveStartFn()
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
      bodyEl: document.body,
    }
    Object.assign(def, args)
    Object.assign(this, def)

    this.curtOrder = 0

    this.init()
  }

  init () {
    this.wEl.addEventListener('scroll', raf(() => { this.setScrollDirection() }))
  }
  get isScrollDown () {
    return this.scrollDirection === 'down'
  }
  // get curtScrollH () {
  //   return parseFloat(this.bodyEl.style.paddingTop) - this.wh
  // }

  // todo: why does it cause bug???
  // get wh () {
  //   return this.wEl.innerHeight
  // }

  applyCoveredEffect(order, coveredEl, coverEl, whOffset = 0) {
    let curtSpace = 0
    let isCovered = false

    this.wEl.addEventListener('scroll', raf(() => {     
      const wh = this.wEl.innerHeight

      if (this.isScrollDown) {
        if (this.curtOrder !== order - 1) { return }
      } else {
        if (this.curtOrder !== order) { return }
      }

      const coverT = coverEl.getBoundingClientRect().top

      if (isCovered) {
        // console.log(`${order}: detect uncover`)

        if (coverT - wh * (whOffset + 1) >= 0) {
          // console.log(`${order}: uncovered`)

          coveredEl.style.position = ''
          this.bodyEl.style.paddingTop = `${curtSpace}px`
          coveredEl.style.width = ''
          coveredEl.style.bottom = ''
          coveredEl.style.left = ''
          isCovered = false

          this.curtOrder = order - 1
        }
      } else {
        // console.log(`${order}: detect cover`)

        if (coverT - wh < 0) {
          // console.log(`${order}: covered`)

          const coveredH = coveredEl.clientHeight

          curtSpace = parseFloat(this.bodyEl.style.paddingTop) || 0
          coveredEl.style.width = '100%'
          coveredEl.style.bottom = '0'
          coveredEl.style.left = '0'
          coveredEl.style.position = 'fixed'
          this.bodyEl.style.paddingTop = `${curtSpace + (coveredH + wh * whOffset)}px`
          isCovered = true

          this.curtOrder = order
        }
      }
    }))

    return this
  }

  applyBetweenEffect (order, betweenEl) {
    
    this.wEl.addEventListener('scroll', raf(() => {
      const curtBetweenOpacity = betweenEl.style.opacity

      if (this.curtOrder !== order) {
        if (!this.isScrollDown) {
          if (curtBetweenOpacity !== '0') { betweenEl.style.opacity = '0' }
        }
        return
      }

      if (this.isScrollDown && curtBetweenOpacity === '1') { return }

      const wh = this.wEl.innerHeight
      const afterScrollH = this.wEl.pageYOffset
      const curtScrollH = parseFloat(this.bodyEl.style.paddingTop) - wh
      const diff = afterScrollH - curtScrollH

      if (diff > wh) {
        if (!this.isScrollDown) { return }
        // console.log(`${order}: one`)

        betweenEl.style.opacity = '1'
      } else {
        // console.log(`${order}: amount`)

        betweenEl.style.opacity = `${(diff / wh).toFixed(2)}`
      }
    }))

    return this
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

export function isEl (el) {
  return el instanceof Element || el instanceof HTMLDocument
}
