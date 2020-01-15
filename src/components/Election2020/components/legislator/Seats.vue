<template>
  <section class="section">
    <h1 v-text="title" />
    <div class="section__seats seats">
      <transition-group
        name="flip-list"
        tag="div"
        class="seats__seats-wrapper seats-wrapper"
      >
        <SeatsCard
          class="seats-wrapper__seat"
          v-for="party in data"
          :key="party.partyCode"
          :partyName="party.name"
          :seat="party.seats"
        />
      </transition-group>
    </div>
    <div class="section__seat-total-wrapper seat-total-wrapper">
      <SeatTotal
        class="seat-total-wrapper__seat-total"
        :count="total"
      />
    </div>
  </section>
</template>

<script>
import SeatsCard from './SeatsCard.vue'
import SeatTotal from '../SeatTotal.vue'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    SeatsCard,
    SeatTotal
  }
}
</script>

<style lang="stylus" scoped>
.flip-list-move {
  transition: transform .5s;
}
.flip-list-enter, .flip-list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.flip-list-leave-active {
  position: absolute;
}

.section
  h1
    font-size 15px
    font-weight normal
    color $color-black
    margin 0
  &__seats
    margin 26px 0 0 0
  &__seat-total-wrapper
    margin 20px 0 0 0

.seats
  padding 0 10px

.seats-wrapper
  display flex
  flex-wrap wrap
  margin -6px
  &__seat
    margin 6px
    transition all .5s

.seat-total-wrapper
  padding 10px 0
  margin-left 10px
  margin-right 10px
  border-top solid 2px rgba(0, 0, 0, 0.1)
  display flex
  justify-content flex-end
  &__seat-total
    margin 0

@media (min-width 768px)
  .section
    h1
      font-size 16px
      text-align left
    &__seat-total-wrapper
      margin 48px 0 0 0

  .seats
    padding 0

  .seats-wrapper
    margin -20px
    &__seat
      margin 20px

  .seat-total-wrapper
    margin-left 0
    margin-right 0
</style>
