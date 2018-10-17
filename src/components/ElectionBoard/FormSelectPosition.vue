<template>
  <div class="select-position">
    <div class="row">
      <div class="select-container">
        <select
          v-model="countySelected"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus">
          <option v-for="county in counties" :key="county" :value="county" v-text="`${county}`"></option>
        </select>
      </div>
      <div class="select-container">
        <select
          v-model="districtSelected"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus">
          <option v-for="district in districts" :key="district" :value="district" v-text="`${district}`"></option>
        </select>
      </div>
    </div>
    <template v-if="showAdvanced">
      <input v-model="road" type="text" @keyup="showBtn = true">
      <button v-show="showBtn" @click="validateAddress">更新地圖位置</button>
    </template>
    <span v-show="errors.length > 0" class="error">請選擇/輸入正確的 {{ errors.includes('district') ? '行政區' : '' }} {{ errors.includes('road') ? '街道路名' : '' }} </span>
  </div>
</template>
<script>
import axios from 'axios'
import { ADMINISTRATIVE_DISTRICT, } from './constants'

const REGEX_ADDRESS = /(\D+[縣市])(\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(.+)/

export default {
  name: 'FormSelectPosition',
  props: {
    address: {
      type: String,
    },
    showAdvanced: {
      default: false
    }
  },
  data () {
    return {
      countySelected: this.getCounty(this.address),
      districtSelected: this.getDistrict(this.address),
      errors: [],
      road: this.getRoad(this.address),
      showBtn: false,
    }
  },
  computed: {
    addressSelected () {
      return `${this.countySelected}${this.districtSelected}${this.road}`
    },
    counties () {
      const list = ADMINISTRATIVE_DISTRICT || []
      return list.map(item => item.county)
    },
    districts () {
      const county = ADMINISTRATIVE_DISTRICT.filter(item => item.county === this.countySelected) || []
      return county[0].districts || []
    },
  },
  watch: {
    address (value) {
      this.showBtn = false
      this.countySelected = this.getCounty(value)
      this.districtSelected = this.getDistrict(value)
      this.road = this.getRoad(value)
    },
    countySelected (value) {
      this.districtSelected = this.districts[0]
      this.$emit('updateCounty', value)
    },
    districtSelected (value) {
      this.$emit('updateDistrict', value)
    },
  },
  methods: {
    formatAddress (address) {
      let output = address
      const index = output.indexOf('台灣')
      if (index > -1) {
        output = output.slice(index + 2)
      }
      return output
    },
    getCounty (address) {
      if (address.match(REGEX_ADDRESS) && address.match(REGEX_ADDRESS).length > 4) {
        return address.match(REGEX_ADDRESS)[1]
      }
      return '台北市'
    },
    getDistrict (address) {
      if (address.match(REGEX_ADDRESS) && address.match(REGEX_ADDRESS).length > 4) {
        return address.match(REGEX_ADDRESS)[2]
      }
      return '信義區'
    },
    getRoad (address) {
      if (address.match(REGEX_ADDRESS) && address.match(REGEX_ADDRESS).length > 4) {
        return address.match(REGEX_ADDRESS)[4]
      }
      return ''
    },
    handleSelectBlur (e) {
      e.target.parentNode.classList.remove('open')
    },
    handleSelectChange (e) {
      this.showBtn = true
      e.target.parentNode.classList.remove('open')
    },
    handleSelectFocus (e) {
      e.target.parentNode.classList.add('open')
    },
    validateAddress () {
      this.errors = []
      if (!this.road) {
        this.errors.push('road')
      }
      if (!this.districts.includes(this.districtSelected)) {
        this.errors.push('district')
      }
      if (this.errors.length === 0) {
        const geocoder = new google.maps.Geocoder()

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.addressSelected}&key=AIzaSyCgwPtUjWMKGKdp62Hnank6TTl3lhXwa3o&language=zh-TW`)
          .then(res => {
            if (res.data.status === 'OK' && res.data.results.length > 0) {
              const addressFormatted = this.formatAddress(res.data.results[0].formatted_address)
              const coordinate = [ res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng ]
              this.$emit('updateAddress', addressFormatted)
              this.$emit('updateCoordinate', coordinate)
            } else {
              this.errors.push('district')
            }
          })
          .catch(err => {
            this.errors.push('district')
          })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.select-position
  margin-top .5em
  text-align right
  > input
    width 100%
    height 30px
    margin-top .5em
    padding-left .5em
    line-height 30px
    background-color #a0a0a0
    border none
    border-radius 2px
  > button
    width 100%
    margin-top .5em
    padding .5em 0
    font-weight 500
    letter-spacing 1px
    background-color #fa6e59
    border none
    border-radius 2px
  .row
    display flex
    justify-content space-between
  .select-container
    position relative
    width calc(50% - 5px)
    background-color #a0a0a0
    border-radius 2px
    &.open
      &::after
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
    select
      position relative
      z-index 10
      width 100%
      height 30px
      padding 0
      text-indent .5em
      line-height 30px
      background-color transparent
      border none
      -webkit-appearance none
      -moz-appearance none
      appearance none
  .error
    color #fa6e59
    font-size .8rem
</style>
