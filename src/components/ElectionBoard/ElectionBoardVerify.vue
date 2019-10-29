<template>
  <section class="eb-verify">
    <div class="image">
      <img :src="boardImage" alt="">
      <!-- <img src="https://attach.setn.com/newsimages/2018/03/11/1277743-PH.jpg" alt=""> -->
    </div>
    <div class="form" ref="form">
      <div class="form__heading">
        <h2>看板資訊</h2>
        <p>此資料已被驗證 {{ board.verifiedAmount || 0 }} 次</p>
      </div>
      <!-- <div class="form__amount">
        <p>照片裡有幾位縣市長 / 議員候選人？</p>
        <input v-model.number="candidateAmount" type="number" pattern="[0-9]*">
      </div> -->
      <p>候選人姓名（限填一位）</p>
      <!-- <p v-show="errors.includes('empty')" class="error">請填寫候選人資訊</p> -->

      <VerifyInputCandidate
        v-for="n in candidateAmountForInput"
        :key="n"
        :board="board"
        :candidate="candidatesOrigin[n - 1]"
        :candidateAmount="candidateAmount"
        :candidates="candidates"
        :index="n"
        :selectedCandidates="selectedCandidates"
        class="form__candidate"
        @updateSelectedId="updateSelectedCandidates"
      />
      
      <p>這塊看板的標語</p>
      <input v-model="slogan" type="text" placeholder="請填寫看板標語（多句請用／分隔）">
      <p class="current-info">目前資訊：{{ board.slogan || '' }}</p>
      <!-- <p class="current-info">目前資訊：小英栽培/吳沛憶 我陪你</p> -->

      <div class="party-icon-item">
        <input type="checkbox" id="party-icon" :class="['checkbox', hasPartyIcon ? 'checked' : '']" v-model="hasPartyIcon">
        <label for="party-icon">有黨徽</label>
      </div>
      <p class="current-info">目前資訊：{{ board.partyIcon ? '有黨徽' : '無黨徽' }}</p>

      <p>看板類型</p>
      <div class="select-container">
        <select
          v-model="boardType"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus"
        >
          <option disabled selected value="">請選擇看板類型</option>
          <option value="戶外看板">戶外看板</option>
          <option value="旗幟">旗幟</option>
          <option value="競選總部">競選總部</option>
          <option value="其它">其它</option>
        </select>
      </div>
      <p class="current-info">目前資訊：{{ board.boardType || '' }}</p>

      <p v-show="!boardID && !hasError" class="error error--board">取得看板資訊中，請稍後⋯</p>
      <p v-if="hasError" class="error error--board">系統發生錯誤，請重新整理或稍後再試⋯</p>
      <button :disabled="(!boardID && loading) || hasError" class="btn--yellow" @click="uploadBoardVerified(true)">沒問題送出</button>
      <div class="action">
        <button :disabled="(!boardID && loading) || hasError" class="btn--grey" @click="uploadBoardVerified(false)">這不是競選<br>看板照片</button>
        <button :disabled="loading || hasError" class="btn--grey" @click="skipBoard">跳過</button>
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
import { get, take } from 'lodash'

const DEFAULT_PAGE = 1

const fetchBoard = (store, {
  skipBoard,
  uploadedBy
} = {}) => store.dispatch('ElectionBoard/FETCH_BOARD_FOR_VERIF', {
  skipBoard,
  uploadedBy
})

const fetchBoardByID = (store, {
  id,
  uploadedBy
} = {}) => store.dispatch('ElectionBoard/FETCH_BOARD_FOR_VERIF_BY_ID', {
  id,
  params: {
    uploadedBy
  }
})

const fetchBoards = (store, {
  uploadedBy,
  page = DEFAULT_PAGE,
} = {}) => {
  return store.dispatch('ElectionBoard/FETCH_BOARDS', {
    uploadedBy,
    page,
    maxResults: 6,
  })
}

