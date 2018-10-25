<template>
  <footer class="footer">
    <div class="footer__block map">
      <img class="map__img" src="/proj-assets/puyuma/map/map1.png" alt="">
      <p>6432 次普悠瑪行駛路線</p>
    </div>
    <div class="footer__block status">
      <div class="status__title">
        <h1>車況</h1>
      </div>
      <p>MR曾恢復MRPS及PBPS動作，建立動力，隨後MR下降MRPS切開動力抑制。</p>
    </div>
  </footer>
</template>

<style lang="stylus" scoped>
.footer
  // height 200px
  padding 13px 18px
  display flex
  background-color white
  &__block
    width 50%
    height 100%

.map
  &__img
    width 100%
    border 1px solid #979797
  p
    font-size 14px
    text-align justify

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
    font-size 16px
    line-height 1.5
    text-align justify
</style>

