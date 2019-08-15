import { appendSheet } from '../../../api'

export default {
  async ADD_MESSAGE ({}, { resource }) {
    return appendSheet({
      params: {
        spreadsheetId: '1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk',
        range: '連儂牆留言板',
        valueInputOption: 'RAW',
        resource: resource,
      }
    })
  }
}