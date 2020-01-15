<template>
  <div class="wrapper">
    <Header
      class="wrapper__header"
      @dateSwitcherChanged="dateSwitcherChanged"
      @switcherToggle="switcherToggle"
    />
    <div v-show="isDataLoading">Loading...</div>
    <div v-show="!isDataLoading && isDataEmpty">無資料</div>
    <Menu v-show="!isDataLoading && !isDataEmpty" class="wrapper__menu"/>
    <!-- {{ this.newscontentDataKeywordFirstFiltered }} -->
  </div>
</template>

<script>
import { isEmpty } from 'lodash'

import Header from './Header.vue'
import Menu from './Menu.vue'

import { formatDate } from '../../util'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    Header,
    Menu
  },
  data () {
    return {
      isDataLoading: false
    }
  },
  computed: {
    ...mapState({
      dataNewscontent: state => state.data.newscontent
    }),
    ...mapGetters([
      'keywordIdFirst',
      'graphTrackingLineDate',
      'newcontentKeyKeywordFirst',
      'newscontentDataKeywordFirstFiltered'
    ]),
    isDataEmpty () {
      return isEmpty(this.newscontentDataKeywordFirstFiltered)
    }
  },
  methods: {
    ...mapActions([
      'FETCH_DATA_NEWSCONTENT'
    ]),
    ...mapMutations([
      'SET_LIGHTBOX_DATE',
      'SET_LIGHTBOX_SWITCHER'
    ]),
    dateSwitcherChanged (date) {
      this.SET_LIGHTBOX_DATE(date)
      if (!(this.newcontentKeyKeywordFirst in this.dataNewscontent)) {
        this.isDataLoading = true
        this.FETCH_DATA_NEWSCONTENT({
          date: formatDate(this.newcontentKeyKeywordFirst),
          keywordId: this.keywordIdFirst
        })
        .then(() => { this.isDataLoading = false })
        .catch(() => { this.isDataLoading = false })
      }
    },
    switcherToggle (position) {
      this.SET_LIGHTBOX_SWITCHER(position)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  &__header
    position sticky
    top 0
    left 0
    z-index 999
  // &__menu
  //   overflow-y scroll
</style>