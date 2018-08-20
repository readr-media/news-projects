<template>
  <div class="promise">
    <div :class="[ 'promise__order', `promise__order--${order}` ]" v-text="order"></div>
    <blockquote class="blockquote">
      <div class="blockquote__title-container">
        <h1 :class="[ 'blockquote__title', `blockquote__title--${order}` ]" v-text="title"></h1>
        <AppTagPromise v-if="isPromiseDone"/>
      </div>
      <p class="blockquote__description" v-text="description"></p>
      <a class="blockquote__cite" :href="citeLinkSrc" target="_blank" v-text="citeDescription"></a>
    </blockquote>
  </div>
</template>

<script>
import AppTagPromise from './AppTagPromise.vue'

export default {
  props: {
    order: {
      type: Number,
      reqiured: true,
    },
    title: {
      type: String,
      reqiured: true,
    },
    description: {
      type: String,
      reqiured: true,
    },
    citeDescription: {
      type: String,
      reqiured: true,
    },
    citeLinkSrc: {
      type: String,
      reqiured: true,
    },
    isPromiseDone: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppTagPromise,
  }
}
</script>

<style lang="stylus" scoped>
.promise
  display flex
  margin 48px 0
  &__order
    font-size 100px
    line-height .8
    min-width 90px
    max-width 90px
    display flex
    -webkit-text-stroke 3px white
    color transparent
    &--1
      -webkit-text-stroke 3px #fa8d62
    &--2
      -webkit-text-stroke 3px #ffc1a9
    &--3
      -webkit-text-stroke 3px #ffc1a9

.blockquote
  display flex
  flex-direction column
  align-items flex-end
  margin 0
  &__title-container
    margin 0 0 34px 0
    align-self flex-start
    display flex
  &__title
    align-self flex-start
    font-size 24px
    font-weight 400
    line-height 1.42
    text-align justify
    color #ffffff
    margin 0 27px 0 0
    &--1
      color #fa8d62
    &--2
      color #ffc1a9
    &--3
      color #ffc1a9
  &__description
    font-size 18px
    line-height 1.44
    text-align justify
    color #c9c9c9
    margin 0 0 26px 0
  &__cite
    font-size 18px
    color #c9c9c9

@media (max-width 425px)
  .promise
    margin 34px 0 30px 0
    &__order
      font-size 50px
      line-height .9
      min-width 45px
      max-width 45px
  .blockquote
    &__title-container
      margin 0 0 19px 0
      flex-direction column
    &__title
      font-size 22px
      line-height 1.36
      margin 0 0 19px 0
    &__description
      font-size 16px
      line-height 1.5
      margin 0 0 15px 0
    &__cite
      font-size 14px
</style>

