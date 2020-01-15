<template>
  <div class="bingo-momentum-root">
    <BingoMomentumCell 
      v-for="(candidate, index) in sortCandidates"
      :index="index" 
      :key="index"
      :candidateName="candidateName(candidate)"
      :zoneName="zoneName(candidate)"
      :partyName="partyName(candidate)"/>
  </div>
</template>

<script>
import BingoMomentumCell from './BingoMomentumCell.vue'
import { mapGetters, mapState } from 'vuex'
import { clone, get, toPairs, sortBy } from 'lodash'
export default {
  created() {
    this.$store.dispatch('realtimeBingoCandidateStats/fetchAndAdd')
  },
  computed: {
    ...mapState('realtimeBingoCandidateStats', {
      momentumCandidates: 'data',
    }),
    sortCandidates: function(){
      let momentumCandidates = clone(this.momentumCandidates)
      delete momentumCandidates.id
      delete momentumCandidates.updated_at
      delete momentumCandidates.updated_by
      delete momentumCandidates.records
      const pairs = toPairs(this.momentumCandidates)
      return sortBy(pairs, (o) => {return -o[1]}).map((o) => o[0]).slice(0,3)
    },
    candidateName: function() {
      return (id) => {
        return get(this.legislator, [id, 'name'], '未知')
      }
    },
    zoneName: function() {
      return (id) => {
        return get(this.legislator, [id, 'zone'], '未知')
      }
    },
    partyName: function() {
      return (id) => {
        return this.mapPartyNameAbbr(get(this.legislator, [id, 'party'], '未知'))
      }
    },
    ...mapState('Election2020/gcs', {
      legislator: state => state.data.legislator,
      region: state => state.data.region,
    }),
    ...mapGetters('Election2020/bingo', {
      mapPartyNameAbbr: 'mapPartyNameAbbr'
    })
  },
  components: {
    BingoMomentumCell
  }
}
</script>
<style lang="stylus" scoped>
.bingo-momentum-root
  display flex
  flex-direction column
  align-items center
@media (min-width: 768px)
  .bingo-momentum-root
    flex-direction row
    justify-content space-between

  
</style>