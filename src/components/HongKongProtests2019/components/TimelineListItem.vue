<template>
  <li class="list-item">
    <div class="list-item__title-box title-box">
      <div class="title-box__title-texts title-texts">
        <h1 v-text="h1" />
        <h2 v-text="h2" />
      </div>
      <div class="title-box__arrow arrow" />
    </div>
    <figure class="figure">
      <img
        class="figure__img"
        v-lazy="imageUrlProcessed"
        alt=""
      >
      <figcaption
        class="figure__figcapiton"
      >
        <p v-text="imgCaptionProcessed" />
      </figcaption>
    </figure>
  </li>
</template>

<script>
import viewportMixin from '../mixins/viewport'
import { image } from '../utils'
import { truncate } from 'lodash'

export default {
  props: {
    h1: {
      type: String,
      required: true
    },
    h2: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    imgCaption: {
      type: String,
      required: true
    }
  },
  mixins: [
    viewportMixin
  ],
  computed: {
    imageUrlProcessed() {
      return image(this.imgUrl)
        .getResolution('mobile')
    },
    imgCaptionProcessed() {
      let limit
      if (this.vw > 425) {
        if (this.vw <= 1280) {
          limit = 60
        } else {
          limit = 130
        }
      } else if (this.vw > 325) {
        limit = 55
      } else {
        limit = 40
      }
      return truncate(this.imgCaption, { length: limit })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  // min-width 400px
  // min-height 560px
  width 400px
  height 560px
  background-color black
  box-shadow -16px 16px 0px 0px rgba(74,74,74,1)
  position relative
  cursor pointer
  &__title-box
    position absolute
    left -16px
    bottom 30%

.title-box
  width 276px
  height 98px
  border-radius 4px
  background-color #d20640
  padding 12px
  display flex
  align-items center
  justify-content space-between
  &__title-texts
    height 100%
    flex 1 1 auto
    width 0
  &__arrow
    position relative
    right 10px

.title-texts
  display flex
  flex-direction column
  justify-content space-around
  h1
    margin 0
    line-height 1
    font-size 32px
    color white
  h2
    margin 0
    line-height 1
    font-size 21px
    color white

.arrow
  d = 40px
  width d
  height d
  border-right 10px solid white
  border-bottom 10px solid white
  transform rotate(-45deg)

.figure
  margin 0
  height 100%
  color white
  display flex
  flex-direction column
  &__img
    min-width 100%
    // min-height 400px
    min-height 70%
    max-height 70%
    background-color black
    border none
    object-fit cover
  &__figcapiton
    // height 140px
    height 29%
    padding 11px 19px
    p
      margin 0
      font-size 15px
      line-height 1.73
      text-align justify
      word-wrap break-word
      // display -webkit-box
      // -webkit-line-clamp 6
      // -webkit-box-orient vertical
      // overflow hidden

@media (max-width 1280px)
  .list-item
    width 280px
    height 392px

@media (max-width 425px)
  .list-item
    width 90vw
    height calc(65vh - 50px)

  .title-box
    width 87%
    height 25%

  .title-texts
    h1, h2
      line-height 1.25

  // .figure
  //   &__figcapiton
  //     p
  //       -webkit-line-clamp 3

@media (max-width 325px)
  .title-box
    height 35%
</style>