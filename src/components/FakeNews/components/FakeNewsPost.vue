<template>
  <div class="post">
    <div class="post-container">
      <div class="post__content">
        <slot></slot>
      </div>
      <div class="post__action">
        <button><img src="/proj-assets/fake-news/like.png" alt="讚"><span>讚</span></button>
        <button><img src="/proj-assets/fake-news/comment.png" alt="回應"><span>回應</span></button>
        <button :class="{ active: openShare }" @click="openShare = !openShare"><img src="/proj-assets/fake-news/share.png" alt="分享"><span>分享</span></button>
      </div>
    </div>
    <div :class="[ { open: openShare }, 'share' ]">
      <button class="fb">Facebook</button>
      <button class="line">LINE</button>
      <button class="url" @click="copyUrlToClipboard">拷貝連結</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsPost',
  data () {
    return {
      openShare: false
    }
  },
  methods: {
    copyUrlToClipboard () {
      
    }
  }
}
</script>
<style lang="stylus" scoped>
.post
  &-container
    position relative
    background-color #fff
    border 1px solid #dddfe2
    border-left none
    border-right none
    > div
      padding .5em
  h2
    color #032669
    & + p
      margin-top 1em
  a
    color #4868a5
    text-decoration none
  p
    & + p
      margin-top 1em
  &__content
    padding 1em 1em .5em !important
  &__action
    display flex
    width calc(100% - 2em)
    margin 0 auto
    padding .2em 0 !important
    background-color #fff
    border-top 1px solid #dddfe2
    > button
      flex 1
      display flex
      justify-content center
      align-items center
      padding .4em 0
      &:hover, &.active
        background-color rgba(204, 208, 213, .3)
        border-radius 6px
      img
        width 20px
        height 20px
      span
        margin-left .2em
  .share
    position relative
    display none
    flex-direction column
    &::before
      position absolute
      content ''
      top -9px
      right 16.5%
      width 0
      height 0
      border-style solid
      border-width 0 5px 8.7px 5px
      border-color transparent transparent #4868a5
    &.open
      display flex
    > button
      flex 1
      padding .8em 0
      color #4a4a4a
      background-color #ccd0d5
      &.fb
        color #fff
        background-color #4868a5
      &.line
        color #fff
        background-color #2c9042
      

@media (min-width: 1024px)
  .post
    &-container
      border-left 1px solid #dddfe2
      border-right 1px solid #dddfe2
      border-radius 4px
    .share
      flex-direction row
      margin-top 10px
      &::before
        border-color transparent transparent #ccd0d5
      > button
        &.fb
          border-radius 4px 0 0 4px
        &.url
          border-radius 0 4px 4px 0
</style>
