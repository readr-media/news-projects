import Vue from 'vue'
import { get, groupBy, sortBy, indexOf, mapKeys, mapValues, isNaN, } from 'lodash'

import { returnGroupThenCompany, } from './util'

export default {
  SET_DATA: (state, { ordinal, body, field, }) => {
    Vue.set(state.data[ordinal], field, body)

    const groupByCandidate = groupBy(body, '候選人')
    Vue.set(state.data[ordinal], `${field}GroupByCandidate`, groupByCandidate)
    
    if (field === 'rawDataBasic') {
      const won = sortBy(get(groupBy(body, candidate => candidate['當選註記'] === '*'), 'true', []), candidate => -Number(candidate['總收入'].split(',').join('')))
      Vue.set(state.data[ordinal], `${field}Won`, won)

      const wonGroupByParty = sortBy(groupBy(won, candidate => candidate['推薦政黨']), partyCandidatesWon => -partyCandidatesWon.length)
      Vue.set(state.data[ordinal], `${field}WonGroupByParty`, wonGroupByParty)

      const wonSortByDonateTotal = sortBy(won, candidate => -Number(candidate['總收入'].split(',').join('')))
      Vue.set(state.data[ordinal], `${field}WonSortByDonateTotal`, wonSortByDonateTotal)

      const wonSortByDonateCompany = sortBy(won, candidate => -Number(candidate['營利事業捐贈收入'].split(',').join('')))
      Vue.set(state.data[ordinal], `${field}WonSortByDonateCompany`, wonSortByDonateCompany)

      const wonSortByDonateCompanyCount = sortBy(won, candidate => -Number(candidate['捐贈企業數']))
      Vue.set(state.data[ordinal], `${field}WonSortByDonateCompanyCount`, wonSortByDonateCompanyCount)

      const groupByCounty = groupBy(body, row => {
        if (row['地區'].includes('市') || row['地區'].includes('縣')) {
          const county = row['地區'].slice(0, 3)
          return county
        } else {
          return row['地區']
        }
      })
      Vue.set(state.data[ordinal], `${field}GroupByCounty`, groupByCounty)
    }

    if (field === 'rawDataCompanyDonate') {
      const groupByGroupOrCompany = groupBy(body, returnGroupThenCompany)
      Vue.set(state.data[ordinal], `${field}GroupByGroupOrCompany`, groupByGroupOrCompany)

      const groupByCompany = groupBy(body, '統一編號')
      Vue.set(state.data[ordinal], `${field}GroupByCompany`, groupByCompany)
    }
  },
  SET_DATA_CORP_NAME_TAXID_MAPPING: (state, { body, field, }) => {
    Vue.set(state, field, body)

    const groupByName = groupBy(body, '名稱')
    Vue.set(state, `${field}GroupByName`, groupByName)
  },
  SET_SECTION_EXPLORE_RADIO_PICKED: (state, pick) => {
    Vue.set(state.section.explore.navs, 'radioPicked', pick)
  },
  SET_SECTION_EXPLORE_SORT_BY: (state, type) => {
    Vue.set(state.section.explore.navs, 'sortedBy', type)
  },
  SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE: (state, type) => {
    Vue.set(state.section.explore.force, 'mouseoverGraphType', type)
  },
  SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE: (state, type) => {
    Vue.set(state.section.explore.force, 'mouseoverIdentityType', type)
  },
  SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID: (state, id) => {
    Vue.set(state.section.explore.force, 'mouseoverIdentityId', id)
  },
  SET_CURRENT_LIGHTBOX_SHOWN_NAME: (state, name) => {
    Vue.set(state, 'currentLightboxShownName', name)
  },
  PUSH_CANDIDATE_TO_DUEL: (state, candidateName) => {
    const candidateLimitOnStage = 2
    const stage = state.section.explore.duel.candidatesOnStage
    if (stage.length < candidateLimitOnStage) {
      if (stage.includes(candidateName)) {
        const index = indexOf(stage, candidateName)
        stage.splice(index, 1)
      } else {
        stage.push(candidateName)
      }
    } else if (stage.length === candidateLimitOnStage) {
      if (stage.includes(candidateName)) {
        const index = indexOf(stage, candidateName)
        stage.splice(index, 1)
      } else {
        stage.splice(0, 2) // from index 0, delete 2 elements
        stage.push(candidateName)
      }
    }
  }
}