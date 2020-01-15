import { get, drop, } from 'lodash'

export const convertBody = (body) => {
  const header = body[0]
  return drop(body).map((row) => {
    let convertRow = {}
    row.forEach((cellValue, cellIndex) => {
      convertRow[header[cellIndex]] = cellValue
    })
    if ('修正後統一編號' in convertRow && convertRow['修正後統一編號'] !== '') {
      convertRow['統一編號'] = convertRow['修正後統一編號']
    }
    return convertRow
  })
}

export const dropWontCalculateRow = (dataArray) => {
  const shouldDrop = '採計與否' in get(dataArray, '0', [])
  return shouldDrop ? dataArray.filter(row => row['採計與否'] === 'yes') : dataArray
}

export const returnGroupThenCompany = (row) => {
  return hasGroup(row) ? row['集團碼'] : row['統一編號']
}

export const hasGroup = (row) => {
  return get(row, '集團碼', '') !== ''
}