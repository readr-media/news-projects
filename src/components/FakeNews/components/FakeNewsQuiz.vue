<template>
  <div class="quiz">
    <div :class="{ real: announced && quiz.answer, fake: announced && !quiz.answer }" class="quiz__question">
      <p v-text="quiz.title"></p>
      <h3 v-text="quiz.question"></h3>
      <div v-if="!announced" class="quiz__action">
        <button @click="answer(true)">真</button>
        <button @click="answer(false)">假</button>
      </div>
      <div v-if="announced" class="quiz__result">
        <h3>這則訊息是{{ quiz.answer ? '真' : '假' }}的。</h3>
        <p>根據投票結果，有 <strong>{{ percent }}%</strong> 的讀者認為是假的。</p>
      </div>
    </div>
    <div v-if="announced" class="quiz__annotation">
      <p v-text="quiz.annotation"></p>
      <a :href="quiz.sourceLink" class="source" target="_blank">來源：{{ quiz.source }}</a>
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
      percent: 0,
    }
  },
  methods: {
    answer (choice) {
      this.announced = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.quiz
  p + h3
    margin-top .5em
  &__question
    padding 1em 1em .5em
    transition color 0.5s, background-color 0.5s
    &.real
      color #fff
      background-color #395384
    &.fake
      color #fff
      background-color #b60537
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
    margin-top 2em
    p
      font-size .8125rem
      strong
        font-size 1.125rem
  &__annotation
    padding .5em 1em 1em
    text-align right
    p
      text-align justify
    .source
      color #616770
      font-size .8125rem
      text-align right
      border-bottom 1px solid #616770
</style>
