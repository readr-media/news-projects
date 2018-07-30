import { get, } from 'lodash'
import { DEFAULT_SHEET_RANGE, DATA, CORP_NAME_TAXID_MAPPING_SHEETID, } from 'src/components/PoliticalContribution/constants'

export const fetchSheetBasic = (store, ordinal) => {
  const spreadsheetId = get(DATA, [ ordinal, 'spreadsheetIdBasic' ], '')
  const dataKey = 'rawDataBasic'
  return store.dispatch('PoliticalContribution/FETCH_DATA', {
    params: {
      ordinal,
      spreadsheetId,
      range: DEFAULT_SHEET_RANGE,
      dataKey
    }
  })
}
export const fetchSheetCompanyDonate = (store, ordinal) => {
  const spreadsheetId = get(DATA, [ ordinal, 'spreadsheetIdCompanyDonate' ], '')
  const dataKey = 'rawDataCompanyDonate'
  return store.dispatch('PoliticalContribution/FETCH_DATA', {
    params: {
      ordinal,
      spreadsheetId,
      range: DEFAULT_SHEET_RANGE,
      dataKey
    }
  })
}
export const fetchSheetCorpNameTaxIdMapping = store => {
  const spreadsheetId = CORP_NAME_TAXID_MAPPING_SHEETID
  const dataKey = 'corpNameTaxIdMapping'
  return store.dispatch('PoliticalContribution/FETCH_DATA', {
    params: {
      spreadsheetId,
      range: DEFAULT_SHEET_RANGE,
      dataKey
    }
  })
}