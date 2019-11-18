<template>
  <section class="landing">
    <div class="landing__map-wrapper">
      <div class="flourish-embed" data-src="visualisation/919227" />
    </div>
    <div class="landing__title-wrapper title-wrapper">
      <h1 class="title-wrapper__title">
        <span>大標大標大標大標大標大標</span>
        <span>大標大標大標大標大標大標</span>
      </h1>
      <div class="title-wrapper__arrow-wrapper arrow-wrapper">
        <div class="arrow-wrapper__arrow" />
      </div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
.landing
  background-color black
  &__map-wrapper
    max-width 1000px
    margin auto
  &__title-wrapper
    margin 100px 0 0 0

.title-wrapper
  padding 0 0 30px 0
  display flex
  flex-direction column
  align-items center
  &__title
    margin 0
    line-height 1.5
    display flex
    flex-direction column
    font-size 50px
    font-weight 300
    text-align center
    color #f5a623
  &__arrow-wrapper
    margin 10px 0 0 0

.arrow-wrapper
  width 30px
  height 30px
  border solid 1.2px #f5a623
  border-radius 100%
  display flex
  justify-content center
  align-items center
  cursor pointer
  &__arrow
    width 0
    height 0
    border-style solid
    border-width 15px 9px 0 9px
    border-color #f5a623 transparent transparent transparent

</style>