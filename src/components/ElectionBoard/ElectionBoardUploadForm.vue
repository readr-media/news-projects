<template>
  <div class="eb-upload-form">
    <div class="container">
      <div v-show="showCheckPosition" class="item">
        <p class="item__title" style="margin-top: 0;">這是看板的地點嗎？</p>
        <div class="item--row col--two">
          <button class="btn btn--negative" @click="denyPosition">否</button>
          <button class="btn btn--positive" @click="confirmPosition">是</button>
        </div>
      </div>
      <div v-show="!showCheckPosition" class="item">
        <div class="item__heading">
          <p>看板位置</p>
          <button v-if="hasGeolocation" v-show="!loadingPosition" @click="getCurrentPosition"><img src="/proj-assets/election-board/images/cursor.png" alt=""></button>
          <span v-text="loadingPosition ? '取得地理位置中⋯' : '點此取得現在位置'" @click="getCurrentPosition"></span>
        </div>
        <FormSelectPosition
          :address="address"
          :showAdvanced="true"
          @updateAddress="updateAddress"
          @updateCoordinate="updateCoordinate" />
      </div>
      <!-- <div v-if="imgURL" class="item image-preview"> -->
      <div class="item image-preview">
        <div class="item__heading">
          <p>照片縮圖</p>
          <button :class="{ open: showPreview }" @click="showPreview = !showPreview"><img src="/proj-assets/election-board/images/arrow-orange.png" alt=""></button>
          <span v-text="showPreview ? '收合' : '展開'" @click="showPreview = !showPreview"></span>
        </div>
        <div v-show="showPreview" class="image-preview__img">
          <img :src="imgURL" alt="">
        </div>
      </div>
      <div class="item">
        <p class="item__title">候選人（必填）</p>
        <!-- <template v-for="n in candidateAmount"> -->
          <!-- <FormSelectCandidate :key="n"
            :class="{ 'has-minus': n > 1 }"
            :legislatorCandidates="legislatorCandidates"
            :index="n"
            :presidentCandidates="presidentCandidates"
            :selectedIds="selectedCandidates"
            @minusCandidateAmount="minusSelectCandidate"
            @updateSelectedId="updateSelectedId" /> -->
        <FormSelectCandidate
          :legislatorCandidates="legislatorCandidates"
          :presidentCandidates="presidentCandidates"
          :selectedIds="selectedCandidates"
          @updateSelectedId="updateSelectedId"
        />
        <!-- </template> -->
        <!-- <p class="add-candidate" @click="candidateAmount += 1">新增候選人</p> -->
        <!-- <span v-if="errors.includes('candidate')" class="error">請選擇候選人</span> -->
        <p class="candidates-info">若有多位候選人，請上傳多次</p>
      </div>

      <div class="item">
        <p class="item__title">標語</p>
        <input type="text" v-model="slogan" placeholder="請輸入看板標語">
      </div>

      <div class="item item--checkbox">
        <input type="checkbox" id="partyIcon" :class="['checkbox', hasPartyIcon ? 'checked' : '']" v-model="hasPartyIcon">
        <label for="partyIcon">有黨徽</label>
      </div>

      <div class="item">
        <p class="item__title">看板類型</p>
        <div class="select-container">
          <select
            v-model="boardType"
            @blur="handleSelectBlur"
            @change="handleSelectChange"
            @focus="handleSelectFocus"
          >
            <option disabled value="">請選擇看板類型</option>
            <option value="戶外看板">戶外看板</option>
            <option value="旗幟">旗幟</option>
            <option value="競選總部">競選總部</option>
            <option value="其它">其它</option>
          </select>
        </div>
      </div>

      <div class="item">
        <p class="item__title">拍攝時間</p>
        <FormSelectDatetime :datetime="datetime" @updateDatetime="updateDatetime"/>
      </div>

      <div class="item">
        <p class="item__title">照片提供</p>
        <input type="text" v-model="uploaderName" placeholder="請問芳名">
      </div>

      <div class="item recaptcha">
        <VueRecaptcha :sitekey="GOOGLE_RECAPTCHA_SITE_KEY" @verify="recaptchaVerify">
          <button :class="{ verified: recaptchaVerified }" class="recaptcha__btn checkbox"></button>
          <span class="recaptcha__text">我不是機器人</span>
        </VueRecaptcha>
      </div>
      <button :disabled="!canSubmit" class="btn btn--submit" @click="submit">送出資料</button>
      <span v-if="errors.includes('coordinate')" class="error">地理位置不正確，請重新選擇</span>
      <span v-if="errors.includes('candidate')" class="error">請選擇候選人</span>
      <span v-if="hasError" class="error">系統目前維護中，請稍後再試⋯</span>
      <slot name="img-upload-error"></slot>
    </div>
    <FormCheckUpload
      v-if="showCheckBoards"
      :address="address"
      :legislatorCandidates="legislatorCandidates"
      :imgURL="imgURL"
      :presidentCandidates="presidentCandidates"
      :selectedCandidates="selectedCandidates"
      @cancelUpload="$emit('cancelUpload')"
      @confirmUpload="uploadBoard" />
  </div>
