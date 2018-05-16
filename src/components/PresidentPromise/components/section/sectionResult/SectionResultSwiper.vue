<template>
  <div class="section-result-swiper">
    <SectionResultCategoryNav
      class="section-result-swiper__nav"
      :activeIndex.sync="activeIndex"
    />
    <div class="result-swiper-container">
      <div v-swiper:mySwiper="swiperOption" @slideChange="slideChange">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="category in Object.keys(categoriesPollPidData)" :key="category">
            <!--  -->
            <SectionResultNoInterest
              class="swiper-slide__no-interest"
              v-show="categoriesFetchStat[category].fetchStat === 'fetchedEmpty'"
            />
            <!--  -->
            <ButtonNavigateMoveTo
              class="swiper-slide__no-interest-moveto"
              v-show="categoriesFetchStat[category].fetchStat === 'fetchedEmpty' && $store.state.PresidentPromise.showNextRoundButton"
              :navigateType="'more'"
              @click.native="nextRoundSurvey"
            />
            <Loading
              class="swiper-slide__loading"
              v-show="categoriesFetchStat[category].fetchStat === 'loading'"
            />
            <!--  -->
            <div class="fetched-container" v-show="categoriesFetchStat[category].fetchStat === 'fetched'">
              <SectionResultPromise
                v-for="(promise, i) in promiseRankGroupByCategory[category]"
                :key="i"
                :order="`${i + 1}`"
                :isInterest="promise.surveyResult === 'very-interest'"
                :promise="promise"
                @click.native="handleTooltip(promise, $event)"
                @reFetchInterestStat="reFetchInterestStat"
              />
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    <div class="tooltip-desktop" v-if="VW > 425" v-show="showTooltip" ref="tooltip-desktop">
      <div class="content">
        <TagPromise v-show="currTooltipPromise.promiseDone || currTooltipPromise.isStuck" :tagType="currTooltipPromise.isStuck ? 'stuck' : 'success'"/>
        <blockquote class="tooltip-desktop__stuck-reason" v-show="currTooltipPromise.isStuck"><span>“</span><span>{{ currTooltipPromise.stuckReason }}</span></blockquote>
        <p class="tooltip-desktop__description" v-html="currTooltipPromise.description"></p>
        <a class="tooltip-desktop__source" :href="currTooltipPromise.sourceLink" target="_blank" v-text="currTooltipPromise.source"></a>
      </div>
      <ButtonClose class="tooltip-desktop__close" :isOnTooltip="true" @click.native="showTooltip = false"/>
      <div class="tooltip-desktop__indicator"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { sortBy, isEmpty, mapValues, map, debounce } from 'lodash'
import fullPageMixin from '../../../_vue-fullpage/fullPageMixin'
import SectionResultCategoryNav from './SectionResultCategoryNav.vue'
import SectionResultPromise from './SectionResultPromise.vue'
import SectionResultNoInterest from './SectionResultNoInterest.vue'
import ButtonNavigateMoveTo from '../../button/ButtonNavigateMoveTo.vue'
import Loading from '../../Loading.vue'
import TagPromise from '../../TagPromise.vue'
import ButtonClose from '../../button/ButtonClose.vue'
import { categories, } from '../../../constants'
import { getCategoryAllRequest, getCategoryInterestRequest, } from '../../../util/service'
import { observeDOM, } from '../../../util/comm'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

