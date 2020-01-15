export function getOffset(el){
  //get element offset (left & top)
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { 
    top: rect.top + scrollTop, 
    left: rect.left + scrollLeft 
  }
}