<template>
  <footer class="footer">
    <div class="footer__block map">
      <img class="map__img" :src="`/proj-assets/puyuma/map/${mapIndex}.png`" alt="">
      <p>6432 次普悠瑪行駛路線</p>
    </div>
    <div class="footer__block status">
      <div class="status__title">
        <h1>車況</h1>
      </div>
      <p v-text="status"></p>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: ''
    },
    mapIndex: {
      type: String,
      default: '福隆'
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer
  // height 200px
  padding 13px 18px
  display flex
  background-color white
  width 100%
  &__block
    width 50%
    height 100%

.map
  &__img
    width 100%
    min-height calc((50vw - 18px) * 0.9375)
    border 1px solid #979797
  p
    font-size 12px
    text-align center

.status
  padding 0 0 0 10px
  &__title
    background-color #d0021b
    display flex
    justify-content center
    padding 3px 0
    margin 0 0 10px 0
    h1
      position relative
      left 10px
      color white
      font-size 16px
      letter-spacing 10px
  p
    font-size 14px
    line-height 1.5
    text-align justify

@media (min-width 321px)
  .map
    p
      font-size 14px
</style>

