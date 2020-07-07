<template>
  <footer>
    <div class="footer__item credits-wrapper">
      <p>
        <span>Journalist: Yu-Ju Lee</span>
        <br>
        <span>Design: Yi-Chian Chen</span>
        <br>
        <span>Engineer: Kai-Wen Hsiung</span>
        <br>
        <span>Translation: Wen-Yen Chen</span>
      </p>
      <p>Data Analysis: Yu-Ju Lee, Hsin-Chan Chieh, Meg Wu, Yu-Chung Cheng’s team at National Chengchi University</p>
    </div>
    <TheDonateFooter class="footer__item" />
    <TheNewsletterSubscribe class="footer__item" style="margin-left: 20px; margin-right: 20px" />
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
  text-align: center;
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
