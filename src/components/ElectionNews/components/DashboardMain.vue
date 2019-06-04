<template>
  <main class="main">
    <div v-if="mainViewStatusFetched === 'loading'">
      <p>loading...</p>
    </div>
    <div v-else-if="mainViewStatusFetched === 'fail'">
      <p>{{ $t('ELECTION_NEWS.DASHBOARD.FETCH_FAIL') }}</p>
    </div>
    <div v-else-if="mainViewStatusFetched === 'success'">
      <DashboardMainSingle v-if="mainViewStatus === 'single'"/>
      <DashboardMainDuel v-else-if="mainViewStatus === 'duel'"/>
      <div class="navs-insight">
        <div
          class="navs-insight__nav"
          @click="newTab('https://www.readr.tw/post/1668')"
          ga-on="click"
          ga-event-category="projects"
          ga-event-action="click"
          ga-event-label="manual bottom"
        >
          {{ $t('ELECTION_NEWS.DASHBOARD.EXTERNAL_LINKS.MANUAL') }}
        </div>
        <div
          class="navs-insight__nav"
          @click="newTab('https://www.readr.tw/post/1669')"
          ga-on="click"
          ga-event-category="projects"
          ga-event-action="click"
          ga-event-label="insight bottom"
        >
          {{ $t('ELECTION_NEWS.DASHBOARD.EXTERNAL_LINKS.INSIGHT') }}
        </div>
      </div>
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
  methods: {
    newTab (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  padding 20px 20px 20px 10px

.navs-insight
  width 100%
  margin 20px 0 0 0
  &__nav
    width 100%
    height 20px
    display flex
    justify-content center
    align-items center
    border 1px solid #999999
    font-size 10px
    font-weight 400
    cursor pointer
    color #4a4a4a
    & + &
      margin 10px 0 0 0

@media (min-width 1024px)
  .main
    padding 50px 0

  .navs-insight
    &__nav
      height 30px
      font-size 14px
</style>