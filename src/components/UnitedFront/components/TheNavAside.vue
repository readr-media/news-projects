<template>
  <nav class="aside-nav">
    <TheAsideNavChapter
      class="aside-nav__nav"
      v-for="(article, i) in articles"
      :key="article.name"
      :name="article.name"
      :title="article.title"
      :color="colors[i]"
      @click.native="$scrollTo(`#${article.name}`)"
    />
  </nav>
</template>

<script>
import TheAsideNavChapter from './TheAsideNavChapter.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UnitedFront')

export default {
  components: {
    TheAsideNavChapter
  },
  data() {
    return {
      colors: [
        '#212338',
        '#3b2335',
        '#622331',
        '#88242d',
        '#a3242a',
        '#d02525',
      ]
    }
  },
  computed: {
    ...mapState({
      articles: state => state.articles
    })
  }
}
</script>

<style lang="stylus" scoped>
.aside-nav
  cursor pointer
  &__nav
    & + &
      margin 12px 0 0 0
</style>
