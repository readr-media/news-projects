<template>
  <div class="background-page background-page--one" ref="backgroundPage">
    <div class="background-page__bg-img full-img" :style="{ backgroundImage: `url(/proj-assets/overseastaiwanese/img/background/bg-${person.bgColor}-mob.png)` }"></div>
    <img :src="`/proj-assets/overseastaiwanese/img/person/person${person.id}-blur.png`" :alt="person.name"
         :class="[`background-page__person--${person.bgColor}`, 'background-page__person']"
    >

    <transition name="fadeBgTitle">
      <img :src="`/proj-assets/overseastaiwanese/img/person/person${person.id}.png`" :alt="person.name"
           v-show="isAnotherPage"
           :class="[`background-page__person--${person.bgColor}`, 'background-page__person']"
      >
    </transition>
    <transition name="fadeBgTitle">
      <div class="background-page__title" v-if="isAnotherPage">{{ person.title }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BackgroundPage',
  props: ['person', 'wEl'],
  data () {
    return {
      isAnotherPage: false
    }
  },
  mounted () {
    this.wEl.addEventListener('scroll', this.clarifyBackgroundPage)
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
      width 190px
      top 90px
      left 20px
    &--pink
      width 275px
      top 65px
      left -2px
  &__title
    position absolute
    font-size 3.6rem
    left 25px
    bottom 20px
    line-height 1.2
    width 225px

.fadeBgTitle
  &-enter-active
    transition opacity 0.8s cubic-bezier(0.77, 0, 0.175, 1)
  &-enter
    opacity 0
</style>