import { appendSheet } from '../../../api'

const SPREADSHEET_ID = '1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk'

export default {
  namespaced: true,
  state: () => ({
  }),
  actions: {
    async ADD_MESSAGE ({}, { resource }) {
      return appendSheet({
        params: {
          spreadsheetId: SPREADSHEET_ID,
          range: '連儂牆留言板',
          valueInputOption: 'RAW',
          resource: resource,
        }
      })
    }
  },
  mutations: {

  }
}