import { get, isEmpty, } from 'lodash'
import { DEFAULT_SHEET_RANGE, DATA, CORP_NAME_TAXID_MAPPING_SHEETID, } from 'src/components/PoliticalContribution/constants'

export const fetchSheetBasic = (store, ordinal) => {
  return store.dispatch('PoliticalContribution/FETCH_DATA_ASSETS', {
    params: {
      filePath: `/proj-assets/political-contribution/data/basic/${ordinal}.csv`
    }
  })
  .then(data => {
    if (!isEmpty(data)) {
      store.commit('PoliticalContribution/SET_DATA', { ordinal: ordinal, body: data, field: 'rawDataBasic' })
    }
  })
  .catch(err => { console.log(err) })
}
export const fetchSheetCompanyDonate = (store, ordinal) => {
  return store.dispatch('PoliticalContribution/FETCH_DATA_ASSETS', {
    params: {
      filePath: `/proj-assets/political-contribution/data/companyDonate/${ordinal}.csv`
    }
  })
  .then(data => {
    if (!isEmpty(data)) {
      store.commit('PoliticalContribution/SET_DATA', { ordinal: ordinal, body: data, field: 'rawDataCompanyDonate' })
    }
  })
  .catch(err => { console.log(err) })
}
export const fetchSheetCorpNameTaxIdMapping = store => {
  return store.dispatch('PoliticalContribution/FETCH_DATA_ASSETS', {
    params: {
      filePath: `/proj-assets/political-contribution/data/corpNameTaxIdMapping.csv`
    }
  })
  .then(data => {
    store.commit('PoliticalContribution/SET_DATA_CORP_NAME_TAXID_MAPPING', { body: data, field: 'corpNameTaxIdMapping' })
  })
  .catch(err => { console.log(err) })
}

// export const fetchSheetBasic = (store, ordinal) => {
//   const spreadsheetId = get(DATA, [ ordinal, 'spreadsheetIdBasic' ], '')
//   const dataKey = 'rawDataBasic'
//   return store.dispatch('PoliticalContribution/FETCH_DATA', {
//     params: {
//       ordinal,
//       spreadsheetId,
//       range: DEFAULT_SHEET_RANGE,
//       dataKey
//     }
//   })
// }
// export const fetchSheetCompanyDonate = (store, ordinal) => {
//   const spreadsheetId = get(DATA, [ ordinal, 'spreadsheetIdCompanyDonate' ], '')
//   const dataKey = 'rawDataCompanyDonate'
//   return store.dispatch('PoliticalContribution/FETCH_DATA', {
//     params: {
//       ordinal,
//       spreadsheetId,
//       range: DEFAULT_SHEET_RANGE,
//       dataKey
//     }
//   })
// }
// export const fetchSheetCorpNameTaxIdMapping = store => {
//   const spreadsheetId = CORP_NAME_TAXID_MAPPING_SHEETID
//   const dataKey = 'corpNameTaxIdMapping'
//   return store.dispatch('PoliticalContribution/FETCH_DATA', {
//     params: {
//       spreadsheetId,
//       range: DEFAULT_SHEET_RANGE,
//       dataKey
//     }
//   })
// }