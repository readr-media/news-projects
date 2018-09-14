<template>
  <section class="eb-upload">
    <main :style="[ mounted ? { display: 'flex' } : { display: 'none' }, { width: `${sectionAmount * viewportWidth}px`, transform: `translateX(-${current * viewportWidth}px)` }]">
      <section class="eb-upload__step-1">
        <div>
          <h3>請記得開啟相機的定位服務</h3>
          <p>iOS：設定 > 隱私權 > 定位服務</p>
          <img src="/proj-assets/election-board/images/ios-gps.png" alt="">
          <p>Android：相機 > 一般設定 > 儲存地點</p>
          <img src="/proj-assets/election-board/images/android-gps.png" alt="">
          <button @click="getPhoto">開始拍照或取用相片</button>
        </div>
      </section>
      <section class="eb-upload__step-3">
        <div class="preview">
          <img ref="preview" src="" alt="">
          <div v-show="!imgSizeVerified" class="preview__alert">
            <span>檔案大小超過限制（10 MB）</span>
          </div>
        </div>
        <div class="action">
          <div class="action--retake" @click="getPhoto">
            <span>重新選擇</span>
          </div>
          <div v-if="imgSizeVerified" class="action--verified" @click="getPhotoEXIF">
            <span>使用此照片</span>
          </div>
        </div>
      </section>
      <section class="eb-upload__step-4">
        <ElectionBoardUploadMap
          :coordinate="coordinate"
          :showMapHint="showMapHint"
          class="map"
          @closeMapHint="showMapHint = false"
          @updateCoordinate="updateCoordinate" />
        <ElectionBoardUploadForm
          :current="current"
          :coordinate="coordinate"
          :imgURL="imgURL"
          :initDatetime="datetime"
          :initAddress="address"
          class="form"
          @cancelUpload="current = 0"
          @getPosAddress="getPosAddress"
          @showMapHint="showMapHint = true"
          @updateCoordinate="updateCoordinate"
          @uploaded="current = 3" />
      </section>
      <section class="eb-upload__step-5">
        <img src="/proj-assets/election-board/images/done.png" alt="">
        <span>感謝您提供資料，{{ timeout }} 秒後將自動跳轉回上傳頁面</span>
        <!-- <span>感謝您提供資料，3秒後將自動跳轉至資料頁面</span> -->
      </section>
    </main>
    <ElectionBoardBackBtn v-show="showBackBtn"/>
    <input id="camera" ref="camera" type="file" accept="image/*" @change="handleInputChange">
  </section>
</template>
<script>
import ElectionBoardBackBtn from './ElectionBoardBackBtn.vue'
import ElectionBoardUploadForm from './ElectionBoardUploadForm.vue'
import ElectionBoardUploadMap from './ElectionBoardUploadMap.vue'
import moment from 'moment'
import { get, } from 'lodash'

const DEFAULT_GPS_DMS = [ 22.6079361, 120.2968442 ]
const MAX_IMG_SIZE = 10 * 1024 * 1024 // 10 MB
const MIN_TIMESTAMP = 1514736000 // 2018.01.01

const uploadImage = (store, { file, folderName }) => {
  return store.dispatch('UPLOAD_IMAGE_TO_GCS', { file, folderName })
}

