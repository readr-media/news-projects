<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">

// noUi
.noUi-base
  position relative
  width 100%
  height 5px
  border-radius 5px
  background-color #f45b69
.noUi-origin
  position absolute
  right 0
  top 0
  left 0
  bottom 0
  background-color #050505
.noUi-handle
  position relative
.noUi-handle:after
  content ''
  display inline-block
  width 20px
  height 20px
  background #f45b69
  position absolute
  top -8px
  left 0
  border-radius 50%
  cursor grab

</style>
