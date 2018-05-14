<template>
  <div class="slide" :data-anchor="`slide-${order}`" :ref="`section-promise-survey-${order}`">
    <div class="promise-survey">
      <h1 class="promise-survey__hint">請挑選出感興趣的政策</h1>
      <!-- No SSR for random generate content -->
      <NoSSR>
        <CardPromiseSurvey class="promise-survey__card" :category="promise.category" :title="promise.title"/>
      </NoSSR>
      <div class="interest-container">
        <ButtonInterest class="interest-container__button" :emotionType="'very-interest'" @click.native="clickInterest('very-interest')"/>
        <ButtonInterest class="interest-container__button" :emotionType="'idk'" @click.native="clickInterest('idk')"/>
        <ButtonInterest class="interest-container__button" :emotionType="'not-interest'" @click.native="clickInterest('not-interest')"/>
      </div>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import fullPageMixin from '../../_vue-fullpage/fullPageMixin'
import CardPromiseSurvey from '../CardPromiseSurvey.vue'
import ButtonInterest from '../button/ButtonInterest.vue'

export default {
  props: {
    order: {
      type: Number,
      required: true,
    },
    promise: {
      type: Object,
      required: true,
    }
  },
  mixins: [ fullPageMixin, ],
  components: {
    NoSSR,
    CardPromiseSurvey,
    ButtonInterest,
  },
  methods: {
    clickInterest (interest) {
      this.order === 9 ? this.moveSectionDown() : this.moveSlideRight()
      this.$emit('surveySubmit', this.promise.pid, interest)
    },
  },
}
</script>

<style lang="stylus" scoped>
.promise-survey
  max-width 1366px
  max-height 768px
  height 100%
  margin auto
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__hint
    font-size 40px
    font-weight 900
    line-height 1.1
    text-align center
    color #b2dbd5
    margin 0 0 61px 0
  &__card
    margin 0 0 30px 0

.interest-container
  display flex
  &__button:nth-child(2)
    margin 0 10px

@media (max-width 425px)
  .promise-survey
    max-width 320px
    max-height 568px
    &__hint
      display none
    &__card
      margin 0 0 10px 0
</style>


