import { isScrollBarReachBottom } from '../../util/comm'

function getScrollDirection (lastScrollTop = 0, scrollTop = 0) {
  if (scrollTop > lastScrollTop) {
    return 'scrolldown'
  } else {
    return 'scrollup'
  }
}

export {
  getScrollDirection,
  isScrollBarReachBottom
}