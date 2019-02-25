<template>
  <div class="quiz">
    <template v-if="currentQuestion < QUIZ_QUESTIONS.length">
      <div class="question">
        <p v-text="QUIZ_QUESTIONS[currentQuestion].question"></p>
        <button
          v-for="(option, index) in options"
          :key="`option-${currentQuestion}-${index}`"
          @click="select(option.president)"
          v-text="option.text">
        </button>
      </div>
      <div class="progress">
        <div v-for="item in QUIZ_QUESTIONS.length" :key="`progress-${item}`" :class="{ active: item <= currentQuestion + 1 }" class="progress__item"></div>
      </div>
    </template>
    <template v-else>
      <div :class="result.toLowerCase()" class="result">
        <div class="result__image"></div>
        <h3>你的能源政策主張和 <span v-text="QUIZ_ANSWERS[result].name"></span><br>（任期{{ QUIZ_ANSWERS[result].termOfOffice }} 年）相近！</h3>
        <p v-for="(p, index) in answerText" :key="`answer-${index}`" v-text="p"></p>
        <div class="result__btns">
          <button @click="reset()">再玩一次</button>
          <button @click="$emit('moveToArticle')">看文章</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

import { QUIZ_ANSWERS, QUIZ_QUESTIONS, } from './constant'

export default {
  name: 'EnergyPolicyQuiz',
  data () {
    return {
      QUIZ_ANSWERS,
      QUIZ_QUESTIONS,
      currentQuestion: 0,
      score: {
        Lee: 0,
        Chen: 0,
        Ma: 0,
        Tsai: 0
      }
    }
  },
  computed: {
    answerText () {
      if (this.$store.state.viewport[0] >= 1200) {
        return QUIZ_ANSWERS[this.result].text
      }
      return QUIZ_ANSWERS[this.result].text.slice(0, 1)
    },
    options () {
      const options = QUIZ_QUESTIONS[this.currentQuestion] || undefined
      return options ? options.options.sort((a, b) => a.order - b.order) : options
    },
    result () {
      let score = Object.entries(this.score).sort((a, b) => b[1] - a[1]).slice(0, 2)
      if (score[0][1] === score[1][1]) {
        score = score.sort((a, b) => QUIZ_ANSWERS[a[0]].order - QUIZ_ANSWERS[b[0]].order)
      }
      return score[0][0]
    },
    viewportWidth () {
      return this.$store.state.viewport[0]
    }
  },
  methods: {
    reset () {
      this.currentQuestion = 0
      this.score.Lee = 0
      this.score.Chen = 0
      this.score.Ma = 0
      this.score.Tsai = 0
    },
    select (president) {
      this.score[president] += 1
      this.currentQuestion += 1
      // this.currentQuestion < QUIZ_QUESTIONS.length - 1 ? this.currentQuestion += 1 : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .quiz
    position relative
    > div
      width 90%
      margin 0 auto
      padding-top 60px
    h3
      margin 0
      color #fff
      text-align center
      font-size 1.125rem
      font-weight normal
      span
        font-weight bold
    p
      margin 0
      color #fff
      text-align justify
      font-size 1.125rem
      line-height 1.67
    button
      font-size 1.125rem
      background-color transparent
      border none
      cursor pointer
    .question
      button
        width 100%
        padding .5em
        margin-top 15px
        color #000
        text-align justify
        line-height 1.3
        background-color #fff
    .progress
      display flex
      position absolute
      bottom 20px
      left 50%
      transform translateX(-50%)
      width auto
      padding 0
      &__item
        width 10px
        height 10px
        background-color #fff
        border-radius 50%
        & + .progress__item
          margin-left 10px
        &.active
          background-color #f8e71c
    .result
      display flex
      flex-direction column
      justify-content center
      align-items center
      width 100%
      height 100%
      padding 0 5%
      h3, p
        margin-top 10px
      p
        font-size 1.0625rem
      &__image
        width 90px
        height 90px
        background-color #fff
        border-radius 50%
      &__btns
        display flex
        width 100%
        margin-top 20px
        button
          flex 1
          padding .5em
          color #fff
          border 1px solid #fff
          & + button
            margin-left 10px
      &.lee
        background-color #1c33cb
      &.ma
        background-color #d93330
      &.chen
        background-color #3ac45c
      &.tsai
        background-color #a341d4
  
  @media (max-width: 374px) // iPhone SE
    .quiz
      h3
        font-size 1rem
      p, button
        font-size .875rem
      .result
        p
          font-size .875rem
        &__btns
          margin-top 10px
  
  @media (min-width: 768px)
    .quiz
      display flex
      flex-direction column
      justify-content center
      > div
        width 100%
        padding 0 20%
        
      h3
        font-size 1.625rem
      p, button
        font-size 1.5rem
      .result
        padding 0 20%
        h3, p
          margin-top 20px
        p
          font-size 1.5rem
        &__image
          width 150px
          height 150px
          
      .progress
        bottom 50px
        &__item
          width 20px
          height 20px

  @media (min-width: 769px)
    .quiz
      h3
        font-size 1.25rem
      p, button
        font-size 1.125rem
      .result
        padding 0 calc((100% - 600px) / 2)
        p
          font-size 1rem
</style>
