<template>
  <div class="card">
    <div class="card__party-name party-name">
      <p
        class="party-name__text"
        v-text="partyName"
      />
    </div>
    <div class="card__seat seat">
      <p>
        <Counter
          class="seat__count"
          :count="seat"
        />
        <span
          class="seat__text"
        >
          席
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import Counter from '../Counter.vue'

export default {
  props: {
    partyName: {
      type: String,
      required: true
    },
    seat: {
      type: Number,
      default: 0
    }
  },
  components: {
    Counter
  }
}
</script>

<style lang="stylus" scoped>
.card
  width calc((100vw - 20px - 12px) / 2)
  height calc((100vw - 20px - 12px) / 2 * 0.9027) // 0.9027 = 130 / 144
  background-color rgba(216, 216, 216, 0.3)
  padding 0 22px
  display flex
  flex-direction column
  justify-content space-around
  align-items center
  &__party-name
    width 100%
    height 55%
  &__seat
    border-top 1px solid $color-black-light
    width 100%
    height 45%

.party-name
  display flex
  justify-content center
  align-items center
  &__text
    font-size 15px
    color $color-black-light
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    margin 0
    line-height 1.63

.seat
  margin 0
  display flex
  justify-content center
  align-items center
  &__count
    font-size 26px
    font-family $font-family-serif
    font-weight bold

@media (min-width 768px)
  .card
    width 110px
    height 130px
    padding 0 17px
</style>
