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
      <button class="fb" @click="shareToFacebook">Facebook</button>
      <button class="line" @click="shareToLine">LINE</button>
      <button class="url" @click="copyUrlToClipboard">拷貝連結<span>複製成功</span></button>
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
    copyUrlToClipboard (e) {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href
      document.body.appendChild(textArea);
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      e.target.classList.add('show')
      setTimeout(() => { e.target.classList.remove('show') }, 2000)
    },
    shareToFacebook () {
      window.open(`https://www.facebook.com/share.php?u=${window.location.href}`)
    },
    shareToLine () {
      window.open(`https://line.me/R/msg/text/?${window.location.href}`)
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
  >>> h2
    color #032669
  >>> a
    color #4868a5
    text-decoration none
  &__content
    padding 1em 1em .5em !important
    div + div
      margin-top 1em
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
      &.url
        position relative
        > span
          position absolute
          top 50%
          right -25px
          transform translateY(-50%)
          width 70px
          padding .2em 0
          background-color #fff
          border-radius 4px
          visibility hidden
        &.show
          > span
            visibility visible
            animation popup 2s forwards

@keyframes popup {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

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
