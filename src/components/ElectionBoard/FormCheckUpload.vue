<template>
  <div class="check-upload">
    <div class="check-upload__info">
      <div class="action-conteiner">
        <div class="boards">
          <div class="boards-container" :style="{ width: `${boards.length * 100}%`, transform: `translateX(${-(100 / boards.length) * current}%)` }">
            <div v-for="(item, index) in boards" :key="`board-${item.id}`" class="board">
              <div class="board__img">
                <figure>
                  <img :src="`http://www.readr.tw${item.image}`" alt="">
                </figure>
              </div>
              <div class="board__info">
                <h2>已存在之照片 {{ index + 1 }}</h2>
                <p>候選人： {{ getCandidatesName(item.candidates) }}</p>
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
      <div class="board">
        <div class="board__img">
          <figure >
            <img :src="`http://www.readr.tw${imgURL}`" alt="">
          </figure>
        </div>
        <div class="board__info">
          <h2>您欲上傳之照片</h2>
          <p>候選人：{{ selectedCandidatesName }}</p>
          <p>地點：{{ address }}</p>
        </div>
      </div>
    </div>
    <div class="check-upload__action">
      <div class="action-text">我們在同一個地點發現其他人上傳過的照片，請問這是同一張嗎？</div>
      <div class="action-btns">
        <button class="btn--cancel" @click="$emit('cancelUpload')">是同一張<span>，</span><br>取消上傳</button>
        <button class="btn--upload" @click="$emit('confirmUpload')">我不確定<span>，</span><br>還是上傳</button>
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
    councilorCandidates: {
      type: Array,
    },
    imgURL: {
      type: String,
    },
    mayorCandidates: {
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
      return this.mayorCandidates.concat(this.councilorCandidates)
    },
    selectedCandidatesName () {
      return this.candidates
        .filter(candidate => this.selectedCandidates.includes(candidate.id))
        .map(candidate => candidate.name)
        .join('、')
    }
  },
  methods: {
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
  height 100%
  background-color theme-color
  &__info
    flex 1
    position relative
    display flex
    flex-direction column
    padding 25px 0
    background-color #000
    > .board
      width calc(100% - 50px)
      margin 0 auto
    .action-conteiner
      flex 1
      position relative
      margin-bottom 5px
    .board
      flex 1
      display flex
      justify-content space-between
      align-items flex-start
      margin-top 5px
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
        margin-left 20px
        h2
          margin 0 0 5px 0
          color theme-color
          font-size 1rem
          font-weight 500
        p
          font-size .875rem
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
      line-height 1.4
      text-align justify
    .action-btns
      justify-content space-between
      margin 10px auto 0
      button
        width calc(50% - 5px)
        height 100px
        font-size 1.25rem
        font-weight 500
        line-height 1.4
        border none
        border-radius 2px
        > span
          display none
      .btn--cancel
        color #000
        background-color #a0a0a0
      .btn--upload
        color #fff
        background-color #000

@media (min-width: 768px)
  .check-upload
    &__info
      justify-content center
      .action-conteiner
        flex none
        width 550px
        margin 0 auto 40px auto
      .board
        flex none
        align-items center
        width 450px
        margin 0 auto
        &__info
          margin-left 40px
          h2
            margin-bottom 15px
            font-size 1.25rem
          p
            font-size 1rem
      .boards
        width 450px
    &__action
      justify-content center
      > *
        flex none
      .action-text
        width 450px
        margin 0 auto
      .action-btns
        width 450px
        margin 60px auto 0
        button
          height 50px
          > span
            display inline
          > br
            display none
</style>