export default {
  name: 'ElectionBoardVerify',
  props: [ 'reload' ],
  components: {
    ElectionBoardBackBtn,
    FormSelectCandidate,
    FormSelectPosition,
    VerifyBoards,
    VerifyInputCandidate
  },
  data () {
    return {
      candidateAmount: '',
      errors: [],
      hasError: false,
      selectedCandidates: [],
      showVerifyBoards: false,
      slogan: '',
      loading: false,
      hasPartyIcon: false,
      boardType: ''
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
    candidateAmountForInput () {
      if ((typeof this.candidateAmount === 'string' && this.candidateAmountOrigin < 1) || (typeof this.candidateAmount === 'number' && this.candidateAmount < 2)) {
        return 1
      } else if (typeof this.candidateAmount === 'string' && this.candidateAmountOrigin > 0) {
        return this.candidateAmountOrigin
      } else {
        return this.candidateAmount
      }
    },
    candidateAmountOrigin () {
      return get(this.board, 'candidates.length')
    },
    candidates () {
      return this.presidentCandidates.concat(this.legislatorCandidates)
    },
    candidatesOrigin () {
      return get(this.board, 'candidates', []) || []
    },
    legislatorCandidates () {
      return this.$store.state.ElectionBoard.candidatesForVerif.legislators || []
      // return this.$store.state.ElectionBoard.candidatesForVerif.councilors || []
    },
    presidentCandidates () {
      return this.$store.state.ElectionBoard.candidatesForVerif.presidents || []
      // return this.$store.state.ElectionBoard.candidatesForVerif.mayors || []
    },
  },
  watch: {
    board (value) {
      this.errors = []
      this.selectedCandidates = []
      this.selectedCandidates = value.candidates.map((candidate) => candidate.id)

      this.slogan = this.board.slogan || ''
      this.hasPartyIcon = this.board.partyIcon
      this.boardType = this.board.boardType || ''

      this.candidateAmount = ''
    },
    candidateAmountForInput (value) {
      const candidatesOriginIds = this.candidatesOrigin.map((candidate) => candidate.id)
      this.selectedCandidates = (value <= this.candidateAmountOrigin ? take(candidatesOriginIds, value) : candidatesOriginIds)
    }
  },
  beforeMount () {
    if (this.$route.query.board) {
      fetchBoardByID(this.$store, { id: this.$route.query.board, uploadedBy: this.$store.state.ElectionBoard.userID })
      .catch((err) => {
        fetchBoard(this.$store, { uploadedBy: this.$store.state.ElectionBoard.userID })
        this.$router.replace(`/project/election-board/verify`)
      })
    } else {
      fetchBoard(this.$store, { uploadedBy: this.$store.state.ElectionBoard.userID })
      .catch((err) => {
        this.hasError = true
      })
    }
  },
  methods: {
    buildRequestBody (isBoard) {
      const body = {
        board: this.boardID,
        createdBy: this.$store.state.ElectionBoard.userID,
        isBoard
      }

      // if (typeof this.candidateAmount !== 'string') {
      //   body.headcount = this.candidateAmount
      // }
      body.headcount = 1

      if (isBoard) {
        body.candidates = this.selectedCandidates
        // 傳空字串會出錯
        if (this.slogan) body.slogan = this.slogan
        if (this.boardType) body.boardType = this.boardType
        body.partyIcon = this.hasPartyIcon
      }
      return body
    },
    skipBoard () {
      this.loading = true
      fetchBoard(this.$store, { skipBoard: this.boardID, uploadedBy: this.$store.state.ElectionBoard.userID })
      .then((res) => {
        this.loading = false
        this.$refs.form.scrollTop = 0
      })
      .catch((err) => {
        this.hasError = true
      })
      window.ga('send', 'event', 'projects', 'click', 'verified pass')
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
        const index = this.selectedCandidates.findIndex((value, index, arr) => value === newValue) 
        if (index < 0) {
          this.selectedCandidates.push(newValue)
        }
      }
    },
    uploadBoardVerified (isBoard) {
      const body = this.buildRequestBody(isBoard)
      axios.get('/project-api/token')
      .then((response) => {
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
      .then((res) => {
        this.hasError = false
        this.loading = true
        if (!isBoard && res.length === 2 && res[1].count > 0) this.showVerifyBoards = true
        // setTimeout(() => fetchBoard(this.$store, { uploadedBy: this.$store.state.ElectionBoard.userID }), 1000)
        return fetchBoard(this.$store, { uploadedBy: this.$store.state.ElectionBoard.userID })
      })
      .then(() => {
        this.loading = false
        this.$refs.form.scrollTop = 0
      })
      .catch((err) => {
        this.hasError = true
      })

      if (isBoard) {
        window.ga('send', 'event', 'projects', 'click', 'verified data confirmed')
      } else {
        window.ga('send', 'event', 'projects', 'click', 'verified data false')
      }
    },
    // validation () { // not use
    //   const index = this.errors.findIndex((value, index, arr) => value === 'empty')
    //   if (index > -1) {
    //     this.errors.splice(index, 1)
    //   }
    //   if (this.selectedCandidates.length < 1) {
    //     this.errors.push('empty')
    //   }
    //   if (this.errors.length < 1) {
    //     this.uploadBoardVerified(true)
    //   }
    // },
    handleSelectBlur (e) {
      e.target.parentNode.classList.remove('open')
    },
    handleSelectChange (e) {
      e.target.parentNode.classList.remove('open')
    },
    handleSelectFocus (e) {
      e.target.parentNode.classList.add('open')
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
  & button
    cursor pointer
    font-family "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, sans-serif
    padding 0
  & .image
    // flex 1
    position relative
    height 60%
    // display flex
    // justify-content center
    // max-height 40vh
    & img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      // width auto
      height 100%
      // max-height 40vh 
      vertical-align middle
      // height 100%
      object-fit contain
      object-position bottom center
      // image-orientation from-image
  & .party-icon-item
    margin-top 25px
    color #fff
    display flex
    align-items center
    line-height 1
    @media (min-width 768px)
      margin-top 35px
    & input
      position relative
      width 16px
      height 16px
      padding 0
      background-color #a0a0a0
      border none
      border-radius 2px
      appearance none
      outline none
      cursor pointer
      @media (min-width 768px)
        width 20px
        height 20px
      &.checked::after
        content ''
        position absolute
        top 0
        left 5px
        transform rotate(45deg)
        width 7px
        height 14px
        border 1px solid #fff
        border-width 0 3px 3px 0
        @media (min-width 768px)
          width 10px
          height 15px
    & label
      margin-left 10px
      user-select none
      cursor pointer
      @media (min-width 768px)
        font-size 1.25rem
  & .select-container
    // flex 1
    position relative
    background-color #a0a0a0
    border-radius 2px
    &.open::after
      transform rotate(180deg)
    &::after
      content ''
      position absolute
      top 0
      right 0
      width 30px
      height 30px
      background-image url(/proj-assets/election-board/images/filter.png)
      background-size 16px auto
      background-position center center
      background-repeat no-repeat
      transition transform .5s
    & select
      position relative
      z-index 10
      width 100%
      height 32px
      padding 0 0 0 12px
      // text-indent .5em
      background-color transparent
      border none
      appearance none
  & .form
    // max-height 60vh
    margin-top 25px
    // margin-bottom 30px
    // padding 0 25px 30px 25px
    padding-left 25px
    padding-right 25px
    overflow-y auto
    @media (min-width 768px)
      width 450px
      // padding 0 0 45px 0
      padding-left 0
      padding-right 0
      margin-top 40px
      margin-left auto
      margin-right auto
      // margin 40px auto 45px auto
    & > input
      display block
      width 100%
      height 32px
      margin-top 10px
      // padding-left .5em
      padding 0 0 0 12px
      // text-indent 0.5em
      line-height 32px
      background-color #a0a0a0
      border none
      border-radius 2px
      &::-webkit-input-placeholder
        font-size 1rem
        color #4c4c4c
    & > p
      // margin-top 5px
      // margin-top 15px
      margin-top 25px
      margin-bottom 10px
      color #fff
      // line-height 1
      @media (min-width 768px)
        font-size 1.25rem
        margin-top 35px
        margin-bottom 12px
      &.error
        margin-top 10px
        margin-bottom 0
        color #fa6e59
        font-size .875rem
        // text-align right
        &.error--board
          // font-size .75rem
          text-align left
    & .current-info
      color #a0a0a0
      font-size 0.875rem
      margin-top 10px
      margin-bottom 0
      // line-height 1
      @media (min-width 768px)
        font-size 1rem
        margin-top 12px
    & > button
      width 100%
      height 50px
      // margin-top 15px
      margin-top 30px
      font-size 1.25rem
      font-weight 700
      line-height 1.4
      border none
      border-radius 2px
      @media (min-width 768px)
        margin-top 40px
        border-radius 6px
    &__heading
      display flex
      justify-content space-between
      align-items center
      // line-height 1
      & h2
        margin 0
        color theme-color
        font-size 1rem
        // line-height 1
        @media (min-width 768px)
          font-size 1.25rem
      & p
        margin 0
        color #a0a0a0
        font-size .875rem
        // line-height 1
        @media (min-width 768px)
          font-size 1rem
    // &__amount
    //   display flex
    //   margin-top .5em
    //   > p
    //     margin-right 20px
    //     color #fff
    //     line-height 1.4
    //   > input
    //     width 60px
    //     height 30px
    //     margin-top .2em
    //     padding-left .5em
    //     line-height 30px
    //     background-color #a0a0a0
    //     border none
    //     border-radius 2px
    &__candidate
      // margin-top 10px
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
    & .action
      display flex
      justify-content space-between
      margin-top 12px
      margin-bottom 30px
      @media (min-width 768px)
        margin-bottom 45px
      > button
        width calc(50% - 6px)
        height 75px
        font-size 1.25rem
        font-weight 700
        line-height 1.4
        border none
        border-radius 2px
        @media (min-width 768px)
          border-radius 6px
    .btn
      &--grey
        background-color #a0a0a0
        &:disabled
          color #000
          background-color #626262
      &--yellow
        background-color theme-color
        height 48px
        line-height 48px
        &:disabled
          color #000
          background-color theme-color-hidden

@media (min-width 768px)
  & .eb-verify
    justify-content center
    padding-top 55px
    // padding-bottom 45px
    & .image
      // flex none
      width 450px
      // height 300px
      margin 0 auto
      // img
      //   position static
      //   width 100%
      //   object-fit contain
    // & .form
    //   width 450px
    //   padding 0 0 45px 0
    //   margin-top 40px
    //   // margin 40px auto 0
    //   margin-right auto
    //   margin-left auto
</style>
