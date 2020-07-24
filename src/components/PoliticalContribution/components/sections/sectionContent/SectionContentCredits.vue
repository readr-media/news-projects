<template>
  <div class="story-credits">
    <template v-if="!isNewCredit">
      <div class="story-credits__row story-credits__row--mobile-break">
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.WRITER.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.WRITER.MEMBER') }}
        </p>
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.DESIGN.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.DESIGN.MEMBER') }}
        </p>
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.FE.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.FE.MEMBER') }}
        </p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.DATA.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.DATA.MEMBER[0]') }}、{{ $t('POLITICAL_CONTRIBUTION.CREDITS.DATA.MEMBER[1]') }}
        </p>
      </div>
      <div v-if="showSpecialThanks" class="story-credits__row">
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.ANALYSIS.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.ANALYSIS.MEMBER') }}
        </p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__published-date">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.RELEASE_DATE') }}{{ publishedDate }}
        </p>
        <p v-if="!!updatedDate" class="story-credits__updated-date">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.UPDATED_DATE') }}{{ updatedDate }}
        </p>
      </div>
    </template>
    <template v-else>
      <div class="story-credits__row story-credits__row--mobile-break">
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.WRITER.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.WRITER.MEMBER') }}
        </p>
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.DESIGN.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.DESIGN.MEMBER') }}
        </p>
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.FE.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.FE.MEMBER') }}
        </p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__credit story-credits__credit--line-break">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.COOP.WORDING') }}<br><a href="https://ronny.tw/" target="_blank">{{ $t('POLITICAL_CONTRIBUTION.CREDITS.COOP.MEMBER[0]') }}</a>、<br>{{ $t('POLITICAL_CONTRIBUTION.CREDITS.COOP.MEMBER[1]') }}、<br><a href="https://campaign-finance.g0v.ctiml.tw/" target="_blank">{{ $t('POLITICAL_CONTRIBUTION.CREDITS.COOP.MEMBER[2]') }}</a>
        </p>
      </div>
      <div v-if="showSpecialThanks" class="story-credits__row">
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.ANALYSIS.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.ANALYSIS.MEMBER') }}
        </p>
      </div>
      <div v-if="showConsultant" class="story-credits__row">
        <p class="story-credits__credit">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.ANALYSIS.WORDING') }}{{ $t('POLITICAL_CONTRIBUTION.CREDITS.ANALYSIS.MEMBER') }}
        </p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__published-date">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.RELEASE_DATE') }}{{ publishedDate }}
        </p>
        <p v-if="!!updatedDate" class="story-credits__updated-date">
          {{ $t('POLITICAL_CONTRIBUTION.CREDITS.UPDATED_DATE') }}{{ updatedDate }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    showSpecialThanks: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    updatedDate: {
      type: String,
      required: false,
    },
    isNewCredit: {
      type: Boolean,
      default: false,
    },
    showConsultant: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="stylus" scoped>
.story-credits
  display flex
  flex-direction column
  justify-content center
  align-items center
  margin 40px 0 48px 0
  &__row
    display flex
    font-size 17px
    text-align center
    color #808080
    margin 4px 0
    &--more-margin-bottom
      margin 4px 0 8px 0
  &__mm-logo
    width 40px
    height auto
  &__credit
    margin 0
    & + &
      margin 0 0 0 8px
    & > a
      color #808080
    &--line-break
      br
        display none
  &__published-date
    margin 0
  &__updated-date
    margin 0
    margin-left 8px

@media (max-width 1024px)
  .story-credits
    margin 25px 0
    &__row
      font-size 18px
      &--mobile-break
        margin 0
        flex-direction column
        .story-credits__credit
          margin 4px 0
    &__credit
      &--line-break
        line-height 1.3
        br
          display initial
</style>

