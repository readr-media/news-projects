<template>
  <div class="bingo-others-container">
    <BingoFrame v-for="(cells, index) in bingoCellsToShow" 
      :key="index" 
      :isMini="true"
      :cells="cells"
      @click.native="HANDLE_CLICK({ cells: cells })"
      @mouseenter.native="HANDLE_TOOLTIP({ showTooltip: true, cells: cells }, $event)"
      @mouseleave.native="HANDLE_TOOLTIP({ showTooltip: true, cells: cells })"/>

    <LightboxWrapper
      :showLightbox.sync="showLightbox"
    >
      <BingoFrame class="bingo-frame" :cells="selectedFrame" :freeze="true"/>
    </LightboxWrapper>
    <Tooltip :showTooltip="showTooltip" :x="tooltipX" :y="tooltipY">
      <BingoFrame class="bingo-frame" :cells="selectedFrame" :freeze="true" :style="{'font-size':'12px', 'width': '30vw'}"/>
    </Tooltip>

  </div>
</template>

<script>
import BingoFrame from './BingoFrame.vue'
import LightboxWrapper from '../LightboxWrapper.vue'
import Tooltip from '../Tooltip.vue'


import { mapState, mapGetters, mapMutations, mapStateRoot } from 'vuex'
import { get } from 'lodash'

export default {
  data() {
    return {
      showLightbox: false,
      showTooltip: false,
      tooltipX: 0,
      tooltipY: 0,
      selectedFrame: null
    }
  },
  components: {
    BingoFrame,
    LightboxWrapper,
    Tooltip,
  },
  computed: {
    data(){
      return {
        page: 0,
      }
    },
    ...mapState('realtimeBingoCandidateStats', {
      momentumCandidates: 'data',
    }),
    ...mapState({
      vw: state => state.viewport[0],
    }),
    bingoCellsToShow: function() {
      if (this.vw >= 768) {
        return this.bingoCells
      } else {
        return this.bingoCells.slice( this.page * 2 ,2 )
      }
    },
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
  methods: {
    HANDLE_CLICK({ cells }) {
      if (this.vw >= 768) {
        return
      }
      this.showLightbox = true
      this.selectedFrame = cells
    },
    HANDLE_TOOLTIP ({ showTooltip, cells }, event) {
      if (this.vw < 768) {
        return
      }

      if (showTooltip) {
        this.selectedFrame = cells
      }
      this.showTooltip = showTooltip

      if (event) {
        this.tooltipX = event.clientX
        this.tooltipY = event.clientY
      }
    }
  },
  created() {
    this.$store.dispatch('realtimeBingoCandidateStats/fetchAndAdd')
  },
}
</script>
<style lang="stylus" scoped>
.bingo-others-container
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-gap 10px 10px
  justify-content space-between

@media (min-width: 768px)
  .bingo-others-container
    grid-template-columns repeat(5, 1fr)
    grid-template-rows repeat(2, 1fr)
</style>