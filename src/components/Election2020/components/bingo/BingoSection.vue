<template>
  <section class="bingo-section">
    <div class="bingo-title">
      <h2>區域立委賓果盤</h2>
      <p v-html="contentText"/>
      <div v-on:click="RANDOM_CLICK_HANDLER" v-if="bingoProgress=='init'" class="bingo-randombtn">電腦選號</div>
    </div>
    <BingoFrame class="bingo-frame" :cells="bingoCells"/>
    <div class="bingo-status">
      <BingoStatus />
      <button v-on:click="CLICK_HANDLER" class="bingo-startbtn">{{buttonText}}</button>
    </div>
    <BingoSelector/>
  </section>
</template>

<script>

import BingoFrame from './BingoFrame.vue'
import BingoStatus from './BingoStatus.vue'
import BingoSelector from './BingoSelector.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'
import { find } from 'lodash'

export default {
  components: {
    BingoFrame,
    BingoStatus,
    BingoSelector
  },
  props: {
    cells: Array,
  },
  computed: {
    contentText: function () {
      switch(this.bingoProgress) {
        case "matching":
          return `不要離開，系統會為您標記當選、自動連線以及賓果！`
        case "init":
        default:
          return `請點擊賓果盤，選取您認為會當選的候選人，將 25 個格子填寫完成並送出。<br>開票時，系統將根據中選會資料，即時公布當選者並將格子蓋上圈。5 個圈的格字可連成一條線，集滿 5 條線者賓果！<br>試試看，您多快能賓果！`
      }
    },
    buttonText: function () {
      switch(this.bingoProgress) {
        case "init":
          return `開始賓果`
        default:
          return `推薦朋友一起玩`
        
      }
    },
    ...mapState('Election2020/bingo', {
      bingoCells: 'bingoFrameCells',
      bingoProgress: 'bingoProgress',
      connectedLines: 'connectedLines',
    }),
    ...mapGetters('Election2020/bingo', {
      randomCells: 'randomFrameCells',
    })
  },
  methods: {
    RANDOM_CLICK_HANDLER: function() {
      const cells = this.randomCells()
      this.UPDATE_BINGO_CELL_ALL(cells)
    },
    CLICK_HANDLER: function() {
      const emptycell = find(this.cells, (i) => {return i == ""})
      if (this.bingoProgress == "init") {
        this.START_BINGO_MATCHING()
      }
    },
    ...mapMutations({
      UPDATE_BINGO_CELL_ALL: 'Election2020/bingo/UPDATE_BINGO_CELL_ALL',
      START_BINGO_MATCHING: 'Election2020/bingo/START_BINGO_MATCHING',
    }),
  }
}
</script>
<style lang="stylus" scoped>
  .bingo-section
    padding-right 10px
    padding-left 10px
    padding-top 100px
    display grid
    grid-column-gap 10px
    position relative

  .bingo-section h2,p
    text-align left

  .bingo-section h2
    margin-block-start 0
    margin-block-end 0
    font-family $font-family-serif

  .bingo-section p
    font-family PingFangTC
    line-height 2.25
    font-size 0.8rem
    font-weight bold

  .bingo-frame
    width 90vw
    height 90vw
    margin 20px auto

  .bingo-status
    align-self self-end

  .bingo-title,.bingo-status
    padding 0 65px
  
  .bingo-title p
    margin-block-end 0
  
  .bingo-startbtn
    width 100%
    height 3rem
    border-radius 4px
    background-color black
    color white
    outline none

  .bingo-randombtn
    height 3rem
    width 8rem
    border-radius 4px
    background-color rgba(128,128,128,0.2)
    color black
    padding 1rem
    
  @media (min-width: 768px)
    .bingo-section
      padding-right 50px
      padding-left 50px
      
    .bingo-title
      grid-column 1
    .bingo-frame
      grid-column 2
      grid-row 1 / span 2
      width 40vw
      height 40vw
</style>
