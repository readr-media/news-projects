<template>
  <div :class="[ voted !== '' ? 'voted' : '', 'choice' ]">
    <button :class="{ selected: voted === id }" :disabled="voted !== ''" @click="$emit('vote', id)"></button>
    <div class="choice__text">
      <p v-text="text"></p>
      <div v-if="voted !== ''" :style="{ width: `${amount / totalVote * 100}%` }" class="choice__percent"></div>
    </div>
    <p class="choice__result"><span v-if="voted !== ''">{{ $store.state.FakeNews.votes[id] || 0 }} 票</span></p>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsVoteChoice',
  props: {
    id: {
      type: String
    },
    text: {
      type: String
    },
    totalVote: {
      type: Number
    },
    voted: {
      type: String
    }
  },
  computed: {
    amount () {
      return this.$store.state.FakeNews.votes[this.id] || 0
    }
  }
}
</script>
<style lang="stylus" scoped>
.choice
  display flex
  align-items center
  button
    position relative
    width 15px
    height 15px
    padding 0
    margin-right 15px
    border 1px solid #979797
    border-radius 50%
    &.selected
      &::before
        content ''
        position absolute
        top 2px
        left 2px
        width 9px
        height 9px
        background-color #4868a5
        border-radius 50%
  p
    color #9B9B9B

  // &.voted
  //   .choice__text
     
  & + .choice
    margin-top .5em
  &__text
    flex 1
    position relative
    padding .5em
    border 1px solid #CCD0D5
    p
      font-size .8125rem
      line-height 1.15
  &__percent
    position absolute
    top 0
    left 0
    height 100%
    background-color rgba(72, 104, 165, .25)
  &__result
    width 40px
    font-size .875rem
    text-align right
</style>
