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
      <div
        class="section-landing-nav__hint-container hint-container"
        v-for="hint in hints"
        :key="hint.text"
      >
        <div v-if="hint.isNewContent || false" class="hint-container__new-notification">NEW</div>
        <a
          class="hint-container__hint"
          v-text="hint.text"
          @click="navigate(hint)"
        >
        </a>
      </div>
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
      margin 0 0 0 20px
      align-items flex-start
    &--left
      margin 0 20px 0 0
      align-items flex-end
  &__hint-container
    margin 5px 0
    display flex
    align-items center

.hint-container
  &__hint
    cursor pointer
    font-size 24px
    font-weight 500
    white-space nowrap
  &__new-notification
    margin 0 11px 0 0
    background-color #9e005d
    color white
    border-radius 50%
    padding 10px 5px

@media (max-width 1024px)
  .section-landing-nav
    margin 5px 0
    &--hint-left
      flex-direction row
    &__hints
      &--right
        margin 0 0 0 20px
      &--left
        margin 0 0 0 20px
        align-items flex-start

  .hint-container
    &__new-notification
      display none

@media (max-width 425px)
  .section-landing-nav
    margin 5px 0
    &--hint-left
      flex-direction row
    &__hints
      &--right
        margin 0 0 0 11px
      &--left
        margin 0 0 0 11px
        align-items flex-start

  .hint-container
    &__hint
      font-size 20px
    &__new-notification
      display none

// @media (max-width 375px)
//   .section-landing-nav
//     margin 5px 0
//     &--hint-left
//       flex-direction row
//     &__hints
//       &--right
//         margin 0 0 0 11px
//       &--left
//         margin 0 0 0 11px
//         align-items flex-start
//     &__hint
//       font-size 20px

@media (max-width 320px)
  .hint-container
    &__hint
      font-size 16px
    &__new-notification
      display none
</style>

