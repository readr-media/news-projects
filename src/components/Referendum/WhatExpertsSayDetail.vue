<template>
  <div class="what-experts-say-detail" @click="switchSaying" >
    <div class="top">
      <div class="left">
        <div class="avatar"><img :src="avatar"></div>
      </div>
      <div class="right">
        <div class="title"><h4><span v-text="title"></span></h4></div>
        <div class="name"><span v-text="name"></span></div>
        <div class="switcher" :class="{ active: this.isActive }" ref="switcher"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="saying" :class="{ active: this.isActive }"><div v-html="saying"></div></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'WhatExpertsSayDetail',
    data () {
      return {
        isActive: false,
      }
    },
    methods: {
      switchSaying () {
        this.isActive = !this.isActive
      },
    },
    mounted () {
      this.$el.ondragstart = function () { return false }
      this.$el.onselectstart = function () { return false }
    },
    props: {
      title: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      saying: {
        type: String,
      },
    },
  }
</script>
<style lang="stylus" scoped>
.what-experts-say-detail
  .switcher
    position absolute
    bottom 5px
    right 0
    height 12px
    width 20px
    background-position center center
    background-repeat no-repeat
    background-size contain
    cursor pointer
  .top, .bottom
    display flex
    overflow hidden
    .right
      position relative
      flex 1
      margin-left 15px
    .left
      display flex
      justify-content center
      align-items center
  .title
    margin-bottom 10px
    h4
      margin 0
      font-size 1rem
      font-weight normal
      font-style normal
      font-stretch normal
      line-height normal
      letter-spacing normal
      text-align justify
      color #a40035
  .avatar
    width 40px
    height 40px
    img
      height 100%
      object-fit contain
      object-position center
  .name
    font-size 0.875rem
    font-weight normal
    font-style normal
    font-stretch normal
    line-height normal
    letter-spacing normal
    text-align left
    color #313131  
  .saying
    font-size 0.875rem
    font-weight normal
    font-style normal
    font-stretch normal
    line-height 1.71
    letter-spacing normal
    text-align justify
    display none
    max-height 999px
    margin 23px 0
    &.active
      display block
      animation saying-on 1s
  &:nth-child(even), &:nth-child(odd)
    margin 24px 12px
    padding 25px
    border-radius 24px
    border solid 2px #a40035
  &:nth-child(even)
    .switcher
      background-image url(/proj-assets/referendum/icons/icon-arrowdown.png)
      &.active
        transform rotate(180deg)
    .saying
      color #313131
  &:nth-child(odd)
    background-color #a40035
    .switcher
      background-image url(/proj-assets/referendum/icons/icon-arrowup.png)
      transform rotate(180deg)
      &.active
        transform rotate(0deg)
    .title
      h4
        color #fff
    .name
      color #fff
    .saying
      color #fff
@media screen and (min-width: 600px) 
  .what-experts-say-detail
    max-width 600px
    .top, .bottom
      .right
        margin-left 42px    
    &:nth-child(even), &:nth-child(odd)
      margin 24px auto
      padding 40px
    .avatar
      width 70px
      height 70px
     .title 
        h4
          font-size 1.25rem
          line-height 1.8
          text-align justify
      .name
        font-size 1rem
        line-height 1.88
      .saying
        font-size 1rem
        line-height 1.88

@keyframes saying-on
  0%
    max-height 0
    margin 0 0
  100%
    max-height 999px
    margin 23px 0
</style>