<template>
  <section class="bingo-section">
    <div class="bingo-title">
      <p v-html="contentText"/>
      <div v-on:click="RANDOM_CLICK_HANDLER" v-if="bingoProgress=='init'" class="bingo-randombtn">電腦選號</div>
    </div>
    <BingoFrame class="bingo-frame" :cells="bingoCells"/>
    <div class="bingo-status">
      <BingoStatus />
      <button v-on:click="CLICK_HANDLER" class="bingo-startbtn">{{buttonText}}</button>
    </div>
    <div class="bingo-others">
      <h2>大家都在猜</h2>
      <BingoOthers />
    </div>
    <div class="bingo-momentum">
      <h2>看誰呼聲高</h2>
      <BingoMomentum />
    </div>
    <BingoSelector/>
  </section>
</template>

<script>

import BingoFrame from './BingoFrame.vue'
import BingoMomentum from './BingoMomentum.vue'
import BingoOthers from './BingoOthers.vue'
import BingoStatus from './BingoStatus.vue'
import BingoSelector from './BingoSelector.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'
import { find, get } from 'lodash'

export default {
  components: {
    BingoFrame,
    BingoMomentum,
    BingoOthers,
    BingoStatus,
    BingoSelector,
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
    }),
    ...mapState('realtimeBingoCandidateStats', {
      momentumCandidates: 'data',
    }),
  },
  methods: {
    RANDOM_CLICK_HANDLER: function() {
      const cells = this.randomCells()
      this.UPDATE_BINGO_CELL_ALL(cells)
    },
    CLICK_HANDLER: function() {
      const emptycell = find(this.bingoCells, (i) => {
        return (i == "")
      })

      if (this.bingoProgress == "init" && emptycell === undefined) {
        this.$store.dispatch('realtimeBingoCandidateStats/fetchAndAdd')
        this.START_BINGO_MATCHING()

        let patch_obj = {}
        for (let cellid in this.bingoCells) {
          const candidateid = this.bingoCells[cellid]
          patch_obj[candidateid] = get(this.momentumCandidates, candidateid, 0) + 1
        }
        patch_obj['records'] = this.momentumCandidates.records.slice(0, 9)
        patch_obj['records'].unshift(this.bingoCells.join())
        this.$store.dispatch('realtimeBingoCandidateStats/patch', patch_obj)

      }else if (this.bingoProgress !== "init"){
        window.open(`https://www.facebook.com/share.php?u=${window.location.href}`);
      }
    },
    ...mapMutations({
      UPDATE_BINGO_CELL_ALL: 'Election2020/bingo/UPDATE_BINGO_CELL_ALL',
      START_BINGO_MATCHING: 'Election2020/bingo/START_BINGO_MATCHING',
      LOAD_FROM_LOCALSTORAGE: 'Election2020/bingo/LOAD_FROM_LOCALSTORAGE',
    }),
  },
  created(){
    this.LOAD_FROM_LOCALSTORAGE()
  }
}
</script>
<style lang="stylus" scoped>
  .bingo-section
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
    cursor pointer

  .bingo-section p
    font-family PingFangTC
    line-height 2.25
    font-size 0.8rem
    font-weight bold

  .bingo-frame
    width 100vw
    height 100vw
    margin 20px 0

  .bingo-status
    align-self self-end

  .bingo-others h2, .bingo-momentum h2
    padding 120px 0 60px 0
    text-align center

  .bingo-title p
    margin-block-end 0
    text-align center
  
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
    margin 10px auto 0 auto
    cursor pointer
    
  @media (min-width: 768px)
    .bingo-section
      padding-right 50px
      padding-left 50px
      grid-template-columns repeat(2, 1fr)
    .bingo-others,.bingo-momentum
      padding 0 65px

    .bingo-title,.bingo-status
      margin 0 0 0 65px

    .bingo-status
      margin-bottom 20px
    
    .bingo-title
      grid-column 1
    .bingo-title p
      text-align left
    .bingo-randombtn
      margin 10px 0 0 0
    .bingo-frame
      grid-column 2
      grid-row 1 / span 2
      width 40vw
      height 40vw
      margin 20px auto
    .bingo-others,.bingo-momentum
      grid-column 1 / span 2
</style>
