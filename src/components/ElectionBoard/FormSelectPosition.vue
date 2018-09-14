<template>
  <div class="select-position">
    <div class="row">
      <div class="select-container">
        <select
          v-model="countySelected"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus">
          <option v-for="county in counties" :key="county" :value="county" v-text="`${county}市`"></option>
        </select>
      </div>
      <div class="select-container">
        <select
          v-model="districtSelected"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus">
          <option v-for="district in districts" :key="district" :value="district" v-text="`${district}區`"></option>
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
import { ADMINISTRATIVE_DISTRICT, } from './constants'

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
      return `${this.countySelected}市${this.districtSelected}區${this.road}`
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
      this.road = value.split('區')[1]
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
      const regexCounty = /(..)市/
      if (address.match(regexCounty)) {
        return address.match(regexCounty)[1]
      }
      return '台北'
    },
    getDistrict (address) {
      const regexDistrict = /市(.*?)區/
      if (address.match(regexDistrict)) {
        return address.match(regexDistrict)[1]
      }
      return '信義'
    },
    getRoad (address) {
      return address.split('區')[1]
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
        const regex = new RegExp('(?=.*市)(?=.*區)(?=.*路)')
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: this.addressSelected }, (results, status) => {
          if (status === 'OK' && results.length > 0) {
            const addressFormatted = this.formatAddress(results[0].formatted_address)
            const coordinate = [ results[0].geometry.location.lat(), results[0].geometry.location.lng() ]
            this.$emit('updateAddress', addressFormatted)
            this.$emit('updateCoordinate', coordinate)
          } else {
            this.errors.push('district')
          }
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
      background-color transparent
      border none
      -webkit-appearance none
      -moz-appearance none
      appearance none
  .error
    color #fa6e59
    font-size .8rem
</style>
