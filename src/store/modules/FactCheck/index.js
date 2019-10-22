import Vue from 'vue'
import { concat, get, values } from 'lodash'
import { getSheet, getSheetWithoutRedis } from '../../../api'

export default {
  namespaced: true,
  state () {
    return {
      googleSheet: {
        statistics: [],
        typeNetizen: [],
        transcript: [],
        verifyNetizen: [],
        verifiedDataItems: [],
        verifiedDataCount: [],
        volunteer: []
      },
      dataListLoading: false,
      page: 1
    }
  },
  actions: {
    async FETCH_GOOGLE_SHEET ({ state, commit }, { name, params, isLoadMore = false, useRedis = true }) {
      try {
        let res
        if (useRedis) {
          res = await getSheet({ params })
        } else {
          res = await getSheetWithoutRedis({ params })
        }
        const data = get(res, 'body')
        const hasData = data !== 'No data found in Google Sheet.'
        if (hasData && isLoadMore) {
          const orig = values(get(state, `googleSheet.${name}`) || [])
          const concatedData = concat(orig, data)
          commit('SET_GOOGLE_SHEET', { name, data: concatedData })
          return concatedData
        } else {
          hasData && commit('SET_GOOGLE_SHEET', { name, data })
          return data
        }
      } catch (error) {
        return error
      }
    }
  },
  mutations: {
    SET_GOOGLE_SHEET: (state, { name, data }) => {
      Vue.set(state.googleSheet, name, data)
    },
    SET_LOADING_STATUS: (state, { status = false }) => Vue.set(state, 'dataListLoading', status),
    SET_PAGE: (state, value) => Vue.set(state, 'page', value)
  },
  getters: {
    statisticsFormated: state => (get(state, 'googleSheet.statistics') || []).map(data => ({
      candidate: data[0],
      amount: {
        wrong: data[1], // 含有錯誤訊息
        real: data[3], // 真實
        controversial: data[5], // 片面事實
        verifiable: data[9], // 含有可查證內容
        verified: data[7], // 已驗證則數
        unverification: data[11], // 不屬於查證範圍
        normal: data[13], // 一般敘述性文字或個人意見
        total: data[15] // 目前總發言拆段數
      },
      percentage: {
        wrong: Number.isNaN(Number(data[2])) ? 0 : Number(data[2]), // 含有錯誤訊息%
        real: Number.isNaN(Number(data[4])) ? 0 : Number(data[4]), // 真實％
        controversial: Number.isNaN(Number(data[6])) ? 0 : Number(data[6]), // 片面事實%
      }
    })).sort((a, b) => b.amount.wrong - a.amount.wrong),
    verifiedDataFormated: state => (get(state, 'googleSheet.verifiedDataItems') || [])
      .filter(data => data[0] && data[0] !== '#N/A')
      .map(data => {
        const references = data[5].split('、').map(item => {
          const splited = item.split(' ')
          const name = splited[0]
          let url
          if (splited.length > 1) {
            url = splited[1]
          } else if (splited[0].match(/^https?:\/\//)) {
            url = splited[0]
          }
          return {
            name,
            url
          }
        })
        return {
          candidate: data[0], // 候選人
          sentences: data[1], // 需查核的句子
          result: data[2], // 查核結果
          tags: data[3], // 內容標籤
          description: data[4].replace(/\n/g, '<br>'), // 查核說明
          references, // 查核參考資料
          date: data[6], // 發言時間
          media: data[7], // 認領媒體
          typescript: data[8], // 分段的逐字稿
          typescriptSource: data[9], // 影片網址
          opinionCount: Number(data[11]), // 網友回報次數
          opinions: [ data[12], data[13], data[14] ], // 網友回報
          mediaResponse: data[15], // 媒體回覆
          showOpinion: data[16] === 'V' // 是否匯入網站上
        }
      }),
    verifiedDataCountFormated: state => {
      const count = get(state, 'googleSheet.verifiedDataCount.0.0') || 0
      return Number(count)
    }
  }
}