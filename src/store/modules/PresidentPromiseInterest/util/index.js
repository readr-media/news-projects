import { drop, } from 'lodash'
import { categories } from '../../../../components/PresidentPromise/constants'

function promiseDataPreprocess (data) {
  const header = data[0]
  const content = drop(data)

  return content.map((promise) => {
    let promiseResult = {}
    promise.forEach((cell, i) => {
      promiseResult[header[i]] = cell
    })
    return promiseResult
  })
}

export function promiseDataInit (data) {
  const preprocessed = promiseDataPreprocess(data)
  return preprocessed.map((d, i) => ({
    pid: `promise-${d['pid']}`,
    title: d['承諾內容'],
    description: d['狀態'],
    source: d['來源'],
    sourceLink: d['來源網址'],
    category: d['標籤'].split(','),
    categoryEN: d['標籤'].split(',').map(chineseName => categories[chineseName]),
    promiseDone: d['有做到'] === 'v',
    isStuck: d['卡在哪裡'] && d['卡在哪裡'] !== '',
    stuckReason: d['卡在哪裡'],
    surveyResult: 'no-ans'
  }))
}