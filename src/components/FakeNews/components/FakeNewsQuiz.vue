<template>
  <div class="quiz">
    <div v-if="announced" class="quiz__result">
      <p><strong>你答{{ userAnswer === quiz.answer ? '對' : '錯' }}了！</strong></p>
      <p>根據投票結果，有 <strong>{{ percent * 100 }}%</strong> 的讀者跟你一樣。</p>
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

const fetchQuizAmount = (store, id) => store.dispatch('FakeNews/FETCH_QUIZ_AMOUNT', id)
const fetchQuizTotalAmount = (store, id) => store.dispatch('FakeNews/FETCH_QUIZ_TOTAL_AMOUNT', id)

const updateQuizAmount = (store, { id, amount }) => store.dispatch('FakeNews/UPDATE_QUIZ_AMOUNT', { id, amount })
const updateQuizTotalAmount = (store, { id, amount }) => store.dispatch('FakeNews/UPDATE_QUIZ_TOTAL_AMOUNT', { id, amount })

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
    }
  },
  computed: {
    percent () {
      const value = (this.userAnswer ? this.answerTrueAmount / this.answerTotalAmount : this.answerFalseAmount / this.answerTotalAmount)
      return value ? value.toFixed(2) : 0
    },
    answerTrueAmount () {
      return this.$store.state.FakeNews.quiz[`quiz-${this.quiz.index}`].isTrue || 0
    },
    answerFalseAmount () {
      return this.answerTotalAmount - this.answerTrueAmount
    },
    answerTotalAmount () {
      return this.$store.state.FakeNews.quiz[`quiz-${this.quiz.index}`].total || 0
    }
  },
  methods: {
    answer (choice) {
      this.announced = true
      this.userAnswer = choice
      const id = `quiz-${this.quiz.index}`
      Promise.all([ fetchQuizAmount(this.$store, id), fetchQuizTotalAmount(this.$store, `quiz-${this.quiz.index}`) ])
      .then(res => {
        const quizAmount = (res[0] || 0) + 1
        const quizTotalAmount = (res[1] || 0) + 1
        choice ? updateQuizAmount(this.$store, { id , amount: quizAmount }) : ''
        updateQuizTotalAmount(this.$store, { id , amount: quizTotalAmount })
      })
      window.ga && window.ga('send', 'event', 'projects', 'click', `test ${this.quiz.index} ${choice}`, { nonInteraction: false })
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
