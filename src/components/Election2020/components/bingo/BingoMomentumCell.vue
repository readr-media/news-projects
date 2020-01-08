<template>
  <div class="bingo-momentum-cell">
    <div class="bingo-momentum-number">
      <div>{{index+1}}</div>
    </div>
    <div class="bingo-momentum-zone">
      <div class="bingo-momentum-name">{{candidateName}}</div>
      <div>{{zoneName}}</div>
      <div>{{zoneDesc}}</div>
    </div>
    <div class="bingo-momentum-party" :class="partybgClass">{{partyName}}</div>
  </div>
</template>

<script>

export default {
  props: {
    index: Number,
    candidateName: String,
    zoneName: String,
    zoneDesc: String,
    partyName: String,
  },
  computed: {
    partybgClass: function() {
      switch (this.partyName) {
        case '國民黨':
          return "partybg-kmt"
        case '民進黨':
          return "partybg-dpp"
        case '無黨籍':
          return "partybg-no"
        default:
          return "partybg-other"
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.bingo-momentum-cell
  display flex
  flex-direction row
  justify-content space-between
  background-color white
  width 80%
  height 16vh
.bingo-momentum-zone
  display flex
  flex-direction column
  justify-content center
  text-align left
.bingo-momentum-number
  display flex
  align-items center
  font-size 1.9rem
  font-weight bold
  font-family $font-family-serif
  margin auto 1.8rem
.bingo-momentum-party
  display flex
  align-items center
  justify-content center
  margin 0 0 0 10px
  padding 10px
  height 100%
  width 27%
.bingo-momentum-name
  font-size 1.5rem
  font-family $font-family-serif
  margin-bottom 8px


.partybg-kmt
  background-color $color-blue-light
.partybg-dpp
  background-color $color-green-light
.partybg-no
  background-color $color-gray-light
.partybg-other
  background-color $color-purple-light

@media (min-width: 768px)
  .bingo-momentum-cell
    width 32%
</style>