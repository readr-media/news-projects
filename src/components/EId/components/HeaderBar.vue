<template>
  <header class="header-bar">
    <ReadrLogo />
    <ul>
      <li :class="{ active: currentPage === 'report' }" @click="$emit('changePage', 'report')">
        看專題報導
      </li>
      <li :class="{ active: currentPage === 'game' }" @click="$emit('changePage', 'game')">
        製作身分證
      </li>
    </ul>
  </header>
</template>

<script>
import ReadrLogo from './ReadrLogo.vue'

export default {
  name: 'HeaderBar',
  components: {
    ReadrLogo
  },
  props: ['currentPage']
}
</script>

<style lang="stylus">
@import '../variables.styl'

.header-bar
  background-color #5f6c11
  font-weight 900
  font-size 15px
  line-height 1
  letter-spacing 2.5px
  display flex
  align-items center
  position fixed
  width 100%
  z-index 49
  top 0
  left 0
  @media (min-width $breakpoint-md)
    font-size 18px
  ul
    display flex
    margin-left auto
    padding-right 10px
    @media (min-width $breakpoint-md)
      padding-right 25px
  li
    color #fbc11a
    padding 12px 15px
    cursor pointer
    user-select none
    @media (min-width $breakpoint-md)
      padding 14px 29px
    &.active
      background-color #fbc11a
      border-radius 55px
      color #5f6c11
    + li
      margin-left 9px
      @media (min-width $breakpoint-md)
        margin-left 23px
</style>
