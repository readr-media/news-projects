<template>
  <section class="eb-upload">
    <main :style="[ mounted ? { display: 'flex' } : { display: 'none' }, { width: `${sectionAmount * viewportWidth}px`, transform: `translateX(-${current * viewportWidth}px)` }]">
      <section class="eb-upload__step-1">
        <div>
          <h3>若使用手機，請記得開啟相機的定位服務</h3>
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
            <span>檔案大小超過限制（8 MB）</span>
          </div>
        </div>
        <div class="action">
          <div class="action--retake" @click="getPhoto">
            <span>重新選擇</span>
          </div>
          <div v-if="imgSizeVerified" class="action--verified" @click="checkCoordinate">
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
          @hideBackBtn="showBackBtn = false"
          @showMapHint="showMapHint = true"
          @updateCoordinate="updateCoordinate"
          @uploaded="current = 3"
        >
          <p v-if="showImgError" slot="img-upload-error" class="error">圖片上傳發生錯誤⋯</p>
        </ElectionBoardUploadForm>
      </section>
      <section class="eb-upload__step-5">
        <img src="/proj-assets/election-board/images/done.png" alt="">
        <span>感謝您提供資料，{{ timeout }} 秒後將自動跳轉回上傳頁面</span>
      </section>
    </main>
    <ElectionBoardBackBtn v-show="showBackBtn"/>
    <input id="camera" ref="camera" type="file" accept="image/*" @change="handleInputChange">
    <canvas ref="canvas"></canvas>
  </section>
</template>

<script>
import ElectionBoardBackBtn from './ElectionBoardBackBtn.vue'
import ElectionBoardUploadForm from './ElectionBoardUploadForm.vue'
import ElectionBoardUploadMap from './ElectionBoardUploadMap.vue'
import axios from 'axios'
import moment from 'moment'
import { get, } from 'lodash'
// import { GOOGLE_API_KEY_ELECTION_BOARD } from 'api/config.js'

const DEFAULT_GPS_DMS = [ 22.6079361, 120.2968442 ]
const MAX_LATITUDE = 26
const MIN_LATITUDE = 21
const MAX_LONGITUDE = 122
const MIN_LONGITUDE = 117

const MAX_IMG_SIZE = 8 * 1024 * 1024 // 8 MB
const MIN_TIMESTAMP = 1546272000 // 2019.01.01

const uploadImage = (store, { file, folderName }) => {
  return store.dispatch('UPLOAD_IMAGE_TO_GCS', { file, folderName })
}

