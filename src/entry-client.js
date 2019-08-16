import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

const { app, router, store } = createApp()
const EU = require('express-useragent')
const userAgent = new EU.UserAgent().parse(navigator.userAgent)

const debug = require('debug')('CLIENT:entry-client')

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

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
