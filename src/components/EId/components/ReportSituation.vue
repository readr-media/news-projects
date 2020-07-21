<template>
  <div class="report-situation">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot />
      <div class="intro intro--situation" v-html="intro" />
      <div v-if="question" class="quiz">
        <div v-if="shouldOpenQuestion" class="quiz__question">
          <div class="intro">
            <p>{{ question }}</p>
          </div>
          <div class="btn-wrapper">
            <button type="button" class="normal" @click="submit('disagree')">不同意</button>
            <button type="button" class="normal" @click="submit('agree')">同意</button>
          </div>
        </div>
        <div v-else class="quiz__answer">
          <div class="intro">
            <p><span class="percentage">{{ percentage }}</span> 的人跟你有一樣的選擇！因你選擇而生的最終結果將在文末呈現</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportSituation',
  props: {
    title: {
      default: '這個授權情境下你會選擇？'
    },
    intro: String,
    question: String,
    percentages: Object
  },
  data () {
    return {
      shouldOpenQuestion: true,
      answer: 'agree'
    }
  },
  computed: {
    percentage () {
      return this.percentages[this.answer]
    }
  },
  methods: {
    submit (answer) {
      this.shouldOpenQuestion = false
      this.answer = answer
      const values = this.answer === 'agree' ? [0, 1] : [1, 0]
      this.$emit('submit', values)
    }
  }
}
</script>

<style lang="stylus">
@import '../variables.styl'

.report-situation
  margin-top 36px
  margin-bottom 36px
  border-radius 10px
  overflow hidden
  @media (min-width $breakpoint-md)
    margin-top 55px
    margin-bottom 55px
  .title
    color #fff
    font-size 18px
    line-height 1
    text-align center
    letter-spacing 2.5px
    padding 16px 20px
    font-weight 700
    background-color #5f6c11
    @media (min-width $breakpoint-md)
      font-size 25px
      padding 17.5px 44px
  .content
    background-color #eae7e0
  .intro
    &--situation
      color rgba(0, 0, 0, 0.87)
      padding 30px 25px
      @media (min-width $breakpoint-md)
        padding-right 30px
        padding-left 30px
  .quiz
    background-color rgba(255, 255, 255, 0.5)
    &__question
      padding 23px 25px 30px 25px
      position relative
      z-index 1
      @media (min-width $breakpoint-md)
        padding 28px 30px 35px 30px
    &__answer
      padding 68px 35px
      .intro
        text-align center
      .percentage
        font-size 21px
        line-height 1.8
        letter-spacing 0.15em
        color #5f6c11
        font-weight 700
        @media (min-width $breakpoint-md)
          font-size 22px
  .btn-wrapper
    margin-top 23px
    display flex
    justify-content space-between
    @media (min-width $breakpoint-md)
      margin-top 28px
    button
      width calc(50% - 7.5px)
      max-width 282px
</style>
