<template>
  <div class="eb-map">
    <div id="map"></div>
    <div v-show="showMapHint" class="eb-map__hint" @click="$emit('closeMapHint')">移動地圖以取得正確位置</div>
  </div>
</template>
<script>

import { throttle } from 'lodash' 

export default {
  name: 'ElectionBoardUploadMap',
  props: {
    coordinate: {
      type: Array,
      default () {
        return []
      }
    },
    showMapHint: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inited: false,
      map: undefined,
      mapMarker: undefined,
    }
  },
  computed: {

  },
  watch: {
    coordinate (value) {
      if (this.inited) {
        const latlng = new google.maps.LatLng(value[0], value[1])
        this.map.setCenter(latlng)
        this.mapMarker.setPosition(latlng)
      } else {
        this.initMap()
      }
    }
  },
  methods: {
    initMap () {
      this.inited = true
      const coord = new google.maps.LatLng(this.coordinate[0], this.coordinate[1])
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: coord,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      })
      this.map.addListener('dragend', () => {
        const latlng = new google.maps.LatLng(this.map.center.lat(), this.map.center.lng())
        this.mapMarker.setPosition(latlng)
        this.$emit('updateCoordinate', [ this.map.center.lat(), this.map.center.lng() ])
      })
      this.mapMarker = new google.maps.Marker({position: {lat: this.map.center.lat(), lng: this.map.center.lng() }, map: this.map })
    }
  }
}
</script>
<style lang="stylus" scoped>
.eb-map
  position relative
  #map
    height 100%
  &__hint
    display flex
    justify-content center
    align-items center
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    font-size .875rem
    background-color rgba(0,0,0, .75)
</style>
