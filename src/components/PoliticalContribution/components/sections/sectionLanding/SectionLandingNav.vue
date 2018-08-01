<template>
  <div
    :class="[ 'section-landing-nav',
      { 'section-landing-nav--hint-right': hintsOrientation === 'right' },
      { 'section-landing-nav--hint-left': hintsOrientation === 'left' }
    ]"
  >
    <ButtonSectionLanding
      class="section-landing-nav__icon"
      :iconSrc="iconSrc"
      @click.native="navigate(hints[0])"
    />
    <div
      :class="[ 'section-landing-nav__hints',
        { 'section-landing-nav__hints--right': hintsOrientation === 'right' },
        { 'section-landing-nav__hints--left': hintsOrientation === 'left' }
      ]"
    >
      <a
        class="section-landing-nav__hint"
        v-for="hint in hints"
        :key="hint.text"
        v-text="hint.text"
        @click="navigate(hint)"
      >
      </a>
    </div>
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
    hints: {
      type: Array,
      default () {
        return []
      }
    },
    hintsOrientation: {
      type: String,
      required: true,
      validator (value) {
        return [ 'right', 'left' ].indexOf(value) !== -1
      }
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
  width max-content
  &--hint-right
    flex-direction row
    // align-self flex-start
  &--hint-left
    flex-direction row-reverse
    // align-self flex-end
  &__icon
    cursor pointer
  &__hints
    display flex
    flex-direction column
    justify-content center
    &--right
      margin 0 0 0 32px
      align-items flex-start
    &--left
      margin 0 32px 0 0
      align-items flex-end
  &__hint
    cursor pointer
    font-size 32px
    font-weight 500
    white-space nowrap
    margin 5px 0
</style>

