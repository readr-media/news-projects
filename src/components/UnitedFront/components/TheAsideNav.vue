<template>
  <nav class="aside-nav">
    <TheAsideNavChapter
      class="aside-nav__nav"
    />
    <TheAsideNavChapter
      class="aside-nav__nav"
    />
    <TheAsideNavChapter
      class="aside-nav__nav"
    />
    <TheAsideNavChapter
      class="aside-nav__nav"
    />
    <TheAsideNavChapter
      class="aside-nav__nav"
    />
    <TheAsideNavChapter
      class="aside-nav__nav"
    />
  </nav>
</template>

<script>
import TheAsideNavChapter from './TheAsideNavChapter.vue'

export default {
  components: {
    TheAsideNavChapter
  }
}
</script>

<style lang="stylus" scoped>
.aside-nav
  &__nav
    & + &
      margin 10px 0 0 0
</style>
