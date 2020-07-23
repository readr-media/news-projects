import { get, isEmpty, } from 'lodash'
import { DEFAULT_SHEET_RANGE, DATA, CORP_NAME_TAXID_MAPPING_SHEETID, } from 'src/components/PoliticalContribution/constants'

export const fetchSheetBasic = (store, ordinal) => {
  const target = ordinal !== 'tenth' ? ordinal : 'tenth_v3';
  return store.dispatch('PoliticalContribution/FETCH_DATA_ASSETS', {
    params: {
      filePath: `/proj-assets/political-contribution/data/basic/${target}.csv`
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
  const target = ordinal !== 'tenth' ? ordinal : 'tenth_v3';
  return store.dispatch('PoliticalContribution/FETCH_DATA_ASSETS', {
    params: {
      filePath: `/proj-assets/political-contribution/data/companyDonate/${target}-dropped.csv`
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

export const fetchSheetIndustryPercentageMOF = (store, ordinal) => {
  return store.dispatch('PoliticalContribution/FETCH_DATA_ASSETS', {
    params: {
      filePath: `/proj-assets/political-contribution/data/industryPercentage/${ordinal}-industry-percentage-MOF-main.csv`
    }
  })
  .then(data => {
    if (!isEmpty(data)) {
      store.commit('PoliticalContribution/SET_DATA', { ordinal: ordinal, body: data, field: 'industryPercentageMOF' })
    }
  })
  .catch(err => { console.log(err) })
}