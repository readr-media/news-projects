<template>
  <section
    id="election-2020"
  >
    <LatestNews />
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
    return Promise.resolve()
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
  }
}
</script>

<style lang="stylus">
</style>
