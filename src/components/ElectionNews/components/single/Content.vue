<template>
  <section class="content">
    <div v-show="!isGraphDataFetched">
      <p>Loading...</p>
    </div>
    <div
      v-show="isGraphDataFetched"
      class="content__data-fetched"
    >
      <p>{{ $t('ELECTION_NEWS.DASHBOARD.CHART_TITLE') }}</p>
      <ContentChart/>
    </div>
  </section>
</template>

<script>
import ContentChart from './ContentChart.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    ContentChart
  },
  computed: {
    ...mapState({
      graphData: state => state.data.graph
    }),
    ...mapGetters([
      'keywordIdFirst'
    ]),
    isGraphDataFetched () {
      return this.keywordIdFirst in this.graphData
    }
  },
  mounted () {
    // this.$scrollTo('.content')
  }
}
</script>

<style lang="stylus" scoped>
.content
  &__data-fetched
    margin 16px 0 0 0
    p
      font-size 10px
      text-align center

@media (min-width 1024px)
  .content
    &__data-fetched
      p
        font-size 14px
</style>