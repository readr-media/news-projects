<template>
  <ul class="title-anchor" :style="{ top: `${top}px` }">
    <li v-for="(anchor, idx) in anchors" :key="anchor"
        @mouseenter="toggleTitle(idx)"
        @mouseleave="toggleTitle(idx)"
        @click="scrollToTitle(idx)"
        :ref="`anchor${idx}`"
        :class="{ active: ((activeIdx === idx) && !isHover), hover: isTitles[idx] }"
    >
      <div class="title-anchor__index">
        <div class="title-anchor__circle"></div>
        <div class="title-anchor__line"></div>
      </div>
      <transition name="fadeAnchor">
        <div class="title-anchor__txt" v-if="isTitles[idx]">{{ anchor }}</div>
      </transition>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TitleAnchor',
  props: ['wh', 'activeIdx'],
  data () {
    return {
      isMounted: false,
      isTitles: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      isHover: false,
      anchors: [
        '愈來愈多臺灣青年出國工作',
        '臺灣女孩三年多港漂歲月的最終章',
        '堅持天天在家吃晚飯的 Ellen',
        '在臺找到比美國更美式工作的蔡裕杰',
        '不想「幫別人賺錢」的曾鈺茜',
        '圓夢後回臺與亡國感共處的張哲輔',
        '想念臺灣遍地文化活動的 Sunny',
        '為了孩子的教育回臺定居的 Jacy',
        '臺灣如何跨國人才移動從中獲利'
      ]
    }
  },
  mounted () {
    this.isMounted = true
  },
  computed: {
    top () {
      if (!this.isMounted) return 0
      else return (this.wh - this.$el.offsetHeight) / 2
    }
  },
  methods: {
    toggleTitle (idx) {
      this.isHover = !this.isHover
      Vue.set(this.isTitles, idx, !this.isTitles[idx])
    },
    // hideTitle (evt, idx) {
    //   this.isHover = false
    //   Vue.set(this.isTitles, idx, false)
    // },
    scrollToTitle (idx) {
      switch (idx) {
        case 0:
          this.$parent.$refs.opening.$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 8:
          this.$parent.$refs.final.$el.scrollIntoView({ behavior: 'smooth' })
          break
        default:
          this.$parent.$refs[`story${idx - 1}`].$el.scrollIntoView({ behavior: 'smooth' })
          break
      }
    }
  }
}
</script>

<style lang="stylus">
.title-anchor
  position fixed
  right 40px
  z-index 999
  display flex
  flex-direction column
  align-items flex-end
  & li
    display flex
    flex-direction column
    cursor pointer
    align-items flex-end
    // transition transform 0.2s
    &.hover, &.active
      & .title-anchor
        &__line
          width 80px
          background-color #ffec2f
        &__circle
          transform scale(1)
          background-color #ffec2f
  &__txt
    font-size 1.2rem
    width 100px
    line-height 1.33
    text-align right
    padding-top 6px
    padding-bottom 16px
  &__index
    display flex
    align-items center
    justify-content flex-end
    height 28px
  &__circle
    position relative
    width 20px
    height 20px
    border-radius 50%
    background-color #fff
    transform scale(0)
    transition all 0.4s ease-out
    transform-origin right center
    box-shadow 0 2px 4px rgba(#000, 0.5)
  &__line
    width 30px
    height 4px
    background-color #fff
    box-shadow 0 2px 4px rgba(#000, 0.5)
    transition all 0.4s ease-out
.fadeAnchor
  &-enter
    opacity 0
    transform translateX(4px)
  &-enter-active
    transition all 0.4s ease-out
</style>