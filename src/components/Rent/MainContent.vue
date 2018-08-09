<template>
  <main>
    <div class="aside" ref="aside"><MainContentAside></MainContentAside></div>
    <div class="content">
      <div class="content--wrapper" :class="{ fixed: isContentTop, bottom: isContentBottom }" ref="content">
        <div class="title"><span v-text="$t('RENT.INFOGRAPHIC_BODY.TITLE')"></span></div>
        <div class="infographic-wrapper">
          <div class="filter">
            <div class="filter__result">
              <span v-text="$t('RENT.INFOGRAPHIC_BODY.BASED_ON_YOUR_CASE_PREFIX')"></span>
              <span v-text="targetSourceCount" class="source"></span>
              <span v-text="$t('RENT.INFOGRAPHIC_BODY.BASED_ON_YOUR_CASE_POSTFIX')"></span>
            </div>
            <div class="filter__total">
              <span v-text="$t('RENT.INFOGRAPHIC_BODY.TOTAL_PREFIX')"></span>     
              <span v-text="source_count" class="source"></span>
              <span v-text="$t('RENT.INFOGRAPHIC_BODY.TOTAL_POSTFIX')"></span>     
            </div>
          </div>
          <div class="infographic-body">
            <Infographic></Infographic>
          </div>
          <div class="updated-time"><span v-text="$t('RENT.UPDATED_TIME')"></span><span>06/18/2018</span></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  import Infographic from 'src/components/Rent/Infographic.vue'
  import MainContentAside from 'src/components/Rent/MainContentAside.vue'
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { get, } from 'lodash'
  const debug = require('debug')('CLIENT:MainContent')
  const fetchCount = store => store.dispatch('Rent/FETCH_COUNT', {})

  export default {
    name: 'MainContent',
    components: {
      Infographic,
      MainContentAside,
    },
    computed: {
      source_count () {
        return get(this.$store, 'state.Rent.count')
      },
      targetSourceCount () {
        return get(this.$store, 'state.Rent.calc.source_count', 0)
      },
    },
    data () {
      return {
        isContentTop: false,
        isContentBottom: false,
      }
    },
    methods: {
      setupScrollHandler () {
        window.addEventListener('scroll', () => {
          const aside_bottom_y = elmYPosition('main .aside') + this.$refs[ 'aside' ].clientHeight
          const current_top_y = currentYPosition()
          const content_top_Y = elmYPosition('main .content')

          const content_wrapper_height = this.$refs[ 'content' ].clientHeight
          const device_height = verge.viewportH()

          const _isContentTop = current_top_y > (content_top_Y - 70) && current_top_y < (aside_bottom_y - (content_wrapper_height + 70))
          const _isContentBottom = !_isContentTop && current_top_y > (aside_bottom_y - (content_wrapper_height + 70))
          _isContentTop !== this.isContentTop ? this.isContentTop = _isContentTop : null
          _isContentBottom !== this.isContentBottom ? this.isContentBottom = _isContentBottom : null
        })
      },
    },
    beforeMount () {
      fetchCount(this.$store)
    },
    mounted () {
      this.setupScrollHandler()
    },
    watch: {
      isContentTop () {
        debug('Mutation detected: isContentTop', this.isContentTop)
      },
      isContentBottom () {
        debug('Mutation detected: isContentBottom', this.isContentBottom)
      },
    },
  }
</script>
<style lang="stylus" scoped>
  main
    display flex
    justify-content center
    align-items flex-start
    position relative
    .aside
      width 322px
    .content
      width 674px
      margin-left 42px
      &--wrapper
        &.fixed
          position fixed
          top 70px
          width 674px
        &.bottom
          position absolute
          bottom 0
          width 674px
      .title
        padding 40px 0
        font-size 2.125rem
        font-weight normal
        line-height normal
        color #313131
      .infographic-wrapper
        .filter
          height 90px
          padding 11px
          display flex
          flex-direction column
          justify-content flex-end
          align-items center
          background-image linear-gradient(to right, #dfe166 0%, #e97d8f 100%)
          color #fff
          line-height normal
          .source
            margin 0 5px
          &__result
            font-size 1.625rem
            font-weight 400
          &__total
            font-size 0.875rem
            font-weight 100
      .updated-time
        display flex
        justify-content center
        align-items center
        background-color #e5e5e5
        font-size 0.75rem
        font-weight 100
        color #313131
        line-height 3

</style>