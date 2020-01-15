
import { json, } from 'd3-fetch'
const debug = require('debug')('VOTE2018-RESULT:CLIENT:services')

const urlVoteData = '/proj-assets/vote2018-result/statistics'

export const fetchData = (filename) => {
  const path = `${urlVoteData}/${filename}`
  debug('start to fetching data, path is:', path)

  return json(path)
  .then(data => {
    debug('fetchData successfully, data is:', data)
    return data
  })
  .catch(err => {
    console.error(`encounter a error when fetchData, path is ${path}`)
    console.error(err)
  })
}