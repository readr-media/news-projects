<template>
  <div>
    <div class="bingo-others-container">
      <BingoFrame v-for="(cells, index) in bingoCellsToShow"
        :key="index"
        :isMini="true"
        :cells="cells"
        @click.native="HANDLE_CLICK({ cells: cells })"
        @mouseenter.native="HANDLE_TOOLTIP({ showTooltip: true, cells: cells }, $event)"
        @mouseleave.native="HANDLE_TOOLTIP({ showTooltip: false, cells: cells })"/>
      <LightboxWrapper
        :showLightbox.sync="showLightbox"
      >
        <BingoFrame
          class="bingo-frame"
          :cells="selectedFrame"
          :freeze="true"
          :isOthers="true"
        />
      </LightboxWrapper>
      <Tooltip :showTooltip="showTooltip" :x="tooltipX" :y="tooltipY">
        <BingoFrame
          class="bingo-frame"
          :cells="selectedFrame"
          :freeze="true"
          :isOthers="true"
          :style="{'font-size':'12px', 'width': '30vw'}"
        />
      </Tooltip>
    </div>
    <div v-show="this.vw < 768" class="bingo-others-pagination">
        <div href="#" v-on:click="HANDLE_LEFT_PAGE">
          <span class="bingo-others-left"></span>
        </div>
        <div class="bingo-others-more">
          看更多
        </div>
        <div href="#" v-on:click="HANDLE_RIGHT_PAGE">
          <span class="bingo-others-right"></span>
        </div>
      </div>
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
      selectedFrame: null,
      page: 0,
    }
  },
  components: {
    BingoFrame,
    LightboxWrapper,
    Tooltip,
  },
  computed: {
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
        const i = this.page * 2
        return this.bingoCells.slice( i , i + 2 )
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
    },
    HANDLE_LEFT_PAGE(){
      this.page = (this.page + 4) % 5
    },
    HANDLE_RIGHT_PAGE(){
      this.page = (this.page + 1) % 5
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
  grid-template-columns repeat(2, 1fr)
  grid-gap 20px 0
  justify-content space-between

.bingo-others-pagination
  display flex
  flex-direction row
  justify-content center
  align-items center
  margin-top 20px

.bingo-others-left
  display inline-block
  width 2.75em
  height 2.75em
  border 1px solid #333
  border-radius 50%
  margin-right 1.5em
  background-color black
  cursor pointer

.bingo-others-left:after
  content ''
  display inline-block
  margin-top 1em
  margin-left .3em
  width .65em
  height .65em
  border-top .1em solid white
  border-right .1em solid white
  transform rotate(-135deg)

.bingo-others-right
  display inline-block
  width 2.75em
  height 2.75em
  border 1px solid #333
  border-radius 50%
  margin-left 1.5em
  background-color black
  cursor pointer

.bingo-others-right:after
  content ''
  display inline-block
  margin-top 1em
  margin-left -0.3em
  width .65em
  height .65em
  border-top 0.1em solid white
  border-right 0.1em solid white
  transform rotate(45deg)

@media (min-width: 768px)
  .bingo-others-container
    grid-template-columns repeat(5, 1fr)
    grid-template-rows repeat(2, 1fr)
</style>