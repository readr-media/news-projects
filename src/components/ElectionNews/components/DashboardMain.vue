<template>
  <main class="main">
    <div v-if="mainViewStatusFetched === 'loading'">
      <p>loading...</p>
    </div>
    <div v-else-if="mainViewStatusFetched === 'fail'">
      <p>發生錯誤，請檢查網址是否給錯關鍵字</p>
    </div>
    <div v-else-if="mainViewStatusFetched === 'success'">
      <DashboardMainSingle v-if="mainViewStatus === 'single'"/>
      <DashboardMainDuel v-else-if="mainViewStatus === 'duel'"/>
    </div>
  </main>
</template>

<script>
import DashboardMainSingle from './DashboardMainSingle.vue'
import DashboardMainDuel from './DashboardMainDuel.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    DashboardMainSingle,
    DashboardMainDuel
  },
  computed: {
    ...mapGetters([
      'keywordsMappingFetchStatus',
      'keywordIdFirst',
      'keywordIdSecond'
    ]),
    mainViewStatus () {
      const { params, subparams } = this.$route.params
      if (subparams !== undefined) {
        return 'duel'
      }
      if (params !== undefined) {
        return 'single'
      }
      return null
    },
    mainViewStatusFetched () {
      if (this.keywordsMappingFetchStatus === 'loading') {
        return 'loading'
      } else if (this.keywordsMappingFetchStatus === 'finish') {
        switch (this.mainViewStatus) {
          case 'duel':
            return this.keywordIdFirst !== undefined && this.keywordIdSecond !== undefined ? 'success' : 'fail'
          case 'single':
            return this.keywordIdFirst !== undefined ? 'success' : 'fail'
          default:
            return 'fail'
        }
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.main
  padding 20px 20px 20px 10px
</style>