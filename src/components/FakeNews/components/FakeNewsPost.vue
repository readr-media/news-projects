<template>
  <div :id="id" :class="[ { 'open-comment': openComment, 'show-content': showContent }, 'post', get(post, 'type') ]">
    <div :id="`${id}-anchor`" class="anchor"></div>
    <div class="post-container">
      <div class="post__content">
        <template v-for="(paragraph, paragraphIndex) in post.content">
          <template v-if="paragraph.html && paragraph.html === 'h2'">
            <h2 :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`" v-html="paragraph.content"></h2>
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'h3'">
            <h3 :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`" v-html="paragraph.content"></h3>
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'p'">
            <p
              :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`"
              :class="[ paragraph.class ? paragraph.class : '' ]"
              v-html="isReadMore && paragraphIndex === 1 && !showContent ? truncate(paragraph.content, { length: 40 }) : paragraph.content">
            </p>
            <span v-if="isReadMore && paragraphIndex === 1 && !showContent" :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}-more`" @click="showContent = true">繼續閱讀</span>
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'img'">
            <img :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`" :src="paragraph.src" :alt="paragraph.alt">
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'video'">
            <video :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`" :poster="paragraph.poster" playsinline controls preload="metadata">
              <source :src="paragraph.src" type="video/mp4">
            </video>
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'slideshow'">
            <FakeNewsSlideshow
              :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`"
              :slideshow="paragraph" />
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'quiz'">
            <FakeNewsQuiz
              :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`"
              :quiz="paragraph" />
          </template>
          <template v-else-if="paragraph.html && paragraph.html === 'annotation'">
            <FakeNewsAnnotation 
            :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`"
            :content="paragraph" />
          </template>
          <template v-else>
            <div :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`" v-html="paragraph"></div>
          </template>
        </template>
        <div v-if="get(post, 'action', true)" v-show="commentAmount > 0" class="comment-amount">
          <img src="/proj-assets/disinformation/like_round.png">
          <span v-text="commentAmount"></span>
        </div>
      </div>
      <div v-if="get(post, 'action', true)" class="post__action">
        <button :class="{ active: hasReacted }" @click="reaction(id)"><img src="/proj-assets/disinformation/like.png" alt="讚"><span>讚</span></button>
        <button @click="handleOpenComment"><img src="/proj-assets/disinformation/comment.png" alt="回應"><span>回應</span></button>
        <button :class="{ active: openShare }" @click="handleOpenShare"><img src="/proj-assets/disinformation/share.png" alt="分享"><span>分享</span></button>
      </div>
    </div>
    <div v-if="get(post, 'action', true)" :class="[ { open: openShare }, 'share' ]">
      <button class="fb" @click="shareToFacebook">Facebook</button>
      <button class="line" @click="shareToLine">LINE</button>
      <button class="url" @click="copyUrlToClipboard">拷貝連結<span>複製成功</span></button>
    </div>
    <div v-if="mounted && get(post, 'action', true)" v-show="openComment" class="comment">
      <div class="fb-comments" data-href="https://www.readr.tw/project/disinformation" data-numposts="5" data-width="100%"></div>
    </div>
  </div>
</template>
<script>
import FakeNewsAnnotation from './FakeNewsAnnotation.vue'
import FakeNewsQuiz from './FakeNewsQuiz.vue'
import FakeNewsSlideshow from './FakeNewsSlideshow.vue'
import { READR_SITE_URL } from '../../../constants'
import { get, truncate } from 'lodash'

