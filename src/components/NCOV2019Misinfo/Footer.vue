<template>
  <footer>
    <div class="footer__item credits-wrapper">
      <p>
        <span>記者：李又如</span>
        <span>設計：陳怡蒨</span>
        <span>工程：熊凱文</span>
      </p>
      <p>資料：李又如、簡信昌、吳冠賢、政治大學鄭宇君團隊</p>
      <p>出版時間 2020/07/07</p>
    </div>
    <TheDonateFooter class="footer__item" />
    <TheNewsletterSubscribe
      class="footer__item"
      style="margin-left: 20px; margin-right: 20px"
    />
  </footer>
</template>

<script>
import TheDonateFooter from './TheDonateFooter.vue'
import Subscription from 'src/components/Subscription.vue'
import TheNewsletterSubscribe from './TheNewsletterSubscribe.vue'

export default {
  components: {
    TheDonateFooter,
    Subscription,
    TheNewsletterSubscribe
  }
}
</script>

<style scoped>
footer {
  max-width: 820px;
  margin: 0 auto;
  padding-bottom: 100px;
}

.credits-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #9f9f9f;
  font-size: 15px;
  margin: 0 20px;
}
.credits-wrapper p {
  margin: 5px 0;
  line-height: 1.75;
}
.credits-wrapper span + span {
  margin: 0 0 0 10px;
}

.footer__item + .footer__item {
  margin: 50px 0 0 0;
}
</style>
