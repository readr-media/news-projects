function getVH () {
  return window.innerHeight || document.documentElement.clientHeight
}

export default {
  // Using JS to calculate the mobile browser's height, in order to avoid browser's bottom nav bar causing vh inconsistent
  heightMobile: () => {
    return getVH()
  }
}
