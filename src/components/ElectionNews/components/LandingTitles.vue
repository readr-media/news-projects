<template>
  <div class="titles">
    <div class="titles__balls balls">
      <div
        class="balls__ball"
        v-for="color in ballColors"
        :key="`${color}-top`"
        :style="{ backgroundColor: color }"
      >
      </div>
    </div>
    <div class="titles__content">
      <h1>選舉新聞風向球</h1>
      <h2>媒體報導看風向？<br>Google 人工智慧來解答</h2>
    </div>
    <div class="titles__balls balls">
      <div
        class="balls__ball"
        v-for="color in [...ballColors].reverse()"
        :key="`${color}-bottom`"
        :style="{ backgroundColor: color }"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ballColorsCandidate: [
        '#8caf61',
        '#cbad55',
        '#3da1c2',
        '#ca9ba8',
        '#9e005d',
      ]
    }
  },
  computed: {
    ballColors () {
      return [...this.ballColorsCandidate, ...this.ballColorsCandidate]
    }
  }
}
</script>

<style lang="stylus" scoped>
.titles
  display flex
  flex-direction column
  align-items center
  max-width 300px
  &__content
    display flex
    flex-direction column
    align-items center
    h1
      font-size 40px
      font-weight 400
      color white
      margin 20px 0
    h2
      text-align center
      font-size 20px
      font-weight 400
      color white
      margin 0 0 20px 0
      line-height 1.5

.balls
  display flex
  &__ball
    d = 10px
    width d
    height d
    border-radius d
    & + &
      margin 0 0 0 20px
    &:nth-child(6), &:nth-child(7), &:nth-child(8), &:nth-child(9), &:nth-child(10)
      display none

@media (min-width 1024px)
  .titles
    max-width 500px
    &__content
      h1
        font-size 70px
        margin 40px 0
      h2
        font-size 40px
        margin 0 0 40px 0

  .balls
    &__ball
      d = 15px
      width d
      height d
      border-radius d
      & + &
        margin 0 0 0 35px
      &:nth-child(6), &:nth-child(7), &:nth-child(8), &:nth-child(9), &:nth-child(10)
        display initial
</style>