<template>
  <div>
    <template v-for="(cbc, year) in countByCity">
      <InfographicLayout>
        <Infographic
          maxCount="50"
          minCount="0"
          :id="`hits-${year}`"
          :year="year"
          :dataByStadium="countByStadium[ year ]"
          :dataCountByCity="cbc" />
        <div class="infographic__label">
          <span v-html="$t('PENG23.LABEL.HITS_COUNT_BY_CITY_YEAR', { year, count: total[ year ] })"></span>
        </div>
      </InfographicLayout>
    </template>
  </div>
</template>
<script>
  import Infographic from './Infographic.vue'
  import InfographicLayout from './InfographicLayout.vue'
  import numeral from 'numeral'
  import { groupBy, map, sumBy } from 'lodash'
  const debug = require('debug')('CLIENT:HitCountByCityYear')
  export default {
    name: 'HitCountByCityYear',
    components: {
      Infographic,
      InfographicLayout,
    },
    computed: {
      normalizedPerformance () {
        return groupBy(this.performanceRaw, g => g.year)
      },
      countByCity () {
        const count = {}
        map(this.normalizedPerformance, (y, k) => {
          count[ k ] = count[ k ] || {}
          map(groupBy(y, g => g.city), (c, n) => {
            count[ k ][ n ] = sumBy(c, g => numeral(g.H).value())
          })
        })
        return count
      },
      countByStadium () {
        const count = {}
        map(this.normalizedPerformance, (y, k) => {
          count[ k ] = count[ k ] || {}
          map(groupBy(y, g => g.stadium), (c, n) => {
            count[ k ][ n ] = sumBy(c, g => numeral(g.H).value())
          })
        })
        return count
      },
      total () {
        const count = {}
        map(this.normalizedPerformance, (y, k) => {
          count[ k ] = sumBy(y, g => numeral(g.H).value())
        })
        return count
      }
    },
    methods: {},
    mounted () {
      console.log('this.normalizedPerformance', this.normalizedPerformance)
    },
    props: {
      performanceRaw: {}
    }
  }
</script>
<style lang="stylus" scoped></style>