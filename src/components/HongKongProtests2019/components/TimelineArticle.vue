<template>
  <article>
    <header>
      <h1 v-text="h1" />
      <h2 v-text="h2" />
    </header>
    <section>
      <img
        v-lazy="imageUrlProcessed"
        alt=""
      >
      <div class="description-wrapper">
        <p v-html="description" />
      </div>
    </section>
  </article>
</template>

<script>
import { image } from '../utils'

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
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    imageUrlProcessed() {
      return image(this.imgUrl)
        .getResolution('mobile')
    }
  }
}
</script>

<style lang="stylus" scoped>
article
  color white

header
  border-left 8px solid #d20640
  padding 0 0 0 10px
  height 142px
  position relative
  z-index 2

h1
  font-size 58px
  line-height .9
  margin 0

h2
  font-size 32px
  line-height 1
  margin 20px 0 0 0

section
  position relative
  top -20px
  z-index 1

img
  width 100%
  height 408px
  object-fit cover

p
  font-size 15px
  line-height 1.73
  text-align justify

@media (max-width 1024px)
  header
    height 120px
    padding 0 0 0 20px

  h1
    font-size 32px
    line-height 1

  h2
    font-size 21px
    margin 10px 0 0 0

  section
    top -40px

  img
    height 64vw

  .description-wrapper
    padding 0 20px
</style>