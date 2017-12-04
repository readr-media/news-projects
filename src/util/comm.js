export function currDevice (osString) {
 /**
  * osString should be from state.os
  */ 
  if (osString.indexOf('Windows') > -1 || osString.indexOf('Mac OS') > -1 || osString.indexOf('Linux') > -1) {
    return 'desktop'
  } else {
    return 'mobile'
  }
}