export default {
  name: 'ElectionBoardUpload',
  components: {
    ElectionBoardBackBtn,
    ElectionBoardUploadForm,
    ElectionBoardUploadMap,
  },
  data () {
    return {
      address: '',
      coordinate: undefined,
      current: 0, // step-1: 0, step-3: 1, step-4: 2, step-5: 3
      datetime: moment().unix(),
      imgEXIF: {},
      imgFile: undefined,
      imgSizeVerified: false,
      imgURL: '',
      mounted: false,
      sectionAmount: 1,
      showBackBtn: true,
      showMapHint: false,
      timeout: 3,
      timer: undefined,
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.useragent.isMobile
    },
    latitudeFromEXIF () {
      const degrees = get(this.imgEXIF, [ 'GPSLatitude', 0, 'numerator' ], 0) / get(this.imgEXIF, [ 'GPSLatitude', 0, 'denominator' ], 1)
      const minutes = get(this.imgEXIF, [ 'GPSLatitude', 1, 'numerator' ], 0) / get(this.imgEXIF, [ 'GPSLatitude', 1, 'denominator' ], 1)
      const seconds = get(this.imgEXIF, [ 'GPSLatitude', 2, 'numerator' ], 0) / get(this.imgEXIF, [ 'GPSLatitude', 2, 'denominator' ], 100) 
      return (degrees + minutes / 60 + seconds / 3600)
    },
    longitudeFromEXIF () {
      const degrees = get(this.imgEXIF, [ 'GPSLongitude', 0, 'numerator' ], 0) / get(this.imgEXIF, [ 'GPSLongitude', 0, 'denominator' ], 1)
      const minutes = get(this.imgEXIF, [ 'GPSLongitude', 1, 'numerator' ], 0) / get(this.imgEXIF, [ 'GPSLongitude', 1, 'denominator' ], 1)
      const seconds = get(this.imgEXIF, [ 'GPSLongitude', 2, 'numerator' ], 0) / get(this.imgEXIF, [ 'GPSLongitude', 2, 'denominator' ], 100) 
      return (degrees + minutes / 60 + seconds / 3600)
    },
    coordinateFromEXIF () {
      if (this.latitudeFromEXIF && this.longitudeFromEXIF) {
        return [ this.latitudeFromEXIF, this.longitudeFromEXIF ]
      }
      return undefined
    },
    viewportWidth () {
      return this.$store.state.viewport[0]
    }
  },
  mounted () {
    this.getSectionAmount()
    this.mounted = true
  },
  watch: {
    coordinate () {
      this.showMapHint = false
    },
    current (value) {
      if (value === 0) {
        clearInterval(this.timer)
        this.resetData()
      } else if (value === 3) {
        this.setTimer()
      }
    },
    coordinateFromEXIF (value) {
      if (value) {
        this.coordinate = value
      }
    },
    imgEXIF (value) {
      const datetime = get(value, 'DateTime')
      if (datetime) {
        const datetimeTimestamp = moment(datetime, 'YYYY:MM:DD HH:mm:ss').unix()
        if (datetimeTimestamp >= MIN_TIMESTAMP) {
          this.datetime = datetimeTimestamp
        } else {
          this.datetime = moment().unix()
        }
      }
    },
    timeout (value) {
      if (value === 0) {
        this.current = 0
      }
    }
  },
  methods: {
    filterAddress (addressList) {
      // 過濾 Goolgle 轉換的中文地址 (篩選有市區路字元且依照此順序的地址)
      const regex = new RegExp('市(?:(?!路|市).)*區(?:(?!區|路).)*路')
      const filtered = addressList.filter(address => address.formatted_address.match(regex)) || []
      if (filtered.length > 0) {
        this.address = this.formatAddress(filtered[0].formatted_address)
      } else {
        this.address = this.formatAddress(addressList[0].formatted_address)
      }
    },
    formatAddress (address) {
      let output = address
      const index = output.indexOf('台灣')
      if (index > -1) {
        output = output.slice(index + 2)
      }
      return output
    },
    getSectionAmount () {
      const sections = document.querySelectorAll('.eb-upload main > section')
      this.sectionAmount = sections.length || 1
    },
    getPhoto () {
      this.$refs.camera.click()
    },
    getPhotoEXIF () {
      EXIF.getData(this.imgFile, () => {
        this.imgEXIF = EXIF.getAllTags(this.imgFile)
        console.log('getPhotoEXIF', this.imgEXIF)
        if (!this.coordinateFromEXIF && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude || DEFAULT_GPS_DMS[0]
            const longitude = position.coords.longitude || DEFAULT_GPS_DMS[1]
            this.coordinate = [ latitude, longitude ]
            this.goToUploadForm()
          }, (err) => {
            this.coordinate = DEFAULT_GPS_DMS
            this.goToUploadForm()
          })
        } else {
          this.goToUploadForm()
        }
      })
    },
    getPosAddress () {
      const geocoder = new google.maps.Geocoder()
      const coordinate = new google.maps.LatLng(this.coordinate[0], this.coordinate[1])
      geocoder.geocode({ latLng: coordinate }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          this.filterAddress(results)
        } else {
          console.log('err', status)
        }
      })
    },
    goToUploadForm () {
      const fd = new FormData()
      fd.append('image', this.imgFile)
      uploadImage(this.$store, { file: fd, folderName: 'election-board' })
      .then(res => {
        this.imgURL = res.data.url
      })
      this.current = 2
    },
    handleInputChange (e) {
      this.imgFile = e.target.files[0]
      if (this.imgFile) {
        const url = URL.createObjectURL(this.imgFile)
        const imgSize = this.imgFile.size
        if (imgSize < MAX_IMG_SIZE) {
          this.imgSizeVerified = true
        }
        this.$refs.preview.src = url
        this.current = 1
      } else {
        this.current = 0
      }
    },
    resetData () {
      this.address = ''
      this.coordinate = undefined
      this.imgEXIF = {}
      this.imgFile = undefined
      this.imgSizeVerified = false
      this.imgURL = ''
      this.showMapHint = false
      this.timeout = 3
      document.getElementById('camera').value = ''
    },
    setTimer () {
      this.timer = setInterval(() => {
        this.timeout -= 1
      }, 1000)
    },
    updateCoordinate (coordinate) {
      this.coordinate = coordinate
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #fa6e59

.eb-upload
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  overflow hidden
  background-color #000
  color #fff
  > main
    display flex
    height 100%
    > section
      flex 1
      height 100%
  input
    display none
  &__step-1
    display flex
    justify-content center
    align-items center
    > div
      width calc(100% - 50px)
      margin 0 auto
    h3
      margin-bottom 30px
      color theme-color
      font-size 1.25rem
      font-weight 300
      letter-spacing 1px
    img
      width 100%
      margin-top 10px
      & + p
        margin-top 20px
    button
      width 100%
      padding .5em
      margin-top 30px
      color #000
      font-size 1.25rem
      font-weight 500
      background-color theme-color
      border none
      border-radius 2px
  &__step-3
    display flex
    flex-direction column
    .preview
      position relative
      flex 4
      > img
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        height 100%
        object-fit cover
        object-position center center
      &__alert
        display flex
        justify-content center
        align-items center
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-color rgba(0,0,0,.5)
        span
          padding 0 .5em
          color #de1615
          font-weight 500
          letter-spacing 1px
          background-color rgb(0,0,0)
          border-radius 5px
    .action
      display flex
      padding 25px
      > div
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        height 50px
        color #000
        font-size 1.25rem
        text-align center
        border-radius 2px
        > span
          font-weight 500
          line-height 1
      &--retake
        background-color #a0a0a0
      &--verified
        margin-left 15px
        background-color theme-color
  &__step-4
    position relative
    display flex
    flex-direction column
    .map
      flex 2
    .form
      flex 3
  &__step-5
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-color theme-color
    > img
      width 52px
    > span
      width calc(100% - 50px)
      margin 20px auto 0
      color #000
      font-size 1.25rem
      font-weight 500
      line-height 1.4
      text-align justify
@media (min-width: 768px)
  .eb-upload
    &__step-1
      > div
       width 450px
    &__step-3
      justify-content center
      padding 55px 0
      .preview
        flex 1
        width 450px
        margin 0 auto
        > img
          object-fit contain
      .action
        width 450px
        margin 30px auto 0
        padding 0
    &__step-4
      .form
        flex none
        width 450px
        height 500px
        margin 0 auto
    &__step-5
      > img
        width 100px
      > span
        text-align center
</style>
