<template>
  <div class="eb-upload-form">
    <div class="container">
      <div v-show="showCheckPosition" class="item">
        <p>這是看板的地點嗎？</p>
        <div class="item--row col--two">
          <button class="btn btn--negative" @click="denyPosition">否</button>
          <button class="btn btn--positive" @click="confirmPosition">是</button>
        </div>
      </div>
      <div v-show="!showCheckPosition" class="item">
        <div class="item__heading">
          <p>看板位置</p>
          <button v-if="hasGeolocation" v-show="!loadingPosition" @click="getCurrentPosition"><img src="/proj-assets/election-board/images/cursor.png" alt=""></button>
          <span v-text="loadingPosition ? '取得地理位置中...' : '點此取得現在位置'"></span>
        </div>
        <FormSelectPosition
          :address="address"
          :showAdvanced="true"
          @updateAddress="updateAddress"
          @updateCoordinate="updateCoordinate" />
      </div>
      <div class="item">
        <p>候選人</p>
        <template v-for="n in candidateAmount">
          <FormSelectCandidate :key="n"
            :class="{ 'has-minus': n > 1 }"
            :councilorCandidates="councilorCandidates"
            :index="n"
            :mayorCandidates="mayorCandidates"
            :selectedIds="selectedCandidates"
            @minusCandidateAmount="minusSelectCandidate"
            @updateSelectedId="updateSelectedId" />
        </template>
        <p class="add-candidate" @click="candidateAmount += 1">新增候選人</p>
      </div>
      <div class="item">
        <p>拍攝時間</p>
        <FormSelectDatetime :datetime="datetime" @updateDatetime="updateDatetime"/>
      </div>
      <div class="item recaptcha">
        <VueRecaptcha :sitekey="GOOGLE_RECAPTCHA_SITE_KEY" @verify="recaptchaVerify">
          <button :class="{ verified: recaptchaVerified }" class="recaptcha__btn"></button>
          <span class="recaptcha__text">我不是機器人</span>
        </VueRecaptcha>
      </div>
      <button :disabled="!canSubmit" class="btn btn--submit" @click="submit">送出資料</button>
      <span v-if="errors.includes('coordinate')" class="error">地理位置不正確，請重新選擇</span>
      <span v-if="hasError" class="error">系統目前維護中，請稍後再試...</span>
      <slot name="img-upload-error"></slot>
    </div>
    <FormCheckUpload
      v-if="showCheckBoards"
      :address="address"
      :councilorCandidates="councilorCandidates"
      :imgURL="imgURL"
      :mayorCandidates="mayorCandidates"
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
import { get, } from 'lodash'

const DEFAULT_GPS_DMS = [ 22.6079361, 120.2968442 ]
const DEFAULT_ADDRESS = '高雄市前鎮區成功二路39號'
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
    page: page,
    maxResults: maxResults,
    radius: 100,
    verifiedAmount: 3,
    notBoardAmount: 2,
  })
}

