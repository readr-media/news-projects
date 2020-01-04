<template>
  <div
    class="bingo-cell"
    :class="{'bingo-cell-selected':candidateid}"
    v-on:click="CLICK_HANDLER">
    <div class="party celltexts">{{info.party}}-</div>
    <div class="name celltextl">{{info.name}}</div>
    <div class="region celltexts">{{info.zone}}-</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { mapRegislatorInfo } from '../../utility/mappings'
import { get } from 'lodash'
export default {
  props: {
    cellid: Number,
    candidateid: String,
    bingoProgress: String,
  },
  computed: {
    info: function() {
      if (this.candidateid == "") {
        return {name: "請選擇", party: "", zone: ""}
      } else {
        return mapRegislatorInfo(this.$store, this.candidateid)
      }
    }
  },
  methods: {
    ...mapMutations({
      TOGGLE_SELECTOR_PANEL: 'Election2020/bingo/TOGGLE_SELECTOR_PANEL',
      UPDATE_CURRENT_CELL: 'Election2020/bingo/UPDATE_CURRENT_CELL'
    }),
    CLICK_HANDLER: function() {
      if (this.bingoProgress === "init"){
        this.TOGGLE_SELECTOR_PANEL()
        this.UPDATE_CURRENT_CELL(this.cellid)
      }
    },
  },
  methods: {
    ...mapMutations({
      TOGGLE_SELECTOR_PANEL: 'Election2020/bingo/TOGGLE_SELECTOR_PANEL'
    })
  },
}
</script>

<style lang="stylus" scoped>

  .bingo-cell
    margin-top -4px
    margin-left -4px
    padding 15%
    box-sizing border-box
    box-shadow: inset 0 0 0 4px rgba(151, 151, 151, 0.25)
    overflow hidden
    display flex
    flex-direction column
    justify-content space-between
    background-color rgba(155, 155, 155, 0.25)

  .bingo-cell div
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

  .bingo-cell:hover
    background-color #ffffff

  .bingo-cell-selected
    background-color #ffffff

  .celltextl
    font-size 1.75rem
    font-weight bold
  
  .celltexts
    font-size 0.8rem
    line-height 1.2

  .bongo-cell-elected
    background white

</style>
