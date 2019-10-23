<template>
  <!-- todo 篩選年份 -->
  <div class="check-upload">
    <div class="check-upload__info">
      <div class="action-conteiner">
        <div class="boards">
          <div class="boards-container" :style="{ width: `${boards.length * 100}%`, transform: `translateX(${-(100 / boards.length) * current}%)` }">
            <div v-for="(item, index) in boards" :key="`board-${item.id}`" class="board">
              <div class="board__img">
                <figure>
                  <img :src="`http://www.readr.tw${item.image}`" alt="">
                  <!-- <img src="https://attach.setn.com/newsimages/2018/03/11/1277743-PH.jpg" alt=""> -->
                </figure>
              </div>
              <div class="board__info">
                <h2>已存在的照片 {{ index + 1 }}</h2>
                <p>候選人：{{ getCandidatesName(item.candidates) }}</p>
                <p>地點：{{ `${item.county}市${item.district}區${item.road}` }}</p>
              </div>
            </div>
          </div>
        </div>
        <button v-show="current > 0" class="boards__btn previous" @click="goPrevious">
          <img src="/proj-assets/election-board/images/next.png" alt="前一張">
        </button>
        <button v-show="current < boards.length - 1" class="boards__btn next" @click="goNext">
          <img src="/proj-assets/election-board/images/next.png" alt="下一張">
        </button>
      </div>
      <div class="board user">
        <div class="board__img">
          <figure >
            <img :src="`http://www.readr.tw${imgURL}`" alt="">
            <!-- <img src="https://attach.setn.com/newsimages/2018/03/11/1277743-PH.jpg" alt=""> -->
          </figure>
        </div>
        <div class="board__info">
          <h2>您將上傳的照片</h2>
          <p>候選人：{{ selectedCandidatesName }}</p>
          <p>地點：{{ address }}</p>
        </div>
      </div>
    </div>
    <div class="check-upload__action">
      <div class="action-text">我們在同一個地點發現其他人上傳過的照片，請問這是同一張嗎？</div>
      <div class="action-btns">
        <button class="btn--cancel" @click="cancel">是同一張<span>，</span><br>取消上傳</button>
        <button class="btn--upload" @click="confirm">我不確定<span>，</span><br>還是上傳</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormCheckUpload',
  props: {
    address: {
      type: String,
    },
    legislatorCandidates: {
      type: Array,
    },
    imgURL: {
      type: String,
    },
    presidentCandidates: {
      type: Array,
    },
    selectedCandidates: {
      type: Array,
    }
  },
  data () {
    return {
      current: 0
    }
  },
  computed: {
    boards () {
      return this.$store.state.ElectionBoard.boards
    },
    candidates () {
      return this.presidentCandidates.concat(this.legislatorCandidates)
    },
    selectedCandidatesName () {
      return this.candidates
        .filter(candidate => this.selectedCandidates.includes(candidate.id))
        .map(candidate => candidate.name)
        .join('、')
    }
  },
  methods: {
    cancel () {
      this.$emit('cancelUpload')
      window.ga('send', 'event', 'projects', 'click', 'upload photo repeat cancelled')
    },
    confirm () {
      this.$emit('confirmUpload')
      window.ga('send', 'event', 'projects', 'click', 'upload photo repeat confirmed')
    },
    getCandidatesName (candidates) {
      return candidates.map(candidate => candidate.name).join('、')
    },
    goNext () {
      if (this.current < this.boards.length - 1) {
        this.current += 1
      }
    },
    goPrevious () {
      if (this.current > 0) {
        this.current -= 1
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #fa6e59
.check-upload
  display flex
  flex-direction column
  position absolute
  top 0
  left 0
  right 0
  z-index 1000
  width 100%
  // height 100%
  min-height 100%
  background-color theme-color
  &__info
    flex 1
    position relative
    display flex
    flex-direction column
    // padding 40px 0
    background-color #000
    // justify-content space-between
    justify-content center
    padding-top 25px
    padding-bottom 25px
    > .board
      width calc(100% - 50px)
      margin 0 auto
    .action-conteiner
      // flex 1
      position relative
      margin-bottom 30px
    .board
      flex 1
      display flex
      justify-content space-between
      align-items flex-start
      // margin-top 5px
      &.user
        flex none
      > *
        width 50%
        max-height 100%
        overflow hidden
      &__img
        figure
          position relative
          width 100%
          margin 0
          padding-top 100%
          img
            display block
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
            object-fit cover
            object-position center center
      &__info
        margin-left 15px
        h2
          margin 0 0 8px 0
          color theme-color
          font-size 1rem
          font-weight 700
        p
          font-size .875rem
          line-height 1.64
    .boards
      position relative
      width calc(100% - 50px)
      height 100%
      margin 0 auto
      overflow hidden
      &-container
        display flex
        height 100%
      &__btn
        position absolute
        top 50%
        transform translateY(-50%)
        background-color transparent
        border none
        outline none
        img
          width 20px
        &.previous
          left 0
          img
            transform rotate(-180deg)
        &.next
          right 0
  &__action
    display flex
    flex-direction column
    padding 25px 0
    > *
      flex 1
      display flex
      width calc(100% - 50px)
    .action-text
      justify-content center
      align-items center
      margin 0 auto
      color #000
      font-size 1.25rem
      font-weight 500
      line-height 1.64
      // text-align justify
    .action-btns
      justify-content space-between
      margin 20px auto 0
      button
        width calc(50% - 7px)
        height 96px
        font-size 1.25rem
        font-weight 700
        line-height 1.4
        border none
        border-radius 2px
        padding 0
        cursor pointer
        > span
          display none
      .btn--cancel
        color #000
        background-color #a0a0a0
      .btn--upload
        color #fff
        background-color #000

@media (min-width: 576px)
  .check-upload
    &__info
      // justify-content center
      // padding-top 55px
      // padding-bottom 55px
      .action-conteiner
        flex none
        width 550px
        margin 0 auto 40px auto
      .board
        flex none
        // align-items center
        width 450px
        margin 0 auto
        &__info
          margin-left 25px
          h2
            margin-bottom 20px
            font-size 1.25rem
          p
            font-size 1rem
      .boards
        width 450px
    &__action
      justify-content center
      padding-top 35px
      padding-bottom 35px
      > *
        flex none
      .action-text
        width 450px
        margin 0 auto
      .action-btns
        width 450px
        margin 25px auto 0
        button
          height 48px
          // border-radius 6px
          line-height 48px
          width calc(50% - 10px)
          > span
            display inline
          > br
            display none
@media (min-width: 768px)
  .check-upload__action .action-btns button
    border-radius 6px
</style>
