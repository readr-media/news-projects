export default {
  isCountyOnlyHasOneDistrict: (state) => (county) => {
    return county.match(/宜蘭縣|花蓮縣|金門縣|基隆市|連江縣|新竹市|嘉義市|臺東縣|澎湖縣/gi)
  }
}