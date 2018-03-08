import bigInt from 'big-integer'
import { filter, get } from 'lodash'
import { setMmCookie } from 'src/util/comm'

const DEFAULT_DISTRIBUTION = [
  { id: 'A', weight: 80 },
  { id: 'B', weight: 10 },
  { id: 'C', weight: 10 }
]

export function getRole ({ mmid, distribution = DEFAULT_DISTRIBUTION }) {
  const sequence = []
  const len = distribution.length
  for (let i = 0; i < distribution.length; i += 1) {
    if (sequence.length > 0) {
      sequence.push(sequence[i - 1] + Math.floor(distribution[i].weight))
    } else {
      sequence.push(Math.floor(distribution[i].weight))
    }
  }

  const digit = sequence[len - 1].toString().length
  const convertedMmid = getBigInt(mmid)
  const remainder = parseInt(convertedMmid.substr(convertedMmid.length - digit)) % sequence[len - 1]
  const roleInTest = get(filter(distribution, (o, i) => {
    return remainder < sequence[i]
  }), 0)
  return roleInTest.id
}

function getBigInt (mmid) {
  let bigint
  try {
    bigint = bigInt(mmid.replace(/\-/g, ''), 128).toString()
  } catch (e) {
    const uuid = setMmCookie()
    bigint = bigInt(uuid.replace(/\-/g, ''), 128).toString()
  }
  return bigint
}
