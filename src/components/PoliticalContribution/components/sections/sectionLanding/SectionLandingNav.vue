<template>
  <div class="section-landing-nav" @click="navigate(hint)">
    <ButtonSectionLanding class="section-landing-nav__icon" :iconSrc="iconSrc"/>
    <p class="section-landing-nav__hint" v-text="hint.text"></p>
  </div>
</template>

<script>
import { get, } from 'lodash'
import ButtonSectionLanding from '../../buttons/ButtonSectionLanding.vue'

export default {
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
    hint: {
      type: Object,
      required: true,
    },
  },
  components: {
    ButtonSectionLanding,
  },
  methods: {
    navigate (hint) {
      const type = get(hint, 'type', '')
      const link = get(hint, 'link', '')

      if (type === 'router-link') {
        this.$router.push(`/project/political-contribution/${link}`)
        this.$scrollTo('.section-content')
      } else if (type === 'href') {
        window.open(link)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-landing-nav
  display flex
  flex-direction column
  align-items center
  &__icon
    cursor pointer
  &__hint
    cursor pointer
    font-size 24px
    font-weight 500
    margin 15px 0

@media (max-width 1024px)
  .section-landing-nav
    flex-direction row
    &__hint
      margin 0 0 0 10px

@media (max-width 425px)
  .section-landing-nav
    // margin 5px 0
    &__hint
      font-size 20px

@media (max-width 320px)
  .section-landing-nav
    &__hint
      font-size 16px
</style>