export default {
  name: 'ElectionBoardUpload',
  props: [ 'reload' ],
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
      showImgError: false,
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
  watch: {
    coordinate () {
      this.showMapHint = false
    },
    current (value) {
      switch (value) {
        case 0:
          // clearInterval(this.timer)
          // this.resetData()
          this.reload()
          break
        case 3:
          this.setTimer()
          break
        default:
          break
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
      if (value === 0) this.current = 0
    }
  },
  mounted () {
    this.getSectionAmount()
    this.mounted = true
  },
  methods: {
    checkCoordinate () {
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
      window.ga('send', 'event', 'projects', 'click', 'upload photo confirmed')
    },
    dataURLtoBlob (dataURL) {
      const binary = atob(dataURL.split(',')[1])
      const array = []
      for(let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    },
    filterAddress (addressList) {
      // 過濾 Goolgle 轉換的中文地址
      const regex = /台灣(\D+[縣市])(\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(.+)/
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
    getPosAddress () {
      if (this.coordinate[0] > MIN_LATITUDE && this.coordinate[0] < MAX_LATITUDE &&
      this.coordinate[1] > MIN_LONGITUDE && this.coordinate[1] < MAX_LONGITUDE) {
        const geocoder = new google.maps.Geocoder()
        const coordinate = new google.maps.LatLng(this.coordinate[0], this.coordinate[1])

        axios.get(`/project-api/election-board/google_map?latlng=${this.coordinate[0]},${this.coordinate[1]}`)
          .then((res) => {
            if (res.data.status === 'OK' && res.data.results.length > 0) {
              this.filterAddress(res.data.results)
            }
          })
          .catch((err) => {
            console.log('err', err)
          })
      }
    },
    goToUploadForm () {
      const fd = new FormData()
      fd.append('image', this.imgFile)
      uploadImage(this.$store, { file: fd, folderName: 'election-board' })
      .then(res => {
        this.imgURL = res.data.url
      })
      .catch(() => {
        this.showImgError = true
      })
      this.current = 2
    },
    handleInputChange (e) {
      const file = e.target.files[0]
      if (file) {
        EXIF.getData(file, () => {
          this.imgEXIF = EXIF.getAllTags(file)
          this.processImage(file)
        })
      }
    },
    processImage (file) {
      if (window.File && window.FileReader && window.Blob) {
        this.imgSizeVerified = true
        const reader = new FileReader()
        const image = new Image()
        const context = this.$refs.canvas.getContext('2d')
        const orientation = this.imgEXIF.Orientation
        reader.readAsDataURL(file)
        reader.onload = (img) => {
          image.src = img.target.result
          image.onload = () => {
            const { width, height } = this.resizeImage(image, orientation)
            
            if ([ 5, 6, 7, 8 ].includes(orientation)) {
              this.$refs.canvas.width = height
              this.$refs.canvas.height = width
            } else {
              this.$refs.canvas.width = width
              this.$refs.canvas.height = height
            }
            
            switch (orientation) {
              case 2: context.transform(-1, 0, 0, 1, width, 0); break;
              case 3: context.transform(-1, 0, 0, -1, width, height ); break;
              case 4: context.transform(1, 0, 0, -1, 0, height ); break;
              case 5: context.transform(0, 1, 1, 0, 0, 0); break;
              case 6: context.transform(0, 1, -1, 0, height, 0); break;
              case 7: context.transform(0, -1, -1, 0, height, width); break;
              case 8: context.transform(0, -1, 1, 0, 0, width); break;
              default: context.transform(1, 0, 0, 1, 0, 0);
            }
            context.drawImage(image, 0, 0, width, height)
            const dataUrl = this.$refs.canvas.toDataURL('image/jpeg', .75)
            this.imgFile = this.dataURLtoBlob(dataUrl)
            this.$refs.preview.src = dataUrl
            this.current = 1
          }
        }
      } else {
        this.imgFile = file
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
      }
    },
    // resetData () {
    //   this.address = ''
    //   this.coordinate = undefined
    //   this.imgEXIF = {}
    //   this.imgFile = undefined
    //   this.imgSizeVerified = false
    //   this.imgURL = ''
    //   this.showBackBtn = true
    //   this.showImgError = false
    //   this.showMapHint = false
    //   this.timeout = 3
    //   document.getElementById('camera').value = ''
    // },
    resizeImage (image, orientation) {
      const MAX = 2000
      const widthOrigin = image.width
      const heightOrigin = image.height
      let widthResized = image.width
      let heightResized = image.height
      
      if (widthOrigin > 2000) {
        widthResized = MAX
        heightResized =  Math.ceil(MAX * heightOrigin / widthOrigin)
      }

      return {
        width: widthResized,
        height: heightResized
      }
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
    > canvas
      display none
    > section
      flex 1
      height 100%
      overflow-y auto
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
      // font-weight 300
      // letter-spacing 1px
    img
      width 100%
      margin-top 10px
      border-radius 1px
      & + p
        margin-top 20px
    button
      width 100%
      padding 0
      margin-top 30px
      height 48px
      line-height 48px
      color #000
      font-size 1.25rem
      font-weight 700
      background-color theme-color
      border none
      border-radius 2px
      cursor pointer
  &__step-3
    display flex
    flex-direction column
    .preview
      position relative
      flex 1
      > img
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        height 100%
        // padding-left 25px
        // padding-right 25px
        object-fit contain
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
          padding 10px 14px
          color #de1615
          font-weight 500
          // letter-spacing 1px
          background-color rgb(0,0,0)
          border-radius 5px
    .action
      display flex
      padding 30px 25px 30px 25px
      > div
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        height 48px
        line-height 48px
        color #000
        font-size 1.25rem
        text-align center
        border-radius 2px
        cursor pointer
        @media (min-width 768px)
          border-radius 6px
        > span
          font-weight 700
          // line-height 1
      &--retake
        background-color #a0a0a0
      &--verified
        margin-left 14px
        background-color theme-color
  &__step-4
    position relative
    display flex
    flex-direction column
    // overflow-y auto
    // .map
    //   flex 2
    // .form
    //   flex 3
  &__step-5
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-color theme-color
    > img
      width 52px
      height auto
    > span
      width calc(100% - 50px)
      margin 20px auto 0
      color #000
      font-size 1.25rem
      font-weight 700
      line-height 1.4
      text-align center
@media (min-width: 768px)
  .eb-upload
    &__step-1
      & > div
       width 450px
      & button
        border-radius 6px
    &__step-3
      justify-content center
      padding 40px 0 45px 0
      & .preview
        flex 1
        width 450px
        margin 0 auto
        & > img
          object-fit contain
      .action
        width 450px
        margin 40px auto 0
        padding 0
    &__step-4
      .form
        // flex none
        width 450px
        // height 500px
        margin-left auto
        margin-right auto
    &__step-5
      > img
        width 100px
      > span
        text-align center
</style>
