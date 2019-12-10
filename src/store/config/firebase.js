import * as Firebase from 'firebase/app'
import 'firebase/firestore'
const { FIREBASE_CONFIG_ELECTION } = require('../../../api/config')

function initFirebase () {
  if (!Firebase.apps.length) {
    Firebase.initializeApp(FIREBASE_CONFIG_ELECTION)
  }
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

export { Firebase, initFirebase }