<template>
  <div class="quiz">
    <div class="quiz__question">
      <p v-text="quiz.title"></p>
      <h3 v-text="quiz.question"></h3>
      <div class="quiz__action">
        <button>真</button>
        <button>假</button>
      </div>
    </div>
    <div class="quiz__annotation">
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
      announced: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.quiz
  p + h3
    margin-top .5em
  &__question, &__annotation
    padding 1em
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
  &__annotation
    text-align right
    p
      text-align justify
    .source
      color #616770
      font-size .8125rem
      text-align right
</style>