export default {
  props: {
    // shouldLoadmore: {
    //   type: Boolean,
    //   default: false,
    // },
    scrollContainerRef: {
      required: true,
    }
  },
  mixins: [ fullPageMixin, ],
  components: {
    SectionResultCategoryNav,
    SectionResultPromise,
    SectionResultNoInterest,
    ButtonNavigateMoveTo,
    Loading,
    TagPromise,
    ButtonClose,
  },
  watch: {
    isCurrentSectionActive () {
      // all
      this.categoriesFetchStat['全部'].fetchStat = 'loading'
      getCategoryAllRequest()
      .then(({ body } = data) => {
        this.handleFetchStatAndResult(body.result, '全部')
      })
      // interest
      this.handleFetchStatAndResult(this.$store.getters['PresidentPromise/promiseDataGroupByCategory']['我關心'], '我關心')
    },
    activeIndex () {
      // slide
      this.mySwiper.slideTo(this.activeIndex)
      // fetch
      if (this.activeCategory !== '全部' && this.activeCategory !== '我關心' && this.categoriesFetchStat[this.activeCategory].fetchStat !== 'fetched' && this.categoriesFetchStat[this.activeCategory].fetchStat !== 'fetchedEmpty') {
        this.categoriesFetchStat[this.activeCategory].fetchStat = 'loading'
        getCategoryInterestRequest(this.activeCategory)
        .then(({ body } = data) => {
          this.handleFetchStatAndResult(body.result, this.activeCategory)
        })
      }
      // close tooltip
      this.showTooltip = false
    },
    // shouldLoadmore () {
    //   if (this.shouldLoadmore) {
    //     const activeCategory = Object.keys(this.categoriesPollPidData)[this.activeIndex]
    //     this.categoriesFetchStat[activeCategory].isLoadmore = true
    //     if (this.categoriesFetchStat[activeCategory].paging <= this.categoriesPollPidData[activeCategory].length) {
    //       this.categoriesFetchStat[activeCategory].paging += this.defaultPaging
    //     } else {
    //       this.categoriesFetchStat[activeCategory].isLoadmore = false
    //     }
    //   }
    // }
  },
  data () {
    return {
      // fetchStat will be: unfetched, loading, fetched, fetchedEmpty
      categoriesFetchStat: mapValues(categories, () => ({
        fetchStat: 'unfetched',
        paging: 0,
      })),
      categoriesPollPidData: mapValues(categories, () => ({})),
      currTooltipPromise: {},
      showTooltip: false,
      activeIndex: 0,
      swiperOption: {
        shortSwipes: false,
        // direction: 'vertical',
        // slidesPerView: 'auto',
        // freeMode: true,
        // scrollbar: {
        //   el: '.swiper-scrollbar'
        // },
        // mousewheel: true,
      },
      // isDesktop: get(this.$store.state, 'useragent.isDesktop', false),
      VW: 0,
    }
  },
  computed: {
    activeCategory () {
      return Object.keys(this.categoriesPollPidData)[this.activeIndex]
    },
    promiseRankGroupByCategory () {
      return mapValues(this.$store.getters['PresidentPromise/promiseDataGroupByCategory'], (promises, category) => {
        if (this.activeCategory !== category) return []
        if (category === '我關心') return promises
        const categoryPidsInPoll = Object.keys(this.categoriesPollPidData[category])
        const filterOutNotInPollPromises = promises.filter(promise => categoryPidsInPoll.includes(promise.pid))
        return sortBy(filterOutNotInPollPromises, promise => -this.categoriesPollPidData[category][promise.pid])
      })
    },
    isCurrentSectionActive () {
      return this.$store.state.PresidentPromise.currentSection === 'section-result'
    },
  },
  methods: {
    isEmpty,
    slideChange () {
      this.activeIndex = this.mySwiper.activeIndex
    },
    nextRoundSurvey () {
      this.$store.dispatch('PresidentPromise/SURVEY_NEXT_ROUND')
      this.moveTo('section-promise-survey', 0)
    },
    handleFetchStatAndResult (result, category) {
      if (isEmpty(result)) {
        this.categoriesFetchStat[category].fetchStat = 'fetchedEmpty'
      } else {
        this.categoriesFetchStat[category].fetchStat = 'fetched'
        if (category !== '我關心') {
          this.categoriesPollPidData[category] = result
        }
      }
    },
    handleTooltip (promise, e) {
      if (this.VW > 425) {
        const YPos = e.clientY + this.scrollContainerRef.scrollTop - 190
        const marginWidth = (window.innerWidth - document.querySelector('.result-swiper-container').clientWidth) / 2
        const XPos = marginWidth + document.querySelector('.result-swiper-container').clientWidth - 100
        // document.querySelector(`.tooltip-desktop`).style.top = `${YPos}px`
        document.querySelector(`.tooltip-desktop`).style.left = `${XPos}px`
        this.currTooltipPromise = promise
        this.showTooltip = true
        
        this.$nextTick()
        .then(() => {
          // DOM updated
          const tooltipHeight = this.$refs['tooltip-desktop'].clientHeight
          if (e.clientY + tooltipHeight > window.innerHeight) {
            document.querySelector(`.tooltip-desktop`).style.top = `${YPos - tooltipHeight + 40}px`
            document.querySelector('.tooltip-desktop__indicator').style.top = 'initial'
            document.querySelector('.tooltip-desktop__indicator').style.bottom = '12px'
          } else {
            document.querySelector(`.tooltip-desktop`).style.top = `${YPos}px`
            document.querySelector('.tooltip-desktop__indicator').style.top = '12px'
            document.querySelector('.tooltip-desktop__indicator').style.bottom = 'initial'
          }
        })
      }
    },
    reFetchInterestStat () {
      this.handleFetchStatAndResult(this.$store.getters['PresidentPromise/promiseDataGroupByCategory']['我關心'], '我關心')
    }
  },
  mounted () {
    window.addEventListener('resize', debounce(() => {
      this.showTooltip = false
      this.VW = window.innerWidth
    }, 500))
    this.VW = window.innerWidth
  }
}
</script>

