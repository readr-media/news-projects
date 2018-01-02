<template>
  <div :class="[ 'story-chapter-menu', `story-chapter-menu--story${index}` ]">
    <h2>延伸閱讀</h2>
    <ol class="menu">
      <a v-for="(chapter, chapterIndex) in 5"
         :class="[ {'prev': chapterIndex + 1 < index}, {'current': chapterIndex + 1 === index}, {'next': chapterIndex + 1 === index + 1}, {'next-of-next': chapterIndex + 1 === index + 2}, `story${chapterIndex + 1}` ]"
         :href="`/project/newtype/story${chapterIndex + 1}?single=true`"
         @click="clickChapter(chapterIndex)"
         target="_blank">
        <img :src="`/proj-assets/newtype/images/chapter-menu/${chapterIndex + 1}.jpg`" alt="">
        <div>
          <p class="ordering" v-if="chapterTitle[chapterIndex].ordering">{{ chapterTitle[chapterIndex].ordering }}</p>
          <p class="chapter-title">{{ chapterTitle[chapterIndex].title }}</p>
        </div>
      </a>
    </ol>
  </div>
</template>

<script>
export default {
  props: [ 'index' ],
  data () {
    return {
      chapterTitle: [
        {
          ordering: '個案故事一：',
          title: '聽不懂放假的小學生'
        },
        {
          ordering: '個案故事二：',
          title: '跨國新二代的兩人三腳大作戰'
        },
        {
          title: '什麼是華語補救教學？'
        },
        {
          ordering: '個案故事三：',
          title: '我是台灣人，我想學好中文'
        },
        {
          title: '從華語補救看台灣人才政策'
        },
      ]
    }
  },
  methods: {
    clickChapter (chapterIndex) {
      if (chapterIndex + 1 === 1) {
        ga('send', 'event', 'projects', 'click', 'link_story1', { nonInteraction: false })
      } else if (chapterIndex + 1 === 2) {
        ga('send', 'event', 'projects', 'click', 'link_story2', { nonInteraction: false })
      } else if (chapterIndex + 1 === 3) {
        ga('send', 'event', 'projects', 'click', 'link_story3', { nonInteraction: false })
      } else if (chapterIndex + 1 === 4) {
        ga('send', 'event', 'projects', 'click', 'link_story4', { nonInteraction: false })
      } else if (chapterIndex + 1 === 5) {
        ga('send', 'event', 'projects', 'click', 'link_story5', { nonInteraction: false })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.story-chapter-menu
  display flex
  flex-direction column
  justify-content center
  align-items center
  // width 60%
  width 850px
  &--story1
    h2
      color #706156 !important
  &--story2
    h2
      color #567067 !important
  &--story3
    h2
      color black !important
  &--story4
    h2
      color #364d77 !important
  &--story5
    h2
      color black !important
  ol
    list-style-type none
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 100%
    background-color white
    // padding 5% 10%
    padding 0
    a
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      width 100%
      padding 1em 15%
      text-decoration none
      &:first-of-type
        padding-top 2em
      &:last-of-type
        padding-bottom 2em
      img
        transition transform .25s
      div
        p
          color #606060 !important
          font-weight 500 !important
          line-height 1 !important
      &:hover
        img
          transform scale(1.1)
      &.current
        background-color white
        filter brightness(70%)
        padding-bottom 2em
      &.next
        position relative
        justify-content center
        background-image url(/proj-assets/newtype/images/story1/parallax.jpg)
        background-size 100% auto
        background-position center center
        background-repeat no-repeat
        height 300px
        transition background-size .25s
        &.story1
          background-image url(/proj-assets/newtype/images/chapter-menu/1.jpg)
        &.story2
          background-image url(/proj-assets/newtype/images/chapter-menu/2.jpg)
        &.story3
          background-image url(/proj-assets/newtype/images/chapter-menu/3.jpg)
        &.story4
          background-image url(/proj-assets/newtype/images/chapter-menu/4.jpg)
        &.story5
          background-image url(/proj-assets/newtype/images/chapter-menu/5.jpg)
        &:hover
          background-size 110% auto
        img
          display none
        div
          padding-left 0
          p
            color white !important
            text-shadow 2.3px 2px 4.7px rgba(0, 0, 0, 0.25)
      &.next-of-next
        padding-top 2em
      div
        padding-left 2em
      img
        width 40%

@media (max-width: 767px)
  .story-chapter-menu
    width 100%
    ol
      a
        padding 0 !important
        &.next
          height 150px
          &:hover
            background-size 100% auto
        div
          padding-left 1em
          p
            line-height 1.25
            margin .5em 0
        &:hover
          img
            transform none
</style>


