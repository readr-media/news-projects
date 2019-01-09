<template>
  <InfographicLayout>
    <Infographic
      id="HomerunCountByCity"
      :dataByStadium="groupedDataCountByStadium"
      :dataCountByCity="groupedDataCountByCity" />
    <div class="infographic__label"><span v-html="$t('PENG23.LABEL.HOMERUN_COUNT_BY_CITY')"></span></div>
  </InfographicLayout>
</template>
<script>
  import Infographic from './Infographic.vue'
  import InfographicLayout from './InfographicLayout.vue'
  import { groupBy, map } from 'lodash'
  const debug = require('debug')('CLIENT:HomerunCountByCity')
  export default {
    name: 'HomerunCountByCity',
    components: {
      Infographic,
      InfographicLayout
    },
    computed: {
      groupedDataCountByCity () {
        const count = {}
        map(this.groupedData, (c, k) => {
          count[ k ] = c.length
        })
        return count        
      },
      groupedDataCountByStadium () {
        const count = {}
        map(this.groupedData, c => {
          map(groupBy(c, s => s.place), (p, k) => {
            count[ k ] = p.length
          })
        })
        return count          
      },
    },
    props: {
      groupedData: {},
      groupedByStadium: {},
    }
  }
</script>
<style lang="stylus" scoped></style>