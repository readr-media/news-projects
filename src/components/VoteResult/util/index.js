import { partyAbbr } from '../constants/index'

export const getPartyAbbr = (chinesePartyName) => {
  if (!(chinesePartyName in partyAbbr)) {
    return 'others'
  }
  return partyAbbr[chinesePartyName]
}