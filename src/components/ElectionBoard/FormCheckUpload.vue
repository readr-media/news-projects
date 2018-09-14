<template>
  <div class="check-upload">
    <div class="check-upload__info">
      <div class="board">
        <figure class="board__img">
          <img src="" alt="">
        </figure>
        <div class="board__info">
          <h2>已存在之照片</h2>
          <p>候選人：</p>
          <p>地點：</p>
        </div>
      </div>
      <div class="board">
        <figure class="board__img">
          <img :src="imgURL" alt="">
        </figure>
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
  computed: {
    candidates () {
      return this.mayorCandidates.concat(this.councilorCandidates)
    },
    selectedCandidatesName () {
      return this.candidates
        .filter(candidate => this.selectedCandidates.includes(candidate.uid))
        .map(candidate => candidate.name)
        .join('、')
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
  height 100vh
  background-color theme-color
  &__info
    flex 6
    display flex
    flex-direction column
    padding 25px
    background-color #000
    .board
      flex 1
      display flex
      justify-content space-between
      align-items flex-start
      > *
        flex 1
      &__img
        position relative
        margin 0
        &::after
          content ''
          position absolute
          top 0
          width 100%
          padding-top 100%
        img
          display block
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          width 100%
          padding-top 100%
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
  &__action
    flex 4
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
      .board
        flex none
        width 450px
        margin 0 auto
        & + .board
          margin-top 40px
    &__action
      justify-content center
      padding 0
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
