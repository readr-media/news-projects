<template>
  <section class="eb-verify">
    <div class="image">
      <img :src="boardImage" alt="">
    </div>
    <div class="form">
      <div class="form__heading">
        <h2>看板資訊</h2>
        <p>此資料已被驗證 {{ board.verifiedAmount || 0 }} 次</p>
      </div>
      <p v-show="errors.includes('empty')" class="error">請填寫候選人資訊</p>
      <template v-for="n in candidateAmount">
        <VerifyInputCandidate
          :key="n"
          :board="board"
          :candidate="n <= candidateAmountOrigin ? candidatesOrigin[n - 1] : undefined "
          :candidates="candidates"
          :index="n"
          :selectedCandidates="selectedCandidates"
          class="form__candidate"
          @updateSelectedId="updateSelectedCandidates" />
      </template>
      <p class="add-candidate" @click="candidateAmount += 1">新增候選人</p>
      <input v-model="slogan" type="text" placeholder="請填寫看板標語">
      <p>目前資訊： {{ board.slogan || ' ' }}</p>
      <p v-show="!boardID && !hasError" class="error error--board">取得看板資訊中，請稍後...</p>
      <p v-if="hasError" class="error error--board">系統發生錯誤，請重新整理或稍後再試...</p>
      <button :disabled="!boardID && loading" class="btn--yellow" @click="uploadBoardVerified(true)">沒問題送出</button>
      <div class="action">
        <button :disabled="!boardID && loading" class="btn--grey" @click="uploadBoardVerified(false)">這不是競選<br>看板照片</button>
        <button :disabled="loading" class="btn--grey" @click="skipBoard">跳過</button>
      </div>
    </div>
    <VerifyBoards v-if="showVerifyBoards" @closeVerifyBoards="showVerifyBoards = false"/>
    <ElectionBoardBackBtn />
  </section>
</template>
<script>
import ElectionBoardBackBtn from './ElectionBoardBackBtn.vue'
import FormSelectCandidate from './FormSelectCandidate.vue'
import FormSelectPosition from './FormSelectPosition.vue'
import VerifyBoards from './VerifyBoards.vue'
import VerifyInputCandidate from './VerifyInputCandidate.vue'
import axios from 'axios'
import { get, } from 'lodash'

const DEFAULT_PAGE = 1

const fetchBoard = (store, {
  skipBoard,
  uploadedBy
} = {}) => store.dispatch('ElectionBoard/FETCH_BOARD_FOR_VERIF', {
  skipBoard,
  uploadedBy
})

const fetchBoards = (store, {
  uploadedBy,
  page = DEFAULT_PAGE,
} = {}) => {
  return store.dispatch('ElectionBoard/FETCH_BOARDS', {
    uploadedBy,
    page: page,
    maxResults: 6,
  })
}

