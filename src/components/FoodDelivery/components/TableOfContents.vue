<template>
  <section class="table-of-contents">
    <TheUser :order="contents.length" />
    <nav>
      <ul>
        <li v-for="(content, idx) in contents" :key="content.id" :class="{ top: idx === 0 }">
          <div class="table-of-contents__num">
            <MapMarker :num="content.id" />
          </div>
          <div class="table-of-contents__text">
            <p class="table-of-contents__title">{{ content.title }}</p>
            <p class="table-of-contents__time">預估時間：{{ content.time }}</p>
          </div>
          <!-- <div class="table-of-contents__arrow"> -->
          <img class="table-of-contents__arrow" src="/proj-assets/food-delivery/img/enter.svg" alt="">
          <!-- </div> -->
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import TheUser from './TheUser.vue'
import MapMarker from './MapMarker.vue'

export default {
  name: 'TableOfContents',
  components: {
    TheUser,
    MapMarker
  },
  data () {
    return {
      contents: [
        {
          id: 1,
          title: '外送業的難題',
          time: '02 : 30'
        },
        {
          id: 2,
          title: '我要如何成為外送員？',
          time: '05 : 15'
        },
        {
          id: 3,
          title: '市場龍頭大戰：開拓店家',
          time: '07 : 56'
        },
        {
          id: 4,
          title: '消費者促銷優惠',
          time: '06 : 38'
        },
        {
          id: 5,
          title: '為了賺更多錢剝削外送員',
          time: '04 : 40'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.table-of-contents
  background-image url(/proj-assets/food-delivery/img/map.jpg)
  background-size cover
  background-position center
  background-repeat no-repeat
  // min-height 100vh
  &__num
    width 25.42px
    height 35.8px
    margin-right 10px
  &__text
    color #4a4a4a
    line-height normal
  &__title
    font-size 1.8rem
  &__time
    font-size 1.4rem
  &__arrow
    width 20px
    margin-left auto
  // & ul
  //   padding-top 10px
  //   padding-left 10px
  //   padding-right 20px
  //   background-color #ffdc03
  //   border-top-left-radius 24px
  //   border-top-right-radius 24px
  & li
    background-color #ffdc03
    padding-left 10px
    padding-right 20px
    padding-top 10px
    padding-bottom 10px
    display flex
    align-items center
    cursor pointer
    &.top
      padding-top 20px
      border-top-left-radius 24px
      border-top-right-radius 24px
    &:hover
      background-color #ffec78
      & .table-of-contents__text
        font-weight 500
        color #000
      & .marker-color
        fill #000
</style>