<style lang="stylus">
@import '../../../../../../node_modules/swiper/dist/css/swiper.css'

.section-result-swiper
  position relative
  &__nav
    position sticky
    top 0
    left 0
    z-index 9999
.tooltip-desktop
  position absolute
  right 0px
  top 0px
  width 260px
  background-color #ffffff
  z-index 10000
  padding 17px 20px
  display flex
  flex-direction column
  &__stuck-reason
    margin 12px 0 auto 0
    position relative
    display flex
    span
      &:nth-child(1)
        font-size 60px
        font-style normal
        color #1f464f
        position absolute
        top 0
      &:nth-child(2)
        padding 0 0 0 39px
        font-size 18px
        line-height 1.44
        text-align justify
        color #1f464f
        font-style italic
  &__description
    font-size 14px
    font-weight 400
    line-height 1.71
    text-align justify
    color #1f464f
    > br
      content ""
      display block
      margin 30px 0
  &__source
    font-size 14px
    font-weight 300
    line-height 0.86
    text-align right
    color #1b1b1b
    text-decoration none
    border-bottom 1px solid #1b1b1b
    padding 0 0 6px 0
    align-self flex-end
    float right
  &__close
    position absolute
    top calc(-36px / 2)
    right calc(-36px / 2)
  &__indicator
    position absolute
    top 12px
    left -12px
    content ''
    width 0
    height 0
    border-style solid
    border-width 9px 12px 9px 0
    border-color transparent white transparent transparent

.result-swiper-container
  max-width 760px
  margin 37px auto 0 auto
// .swiper-container
//   z-index -1
// .swiper-wrapper
//   z-index -1
.swiper-slide
  width 100%
  // height calc(100vh - 69px - 44px - 60px - 95px - 37px)
  height auto
  background-color transparent
  overflow-y scroll
  &__loading
    margin auto
    width auto
  &__no-interest
    margin auto auto 50px auto
  &__no-interest-moveto
    margin auto
    box-sizing border-box



@media (max-width 425px)
  .tooltip-desktop
    display none
  .result-swiper-container
    max-width 100%
    margin 0 auto
  .swiper-slide
    &__no-interest
      margin 30px 22px 46px 22px
</style>

