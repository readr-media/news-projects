import { SITE_DOMAIN_PROD } from '../constants'
import { get } from 'lodash'
import { getRole } from 'src/util/ABRoleAssign'
import Cookie from 'vue-cookie'
import uuidv4 from 'uuid/v4'

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

export function currEnv () {
  if (process.env.VUE_ENV === 'client') {
    if (location.host.indexOf(SITE_DOMAIN_PROD) === 0 || location.host.indexOf(`www.${SITE_DOMAIN_PROD}`) === 0) {
      return 'prod'
    } else {
      return 'dev'
    }
  }
}

export function setMmCookie () {
  const uuid = uuidv4()
  Cookie.set('mmid', uuid, { expires: (10 * 365 * 24) + 'h' })
  return uuid
}
export function getMmid ({ assisgnedRole, distribution }) {
  const mmid = Cookie.get('mmid')
  if (assisgnedRole) {
    return assisgnedRole.toUpperCase()
  } else {
    const role = getRole({ mmid, distribution })
    return role
  }
}