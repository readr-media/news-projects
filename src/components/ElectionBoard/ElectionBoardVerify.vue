<template>
  <section class="eb-verify">
    <div class="image">
      <img src="" alt="">
    </div>
    <div class="form">
      <div class="form__heading">
        <h2>看板資訊</h2>
        <p>此資料已被驗證 3 次</p>
      </div>
      <FormSelectPosition />
      <!-- <template v-for="n in candidateAmount">
        <FormSelectCandidate :key="n"
          :class="{ 'has-minus': n > 1 }"
          :councilorCandidates="councilorCandidates"
          :index="n"
          :mayorCandidates="mayorCandidates"
          :selectedIds="selectedCandidates"
          @minusCandidateAmount="minusSelectCandidate"
          @updateSelectedId="updateSelectedId" />
      </template> -->
      <p class="add-candidate" @click="candidateAmount += 1">新增候選人</p>
      <input type="text" placeholder="請填寫看板標語">
      <div class="action">
        <button class="btn--deny">這不是競選<br>看板照片</button>
        <button class="btn--submit">沒問題<br>送出</button>
      </div>
    </div>
    <VerifyBoards v-if="showVerifyBoards"/>
  </section>
</template>
<script>
import FormSelectCandidate from './FormSelectCandidate.vue'
import FormSelectPosition from './FormSelectPosition.vue'
import VerifyBoards from './VerifyBoards.vue'

export default {
  name: 'ElectionBoardVerify',
  data () {
    return {
      showVerifyBoards: false, // false
    }
  },
  components: {
    FormSelectCandidate,
    FormSelectPosition,
    VerifyBoards
  },
  computed: {
    board () {
      return
    },
    boardImage () {
      return 
    },
    candidates () {
      return 
    },
    candidateAmount () {
      return 1
    },
    county () {
      return 
    },
    district () {
      
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #ffdb5c

.eb-verify
  position relative
  display flex
  flex-direction column
  height 100vh
  background-color #000
  .image
    flex 1
    position relative
    img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      object-fit cover
      object-position center center
  .form
    max-height 60vh
    padding 25px
    overflow-y auto
    > input
      display block
      width 100%
      height 30px
      margin-top .5em
      padding-left .5em
      background-color #a0a0a0
      border none
      border-radius 2px

    &__heading
      display flex
      justify-content space-between
      align-items center
      h2
        margin 0
        color theme-color
        font-size 1rem
      p
        margin 0
        color #a0a0a0
        font-size .875rem
    .add-candidate
      display inline
      margin-top 10px
      color theme-color
      font-size .875rem
      line-height 20px
      &::before
        content '\2795'
        position relative
        top 1px
        height 20px
        margin-right 5px
        color transparent
        text-shadow 0 0 0 theme-color
    .action
      display flex
      justify-content space-between
      margin-top 30px
      > button
        width calc(50% - 5px)
        height 100px
        font-size 1.25rem
        font-weight 500
        line-height 1.4
        border none
        border-radius 2px
      .btn
        &--deny
          background-color #a0a0a0
        &--submit
          background-color #ffdb5c

@media (min-width: 768px)
  .eb-verify
    justify-content center
    padding 55px 0
    .image
      width 450px
      margin 0 auto
      img
        position static
        width 100%
        object-fit contain
    .form
      width 450px
      padding 25px 0
      margin 0 auto
</style>
