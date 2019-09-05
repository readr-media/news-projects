<template>
  <div class="background-page background-page--all" ref="backgroundPage">

    <transition name="fadeBgImg">
      <div class="background-page__bg-img full-img"
          :style="{ backgroundImage: `url(/proj-assets/overseastaiwanese/img/background/bg-${bgColor}-lap.png)` }"
          :key="bgColor"
      ></div>
    </transition>
    
    <transition name="fadePerson">
      <div class="background-page__title-wrapper background-page__title-wrapper--main" v-if="idx === 0">
        <h2 class="background-page__title">「我為什麼回來臺灣？」<br>回流青年們的故事</h2>
      </div>
    </transition>

    <transition name="fadePerson">
      <div class="background-page__title-wrapper background-page__title-wrapper--person" :key="id" v-if="idx >= 1">
        <img :src="`/proj-assets/overseastaiwanese/img/person/person${id}.png`" :alt="name"
             :class="[`background-page__person--${id}`, 'background-page__person']">
        <div class="background-page__title">{{ title }}</div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'BackgroundPageAll',
  props: ['persons', 'idx'],
  computed: {
    bgColor () {
      return this.persons[this.idx].bgColor
    },
    id () {
      return this.persons[this.idx].id
    },
    name () {
      return this.persons[this.idx].name
    },
    title () {
      return this.persons[this.idx].title
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.background-page--all
  & .background-page
    &__title-wrapper
      position absolute
      height 100%
      top 0
      width 25%
      display flex
      align-items center
      @media (min-width $lap-breakpoint)
        width 29.17%
      &--main
        justify-content center
      &--person
        flex-direction column
    &__person
      margin-top 92px
      margin-bottom 30px
      width 78.125%
      @media (min-width $lap-breakpoint)
        width 57.14%
        margin-top 100px
        margin-bottom 20px
    &__title
      // width 78.125%
      width 80%
      // font-size 3.0rem
      font-size 2.4rem
      font-weight 500
      text-align center
      line-height normal
      @media (min-width $lap-breakpoint)
        // width 82.86%
        width 84%
        font-size 3.6rem
  & h2
    text-shadow 0 2px 4px rgba(0, 0, 0, 0.5)
    color #f8e71c

.fadeBgImg
  &-enter-active, &-leave-active
    transition opacity 0.8s cubic-bezier(0.77, 0, 0.175, 1)
  &-enter, &-leave-to
    opacity 0
  &-enter-to
    position absolute  

.fadePerson
  &-enter-active
    transition all 0.8s cubic-bezier(0.77, 0, 0.175, 1)
  &-enter
    transform translateX(-40px)
    opacity 0
</style>