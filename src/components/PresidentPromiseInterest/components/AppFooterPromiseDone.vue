<template>
  <section class="section">
    <div class="section__done-status-container">
      <AppPromiseDoneStatus class="section__paragraph"/>
      <p class="section__paragraph">我們也會繼續替你追蹤</p>
    </div>
    <button class="section__button-nav-to-done" @click="navToPresidentPromise">
      查看已完成政策
    </button>
  </section>
</template>

<script>
import AppPromiseDoneStatus from './AppPromiseDoneStatus.vue'

export default {
  components: {
    AppPromiseDoneStatus,
  },
  methods: {
    navToPresidentPromise () {
      window.open('/project/president-promise?promise-done')
    }
  }
}
</script>

<style lang="stylus" scoped>
.section
  width 100%
  height 360px
  background-color #2b616d
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__done-status-container
    font-size 40px
    font-weight 900
    line-height 1.5
    text-align center
    color #ffffff
    margin 0 0 42px 0
  &__paragraph
    & + &
      margin 10px 0 0 0
  &__button-nav-to-done
    cursor pointer
    width 410px
    height 84px
    background-color #b2dbd5
    border none
    border-radius 42px
    font-size 40px
    font-weight 900
    text-align center
    color #1f464f
    transition filter .1s ease-out
    &:focus
      outline none
    &:hover
      filter brightness(90%)

@media (max-width 425px)
  .section
    height 254px
    &__done-status-container
      font-size 26px
      margin 0 0 22px 0
      text-align justify
    &__paragraph
      & + &
        display inline
        margin 5px 0 0 0
    &__button-nav-to-done
      width 250px
      height 50px
      border-radius 25px
      font-size 24px
</style>

