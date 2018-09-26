<template>
  <div class="app-particles">
    <div :id="idGray"></div>
    <div :id="idGreen"></div>
    <div :id="idYellow"></div>
    <div :id="idRing"></div>
  </div>
</template>

<script>
export default {
  props: {
    isFooterShow: {
      type: Boolean,
      default: false,
    },
    isParticlesBig: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isFooterShow () {
      if (this.isFooterShow && this.isPositionFooter) {
        this.loadParticles()
      }
    }
  },
  data () {
    return {
      idGray: undefined,
      idGreen: undefined,
      idYellow: undefined,
      idRing: undefined,
    }
  },
  computed: {
    isPositionFooter () {
      return this.$el.id === 'section-content-footer-particles'
    }
  },
  methods: {
    loadParticles () {
      particlesJS.load(this.idGray, `/proj-assets/political-contribution/particles-config/gray${this.isParticlesBig ? 'Big' : ''}.json`)
      particlesJS.load(this.idGreen, `/proj-assets/political-contribution/particles-config/green${this.isParticlesBig ? 'Big' : ''}.json`)
      particlesJS.load(this.idYellow, `/proj-assets/political-contribution/particles-config/yellow${this.isParticlesBig ? 'Big' : ''}.json`)
      particlesJS.load(this.idRing, `/proj-assets/political-contribution/particles-config/ring${this.isParticlesBig ? 'Big' : ''}.json`)
    }
  },
  mounted () {
    require('particles.js')

    this.idGray = `${this.$el.id}-gray-particles`
    this.idGreen = `${this.$el.id}-green-particles`
    this.idYellow = `${this.$el.id}-yellow-particles`
    this.idRing = `${this.$el.id}-ring-particles`

    this.loadParticles()
  }
}
</script>

<style lang="stylus" scoped>
.app-particles
  // position relative
  div
    position absolute
    top 0
    width 100%
    height 100%
</style>

