<template>
  <section class="bingo-section">
    <div class="bingo-title">
      <h2>區域立委賓果盤</h2>
      <p v-html="contentText"/>
    </div>
    <BingoFrame class="bingo-frame" :cells="Array.apply(null, Array(25)).map(function () { return {}; })" />
    <div class="bingo-status" :connectedLines="connectedLines">
      <BingoStatus />
      <button class="bingo-randombtn">{{buttonText}}</button>
    </div>
    <BingoSelector/>
  </section>
</template>

<script>

import BingoFrame from './BingoFrame.vue'
import BingoStatus from './BingoStatus.vue'
import BingoSelector from './BingoSelector.vue'

export default {
  components: {
    BingoFrame,
    BingoStatus,
    BingoSelector
  },
  props: {
    cells: Array,
    connectedLines: Number,
    status: String
  },
  computed: {
    contentText: function () {
      switch(this.status) {
        case "started":
          return `不要離開，系統會為您標記當選、自動連線以及賓果！`
        case "init":
        default:
          return `請點擊賓果盤，選取您認為當選機率高的候選人，將二十五個格子填寫完成並送出。<br>開票時，系統將根據中選會資料，即時公布當選者並將格子塗黑。<br>五個黑色格子可連成一條線，集滿五條線者賓果！<br>試試看，您多快能賓果！`
      }
    },
    buttonText: function () {
      switch(this.status) {
        case "started":
          return `推薦朋友一起玩`
        case "init":
        default:
          return `電腦選號`
        
      }
    }
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
  .bingo-randombtn
    width 100%
    height 3rem
    border-radius 4px
    background-color black
    
  @media (min-width: 768px)
    .bingo-section
      padding-right 50px
      padding-left 50px
      grid-template-columns: 1fr 1fr
    .bingo-title
      grid-column 1
    .bingo-frame
      grid-column 2
      grid-row 1 / span 2
      width 40vw
      height 40vw
</style>