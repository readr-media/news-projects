<template>
  <InfographicLayout>
    <Infographic
      id="HitCountByCity"
      :dataByStadium="hitsCountByStadium"
      :dataCountByCity="hitsCountByCity" />
    <div class="infographic__label"><span v-html="$t('PENG23.LABEL.HITS_COUNT_BY_CITY')"></span></div>
  </InfographicLayout>
</template>
<script>
  import Infographic from './Infographic.vue'
  import InfographicLayout from './InfographicLayout.vue'
  import numeral from 'numeral'
  import { filter, get, groupBy, map, sum, sumBy } from 'lodash'
  export default {
    name: 'HitCountByCity',
    components: {
      Infographic,
      InfographicLayout
    },
    computed: {
      hitsCountByCity () {
        const count = {}
        map(this.groupedPerformanceByCity, (c, k) => {
          count[ k ] = sumBy(c, g => numeral(g.H).value())
        })
        return count
      },
      hitsCountByStadium () {
        const count = {}
        map(this.groupedPerformanceByCity, c => {
          map(groupBy(c, g => g.stadium), (s, k) => {
            count[ k ] = sumBy(s, g => numeral(g.H).value())
          })
        })
        return count          
      },
      totalHits () {
        return sum(map(this.hitsCountByStadium, s => s))
      }
    },
    methods: {},
    mounted () {},
    props: {
      groupedPerformanceByCity: {}
    }
  }
</script>
<style lang="stylus" scoped></style>