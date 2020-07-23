import { get, groupBy, sortBy, map, mapKeys, mapValues, uniq, countBy, omit, find, includes, flatten, concat, isEmpty, forEach, some, isNaN, intersection } from 'lodash'
import * as d3 from 'd3'

import { returnGroupThenCompany, hasGroup } from './util'

import {
  DATA,
  SLUG_CONTENT_SECTION_EXPLORE,
  SLUG_CONTENT_SECTION_DASHBOARD,
  SLUG_CONTENT_SECTION_STORYS,
  SLUGS_SHOW_CONTENT_SECTION
} from 'src/components/PoliticalContribution/constants'

export default {
  // router navigations
  slug: (state, getters, rootState) => {
    return rootState.route.params.params
  },
  showSectionContent: (state, getters) => {
    return SLUGS_SHOW_CONTENT_SECTION.includes(getters.slug)
  },
  renderedSectionContent: (state, getters) => {
    if (SLUG_CONTENT_SECTION_EXPLORE.includes(getters.slug)) { return 'explore' }
    if (SLUG_CONTENT_SECTION_DASHBOARD.includes(getters.slug)) { return 'dashboard' }
    if (SLUG_CONTENT_SECTION_STORYS.includes(getters.slug)) { return 'storys' }
    return false
  },
  // data basic and company donate, current radio picked ordinal and group
  rawDataBasicAllOrdinal: (state, getters) => {
    return mapValues(get(state, 'data', {}), 'rawDataBasic')
  },
  // used by search suggestions
  rawDataBasicAllOrdinalGroupByCandidate: (state, getters) => {
    return mapValues(get(state, 'data', {}), 'rawDataBasicGroupByCandidate')
  },
  rawDataBasicAllOrdinalGroupByCandidateNameList: (state, getters) => {
    return mapValues(getters.rawDataBasicAllOrdinalGroupByCandidate, ordinalObj => {
      if (ordinalObj !== undefined) {
        return Object.keys(ordinalObj)
      }
    })
  },
  rawDataBasicCurrentOrdinal: (state, getters) => {
    return get(state, ['data', getters.ordinalRadioPicked, 'rawDataBasic'], [])
    // return get(state, [ 'data', getters.ordinalUrlQueryString, 'rawDataBasic' ], [])
  },
  rawDataBasicCurrentOrdinalGroupByCandidate: (state, getters) => { // NOTE: get calculated data
    // return groupBy(getters.rawDataBasicCurrentOrdinal, '候選人')
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicGroupByCandidate'], {})
  },
  rawDataBasicCurrentOrdinalGroupByCounty: (state, getters) => { // NOTE: get calculated data
    // return groupBy(getters.rawDataBasicCurrentOrdinal, '候選人')
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicGroupByCounty'], {})
  },
  dataBasicCurrentOrdinalCandidateUrlQuery: (state, getters) => {
    return get(getters.rawDataBasicCurrentOrdinalGroupByCandidate, getters.nameUrlQuery)
  },
  dataBasicCurrentOrdinalCandidateLightboxShown: (state, getters) => {
    return get(getters.rawDataBasicCurrentOrdinalGroupByCandidate, getters.nameLightboxShown)
  },
  rawDataCompanyDonateCurrentOrdinal: (state, getters) => { // NOTE: get calculated data
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataCompanyDonate'], [])
  },
  rawDataCompanyDonateCurrentOrdinalGroupByCandidate: (state, getters) => { // NOTE: get calculated data
    // return groupBy(getters.rawDataCompanyDonateCurrentOrdinal, '候選人')
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataCompanyDonateGroupByCandidate'], {})
  },
  rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany: (state, getters) => { // NOTE: get calculated data
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataCompanyDonateGroupByGroupOrCompany'], {})
  },
  rawDataCompanyDonateCurrentOrdinalGroupByCompany: (state, getters) => { // NOTE: get calculated data
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataCompanyDonateGroupByCompany'], {})
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShown: (state, getters) => {
    if (getters.isNameLightboxShownCorp) {
      if (getters.isQueryValidGroup) {
        return get(getters.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany, getters.nameLightboxShownGroupNameOrTaxId, [])
      } else {
        return get(getters.rawDataCompanyDonateCurrentOrdinalGroupByCompany, getters.nameLightboxShownGroupNameOrTaxId, [])
      }
    } else {
      return get(getters.rawDataCompanyDonateCurrentOrdinalGroupByCandidate, getters.nameLightboxShown, [])
    }
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByParty: (state, getters) => {
    return omit(groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShown, '推薦政黨'), ['undefined', ''])
  },
  // dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIndustryType: (state, getters) => {
  //   return omit(groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShown, '母公司產業別'), [ 'undefined', '' ])
  // },
  dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalCounty: (state, getters) => {
    return omit(groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShown, '縣市狀態'), ['undefined', ''])
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalElectionState: (state, getters) => {
    return omit(groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShown, '選區狀態'), ['undefined', ''])
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany: (state, getters) => {
    return groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShown, returnGroupThenCompany)
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompanyNameList: (state, getters) => {
    return Object.keys(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany)
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelated: (state, getters) => {
    const result = []
    getters.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompanyNameList.forEach(groupOrCompany => {
      const groupOrCompanyData = getters.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany[groupOrCompany]
      result.push(groupOrCompanyData)
    })
    return flatten(result)
  },
  // used by relationship list
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedGroupByCandidate: (state, getters) => {
    return groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated, '候選人')
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedCompanyList: (state, getters) => {
    return get(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedGroupByCandidate, getters.nameLightboxShown, []).map(row => row['統一編號'])
  },
  // used by force legends
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedGroupByWonLost: (state, getters) => {
    return groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated, candidate => candidate['當選註記'] === '*')
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedHasLostCandidate: (state, getters) => {
    return !isEmpty(get(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedGroupByWonLost, 'false', []))
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWon: (state, getters) => {
    return get(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedGroupByWonLost, 'true', [])
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWonGroupByParty: (state, getters) => {
    return groupBy(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWon, '推薦政黨')
  },
  dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWonGroupByPartyNameList: (state, getters) => {
    return Object.keys(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWonGroupByParty)
  },
  rawDataIndustryPercentageMOF: (state, getters) => { // NOTE: get calculated data
    return get(state.data, [getters.ordinalRadioPicked, 'industryPercentageMOF'], [])
  },
  rawDataIndustryPercentageMOFGroupByCandidate: (state, getters) => { // NOTE: get calculated data
    return get(state.data, [getters.ordinalRadioPicked, 'industryPercentageMOFGroupByCandidate'], [])
  },
  dataIndustryPercentageMOFCurrentOrdinalNameLightboxShown: (state, getters) => {
    return get(getters.rawDataIndustryPercentageMOFGroupByCandidate, getters.nameLightboxShown, [])
  },
  // Compute ordinal and candidate values
  ordinalRadioPicked: (state) => {
    return state.section.explore.navs.radioPicked
  },
  ordinalRadioPickedNum: (state, getters) => {
    switch (getters.ordinalRadioPicked) {
      case 'seventh':
        return 7
      case 'eighth':
        return 8
      case 'ninth':
        return 9
      case 'tenth':
        return 10
      default:
        return 9
    }
  },
  ordinalUrlQuery: (state, getters, rootState) => {
    return +get(rootState.route.query, 'ordinal', -1)
  },
  ordinalUrlQueryString: (state, getters) => {
    return get(find(DATA, ['oridinalNum', getters.ordinalUrlQuery]), 'ordinal', undefined)
  },
  nameUrlQuery: (state, getters, rootState) => {
    return get(rootState.route.query, 'name', '')
  },
  nameLightboxShown: (state, getters) => {
    return state.currentLightboxShownName
  },
  corpNamesList: (state, getters, rootState) => {
    return Object.keys(state.corpNameTaxIdMappingGroupByName)
  },
  isNameLightboxShownCorp: (state, getters) => {
    return getters.corpNamesList.includes(getters.nameLightboxShown)
  },
  nameLightboxShownGroupNameOrTaxId: (state, getters) => {
    if (getters.isNameLightboxShownCorp) {
      const mappingObj = get(state.corpNameTaxIdMappingGroupByName, [getters.nameLightboxShown, 0], {})
      return mappingObj['名稱／統一編號']
    }
  },
  isQueryValidOrdinal: (state, getters) => {
    return getters.ordinalUrlQueryString !== undefined
  },
  isQueryValidCandidateName: (state, getters) => {
    return getters.isQueryValidOrdinal && getters.dataBasicCurrentOrdinalCandidateUrlQuery !== undefined
  },
  isQueryValidGroupOrCompanyName: (state, getters) => {
    return !getters.isQueryValidCandidateName && getters.corpNamesList.includes(getters.nameUrlQuery)
  },
  isQueryValidGroup: (state, getters) => {
    const mappingObj = get(state.corpNameTaxIdMappingGroupByName, [getters.nameLightboxShown, 0], {})
    return isNaN(Number(get(mappingObj, '名稱／統一編號', 0)))
  },
  isQueryValidCompanyBelongsGroup: (state, getters) => {
    const mappingObjs = get(state.corpNameTaxIdMappingGroupByName, getters.nameLightboxShown, [])
    const mappingObjCurrentOrdinal = find(mappingObjs, ['屆數', String(getters.ordinalUrlQuery)])
    return !isEmpty(get(mappingObjCurrentOrdinal, '所屬集團', ''))
  },
  isLightBoxWorks: (state, getters) => {
    return getters.isQueryValidCandidateName || getters.isQueryValidGroupOrCompanyName
  },
  // Use by explore's won candidate listing
  rawDataBasicCurrentOrdinalWon: (state, getters) => { // NOTE: get calculated data
    // return sortBy(get(groupBy(getters.rawDataBasicCurrentOrdinal, candidate => candidate['當選註記'] === '*'), 'true', []), candidate => -Number(candidate['總收入'].split(',').join('')))
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicWon'], [])
  },
  rawDataBasicCurrentOrdinalWonGroupByParty: (state, getters) => { // NOTE: get calculated data
    // return sortBy(groupBy(getters.rawDataBasicCurrentOrdinalWon, candidate => candidate['推薦政黨']), partyCandidatesWon => -partyCandidatesWon.length)
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicWonGroupByParty'], [])
  },
  rawDataBasicCurrentOrdinalWonSortByDonateTotal: (state, getters) => { // NOTE: get calculated data
    // return sortBy(getters.rawDataBasicCurrentOrdinalWon, candidate => -Number(candidate['總收入'].split(',').join('')))
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicWonSortByDonateTotal'], [])
  },
  rawDataBasicCurrentOrdinalWonSortByDonateCompany: (state, getters) => { // NOTE: get calculated data
    // return sortBy(getters.rawDataBasicCurrentOrdinalWon, candidate => -Number(candidate['營利事業捐贈收入'].split(',').join('')))
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicWonSortByDonateCompany'], [])
  },
  rawDataBasicCurrentOrdinalWonSortByDonateCompanyCount: (state, getters) => { // NOTE: get calculated data
    // return sortBy(getters.rawDataBasicCurrentOrdinalWon, candidate => -Number(candidate['捐贈企業數']))
    return get(state.data, [getters.ordinalRadioPicked, 'rawDataBasicWonSortByDonateCompanyCount'], [])
  },
  // rank data usage
  // TODO: rename
  rankDataGroupCompanyDonatesCurrentOrdinalNameLightboxShown: (state, getters) => {
    if (getters.isNameLightboxShownCorp) {
      const result = d3.nest()
        .key(d => d['候選人'])
        .rollup(leaves => d3.sum(leaves, d => d['收入金額']))
        .entries(getters.dataCompanyDonateCurrentOrdinalNameLightboxShown)
        .sort((a, b) => +b.value - +a.value)

      result.forEach(candidate => {
        const party = get(getters.rawDataBasicCurrentOrdinalGroupByCandidate, [candidate.key, 0, '推薦政黨'], '')
        candidate.party = party
      })

      return result
    } else {
      const getOrderingRef = (data) => {
        let orderingRef = d3.nest()
          .key(returnGroupThenCompany)
          .rollup(leaves => d3.sum(leaves, d => d['收入金額']))
          .entries(data)
        orderingRef.sort((a, b) => b.value - a.value)
        orderingRef = orderingRef.map(o => o.key)
        return orderingRef
      }

      let groupAndCompanySorted = getters.dataCompanyDonateCurrentOrdinalNameLightboxShown.sort((a, b) => b['收入金額'] - a['收入金額'])
      const orderingRef = getOrderingRef(groupAndCompanySorted)

      groupAndCompanySorted = d3.nest()
        .key(returnGroupThenCompany).sortKeys(function (a, b) { return orderingRef.indexOf(a) - orderingRef.indexOf(b) })
        .key(d => d['統一編號'])
        .rollup(leaves => ({ values: d3.sum(leaves, d => d['收入金額']) }))
        .entries(groupAndCompanySorted)
      groupAndCompanySorted = groupAndCompanySorted.map(o => {
        const isGroup = o.values[0].key !== o.key
        const groupOrCompanyName = get(getters.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany, [o.key, 0])[o.values[0].key === o.key ? '捐贈者／支出對象' : '集團碼']
        if (isGroup) {
          o.values.forEach(d => {
            d.keyCompanyFormatted = find(get(getters.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany, [groupOrCompanyName]), ['統一編號', d.key])['捐贈者／支出對象']
          })
        }

        return {
          type: isGroup ? 'group' : 'company',
          keyCompanyFormatted: groupOrCompanyName,
          key: o.key,
          values: o.values
        }
      })
      return groupAndCompanySorted
    }
  },
  rankDataRelationshipCurrentOrdinalCandidateLightboxShown: (state, getters) => {
    const overlappingCount = mapValues(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedGroupByCandidate, candidateObj => {
      const candidateCompanyDoanteList = candidateObj.map(row => row['統一編號'])
      return intersection(getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedCompanyList, candidateCompanyDoanteList).length
    })
    const overlappingCountSorted = sortBy(Object.entries(omit(overlappingCount, getters.nameLightboxShown)), candidate => -candidate[1])
    overlappingCountSorted.forEach(candidate => candidate.push(get(getters.rawDataCompanyDonateCurrentOrdinalGroupByCandidate, [candidate[0], 0, '推薦政黨'], '')))
    return overlappingCountSorted
  },
  // force data
  dataForceNested: (state, getters) => {
    const relatedData = getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated
    return {
      byCandidate: d3.nest().key(d => d['候選人']).key(returnGroupThenCompany).object(relatedData),
      byCompany: d3.nest().key(returnGroupThenCompany).key(d => d['候選人']).object(relatedData),
      byParentCompany: d3.nest().key(d => { if (hasGroup(d)) { return d['集團碼'] } }).key(d => d['候選人']).object(relatedData),
      byChildCompany: d3.nest().key(d => d['統一編號']).key(d => d['候選人']).object(relatedData)
    }
  },
  dataForceNestedNameList: (state, getters) => {
    const nestedData = getters.dataForceNested
    return {
      candidate: d3.keys(nestedData.byCandidate),
      group: d3.keys(nestedData.byParentCompany),
      company: d3.keys(nestedData.byChildCompany),
      company: concat(d3.keys(nestedData.byParentCompany), d3.keys(nestedData.byChildCompany))
    }
  },
  dataForceDonateSum: (state, getters) => {
    const relatedData = getters.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated
    return {
      candidate: mapValues(groupBy(relatedData, '候選人'), donates => donates.reduce((acc, curr) => acc + +(curr['收入金額'].split(',').join()), 0)),
      company: mapValues(groupBy(relatedData, returnGroupThenCompany), donates => donates.reduce((acc, curr) => acc + +(curr['收入金額'].split(',').join()), 0))
    }
  },
  dataForceGraph: (state, getters) => {
    const resultGraph = { nodes: [], links: [] }
    // Object.entries(this.nestedData.byCandidate).forEach(([candidateKey, companyObjs]) => {})
    forEach(getters.dataForceNested.byCandidate, (groupOrCompanyObjs, candidateName) => {
      forEach(groupOrCompanyObjs, (groupOrComapnyData, groupOrCompanyName) => {
        const total = d3.sum(groupOrComapnyData, d => +d['收入金額'] / 100000)
        forEach(groupOrComapnyData, row => {
          const isExistInGraphCandidate = some(resultGraph.nodes, ['id', row['候選人']])
          const isExistInGraphGroupOrComapny = hasGroup(row) ? some(resultGraph.nodes, ['id', row['集團碼']]) : some(resultGraph.nodes, ['id', row['統一編號']])

          // Processing nodes
          if (!isExistInGraphCandidate) {
            resultGraph.nodes.push({
              type: 'candidate',
              id: row['候選人'],
              party: row['推薦政黨'],
              wonStamp: row['當選註記'] === '*'
            })
          }
          if (!isExistInGraphGroupOrComapny) {
            resultGraph.nodes.push({
              type: hasGroup(row) ? 'group' : 'company',
              taxId: hasGroup(row) ? null : row['統一編號'],
              id: returnGroupThenCompany(row),
              party: '公司'
              // 'targetParty': [ row['推薦政黨'] ],
            })
          } else {
            // if (row['當選註記'] === '*') {
            //   const node = hasGroup(row) ? find(resultGraph.nodes, [ 'id', row['集團碼'] ]) : find(resultGraph.nodes, [ 'id', row['統一編號'] ])
            //   node.targetParty.push(row['推薦政黨'])
            //   node.targetParty = uniq(node.targetParty)
            // }
          }
          // Processing links
          resultGraph.links.push({
            target: row['候選人'],
            targetParty: row['當選註記'] !== '*' || row['推薦政黨'],
            source: returnGroupThenCompany(row),
            type: hasGroup(row) ? 'group' : 'company',
            value: total
          })
        })
      })
    })
    return resultGraph
  },
  dataForceLinkedByIndex: (state, getters) => {
    if (isEmpty(getters.dataForceGraph.links)) return {}
    const linkedByIndex = {}
    getters.dataForceGraph.links.forEach(d => {
      linkedByIndex[d.source + ',' + d.target] = true
    })
    return linkedByIndex
  },
  hasDataForceGraph: (state, getters) => {
    return !isEmpty(getters.dataForceGraph.nodes) && !isEmpty(getters.dataForceGraph.links)
  },
  // force tooltip
  dataForceTooltipCurrentGraphType: (state) => {
    return state.section.explore.force.mouseoverGraphType
  },
  dataForceTooltipCurrentIdentityType: (state) => {
    return state.section.explore.force.mouseoverIdentityType
  },
  dataForceTooltipCurrentIdentityId: (state) => {
    return state.section.explore.force.mouseoverIdentityId
  }

}
