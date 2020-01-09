<template>
  <div class="bingobox">
    <BingoCell v-if="!isMini"
      v-for="(cell, index) in cells"
      :key="index"
      :cellid="index"
      :candidateid="cell"
      :bingoProgress="bingoProgress"
      :style="bingoBackground(index)"
      :freeze="freeze"/>
    <BingoCellMini v-else
      :key="index"
      :candidateid="cell"
      :style="bingoBackground(index)"/>
  </div>
</template>

<script>
import BingoCell from './BingoCell.vue'
import BingoCellMini from './BingoCellMini.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { get, reduce } from 'lodash'

export default {
  props: {
    isMini: Boolean,
    cells: Array,
    freeze: Boolean,
  },
  computed: {
    bingoFrameStatus: function() {
      if (this.isMini || this.bingoProgress !== "init") {
        const bingoStatus = this.cells.map( (k) => {
          return { "bingo": get(this.electedList, k, false) }
        })
        let connectedLines = 0
        this.bingoConditions.forEach(condition => {
          let bingo = true
          condition.positions.forEach( i => {
            bingo = bingo && bingoStatus[i].bingo
          })
          if (bingo) {
            condition.positions.forEach( i => {
              bingoStatus[i][condition.line] = true
            })
            connectedLines += 1
          }

        })
        if (!this.isMini){
          this.UPDATE_CONNECTED_LINES(connectedLines)
        }
        return bingoStatus
      }else{
        return this.cells.map(()=>{return {"bingo":false}})
      }
    },
    bingoCellStatus: function() {
      return function(id) {
        return this.bingoFrameStatus[id]
      }
    },
    bingoBackground: function(){
      return function(id) {
       let style = []
        const bingoCellStatus = this.bingoFrameStatus[id]
        if (get(bingoCellStatus, "bingo-h", false)) {
          style.push("linear-gradient(180deg, transparent calc(50% - 1px), black calc(50%), transparent calc(50% + 1px))")
        }
        if (get(bingoCellStatus, "bingo-v", false)) {
          style.push("linear-gradient(#000, #000) no-repeat center/2px 100%")
        }
        if (get(bingoCellStatus, "bingo-s", false)) {
          style.push("linear-gradient(to bottom right, transparent calc(50% - 1px),  black calc(50% - 1px), black 50%, transparent calc(50% + 1px))")
        }
        if (get(bingoCellStatus, "bingo-bs", false)) {
          style.push("linear-gradient(to bottom left, transparent calc(50% - 1px),  black calc(50% - 1px), black 50%, transparent calc(50% + 1px))")
        }
        if (get(bingoCellStatus, "bingo", false)) {
          style.push("radial-gradient(transparent calc(27% - 1px), rgb(159, 226, 188) 27%, rgb(159, 226, 188) 40%, transparent calc(40% + 1px))")
        }
        return {background: style.join()}
      }
    },
    ...mapGetters('realtimeLegislatorsDistricts', {
      electedList: 'electedList'
    }),
    ...mapState('Election2020/bingo', {
      bingoProgress: 'bingoProgress',
      bingoConditions: 'bingoConditions'
    })
  },
  methods: {
    ...mapMutations({
      UPDATE_CONNECTED_LINES: 'Election2020/bingo/UPDATE_CONNECTED_LINES',
    }),
  },
  components: {
    BingoCell,
    BingoCellMini,
  },
}
</script>

<style lang="stylus" scoped>
  .bingobox
    display flex
    flex-wrap wrap
</style>