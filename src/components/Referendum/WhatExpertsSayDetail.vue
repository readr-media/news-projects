<template>
  <div class="what-experts-say-detail" :id="id" :class="{ active: this.isActive }" @click="switchSaying" >
    <div class="top">
      <div class="left">
        <div class="avatar"><img :src="avatar"></div>
      </div>
      <div class="right">
        <div class="title"><h4><span v-text="title"></span></h4></div>
        <div class="name"><span v-text="name"></span></div>
        <div class="switcher" ref="switcher"></div>
      </div>
    </div>
    <div class="bottom" ref="bottom">
      <div class="starter"><div v-html="starter"></div></div>
      <div class="saying"><div v-html="saying"></div></div>
    </div>
  </div>
</template>
<script>
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  const debug = require('debug')('CLIENT:WhatExpertsSayDetail')
  export default {
    name: 'WhatExpertsSayDetail',
    data () {
      return {
        isActive: false,
        inSight: false,
      }
    },
    methods: {
      switchSaying () {
        this.isActive = !this.isActive
        window.ga('send', 'event', 'projects', 'click', `expert ${this.avatar}`, { nonInteraction: false })
      },
      setUpTimer () {
        window.addEventListener('scroll', () => {
          if (this.isActive) { return }
          const current_top_y = currentYPosition()
          const content_top_y = elmYPosition(`#${this.id} > .bottom`)
          const content_height = this.$refs.bottom.clientHeight
          const device_height = verge.viewportH()
          if (!this.interval && content_top_y < current_top_y + device_height / 2) {
            let i = 3
            if (content_top_y + content_height < current_top_y + device_height / 3) {
              this.inSight = false
            } else {
              this.inSight = true
              setTimeout(() => {
                if (this.inSight) {
                  this.isActive = true
                }
              }, 3000)
            }
          } else {
            this.inSight = false
          }
        })
      },
    },
    mounted () {
      this.$el.ondragstart = function () { return false }
      this.$el.onselectstart = function () { return false }
      this.isActive = this.defaultActive
      this.setUpTimer()
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
      starter: {
        typs: String,
      },
      defaultActive: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
      }
    },
  }
</script>
<style lang="stylus" scoped>
.what-experts-say-detail
  margin 24px 12px
  padding 25px 25px 0
  border-radius 24px
  border solid 2px #a40035   
  transition background-color 1s, color 1s 
  
  .switcher
    position absolute
    bottom 5px
    right 0
    height 12px
    width 20px
    background-position center center
    background-repeat no-repeat
    background-size contain
    background-image url(/proj-assets/referendum/icons/icon-arrowdown.png)
    cursor pointer
      
  .top, .bottom
    overflow hidden
  .top
    display flex
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
      transition color 1s
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
    transition color 1s
  .saying, .starter
    font-size 0.875rem
    font-weight normal
    font-style normal
    font-stretch normal
    line-height 1.71
    letter-spacing normal
    text-align justify
    // margin 23px 0
    color #313131
    transition color 1s  
  .saying
    max-height 999999px
    animation saying-on 1.25s
    display none

  &.active
    background-color #a40035
    .switcher
      background-image url(/proj-assets/referendum/icons/icon-arrowup.png)
    .title
      h4
        color #fff
    .name
      color #fff
    .saying, .starter
      color #fff      
    .saying
      display block

@media screen and (min-width: 600px) 
  .what-experts-say-detail
    max-width 600px
    margin 24px auto
    padding 40px 40px 20px
    .top, .bottom
      .right
        margin-left 42px    
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
      .saying, .starter
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