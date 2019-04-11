<template>
  <div class="quiz">
    <div v-if="announced" class="quiz__result">
      <p><strong>你答{{ userAnswer === quiz.answer ? '對' : '錯' }}了！</strong></p>
      <p>根據投票結果，有 <strong>{{ percent }}%</strong> 的讀者認為是假的。</p>
    </div>
    <div class="quiz__question">
      <p v-if="!announced" v-text="quiz.title"></p>
      <h3 v-text="quiz.question"></h3>
      <div v-if="!announced" class="quiz__action">
        <button @click="answer(true)">真</button>
        <button @click="answer(false)">假</button>
      </div>
      <template v-if="announced">
        <p v-if="announced" :class="{ real: quiz.answer, fake: !quiz.answer }"><strong>這則訊息是{{ quiz.answer ? '真' : '假' }}的。</strong></p>
        <p class="quiz__annotation" v-text="quiz.annotation"></p>
        <div class="quiz__source">
          <a :href="quiz.sourceLink" target="_blank">來源：{{ quiz.source }}</a>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsQuiz',
  props: {
    quiz: {
      type: Object
    }
  },
  data () {
    return {
      announced: false,
      userAnswer: undefined,
      percent: 0,
    }
  },
  methods: {
    answer (choice) {
      this.announced = true
      this.userAnswer = choice
    }
  }
}
</script>
<style lang="stylus" scoped>
.quiz
  p + h3
    margin-top .5em
  &__question
    padding 1em
    transition color 0.5s, background-color 0.5s
    h3, p
      & + *
        margin-top .5em
    .real
      color #395384
    .fake
      color #b60537
  &__action
    display flex
    justify-content space-between
    margin-top 1.5em
    button
      width calc(50% - 5px)
      padding .5em 0
      color #fff
      font-size 1.125rem
      border-radius 4px
      &:first-of-type
        background-color #395384
      &:last-of-type
        background-color #b60537
  &__result
    padding 1em
    background-color #616770
    p
      color #fff
      font-size .8125rem
      strong
        font-size 1.125rem
  &__annotation
    margin-top 1.5em !important
  
  .quiz__source
    text-align right
    a
      color #616770
      font-size .8125rem
      border-bottom 1px solid #616770
 
</style>