const fetchCandidates = (store, {
  county = '台北市',
  page = DEFAULT_PAGE,
  type = 'mayors'
} = {}) => {
  store.dispatch('ElectionBoard/FETCH_CANDIDATES', {
    county: county,
    electionYear: 2018,
    page: page,
    type: type
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
    }
  },
  computed: {
    canSubmit () {
      return this.current === 2 && this.userID && this.imgURL && this.coordinate.length === 2 && !this.showCheckPosition && this.recaptchaVerified
    },
    councilorCandidates () {
      if (this.county && this.district) {
        const county = `${this.county.replace('台', '臺')}`
        const regions = get(this.$store, [ 'state', 'ElectionBoard', 'elections', county, 'regions' ], []) || []
        const district = this.district.substring(0, this.district.length - 1)
        const regex = new RegExp(`(${district}|原住民)`)
        const constituency = regions.filter(region => region.district.match(regex)).map(region => region.constituency) || []
        const councilors = this.$store.state.ElectionBoard.candidates.councilors || []
        const candidates = councilors.filter(councilor => constituency.includes(councilor.constituency))
        return candidates
      }
      return []
    },
    county () {
      if (this.address.match(REGEX_ADDRESS) && this.address.match(REGEX_ADDRESS).length > 4) {
        return this.address.match(REGEX_ADDRESS)[1]
      }
      return '台北市'
    },
    district () {
      if (this.address.match(REGEX_ADDRESS) && this.address.match(REGEX_ADDRESS).length > 4) {
        return this.address.match(REGEX_ADDRESS)[2]
      }
      return '信義區'
    },
    mayorCandidates () {
      return this.$store.state.ElectionBoard.candidates.mayors || []
    },
    road () {
      if (this.address.match(REGEX_ADDRESS) && this.address.match(REGEX_ADDRESS).length > 4) {
        return this.address.match(REGEX_ADDRESS)[4]
      }
      return ''
    },
    userID () {
      return this.$store.state.ElectionBoard.userID
    }
  },
  watch: {
    coordinate () {
      this.showCheckPosition = true
    },
    county (value) {
      fetchCandidates(this.$store, { county: `${value}` })
      fetchCandidates(this.$store, { county: `${value}`, type: 'councilors' })
    },
    initAddress (value) {
      if (value.match(REGEX_ADDRESS)) {
        this.address = value
      } else {
        this.address = DEFAULT_ADDRESS
      }
    },
    initDatetime (value) {
      this.datetime = value
    }
  },
  beforeMount () {
    fetchCandidates(this.$store)
    fetchCandidates(this.$store, { type: 'councilors' })
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
    minusSelectCandidate (id) {
      if (id) {
        const index = this.selectedCandidates.findIndex((value, index, arr) => value === id)
        if (index > -1) {
          this.selectedCandidates.splice(index, 1)
        }
      }
      this.candidateAmount -= 1
    },
    recaptchaVerify (res) {
      this.recaptchaVerified = true
    },
    submit () {
      this.errors = []
      if (this.coordinate[0] > MIN_LATITUDE && this.coordinate[0] < MAX_LATITUDE &&
      this.coordinate[1] > MIN_LONGITUDE && this.coordinate[1] < MAX_LONGITUDE) {
        fetchBoards(this.$store, { coordinates: `(${this.coordinate[0]} ${this.coordinate[1]})` })
        .then(res => {
          if (res.count > 0) {
            this.$emit('hideBackBtn')
            this.showCheckBoards = true
          } else {
            this.uploadBoard()
          }
        })
        .catch(err => {
          this.uploadBoard()
        })
      } else {
        this.errors.push('coordinate')
      }
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
      const body = {
        candidates: this.selectedCandidates,
        image: this.imgURL,
        coordinates: `(${this.coordinate[0]} ${this.coordinate[1]})`,
        county: this.county,
        district: this.district,
        road: this.road,
        tookAt: this.datetime,
        uploadedBy: this.userID
      }
      axios.get('/project-api/token')
      .then(response => {
        const token = response.data.token
        return axios.post('/project-api/election-board/boards', body, { headers: { Authorization: token }})
      })
      .then(res => {
        this.hasError = false
        this.$emit('uploaded')
      })
      .catch(err => {
        this.hasError = true
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  theme-color = #fa6e59

  .eb-upload-form
    padding 25px
    overflow-y auto
    button
      cursor pointer
    .item
      margin-bottom 25px
      p
        line-height 1
      input
        height 30px
        background-color #a0a0a0
        border-radius 2px
        border none
      &__heading
        > p, > button
          display inline
        > button
          padding 0
          margin-left 10px
          vertical-align middle
          background-color transparent
          border none
          outline none
          img
            width 16px
        > span
          margin-left 10px
          color theme-color
          font-size .8rem
      &--row
        display flex
        justify-content space-between
        margin-top .5em
        &.col--two
          > *
            width calc(50% - 5px)
      .select-candidate
        position relative
        margin-top .5em
        > input
          width 100%
          padding-left .5em
          border-radius 0
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
    .btn
      font-weight 500
      border none
      border-radius 2px
      &--negative, &--positive
        padding .3em 0
      &--negative
        background-color #a0a0a0
      &--positive
        background-color theme-color
      &--submit
        width 100%
        margin-top 10px
        padding .5em 0
        letter-spacing 1px
        background-color theme-color
        &:disabled
          color #000
          background-color #fcb6ac
    .recaptcha
      >>> > div
        display flex
        justify-content center
        align-items center
        line-height 1
      &__btn
        position relative
        width 20px
        height 20px
        padding 0
        background-color #a0a0a0
        border none
        border-radius 2px
        &.verified
          &::after
            content ''
            position absolute
            top 0
            left 5px
            transform rotate(45deg)
            width 10px
            height 15px
            border 1px solid #fff
            border-width 0 3px 3px 0
      &__text
        margin-left 10px
        line-height 20px
    .error
      display block
      color #fa6e59
      font-size .8rem
      text-align right

    >>> .grecaptcha-badge
      visibility hidden
      opacity 0
</style>
