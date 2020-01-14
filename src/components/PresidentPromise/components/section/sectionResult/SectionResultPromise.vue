<template>
  <div class="container">
    <div :class="[ 'section-result-promise', { 'section-result-promise--is-interest': interested } ]" @click="handleTooltip">
      <div class="title-container">
        <h1 :class="[ 'section-result-promise__title' , { 'section-result-promise__title--is-interest': interested } ]" v-text="order.padStart(3, '0')"></h1>
        <ButtonCheckBox class="section-result-promise__checkbox section-result-promise__checkbox--mobile" :checked="interested" :interested.sync="interested"/>
      </div>
      <p :class="[ 'section-result-promise__description', { 'section-result-promise__description--is-interest': interested } ]" v-text="promise.title"></p>
      <ButtonCheckBox class="section-result-promise__checkbox section-result-promise__checkbox--desktop" :checked="interested" :interested.sync="interested"/>
    </div>
    <div class="tooltip-mobile" v-if="VW <= 425" v-show="showTooltip">
      <TagPromise
        v-show="promise.status && promise.status !== ''"
        :tagType="promise.status"
      />
      <blockquote class="tooltip-mobile__stuck-reason" v-show="promise.isStuck"><span>“</span><span>{{ promise.stuckReason }}</span></blockquote>
      <p class="tooltip-mobile__description" v-html="promise.description"></p>
      <a class="tooltip-mobile__source" :href="promise.sourceLink" target="_blank" v-text="promise.source"></a>
    </div>
  </div>
</template>

<script>
import { find, debounce, } from 'lodash'
import ButtonCheckBox from '../../button/ButtonCheckBox.vue'
import TagPromise from '../../TagPromise.vue'

export default {
  props: {
    order: {
      type: String,
      required: true,
    },
    isInterest: {
      type: Boolean,
      default: false,
    },
    promise: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    ButtonCheckBox,
    TagPromise,
  },
  watch: {
    interested (value) {
      if (value) {
        let submittedRef = find(this.promiseData, [ 'pid', this.promise.pid ])
        
        // prevent sending duplicated result that is already send
        if (submittedRef.surveyResult !== 'no-ans') return

        submittedRef.surveyResult = 'very-interest'
        this.$store.dispatch('PresidentPromise/UPDATE_INTEREST', { isUptatedAtResult: true, promise: this.promise })
        this.$emit('reFetchInterestStat')
      }
    }
  },
  data () {
    return {
      interested: this.isInterest,
      showTooltip: false,
      // isDesktop: get(this.$store.state, 'useragent.isDesktop', false),
      VW: 0
    }
  },
  computed: {
    promiseData () {
      return this.$store.state.PresidentPromise.promiseData
    },
  },
  methods: {
    handleTooltip () {
      this.showTooltip = !this.showTooltip
      window.ga('send', 'event', 'projects', 'click', this.promise.pid, { nonInteraction: false })
    }
  },
  mounted () {
    window.addEventListener('resize', debounce(() => {
      this.VW = window.innerWidth
    }, 500))
    this.VW = window.innerWidth
  }
}
</script>

<style lang="stylus" scoped>
.section-result-promise
  width 100%
  display flex
  align-items flex-start
  padding 12px 15px
  cursor pointer
  position relative
  &--is-interest
    background-color #275964
  &__title
    font-size 20px
    font-weight 900
    line-height 1.3
    color #fefefe
    // margin 0 19px 0 0
    margin 0
    min-width 35px
    max-width 35px
    &--is-interest
      color #fa8d62
  &__description
    font-size 18px
    line-height 1.33
    text-align justify
    color #ffffff
    margin 0
    min-width 639px
    max-width 639px
    &--is-interest
      color #fa8d62
  &__checkbox
    &--desktop
      margin 0 0 0 19px
    &--mobile
      display none
.title-container
  margin 0 19px 0 0

@media (max-width 425px)
  .section-result-promise
    width auto
    padding 15px 20px
    &__title
      font-size 16px
      line-height 1.4
      min-width initial
      max-width initial
      // margin 0 11px 0 0
    &__description
      font-size 16px
      line-height 1.5
      min-width initial
      max-width initial
    &__checkbox
      &--desktop
        display none
      &--mobile
        display initial
        margin 10px 0 0 0
  .title-container
    margin 0 11px 0 0
    display flex
    flex-direction column
    align-items center
  .tooltip-mobile
    background-color #ffffff
    padding 20px
    position relative
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
    &:after
      position absolute
      top -12px
      left calc(20px + 6px)
      content ''
      width 0
      height 0
      border-style solid
      border-width 0 9px 12px 9px
      border-color transparent transparent white transparent
</style>

