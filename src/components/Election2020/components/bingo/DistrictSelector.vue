<template>
  <div>
    <div
      class="bingo-selector district"
      v-on:click="TOGGLE_SELECTOR({districtid: districtid, status: getSelectorToggleStatus(districtid)})" >
      <div>
        <span class="name" v-text="name"/>
        <span class="description" v-text="description"/>
      </div>
      <span
        class="expand-btn"
        :class="{ expanded: getSelectorToggleStatus(districtid) }"/>
    </div>
    <div v-for="(cv, ck) in district.candidates" v-if="cv.show">
      <LagislatorSelector :class="{ expanded: getSelectorToggleStatus(districtid) }" :candidate="cv"/>
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
      TOGGLE_SELECTOR: 'Election2020/bingo/TOGGLE_SELECTOR'
    })
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
  .description
    font-size 0.8rem
    margin-left 7px
  .expand-btn
    width 8px
    height 8px
    border-style solid
    border-color rgba(0, 0, 0, 0.87)
    transform rotate(45deg)
    margin-right 10px
    border-width 0 3px 3px 0
  .expanded
    border-width 3px 0 0 3px
</style>
