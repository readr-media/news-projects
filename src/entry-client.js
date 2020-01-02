import "core-js/modules/es.promise"
import "core-js/modules/es.array.iterator"

import { createApp } from './app'

const { app, router, store } = createApp()
const EU = require('express-useragent')
const userAgent = new EU.UserAgent().parse(navigator.userAgent)

const debug = require('debug')('CLIENT:entry-client')

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__)
}

store.state.useragent = userAgent

router.onReady(() => {
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  const serviceWorkPath = './service-worker.js'
  debug(serviceWorkPath)
  navigator.serviceWorker.register(serviceWorkPath)
}
