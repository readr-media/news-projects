const { google, } = require('googleapis')
const OAuth2Client = google.auth.OAuth2
const { GOOGLE_API_CLIENT_SECRET, GOOGLE_API_CREDENTIALS, } = require('../../config.js')

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0])

  oAuth2Client.setCredentials(GOOGLE_API_CREDENTIALS)
  callback(oAuth2Client)
}

const authGoogleAPI = (req, res, next) => {
  authorize(GOOGLE_API_CLIENT_SECRET, auth => {
    req.auth = auth
    next()
  })
}

module.exports = {
  authGoogleAPI
}