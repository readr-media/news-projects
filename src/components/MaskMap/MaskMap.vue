<template>
  <div class="mask-map" :style="{ height: `${this.$store.state.viewport[ 1 ]}px` }">
    <div class="map" ref="map" @touchstart="handleTochstartMap" />
    <IntroInfo />
    <SearchBar @showPopupInfo="showPopupInfo" ref="searchBar" />
    <LegendField />
    <PharmacyInfo :isShow="isShowPharmacyInfo" :infoData="pharmacyInfoData" @closeInfo="isShowPharmacyInfo = false" :isLoading="isLoadingPharmacy" :infoDataStatus="pharmacyInfoDataStatus" />
    <CommonInfo />
    <PopupInfo :isShow="isShowPopupInfo" :infoData="popupInfoData" :isLoading="isLoadingPopup" @closeInfo="closePopupInfo" />
    <RelatedPosts />
  </div>
</template>

<script>
import IntroInfo from './components/IntroInfo.vue'
import PopupInfo from './components/PopupInfo.vue'
import SearchBar from './components/SearchBar.vue'
import LegendField from './components/LegendField.vue'
import PharmacyInfo from './components/PharmacyInfo.vue'
import CommonInfo from './components/CommonInfo.vue'
import RelatedPosts from './components/RelatedPosts.vue'

import mapStyle from './data/mapStyle.js'
import { get } from 'axios'

// 110台北市信義區巿府路1號
const DEFAULT_CENTER = { lat: 25.037891, lng: 121.564008 }
const DEFAULT_ZOOM = 16

export default {
  name: 'MaskMap',
  metaInfo () {
    return {
      title: '即時口罩存量查詢地圖',
      description: '因應新型冠狀病毒（武漢肺炎）疫情，從 2 月 6 日起，口罩採實名制購買，需要的民眾得依照身分證／居留證號尾數在指定日期，攜帶健保卡前往藥局購買。READr 依照最新資料製作實時口罩地圖，快來查詢離你最近的口罩購買處！',
      metaUrl: 'maskmap',
      metaImage: 'maskmap/img/og.jpg'
    }
  },
  components: {
    IntroInfo,
    SearchBar,
    LegendField,
    PharmacyInfo,
    CommonInfo,
    PopupInfo,
    RelatedPosts
  },
  beforeMount () {
    // google.maps.event.addDomListenerOnce(window, 'load', this.initAfterLoad)
    window.addEventListener('load', this.initAfterLoad, { once: true })
  },
  data () {
    return {
      map: null,
      isShowPharmacyInfo: false,
      isShowPopupInfo: false,
      pharmacyInfoData: {},
      pharmacyInfoDataStatus: 'U',
      popupInfoData: {
        status: 'opening',
        question: '地圖需要取得你現在的位置',
        optionA: '好',
        optionB: '自己輸入地址'
      },
      manMarker: null,
      isLoadingPopup: false,
      isLoadingPharmacy: false,
      positionErrorInfo: {
        status: 'position error',
        question: '抱歉，地圖取得不到你的位置',
        optionA: '改成輸入地址',
        optionB: '再定位一次'
      }
    }
  },
  methods: {
    initAfterLoad () {
      this.initMap()
    },
    initMap () {
      this.showLoading()
      this.map = new google.maps.Map(this.$refs.map, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyle
      })
      google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.handleTilesLoaded)
    },
    handleTilesLoaded () {
      this.map.data.loadGeoJson('https://storage.googleapis.com/projects.readr.tw/coronavirus2019/location_only.geojson', {}, () => {
        this.isLoadingPopup = false
        this.map.data.setStyle(this.setPharmacyMarkerStyle)
        this.map.data.addListener('click', this.showPharmacyInfo)
      })
      this.manMarker = new google.maps.Marker({
        map: this.map,
        position: DEFAULT_CENTER,
        icon: '/proj-assets/maskmap/img/man.svg'
      })
    },
    setPharmacyMarkerStyle (feature) {
      const status = feature.getProperty('s')
      let suffix = ''
      if (status === 'O') { suffix = 'over' }
      else if (status === 'U') { suffix = 'under' }
      else if (status === 'N') { suffix = 'none' }
      else { suffix = '0' }
      return { icon: `/proj-assets/maskmap/img/location-${suffix}-1.svg` }
    },
    getCurrentPosition () {
      this.showLoading()
      const { geolocation } = navigator
      if (geolocation) {
        geolocation.getCurrentPosition(
          (pos) => {
            const position = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            this.map.setCenter(position)
            this.map.setZoom(DEFAULT_ZOOM)
            this.manMarker.setMap(null)
            this.manMarker = new google.maps.Marker({
              map: this.map,
              position,
              icon: '/proj-assets/maskmap/img/man.svg'
            })
            get(`/project-api/election-board/google_map?latlng=${position.lat},${position.lng}`).then((res) => {
              const { status, results } = res.data
              if (status === 'OK') {
                this.$refs.searchBar.address = this.formatAddress(results[ 0 ][ 'formatted_address' ])
              } else {
                console.error(status)
              }
            })
            this.closePopupInfo()
          },
          (err) => {
            this.showPopupInfo(this.positionErrorInfo)
            console.error(err)
          }
        )
      } else {
        this.showPopupInfo(this.positionErrorInfo)
        console.error('"Browser doesn\'t support Geolocation')
      }
    },
    showPopupInfo (infoData) {
      this.isLoadingPopup = false
      this.popupInfoData = infoData
      this.isShowPopupInfo = true
    },
    showLoading () {
      this.isShowPopupInfo = true
      this.isLoadingPopup = true
    },
    showPharmacyInfo (evt) {
      const key = evt.feature.getProperty('i')
      const status = evt.feature.getProperty('s')
      const { data } = this.$store.state.maskMap
      this.isShowPharmacyInfo = true
      if (key in data) {
        this.pharmacyInfoData = data[ key ]
      } else {
        this.isLoadingPharmacy = true
        this.$store.dispatch('maskMap/fetchById', key).then(() => {
          const defaultInfoData = {
            name: '無資料',
            tel: '無資料',
            add: '無資料',
            adult: '無資料',
            child: '無資料',
            update: '無資料'
          }
          this.pharmacyInfoData = data[ key ] || defaultInfoData
          this.isLoadingPharmacy = false
        })
      }
      this.pharmacyInfoDataStatus = status
    },
    closePopupInfo () {
      this.isShowPopupInfo = false
    },
    formatAddress (address) {
      let output = address
      const idx = output.indexOf('台灣')
      return idx > -1 ? output.slice(idx + 2) : output
    },
    handleTochstartMap () {
      this.$refs.searchBar.closeShare()
      document.getElementById('address-input').blur()
    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

$ff-sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif
$easeOutCirc = cubic-bezier(0.075, 0.82, 0.165, 1)

html
  font-size 10px
  font-family $ff-sans-serif
body
  color rgba(0, 0, 0, 0.87)
  background-color #000
.mask-map
  max-width 420px
  position relative
  margin-left auto
  margin-right auto
  overflow hidden
.map
  height 100%
input
  appearance none
input, button
  font-family $ff-sans-serif

.slide
  &-enter-active, &-leave-active
    transition all 0.3s $easeOutCirc
  &-enter, &-leave-to
    transform translateY(100%)
    opacity 0
.fade
  &-enter-active, &-leave-active
    transition opacity 0.3s $easeOutCirc
  &-enter, &-leave-to
    opacity 0
</style>
