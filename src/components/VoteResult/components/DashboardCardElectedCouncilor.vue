<template>
  <div class="content">
    <p v-show="!isLevelCounty" class="content__paragraph loc">第 {{ areaCode }} 選區（{{ sits }} 席）</p>
    <p class="content__paragraph graph-title">政黨得票率</p>
    <!-- <SquareBar :data="data"/> -->
    <HorizontalBar :data="data"/>
    <div class="content__methodology">
      <p>比例計算方法：同黨候選人總得票數 / 有效票總得票數</p>
    </div>
  </div>
</template>

<script>
// import SquareBar from './charts/SquareBar.vue'
import HorizontalBar from './charts/HorizontalBar.vue'
import { get } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('VoteResult')

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    // SquareBar,
    HorizontalBar
  },
  computed: {
    ...mapState({
      currentLocationLevel: state => state.map.currentLocation.level
    }),
    isLevelCounty () {
      return this.currentLocationLevel === 'county'
    },
    areaCode () {
      return get(this.data, 'areaCode', '')
    },
    sits () {
      return get(this.data, 'candTksInfo', []).filter(cand => cand.candVictor === '*').length
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  // height 336px
  &__paragraph
    font-size 20px
    margin 10px 0
  &__methodology
    margin 18px 0 0 0
    border-top 1px solid #979797
    p
      font-size 14px
      color #979797
      margin 9px 0 0 0
</style>


