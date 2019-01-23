<template>
  <footer class="footer">
    <p class="footer__title">相關關鍵字</p>
    <nav class="footer__navs navs">
      <div class="navs__left">
        <div
          v-for="id in realtedKeywords"
          :key="id"
          class="button"
          @click="navigate({ param: getSourceName(id) })"
          v-text="getSourceName(id)"
          ga-on="click"
          ga-event-category="projects"
          ga-event-action="click"
          :ga-event-label="`single keyword + ${getSourceName(id)}`"
        >
        </div>
      </div>
      <div class="navs__right">
        <div
          class="button button--large"
          @click="navigate({ param: '韓國瑜', subparam: '陳其邁' })"
          ga-on="click"
          ga-event-category="projects"
          ga-event-action="click"
          ga-event-label="PK button"
        >
          我要看<br>PK
        </div>
      </div>
    </nav>
  </footer>
</template>

<script>
import { get } from 'lodash'

const debug = require('debug')('ELECTION-NEWS:CLIENT:single:Footer.vue')

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  computed: {
    ...mapState({
      mapping: state => state.mapping.keywords
    }),
    ...mapGetters([
      'graphDataKeywordFirst'
    ]),
    realtedKeywords () {
      return get(this.graphDataKeywordFirst, [ 'related_keywords' ], '')
    }
  },
  methods: {
    navigate ({ param = '', subparam = '' }) {
      this.$router.navigate({ param, subparam })
    },
    getSourceName (sourceId) {
      return this.mapping[sourceId]
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer
  &__title
    font-size 10px
    margin 7px 0

.navs
  display flex
  &__left
    flex 1 1 auto
  &__right
    flex 1 1 auto
    margin 0 0 0 17px

.button
  // width 90px
  width 100%
  height 20px
  border 1px solid #999999
  font-size 10px
  display flex
  justify-content center
  align-items center
  color #4a4a4a
  cursor pointer
  -webkit-tap-highlight-color transparent
  & + &
    margin 10px 0 0 0
  &--large
    height 80px
    text-align center
    line-height 1.3

@media (min-width 1024px)
  .footer
    &__title
      font-size 20px
      margin 14px 0

  .navs
    &__right
      margin 0 0 0 40px

  .button
    height 30px
    font-size 14px
    & + &
      margin 14px 0 0 0
    &--large
      height 118px
</style>