</template>

<script>
import FormCheckUpload from './FormCheckUpload.vue' 
import FormSelectCandidate from './FormSelectCandidate.vue' 
import FormSelectDatetime from './FormSelectDatetime.vue' 
import FormSelectPosition from './FormSelectPosition.vue'
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
import { GOOGLE_RECAPTCHA_SITE_KEY, } from 'api/config'
import { get } from 'lodash'

const DEFAULT_GPS_DMS = [ 22.6079361, 120.2968442 ]
const DEFAULT_ADDRESS = '台北市信義區東興路51號'
const DEFAULT_PAGE = 1
const MAX_LATITUDE = 26
const MIN_LATITUDE = 21
const MAX_LONGITUDE = 122
const MIN_LONGITUDE = 117

const REGEX_ADDRESS = /(\D+[縣市])(\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(.+)/

const fetchBoards = (store, {
  coordinates,
  page = DEFAULT_PAGE,
  maxResults = 10,
} = {}) => {
  return store.dispatch('ElectionBoard/FETCH_BOARDS', {
    coordinates,
    page,
    maxResults,
    electionYear: 2020,
    radius: 100,
    verifiedAmount: 3,
    notBoardAmount: 2
  })
}

const fetchCandidates = (store, {
  county = '全國,台北市',
  page = DEFAULT_PAGE,
  type = 'presidents'
} = {}) => {
  store.dispatch('ElectionBoard/FETCH_CANDIDATES', {
    county,
    electionYear: 2020,
    page,
    type
  }).then(res => {
    if (res.next) {
      fetchCandidates(store, { county, type, page: page + 1 })
    }
    return res
  }).catch(err => err)
}

export default {
  name: 'ElectionBoardUploadForm',
  components: {
    FormCheckUpload,
    FormSelectCandidate,
    FormSelectDatetime,
    FormSelectPosition,
    VueRecaptcha,
  },
  props: {
    current: {
      type: Number,
    },
    coordinate: {
      type: Array,
      default () {
        return []
      }
    },
    imgURL: {
    },
    initAddress: {
      type: String,
    },
    initDatetime: {
      type: Number,
    }
  },
  data () {
    return {
      GOOGLE_RECAPTCHA_SITE_KEY,
      address: '',
      candidateAmount: 1,
      datetime: this.initDatetime,
      errors: [],
      hasError: false,
      hasGeolocation: false,
      loadingPosition: false,
      recaptchaVerified: false,
      selectedCandidates: [],
      showCheckBoards: false,
      showCheckPosition: true,
      showPreview: false,
      slogan: '',
      hasPartyIcon: false,
      boardType: '',
      uploaderName: ''
    }
  },
  computed: {
    canSubmit () {
      return this.current === 2 && this.userID && this.imgURL && this.coordinate.length === 2 && !this.showCheckPosition && this.recaptchaVerified
    },
    legislatorCandidates () {
      if (!(this.county && this.district)) return []
      const county = this.county.replace('台', '臺')
      const legislators = this.$store.state.ElectionBoard.candidates.legislators || []
      const regex = new RegExp(`${this.district}|全國`)
      const candidates = legislators.filter((legis) => legis.district.match(regex))
      return candidates
    },
    isAddressMatched () {
      return this.address.match(REGEX_ADDRESS) && this.address.match(REGEX_ADDRESS).length > 4
    },
    county () {
      return this.isAddressMatched ? this.address.match(REGEX_ADDRESS)[1] : '台北市'
    },
    district () {
      return this.isAddressMatched ? this.address.match(REGEX_ADDRESS)[2] : '信義區'
    },
    presidentCandidates () {
      return this.$store.state.ElectionBoard.candidates.presidents || []
    },
    road () {
      return this.isAddressMatched ? this.address.match(REGEX_ADDRESS)[4] : ''
    },
    userID () {
      return this.$store.state.ElectionBoard.userID
    }
  },
  watch: {
    coordinate () {
      this.showCheckBoards = false
      this.showCheckPosition = true
    },
    county (value) {
      fetchCandidates(this.$store, { county: `全國,${value}`, type: 'legislators' })
    },
    initAddress (value) {
      this.address = (value.match(REGEX_ADDRESS) ? value : DEFAULT_ADDRESS)
    },
    initDatetime (value) {
      this.datetime = value
    }
  },
  beforeMount () {
    fetchCandidates(this.$store, { county: '全國' })
    fetchCandidates(this.$store, { type: 'legislators' })
  },
  mounted () {
    this.hasGeolocation = this.detectGeolocationFeature()
  },
  methods: {
    confirmPosition () {
      this.$emit('getPosAddress')
      this.showCheckPosition = false
    },
    denyPosition () {
      this.showCheckPosition = false
      this.$emit('showMapHint')
    },
    detectGeolocationFeature () {
      return navigator.geolocation
    },
    getCurrentPosition () {
      if (this.loadingPosition) return
      this.loadingPosition = true
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude || DEFAULT_GPS_DMS[0]
        const longitude = position.coords.longitude || DEFAULT_GPS_DMS[1]
        const coordinate = [ latitude, longitude ]
        this.$emit('updateCoordinate', coordinate)
        this.loadingPosition = false
      }, (err) => {
        this.hasGeolocation = false
      })
    },
    recaptchaVerify (res) {
      this.recaptchaVerified = true
    },
    submit () {
      if (this.selectedCandidates.length === 0) {
        this.errors.push('candidate')
        return
      }

      this.errors = []

      if (this.coordinate[0] > MIN_LATITUDE && this.coordinate[0] < MAX_LATITUDE &&
      this.coordinate[1] > MIN_LONGITUDE && this.coordinate[1] < MAX_LONGITUDE) {

        const stateEB = this.$store.state.ElectionBoard
        stateEB.loadingStatus = 'check board'

        fetchBoards(this.$store, { coordinates: `(${this.coordinate[0]} ${this.coordinate[1]})` })
        .then((res) => {
          if (res.count > 0) {
            stateEB.loadingStatus = ''
            this.$emit('hideBackBtn')
            this.showCheckBoards = true
          } else {
            this.uploadBoard()
          }
        })
        .catch((err) => {
          this.uploadBoard()
        })
      } else {
        this.errors.push('coordinate')
      }
      window.ga('send', 'event', 'projects', 'click', 'upload data done')
    },
    updateAddress (address) {
      this.address = address
    },
    updateCoordinate (value) {
      this.$emit('updateCoordinate', value)
    },
    updateDatetime (timestamp) {
      this.datetime = timestamp
    },
    updateSelectedId (newValue, oldValue) {
      this.errors.splice(this.errors.indexOf('candidate'), 1)
      if (oldValue) {
        const index = this.selectedCandidates.findIndex((value, index, arr) => value === oldValue)
        if (index > -1) {
          this.selectedCandidates.splice(index, 1)
          this.selectedCandidates.push(newValue)
        }
      } else {
        this.selectedCandidates.push(newValue)
      }
    },
    uploadBoard () {
      const stateEB = this.$store.state.ElectionBoard
      stateEB.loadingStatus = 'upload board'

      const body = {
        candidates: this.selectedCandidates,
        image: this.imgURL,
        coordinates: `(${this.coordinate[0]} ${this.coordinate[1]})`,
        county: this.county,
        district: this.district,
        road: this.road,
        tookAt: this.datetime,
        uploadedBy: this.userID,
        partyIcon: this.hasPartyIcon,
        uploaderName: this.uploaderName
      }

      if (this.slogan) body.slogan = this.slogan
      if (this.boardType) body.boardType = this.boardType
      axios.get('/project-api/token')
      .then((response) => {
        const token = response.data.token
        return axios.post('/project-api/election-board/boards', body, { headers: { Authorization: token }})
      })
      .then((res) => {
        stateEB.loadingStatus = ''
        this.hasError = false
        this.$emit('uploaded')
      })
      .catch((err) => {
        stateEB.loadingStatus = ''
        this.hasError = true
      })
    },
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
theme-color = #fa6e59

.eb-upload-form
  padding-right 25px
  padding-left 25px
  margin-top 25px
  overflow-y auto
  @media (min-width 768px)
    padding-right 0
    padding-left 0
    margin-top 40px
  & .container
    margin-bottom 30px
    @media (min-width 768px)
      margin-bottom 45px
  & button
    cursor pointer
  & .item
    margin-bottom 25px
    @media (min-width 768px)
      margin-bottom 35px
    &.recaptcha
      margin-bottom 30px
      @media (min-width 768px)
        margin-bottom 40px
    &__title
      margin-bottom 10px
      margin-top 0
      @media (min-width 768px)
        font-size 1.25rem
        margin-bottom 12px
    & input:not(.checkbox)
      width 100%
      height 32px
      background-color #a0a0a0
      border-radius 2px
      border none
    &--checkbox
      display flex
      align-items center
      line-height 1
      @media (min-width 768px)
        font-size 1.25rem
      & > *
        cursor pointer
    & label
      margin-left 10px
      user-select none
    &.image-preview
      & .item__heading
        & button
          &.open img
            transform rotate(0)
          & img
            transform rotate(-180deg)
    &__heading
      display flex
      align-items flex-end
      & > p
        margin 0
        @media (min-width 768px)
          font-size 1.25rem
      & > button
        padding 0
        margin-left 10px
        background-color transparent
        border none
        outline none
        & img
          width 16px
          height auto
          vertical-align middle
      & > span
        margin-left 8px
        color theme-color
        font-size .875rem
        cursor pointer
        @media (min-width 768px)
          font-size 1rem
    &--row
      display flex
      justify-content space-between
      &.col--two
        > *
          width calc(50% - 5px)
          padding 0
    & .image-preview__img
      margin-top 15px
      height 200px
      > img
        width 100%
        height 100%
        object-fit contain
        object-position center center
    & .select-candidate
      position relative
      &__list
        position absolute
        top 30px
        left 0
        right 0
        z-index 10
        max-height 180px
        overflow-y auto
        background-color #2b2b2b
        > div
          height 30px
          padding-left .5em
      &__item
        &.type
          color #fa6e59
  & .btn
    font-weight 700
    border none
    border-radius 2px
    &--negative, &--positive
      height 32px
      line-height 32px
    &--negative
      background-color #a0a0a0
    &--positive
      background-color theme-color
    &--submit
      width 100%
      padding 0
      height 48px
      line-height 48px
      font-weight 700
      background-color theme-color
      font-size 1.25rem
      @media (min-width 768px)
        border-radius 6px
      &:disabled
        color #000
        background-color #fcb6ac
  & .recaptcha
    @media (min-width 768px)
      font-size 1.25rem
    >>> > div
      display flex
      align-items center
    &__text
      margin-left 10px
      line-height 20px
  & .checkbox
    position relative
    width 16px
    height 16px
    padding 0
    background-color #a0a0a0
    border none
    border-radius 2px
    appearance none
    outline none
    @media (min-width 768px)
      width 20px
      height 20px
    &.verified, &.checked
      &::after
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
  & .error
    display block
    color #fa6e59
    font-size .875rem
    text-align right
    margin-top 10px
    margin-bottom 30px
    @media (min-width 768px)
      font-size 1rem
      margin-top 12px
      margin-bottom 45px
  & .candidates-info
    font-size 0.875rem
    color #a0a0a0
    margin-top 10px
    @media (min-width 768px)
      font-size 1rem
      margin-top 12px
  & >>> .grecaptcha-badge
    visibility hidden
    opacity 0
  & input[type="text"]
    padding 0 0 0 12px
  & .select-container
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
      background-color transparent
      border none
      appearance none
</style>
