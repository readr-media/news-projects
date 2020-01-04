<template>
  <div>
    <div
      class="bingo-selector district" :disabled="district.freeze"
      v-on:click="TRIGGER_TOGGLE_SELECTOR" >
      <div class="bingo-selector-description">
        <span class="name" v-text="name"/>
        <span class="desc-small" v-text="description"/>
      </div>
      <div class="bingo-selector-functions">
      <p 
        class="desc-small" 
        v-if="district.freeze"
        v-on:click="CLEAR_BINGO_CELL(districtid)"
        >清空</p>
      <p
        class="expand-btn"
        :class="{ expanded: getSelectorToggleStatus(districtid) }"></p>
      </div>
    </div>
    <div v-for="(cv, ck) in district.candidates" v-if="cv.show">
      <LagislatorSelector 
        :class="{ expanded: getSelectorToggleStatus(districtid), freezed: district.freeze }" 
        :candidate="cv"
        :candidateid="ck"
        :districtid="districtid"
        :freezed="district.freeze"
      />
    </div>
  </div>
</template>

<script>
import LagislatorSelector from './LagislatorSelector.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    LagislatorSelector
  },
  props: {
    district: Object,
    districtid: String,
  },
  data() { return {
      name: this.district.name,
      description: this.district.locations
    }
  },
  computed: {
    ...mapGetters('Election2020/bingo', ['getSelectorToggleStatus']),
  },
  methods: {
    ...mapMutations({
      TOGGLE_SELECTOR: 'Election2020/bingo/TOGGLE_SELECTOR',
      CLEAR_BINGO_CELL: 'Election2020/bingo/CLEAR_BINGO_CELL',
    }),
    TRIGGER_TOGGLE_SELECTOR: function () {
      if (!this.district.freeze) {
        this.TOGGLE_SELECTOR({districtid: this.districtid, status: !this.getSelectorToggleStatus(this.districtid)})
      }
    },
  },
 }
</script>
<style lang="stylus" scoped>
  .bingo-selector
    border-radius 4px
    background-color rgba(216, 216, 216, 0.25)
    border solid 1px rgba(0, 0, 0, 0)
    align-items: center;
    justify-content space-between
    margin 10px 25px 10px 20px
    padding 0 14px
    height 6vh

  .district
    display flex
    background-color #d8d8d8

  .district[disabled="disabled"] span
    color rgba(0, 0, 0, 0.31)

  .desc-small
    font-size 0.8rem
    margin auto 10px

  .bingo-selector-functions
    display flex

  .expand-btn
    width 8px
    height 8px
    border-style solid
    border-color rgba(0, 0, 0, 0.87)
    transform rotate(45deg)
    border-width 0 3px 3px 0
  .expanded
    border-width 3px 0 0 3px
</style>
