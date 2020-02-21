<template>
  <section class="app">
    <transition name="fade" mode="out-in">
      <Search
        v-show="!hideSearch"
        class="app__search"
        :defaultSearchResults="defaultSearchResults"
      />
    </transition>
    <SearchResults
      :class="[
        'app__search-results',
        { 'app__search-results--fade-in': !hideSearch }
      ]"
      :defaultSearchResults="defaultSearchResults"
    />
  </section>
</template>

<script>
import _ from 'lodash'

import Search from './views/Search.vue'
import SearchResults from './views/SearchResults.vue'

export default {
  metaInfo () {
    return {
      title: '武漢肺炎知識家',
      description: '',
      metaUrl: 'ncov2019search',
      metaImage: 'ncov2019search/og.jpg'
    }
  },
  components: {
    Search,
    SearchResults
  },
  data() {
    return {
      defaultSearchResults: [
        '口罩販售時間',
        '酒精',
        '最新疫情',
        '藥局開門',
        '台酒門市',
        '洗手'
      ]
    }
  },
  computed: {
    hideSearch() {
      return _.get(this.$route, [ 'params', 'params' ], '') !== ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes fadeIn {
  from {
    opacity 0
  }
  to {
    opacity 1
  }
}

.app
  &__search
    position fixed
    top 0
    left 0
    z-index 2
  &__search-results
    opacity 0
    animation-name fadeIn
    animation-fill-mode forwards
    animation-delay 0s
    z-index 1
    &--fade-in // prevent user see search results page first
      animation-delay 1s

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