export default {
  name: 'FakeNewsPost',
  components: {
    FakeNewsAnnotation,
    FakeNewsQuiz,
    FakeNewsSlideshow
  },
  props: {
    id: {
      type: String
    },
    isReadMore: {
      type: Boolean,
      default: false
    },
    chapterIndex: {
      type: Number
    },
    commentsReacted: {
      type: Array
    },
    post: {
      type: Object
    },
    postIndex: {
      type: Number
    }
  },
  data () {
    return {
      mounted: false,
      openComment: false,
      openShare: false,
      showContent: false
    }
  },
  computed: {
    commentAmount () {
      return this.$store.state.FakeNews.comments[this.id] || 0
    },
    hasReacted () {
      const item = this.commentsReacted.find(id => id === this.id) || []
      return item.length > 0
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    copyUrlToClipboard (e) {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href
      document.body.appendChild(textArea);
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      e.target.classList.add('show')
      setTimeout(() => { e.target.classList.remove('show') }, 2000)
    },
    get,
    handleOpenComment () {
      this.openShare = false
      this.openComment = !this.openComment
    },
    handleOpenShare () {
      this.openComment = false
      this.openShare = !this.openShare
    },
    reaction (id) {
      this.$emit('reaction', id)
      window.ga && window.ga('send', 'event', 'projects', 'click', `reaction ${id}`, { nonInteraction: false })
    },
    shareToFacebook () {
      window.open(`https://www.facebook.com/share.php?u=${READR_SITE_URL}disinformation`)
      window.ga && window.ga('send', 'event', 'projects', 'click', `share to fb`, { nonInteraction: false })
    },
    shareToLine () {
      window.open(`https://line.me/R/msg/text/?${READR_SITE_URL}disinformation`)
      window.ga && window.ga('send', 'event', 'projects', 'click', `share to line`, { nonInteraction: false })
    },
    truncate
  }
}
</script>
<style lang="stylus" scoped>
.post
  position relative
  h2, h3, p, img, .annotation
    & + *
      margin-top 1em
  h2
    color #032669
  >>> a
    color #4868a5
    text-decoration none
  &.quiz
    .post-container
      background-color #dddfe2
    .post__content
      padding 0 !important
  &.read-more
    .post__content
      > h3, > p, > div, > img
        display none
      > h2
        margin-bottom 15px
      > p:first-of-type
        display inline
      span
        color #4868A5
        font-size .9375rem
        cursor pointer
  &.show-content
    .post__content
      > h3, > p, > div, > img
        display block !important
  &-container
    position relative
    background-color #fff
    border 1px solid #dddfe2
    border-left none
    border-right none
    > div
      padding .5em
  
  &__content
    padding 1em 1em .5em !important
    div + div
      margin-top 1em
    >>> img, >>> video
      width 100%
    >>> .flourish-credit
      display none !important
    
  &__action
    display flex
    width calc(100% - 2em)
    margin 0 auto
    padding .2em 0 !important
    background-color #fff
    border-top 1px solid #dddfe2
    > button
      flex 1
      display flex
      justify-content center
      align-items center
      padding .4em 0
      margin 0 .4em
      &:hover, &.active
        background-color rgba(204, 208, 213, .3)
        border-radius 6px
      img
        width 20px
        height 20px
      span
        margin 0 0 0 .2em
        line-height 20px
        vertical-align super
  .share
    position relative
    display none
    flex-direction column
    &::before
      position absolute
      content ''
      top -9px
      right 16.5%
      width 0
      height 0
      border-style solid
      border-width 0 5px 8.7px 5px
      border-color transparent transparent #4868a5
    &.open
      display flex
    > button
      flex 1
      padding .8em 0
      color #4a4a4a
      background-color #ccd0d5
      &.fb
        color #fff
        background-color #4868a5
      &.line
        color #fff
        background-color #2c9042
      &.url
        position relative
        > span
          position absolute
          top 50%
          right -25px
          transform translateY(-50%)
          width 70px
          padding .2em 0
          background-color #fff
          border-radius 4px
          visibility hidden
        &.show
          > span
            visibility visible
            animation popup 2s forwards
  .comment
    width 100%
    background-color #fff
    border 1px solid #dddfe2
    border-top none
    &-amount
      display flex
      align-items center
      img
        width 20px
        height 20px
      span
        margin 0 0 0 .2em
        color #4a4a4a
        font-size .8125rem
  .anchor
    position absolute
    top -40px
    left 0
    visibility hidden
@keyframes popup {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@media (min-width: 1024px)
  .post
    &.open-comment
      .post-container
        border-radius 4px 4px 0 0
    &-container
      border-left 1px solid #dddfe2
      border-right 1px solid #dddfe2
      border-radius 4px
    &__content
      >>> .chart-9
        display flex
        align-items flex-start
        img
          width 50%
          & + img
            margin-left 5px
    .share
      flex-direction row
      margin-top 10px
      &::before
        border-color transparent transparent #ccd0d5
      > button
        &.fb
          border-radius 4px 0 0 4px
        &.url
          border-radius 0 4px 4px 0
</style>
