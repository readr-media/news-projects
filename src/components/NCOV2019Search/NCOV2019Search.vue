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

import storeModule from 'src/store/modules/NCOV2019Search'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('NCOV2019Search')

import { createPayload } from './utils'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

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
    searchWord() {
      return _.get(this.$route, [ 'params', 'params' ], '')
    },
    hideSearch() {
      return this.searchWord !== ''
    },
    searchPayload() {
      return createPayload({
        query: this.searchWord
      })
    }
  },
  watch: {
    searchWord() {
      this.SEARCH_ARTICLE({
        payload: this.searchPayload
      })
    },
    hideSearch() {
      this.handleBodyScroll()
    }
  },
  async serverPrefetch () {
    this.registerStoreModule()
    await this.SEARCH_ARTICLE({
      payload: this.searchPayload
    })
  },
  beforeMount () {
    this.registerStoreModule(true)
    this.handleBodyScroll()
  },
  destroyed() {
    this.$store.unregisterModule('NCOV2019Search')
  },
  methods: {
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('NCOV2019Search', storeModule, { preserveState: shouldPreserveState })
    },
    ...mapActions(['SEARCH_ARTICLE']),

    handleBodyScroll() {
      if (!this.hideSearch) {
        disableBodyScroll()
      } else {
        enableBodyScroll()
      }
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
    opacity 1
    z-index 1
    &--fade-in // prevent user see search results page first
      opacity 0
      animation-name fadeIn
      animation-fill-mode forwards
      animation-delay 1s

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
