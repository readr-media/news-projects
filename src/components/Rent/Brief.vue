<template>
  <div class="bief">
    <div class="title"><span v-text="$t('RENT.TITLE')"></span></div>
    <div class="credit"><span v-text="$t('RENT.CREDIT')"></span></div>
    <div class="content">
      <p v-text="$t('RENT.BRIEF.1')"></p>
      <p v-text="$t('RENT.BRIEF.2')"></p>
    </div>
    <div class="status">
      <div class="progress" v-show="!isLoaded"><span v-text="$t('RENT.LOADING') + `${progress}%`"></span></div>
      <div class="go-ahead" v-show="isLoaded">
        <div><span v-text="$t('RENT.KEEP-GOING')"></span><span v-text="'⇩'"></span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { CITIES, } from 'src/components/Rent/constants'
  import { each, filter, get, map, } from 'lodash'
  const fetchInfographic = (store, position, size) => store.dispatch('Rent/FETCH_INFOGRAPHIC', { position, size,})
  const setUpLoadedFlag = store => store.dispatch('Rent/SETUP_LOADED_FLAG')
  const setUpSvgString = (store, city, svg) => store.dispatch('Rent/SETUP_SVG', { city, svg })
  const debug = require('debug')('CLIENT:Brief')
  export default {
    name: 'Brief',
    computed: {
      // assetsLen () {
      //   return map(get(this.$store, 'state.Rent.svgStrs', {}), (s, k) => k).length
      // },
      isLoaded () {
        return get(this.$store, 'state.Rent.isLoaded')
      },
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
      },           
      progress () {
        // const progress = Math.round((this.assetsLen / map(CITIES, (c, k) => k).length) * 1000) / 10
        const progress = Math.round((this.count / (map(CITIES, (c, k) => k).length + 1)) * 1000) / 10
        // debug('progress', progress, (this.count / (map(CITIES, (c, k) => k).length + 1)))
        return progress
      },
      size () {
        return this.isDesktop ? 'L' : 'S'
      },
    },
    data () {
      return {
        // progress: 0,
        // asstsList: {
        //   'ENTIRE': false,
        // },
        count: 0,
      }
    },
    methods: {
      checkAssets (city) {
        this.count++
      },
    },
    beforeMount () {
      // each(CITIES, city => { this.asstsList[ city ] = false })
      
      Promise.all([
        fetchInfographic(this.$store, 'EMPTY', this.size).then(svg => setUpSvgString(this.$store, 'EMPTY', svg).then(() => this.checkAssets('EMPTY'))),
        fetchInfographic(this.$store, 'ENTIRE', this.size).then(svg => setUpSvgString(this.$store, 'ENTIRE', svg).then(() => this.checkAssets('ENTIRE'))),
        // ...map(CITIES, city => fetchInfographic(this.$store, city, this.size).then(svg => setUpSvgString(this.$store, city, svg).then(() => this.checkAssets(city)))),
      ]).then(() => {
        debug('ASSETS READY!')
        debug('ASSETS READY!')
        debug('ASSETS READY!')
        return setUpLoadedFlag(this.$store)
      })
    },     
    mounted () {},
    // watch: {
    //   asstsList: {
    //     handler: function () {
    //       debug('mutation detected:', this.asstsList)
    //     }, 
    //     deep: true
    //   }
    // }
  }
</script>
<style lang="stylus" scoped>
  .bief
    padding-top 90px
    height 100vh
    width 100vw
    display flex
    flex-direction column
    justify-content center
    align-items center
    > div
      width 650px
      line-height normal
    .title
      font-size 4.125rem
      font-weight normal
      text-align center
    .credit
      font-size 0.875rem
      font-weight 100
      color #313131
      text-align center
      margin-top 30px
    .status
      height 40px
      text-align center
    .content
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
      p
        width 556px
        font-size 1.125rem
        font-weight 100
        line-height 2
        color #313131
  @media screen and (min-width: 0px) and (max-width: 767px)
    .bief
      height auto
      min-height 100vh
      padding 90px 25px 25px
      > div
        width 100%
      .title
        font-size 2.25rem
      .credit
        font-size 0.875rem
        margin-top 27px
      .status
        margin-top 20px
      .content
        margin-top 23px
        p
          width 100%
          font-size 1rem
          line-height 1.88
</style>