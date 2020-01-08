<template>
  <div class="bingo-others-container">
    <BingoFrame v-for="(cells, index) in bingoCells" 
      :key="index" 
      :isMini="true"
      :cells="cells"/>
  </div>
</template>

<script>
import BingoFrame from './BingoFrame.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'
import { get } from 'lodash'

export default {
  components: {
    BingoFrame,
  },
  computed: {
    ...mapState('realtimeBingoCandidateStats', {
      momentumCandidates: 'data',
    }),
    bingoCells: function(){
      let bingoCells = get(this.momentumCandidates, 'records', []).map((s) => s.split(','))
      let result = []
      for (let i = 0; i < 10; i++) {
        if (bingoCells[i] === undefined) {
          result[i] = new Array(25).fill('unknown');
        } else {
          result[i] = bingoCells[i]
        }
      }
      return result
    },
  },
  created() {
    this.$store.dispatch('realtimeBingoCandidateStats/fetchAndAdd')
  },
}
</script>
<style lang="stylus" scoped>
.bingo-others-container
  display grid
  grid-template-columns repeat(5, 1fr)
  grid-template-rows repeat(2, 1fr)
  grid-gap 10px 10px
  justify-content space-between
</style>