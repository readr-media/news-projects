<template>
  <div class="background-page background-page--one" ref="backgroundPage">
    <div class="background-page__bg-img full-img" :style="{ backgroundImage: `url(/proj-assets/img/background/bg-${person.bgColor}-mob.png)` }"></div>
    <img :src="`/proj-assets/img/person/person${person.id}-blur.png`" :alt="person.name"
         :class="[`background-page__person--${person.bgColor}`, 'background-page__person']"
    >
    <!-- <transition name="clarify"> -->
    <transition name="fadeTitle">
      <img :src="`/proj-assets/img/person/person${person.id}.png`" :alt="person.name"
           v-if="isAnotherPage"
           :class="[`background-page__person--${person.bgColor}`, 'background-page__person']"
      >
    </transition>
    <transition name="fadeTitle">
      <div class="background-page__title" v-if="isAnotherPage">{{ person.title }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BackgroundPage',
  props: ['person'],
  data () {
    return {
      isAnotherPage: false
    }
  },
  beforeMount () {
    this.wEl.addEventListener('scroll', this.clarifyBackgroundPage)
  },
  computed: {
    wEl () {
      return this.$parent.wEl
    }
  },
  methods: {
    clarifyBackgroundPage () {
      if (this.$refs.backgroundPage.classList.contains('fixed')) {
        this.isAnotherPage = true
        this.wEl.removeEventListener('scroll', this.clarifyBackgroundPage)
      }
    }
  },
  beforeDestroy () {
    this.wEl.removeEventListener('scroll', this.clarifyBackgroundPage)
  },
}
</script>

<style lang="stylus">
.background-page--one .background-page
  &__person
    position absolute
    &--green
      // width 189px
      width 190px
      // top 53px
      top 90px
      // left 19px
      left 20px
    &--pink
      // width 274px
      width 275px
      // top 36px
      top 65px
      left -2px
  &__title
    position absolute
    // background-color #fff
    font-size 3.6rem
    left 25px
    bottom 21px
    line-height 1.17
    width 225px

.fadeTitle
  &-enter-active
    // transition opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)
    transition opacity 0.8s cubic-bezier(0.77, 0, 0.175, 1)
    // easeOutQuad
    // transition opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
  &-enter
    opacity 0
</style>