<template>
  <nav class="nav">
    <AppHeaderNavItem
      class="nav__item"
      v-for="item in APP_HEADER_NAV_ITEMS"
      :key="item.title"
      :item="item"
    />
  </nav>
</template>

<script>
import { APP_HEADER_NAV_ITEMS } from '../constants'
import AppHeaderNavItem from './AppHeaderNavItem.vue'

export default {
  components: {
    AppHeaderNavItem,
  },
  data () {
    return {
      APP_HEADER_NAV_ITEMS,
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  display flex
  &__item
    & + &
      margin 0 0 0 25px
</style>
