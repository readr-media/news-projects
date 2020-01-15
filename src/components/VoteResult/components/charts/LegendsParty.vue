<template>
  <div class="legends">
    <div
      v-if="parties.includes('中國國民黨')"
      class="legends__legend legends__legend--kmt legend"
    >
      <div class="legend__icon"></div>
      <p class="legend__text">國民黨</p>
    </div>
    <div
      v-if="parties.includes('民主進步黨')"
      class="legends__legend legends__legend--dpp legend"
    >
      <div class="legend__icon"></div>
      <p class="legend__text">民進黨</p>
    </div>
    <div
      v-if="parties.includes('時代力量')"
      class="legends__legend legends__legend--npp legend"
    >
      <div class="legend__icon"></div>
      <p class="legend__text">時代力量</p>
    </div>
    <div
      v-if="parties.includes('其他')"
      class="legends__legend legends__legend--others legend"
    >
      <div class="legend__icon"></div>
      <p class="legend__text">其他</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parties: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.legends
  display flex
  justify-content center
  &__legend
    & + &
      margin 0 0 0 30px
    &--kmt
      & > .legend__icon
        background-color #0071bc  
    &--dpp
      & > .legend__icon
        background-color #53a66f  
    &--npp
      & > .legend__icon
        background-color #fcc037  
    &--others
      & > .legend__icon
        background-color #736357  

.legend
  display flex
  align-items center
  &__icon
    width 14px
    height 14px
  &__text
    margin 0 0 0 8px
    font-size 12px
</style>

