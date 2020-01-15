<template>
  <div
    class="bingo-cell"
    :class="{'bingo-cell-selected':candidateid}"
    :style="cursor"
    v-on:click="CLICK_HANDLER">
    <div class="party celltexts" :title="info.party">{{info.party}}</div>
    <div class="name celltextl" :title="info.name" >{{info.name}}</div>
    <div class="region celltexts" :title="info.zone">{{info.zone}}</div>
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
    freeze: Boolean,
  },
  computed: {
    info: function() {
      if (this.candidateid == "") {
        return {name: "請選擇", party: "-", zone: "-"}
      } else {
        let info = mapRegislatorInfo(this.$store, this.candidateid)
        if (info.name !== undefined) {
          info.name = info.name.replace("^", "-")
        }
        return info
      }
    },
    cursor: function() {
      return {
        cursor: (this.bingoProgress === "init" && !this.freeze)? 'pointer': 'default'
      }
    }
  },
  methods: {
    ...mapMutations({
      TOGGLE_SELECTOR_PANEL: 'Election2020/bingo/TOGGLE_SELECTOR_PANEL',
      UPDATE_CURRENT_CELL: 'Election2020/bingo/UPDATE_CURRENT_CELL'
    }),
    CLICK_HANDLER: function() {
      if (this.bingoProgress === "init" && !this.freeze){
        this.TOGGLE_SELECTOR_PANEL()
        this.UPDATE_CURRENT_CELL(this.cellid)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>

  .bingo-cell
    margin-top -4px
    margin-left -4px
    box-sizing border-box
    box-shadow: inset 0 0 0 4px rgba(151, 151, 151, 0.25)
    overflow hidden
    display flex
    flex-direction column
    justify-content space-between
    background-color rgba(155, 155, 155, 0.25)
    flex-basis 20%
    padding 3% 0

  .bingo-cell div
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

  .bingo-cell:hover
    background-color #ffffff

  .bingo-cell-selected
    background-color #ffffff

  .celltextl
    font-size 1.1em
    font-weight bold
  
  .celltexts
    font-size .65em
    line-height 1.2

  .bongo-cell-elected
    background white

@media (min-width: 768px)
  .celltextl
    font-size 1.55em
  
  .celltexts
    font-size .75em

</style>
