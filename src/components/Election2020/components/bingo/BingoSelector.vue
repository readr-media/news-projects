<template>
  <div>
    <LightboxWrapper
      :type="type"
      :showLightbox="showLightbox"
      v-on:update:showLightbox="TOGGLE_SELECTOR_PANEL"
    >
      <div class="selectorContent">
        <input
          v-model="query"
          v-on:keyup.enter="UPDATE_FILTER(query)"
          placeholder="搜尋候選人姓名、政黨或地名"
          class="selectorSearchBar"
        ></input>
        <button
          v-on:click="UPDATE_FILTER(query)"
          class="selectorSearchButton"
        >搜尋</button>
      </div>
      <DistrictSelector
        :districtid="zk"
        :district="zv"
        :key="zk"
        v-for="(zv, zk) in selectorZones"
        v-if="hasCandidate(zv.candidates)" />
    </LightboxWrapper>
  </div>
</template>

<script>
import LightboxWrapper from '../LightboxWrapper.vue'
import DistrictSelector from './DistrictSelector.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      type: "bingo",
    }
  },
  components: {
    LightboxWrapper,
    DistrictSelector,
  },
  computed: {
    ...mapState('Election2020/bingo', {
      showLightbox: state => state.selectorPanel,
      selectorQuery: state => state.selectorQuery
    }),
    ...mapGetters('Election2020/bingo', ['selectorZones']),
    hasCandidate: () => (candidates) => {
      for (let ck in candidates) {
        if (candidates[ck].show) {
          return true
        }
      }
      return false
    },
      query: {
        get (){
          return this.selectorQuery
        },
        set (value){
          this.UPDATE_FILTER(value)
        }
      }
  },
  methods: {
    ...mapMutations({
      UPDATE_FILTER: 'Election2020/bingo/UPDATE_FILTER',
      TOGGLE_SELECTOR_PANEL: 'Election2020/bingo/TOGGLE_SELECTOR_PANEL'
    })
  },
}
</script>
<style lang="stylus" scoped>
  .selectorContent
    display flex
    align-items center
    justify-content space-between
    margin 10px 25px 10px 20px

  .selectorSearchBar,.selectorSearchButton
    border-radius 4px
    border solid 1px rgba(0, 0, 0, 0)
    height 6vh
  .selectorSearchBar:focus, .selectorSearchButton:focus
    outline none
  .selectorSearchBar
    margin-right 10px
    width stretch
  .selectorSearchButton
    background-color rgba(0, 0, 0, 0.87)
    width 20%
    margin-left 10px
    color white
</style>
