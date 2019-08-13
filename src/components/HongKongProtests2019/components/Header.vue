<template>
  <header class="header">
    <nav class="header__nav left">
      <a
        class="header__item logo"
        href="https://www.readr.tw/"
        target="_blank"
      >
        <img
          src="/proj-assets/hong-kong-protests-2019/readrlogo.png"
          alt="readr"
        >
      </a>
      <a
        class="header__item donate"
        href="https://www.readr.tw/donate"
        target="_blank"
      >
        <img
          src="/proj-assets/hong-kong-protests-2019/donate.png"
          alt="贊助"
        >
      </a>
    </nav>
    <nav class="header__nav right">
      <a
        class="header__item switch"
        href=""
        target="_blank"
      >
        <img
          src="/proj-assets/hong-kong-protests-2019/switch.png"
          alt=""
        >
        <span></span>
      </a>
      <button
        class="header__item message"
        @click="$emit('openMessageBoard')"
      >
        <img
          src="/proj-assets/hong-kong-protests-2019/message.png"
          alt="我要留言"
        >
        <span>我要留言</span>
      </button>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'HongKongHeader'  
}
</script>
<style lang="stylus" scoped>
.header
  display flex
  align-items center
  position fixed
  top 0
  left 0
  width 100%
  height 60px
  padding 0 10px
  background-color #000000
  &__nav
    display flex
    &.left, &.right
      .header__item
        width 40px
        border-radius 50%
    &.right
      margin 0 0 0 auto
      .header__item
        & + .header__item
          margin-left 10px
  &__item
    display block
    height 40px
    background-color transparent
    border 2px solid #fff
    text-decoration none
    cursor pointer
    & + .header__item
      margin-left 5px
    img
      width 100%
      height 100%
      object-fit contain
      object-position center center
    span
      display none
  .logo
    img
      transform scale(.9) translate(1px, 4px)
  .donate
    img
      transform scale(.8)
  .switch
    img
      transform scale(.6)
  .message
    img
      transform scale(.8) translateY(2px)

@media (min-width: 768px)
  .header
    &__nav
      &.right
        .header__item
          display flex
          justify-content center
          align-items center
          width 140px
          border-radius 20px
          & + .header__item
            margin-left 20px
          img
            width auto
            height 22px
            transform none
          span
            display inline
            margin-left 10px
            color #fff

@media (min-width: 1024px)
  .header
    &__item
      & + .header__item
        margin-left 10px


</style>
