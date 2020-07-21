<template>
  <article class="game-page">
    <div class="container">
      <div class="profile">
        <h2 class="sub sub--profile">
          請選擇身分證大頭照
        </h2>
        <div class="profile__img">
          <div
            v-for="(profile, idx) in profiles"
            :key="profile"
            class="img-wrapper"
            @click="checkProfile(idx)"
          >
            <img
              :src="`/proj-assets/eid/profile/${profile}.png`"
              alt=""
              :class="{ checked: idx === checkedProfileIdx }"
            >
          </div>
        </div>
      </div>
      <div class="field-list">
        <div class="title-wrapper">
          <h2 class="sub">
            請選擇要放上的欄位
          </h2>
          <div class="description">
            百分比代表目前有多少比例的人跟你有一樣的選擇
          </div>
        </div>
        <div class="field-wrapper">
          <div
            v-for="field in fields"
            :key="field.name"
            class="field"
          >
            <label>
              <input
                v-model="checkedFields"
                type="checkbox"
                :value="field.name"
              >
              <div class="field__mark">
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.6 6.56365L7.88 11.8L15.8 2.20001" stroke="#5F6C11" stroke-width="4" stroke-linecap="round"/></svg>
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.45455L8.6 14L18.5 2" stroke="#5F6C11" stroke-width="4" stroke-linecap="round"/></svg>
              </div>
              <div>
                <div class="field__name">{{ field.name }}</div>
                <div class="field__detail">{{ field.detail }}</div>
              </div>
            </label>
            <div class="field__bar">
              <div :style="{ width: isChecked(field.name) ? field.percentage : 0 }" />
            </div>
            <div class="field__percent">
              {{ isChecked(field.name) ? field.percentage : '--%' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-wrapper-bottom">
      <button
        type="button"
        class="normal normal--two"
        @click="handleSubmit"
      >
        送出
      </button>
      <button
        type="button"
        class="normal normal--two"
        @click="clearFields"
      >
        清除重選
      </button>
    </div>
  </article>
</template>

<script>
import { GOOGLE_SHEET_ID_EID, GOOGLE_SHEET_RANGES_EID } from 'api/config.js'
import { getSheetWithoutRedis, appendSheet } from 'src/api/index.js'
import { fields, fieldsOfIdCards } from '../data/fields.js'

const [RANGE_GAME] = GOOGLE_SHEET_RANGES_EID

export default {
  name: 'GamePage',
  data () {
    return {
      profiles: ['chicken', 'panda', 'frog', 'bear', 'pig', 'koala'],
      fields,
      checkedProfileIdx: 0,
      checkedFields: [],
      hasSubmitted: false,
      totalMatchedFieldsOfIdCards: [0, 0, 0, 0, 0, 0]
    }
  },
  async mounted () {
    const percentages = await this.fetchPercentageOfFields()
    this.fields.forEach(function fillInPercentage (field, idx) {
      const percentage = percentages[idx]
      field.percentage = percentage
    })
  },
  methods: {
    async fetchPercentageOfFields () {
      const response = await getSheetWithoutRedis({
        params: {
          spreadsheetId: GOOGLE_SHEET_ID_EID,
          range: `${RANGE_GAME}!A1:AB1`
        }
      })
      return response.body?.[0] ?? []
    },
    isChecked (fieldName) {
      return this.checkedFields.includes(fieldName)
    },
    handleSubmit () {
      this.submitFields()

      const totalMatchedFieldsOfIdCards = this.countMatchedFieldsOfIdCards()
      const idCardsIdx = this.idxOfMax(totalMatchedFieldsOfIdCards)
      this.$emit('generateResult', [idCardsIdx, this.checkedProfileIdx])
    },
    submitFields () {
      if (this.hasSubmitted) {
        return
      }
      this.hasSubmitted = true

      const checkedValues = this.fields.map(this.generateCheckedValues)
      appendSheet({
        params: {
          spreadsheetId: GOOGLE_SHEET_ID_EID,
          range: `${RANGE_GAME}!A:AB`,
          valueInputOption: 'RAW',
          resource: {
            values: [[...checkedValues, Date.now()]]
          }
        }
      })
    },
    countMatchedFieldsOfIdCards () {
      const result = [...this.totalMatchedFieldsOfIdCards]
      this.fields.forEach((field) => {
        const doHaveTheField = fieldsOfIdCards[field.name]
        if (!doHaveTheField) {
          return
        }

        doHaveTheField.forEach((doesHasTheField, idx) => {
          if (this.isChecked(field.name) === doesHasTheField) {
            result[idx] += 1
          }
        })
      })

      return result
    },
    idxOfMax (arr) {
      return arr.indexOf(Math.max(...arr))
    },
    generateCheckedValues (field) {
      return Number(this.isChecked(field.name))
    },
    clearFields () {
      this.checkedFields = []
    },
    checkProfile (idx) {
      this.checkedProfileIdx = idx
    }
  }
}
</script>

<style lang="stylus">
@import '../variables.styl'

.game-page
  padding-top 35px
  .container
    padding-left 30px
    padding-right 30px
    max-width 722px
    margin-left auto
    margin-right auto
    // 782 = 722 + 30 * 2
    @media (min-width 782px)
      padding-left 0
      padding-right 0
  .profile
    margin-bottom 30px
    @media (min-width $breakpoint-md)
      margin-bottom 45px
    &__img
      display flex
      flex-wrap wrap
      justify-content center
      align-items flex-start
      margin-left -20px
      margin-right -20px
      @media (min-width $breakpoint-md)
        margin-left 0
        margin-right 0
        justify-content space-between
      img
        width 90px
        height 88px
        object-fit cover
        object-position center
        background-color #eae7e0
        border-radius 50%
        display block
        margin-left auto
        margin-right auto
        cursor pointer
        user-select none
        &.checked
          background-color #5f6c11
  .img-wrapper
    width 33.33%
    margin-bottom 10px
    @media (min-width $breakpoint-md)
      width auto
      margin-bottom 0
  .field-list
    letter-spacing 2.5px
    margin-bottom 32px
    @media (min-width $breakpoint-md)
      margin-bottom 60px
  .title-wrapper
    margin-bottom 18px
    @media (min-width $breakpoint-md)
      display flex
      justify-content space-between
      align-items center
  .description
    font-size 13px
    line-height 1.54
    @media (min-width $breakpoint-md)
      font-size 15px
      line-height 2.67
  .field-wrapper
    color rgba(0, 0, 0, 0.87)
    font-weight 700
    user-select none
  .field
    display flex
    align-items center
    + .field
      margin-top 20px
    label
      display flex
      align-items center
      cursor pointer
      width 100%
    input
      display none
      &:checked ~ .field__mark svg
        @media (max-width 767.98px)
          &:first-child
            display block
        @media (min-width $breakpoint-md)
          &:last-child
            display block
    &__mark
      background-color #eae7e0
      width 24px
      height 24px
      border-radius 50%
      margin-right 20px
      display flex
      justify-content center
      align-items center
      @media (min-width $breakpoint-md)
        width 30px
        height 30px
        margin-right 14px
      svg
        display none
        @media (min-width $breakpoint-md)
          transform translate(1px, 1px)
    &__name
      font-size 15px
      line-height 2.67
      @media (min-width $breakpoint-md)
        font-size 18px
        line-height 2.22
    &__detail
      position absolute
      color rgba(0, 0, 0, 0.66)
      font-size 13px
      line-height 1
      font-weight 400
      letter-spacing 0
      transform translateY(-6px)
      @media (min-width $breakpoint-md)
        transform translateY(-4px)
    &__bar
      display none
      @media (min-width $breakpoint-md)
        display block
        background-color #eae7e0
        width 400px
        height 16px
        border-radius 50%
        margin-left auto
        border-radius 8px
        overflow hidden
        flex 0 0 auto
        div
          background-color #5f6c11
          height 100%
          transition width 0.45s
          border-radius 8px
    &__percent
      font-size 18px
      line-height 2.22
      margin-left auto
      text-align right
      flex 0 0 auto
      @media (min-width $breakpoint-md)
        min-width 80px
        margin-left 0
</style>
