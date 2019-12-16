<template>
  <section
    id="election-2020"
  >
    <LatestNews @update="updateLatestNews" />
    <FirebaseCreateUpdate />
    <FirebaseRead />
  </section>
</template>

<script>
import storeModule from 'src/store/modules/Election2020'
import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapMutations } = createNamespacedHelpers('Election2020')

import FirebaseRead from './templates/FirebaseRead.vue'
import FirebaseCreateUpdate from './templates/FirebaseCreateUpdate.vue'

const fetchLatestNews = store => store.dispatch('Election2020/FETCH_GOOGLE_SHEET', {
  params: {
    spreadsheetId: '1p9GfrjPdcXbkq8aRIYTk3IFB7gmIR1lO2rLrxagp8do',
    range: '記者填寫區!A3:G',
    redisTimeout: 300
  }
})

export default {
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'election2020',
      metaImage: 'election2020/ogimage.png'
    }
  },
  serverPrefetch () {
    this.registerStoreModule()
    
    return Promise.all([
      fetchLatestNews(this.$store)
    ])
      .catch(err => console.error(err)) // need error handle
  },
  components: {
    FirebaseCreateUpdate,
    FirebaseRead,
    LatestNews: () => import('./components/LatestNews.vue')
  },
  beforeMount () {
    this.registerStoreModule(true)
  },
  destroyed() {
    this.$store.unregisterModule('Election2020')
  },
  methods: {
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('Election2020', storeModule, { preserveState: shouldPreserveState })
    },
    updateLatestNews () {
      fetchLatestNews(this.$store)
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="stylus">
</style>
