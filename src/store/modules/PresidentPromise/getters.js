import { isEmpty, shuffle, uniq, flattenDeep, map, every, sample, get } from 'lodash'

function getVH () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

function getPromiseCategory (promises) {
  return uniq(flattenDeep(map(promises, promise => promise.category)))
}

function isCategoryOverlap (promise, collection) {
  const collectionCategory = getPromiseCategory(collection)
  return every(promise.category, category => collectionCategory.includes(category))
}

function isPromiseBeenChosen (promise, collection) {
  return map(collection, promiseInCollection => promiseInCollection.pid).includes(promise.pid)
}

function samplingPromise ({ surveyBasis, surveySampleSize }, { surveyBasisCategoryRemaining }) {
  let result = []
  for (let count = 0; count < surveySampleSize; count += 1) {
    const resultCategory = getPromiseCategory(result)
    let chosenPromise = sample(surveyBasis)
    if (resultCategory.length < surveyBasisCategoryRemaining.length) {
      while (isCategoryOverlap(chosenPromise, result) || isPromiseBeenChosen(chosenPromise, result)) {
        chosenPromise = sample(surveyBasis)
      }
    } else {
      // Don't care about category overlapping
      while(isPromiseBeenChosen(chosenPromise, result)) {
        chosenPromise = sample(surveyBasis)
      }
    }
    result.push(chosenPromise)
  }
  return result
}

export default {
  surveyBasisCategoryRemaining: (state) => {
    return getPromiseCategory(state.surveyBasis)
  },
  surveysPerRound: (state, getters) => {
    if (isEmpty(state.surveyBasis)) {
      const promiseTemplate = {
        pid: `promise-none`,
        title: '',
        description: '',
        category: [ '文化' ],
        categoryEN: [],
        promiseDone: false,
        surveyResult: 'no-ans'
      }
      const surveysPerRoundTemplate = Array(10).fill(promiseTemplate)
      return surveysPerRoundTemplate
    }
    return state.surveyBasis.length >= state.surveySampleSize ? samplingPromise(state, getters) : shuffle(state.surveyBasis)
  },
  surveysPerRoundPids: (state, getters) => {
    return map(getters.surveysPerRound, promise => promise.pid)
  },
  surveyVeryInterestPromises: (state) => {
    return flattenDeep(map(state.surveyGroupByInterest, round => round['very-interest']))
  },
  // surveyVeryInterestPids: (state, getters) => {
  //   return map(getters.surveyVeryInterestPromises, promise => promise.pid)
  // },
  interestCurrentRound: (state) => {
    return get(state.surveyGroupByInterest, [ `round${state.surveyRoundNum}`, 'very-interest' ], [])
  },
  promiseDataGroupByCategory: (state, getters) => {
    let result = {}

    result['全部'] = state.promiseData
    result['我關心'] = getters.surveyVeryInterestPromises
    state.promiseData.forEach(promise => {
      const categories = promise.category
      categories.forEach(category => {
        if (!(category in result)) result[category] = []
        result[category].push(promise)
      })
    })
    
    return result
  },
  heightMobile: () => {
    return getVH()
  }
}