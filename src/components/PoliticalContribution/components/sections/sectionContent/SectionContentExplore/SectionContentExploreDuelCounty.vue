<template>
  <div class="section-content-explore-duel-candidates-list">
    <h1><img class="section-content-explore-duel-candidates-list__finger-hint" v-lazy="'/proj-assets/political-contribution/finger.png'" alt="">選兩位來 PK 吧！</h1>
    <SectionContentExploreDuelCountyList
      v-for="data in rawDataBasicCurrentOrdinalGroupByCountySorted"
      :key="getCountyName(data)"
      :countyName="getCountyName(data)"
      :countyCandidates="getCountyCandidates(data)"
    />
  </div>
</template>

<script>
import { get, sortBy, indexOf } from 'lodash'
import { COUNTY_SORT } from 'src/components/PoliticalContribution/constants'

import SectionContentExploreDuelCountyList from './SectionContentExploreDuelCountyList.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreDuelCountyList,
  },
  computed: {
    ...mapGetters([
      'rawDataBasicCurrentOrdinalGroupByCounty',
    ]),
    rawDataBasicCurrentOrdinalGroupByCountySorted () {
      const data = Object.entries(this.rawDataBasicCurrentOrdinalGroupByCounty)
      return sortBy(data, array => {
        const county = get(array, 0, '')
        return indexOf(COUNTY_SORT, county)
      })
      return data
    }
  },
  methods: {
    getCountyName (data) {
      return get(data, 0, '')
    },
    getCountyCandidates (data) {
      return get(data, 1, [])
    },
  },
}
</script>


<style lang="stylus" scoped>
.section-content-explore-duel-candidates-list
  padding 0 0 0 40px
  &__finger-hint
    width 40px
    transform rotate(90deg)
    vertical-align middle
    margin 0 10px 0 0
</style>