export default {
  name: 'ElectionBoardVerify',
  components: {
    ElectionBoardBackBtn,
    FormSelectCandidate,
    FormSelectPosition,
    VerifyBoards,
    VerifyInputCandidate
  },
  data () {
    return {
      candidateAmount: 1,
      errors: [],
      hasError: false,
      selectedCandidates: [],
      showVerifyBoards: false,
      slogan: '',
      loading: false
    }
  },
  computed: {
    board () {
      return this.$store.state.ElectionBoard.boardForVerif
    },
    boardID () {
      return get(this.board, 'id')
    },
    boardImage () {
      return this.board.image
    },
    candidateAmountOrigin () {
      return get(this.board, 'candidates.length', 0) || 0
    },
    candidates () {
      return this.mayorCandidates.concat(this.councilorCandidates)
    },
    candidatesOrigin () {
      return get(this.board, 'candidates', []) || []
    },
    councilorCandidates () {
      return this.$store.state.ElectionBoard.candidatesForVerif.councilors || []
    },
    mayorCandidates () {
      return this.$store.state.ElectionBoard.candidatesForVerif.mayors || []
    },
  },
  watch: {
    board (value) {
      this.errors = []
      this.selectedCandidates = []
      this.slogan = ''
      this.candidateAmount = get(value, 'candidates.length', 1) || 1
    },
    candidateAmountOrigin (value) {
      if (this.candidateAmount < value) {
        this.candidateAmount = value
      }
    },
  },
  beforeMount () {
    Promise.all([
      fetchBoard(this.$store, { uploadedBy: this.$store.state.ElectionBoard.userID }),
    ])
    .catch(err => {
      this.hasError = true
    })
  },
  methods: {
    buildRequestBody (isBoard) {
      const body = {
        board: this.boardID,
        createdBy: this.$store.state.ElectionBoard.userID,
        isBoard: isBoard
      }

      if (isBoard) {
        body.candidates = this.selectedCandidates
        if (this.slogan) {
          body.slogan = this.slogan
        }
      }
      return body
    },
    skipBoard () {
      this.loading = true
      fetchBoard(this.$store, { skipBoard: this.boardID, uploadedBy: this.$store.state.ElectionBoard.userID })
      .then(res => {
        this.loading = false
      })
      .catch(err => {
        this.hasError = true
      })
    },
    // updateInputError (index, value) {
    //   if (value) {
    //     this.errors.push(`input-${index}`)
    //   } else {
    //     const errorsIndex = this.errors.findIndex((value, index, arr) => value === `input-${index}`)
    //     if (index > -1) {
    //       this.errors.splice(errorsIndex, 1)
    //     }
    //   }
    // },
    updateSelectedCandidates (newValue, oldValue) {
      if (oldValue) {
        const index = this.selectedCandidates.findIndex((value, index, arr) => value === oldValue)
        if (index > -1) {
          this.selectedCandidates.splice(index, 1)
        }
      }
      if (newValue) {
        this.selectedCandidates.push(newValue)
      }
    },
    uploadBoardVerified (isBoard) {
      const body = this.buildRequestBody(isBoard)
      
      axios.get('/project-api/token')
      .then(response => {
        const token = response.data.token
        if (isBoard) {
          return axios.post('/project-api/election-board/verify/board', body, { headers: { Authorization: token }})
        } else {
          return Promise.all([
            axios.post('/project-api/election-board/verify/board', body, { headers: { Authorization: token }}),
            fetchBoards(this.$store, { uploadedBy: this.board.uploadedBy })
          ])
        }
      })
      .then(res => {
        this.hasError = false
        this.loading = true
        if (!isBoard && res.length === 2 && res[1].count > 0) {
          this.showVerifyBoards = true
        }
        setTimeout(() => fetchBoard(this.$store, { uploadedBy: this.$store.state.ElectionBoard.userID }), 1000)
      })
      .then(res => {
        this.loading = false
      })
      .catch(err => {
        this.hasError = true
      })
    },
    validation () { // not use
      const index = this.errors.findIndex((value, index, arr) => value === 'empty')
      if (index > -1) {
        this.errors.splice(index, 1)
      }
      if (this.selectedCandidates.length < 1) {
        this.errors.push('empty')
      }
      if (this.errors.length < 1) {
        this.uploadBoardVerified(true)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #ffdb5c
theme-color-hidden = #6d5810

.eb-verify
  position relative
  display flex
  flex-direction column
  height 100vh
  background-color #000
  button
    cursor pointer
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
      height 100%
      object-fit cover
      object-position center center
      image-orientation from-image
  .form
    max-height 60vh
    padding 25px
    overflow-y auto
    > input
      display block
      width 100%
      height 30px
      margin-top 10px
      padding-left .5em
      background-color #a0a0a0
      border none
      border-radius 2px
      &::-webkit-input-placeholder
        font-size 1rem
        color #4c4c4c
    > p
      margin-top 5px
      color #fff
      &.error
        margin-top 10px
        color #fa6e59
        font-size .875rem
        text-align right
        &.error--board
          font-size .75rem
          text-align left
    > button
      width 100%
      height 50px
      margin-top 15px
      font-size 1.25rem
      font-weight 700
      line-height 1.4
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
    &__candidate
      margin-top 10px
      & + .form__candidate
        margin-top 5px
    .add-candidate
      display inline
      margin-top 10px
      color theme-color
      font-size .875rem
      line-height 20px
      cursor pointer
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
      margin-top 10px
      > button
        width calc(50% - 5px)
        height 75px
        font-size 1.25rem
        font-weight 700
        line-height 1.4
        border none
        border-radius 2px
    .btn
      &--grey
        background-color #a0a0a0
        &:disabled
          color #000
          background-color #626262
      &--yellow
        background-color theme-color
        &:disabled
          color #000
          background-color theme-color-hidden

@media (min-width: 768px)
  .eb-verify
    justify-content center
    padding 55px 0
    .image
      flex none
      width 450px
      height 300px
      margin 0 auto
      img
        position static
        width 100%
        object-fit contain
    .form
      width 450px
      padding 0
      margin 25px auto 0
</style>
