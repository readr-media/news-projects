<template>

<div id="mainWrapper">

<!-- <logo :top="`12px`" :left="`15px`" :bgColor="`#544356`" :bgImage="`/proj-assets/dollclaw/images/navbtn.png`"></logo>
<share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#544356`"></share> -->
<app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/dollclaw/images/logo_readr.png"></app-logo>
<app-share :shareUrl="shareLink" top="20px" right="20px" bgColor="#544356" direction="down"></app-share>

<dc-opening v-bind:wwidth="wwidth" v-bind:wheight="wheight"></dc-opening>
<dc-article></dc-article>

</div>

</template>

<script>
// common
import { READR_SITE_URL } from '../../constants'
import titleMeta from "../../util/titleMeta";
import Logo from "../Logo.vue";
import Share from "../Share.vue";

// section
import dcOpening from "./dcOpening.vue";
import dcArticle from "./dcArticle.vue";

export default {

  mixins: [titleMeta],

  components: {
    'app-logo': Logo,
    'app-share': Share,

    'dc-opening': dcOpening,
    'dc-article': dcArticle


  },

  data: function() {
    return {
      shareLink: `${READR_SITE_URL}dollclaw`,

      wwidth: 0,
      wheight: 0

    };
  },

  metaInfo() {
    let ogTitle = "夾娃娃機專題";
    let description = "夾娃娃機專題";
    let metaUrl = "dollclaw";
    let ogImage = "dollclaw/images/og.jpg";

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  props: {},

  watch: {},

  computed: {},

  methods: {

    getWindowSize: function(){
   
        let w = document.getElementById('mainWrapper').offsetWidth;      
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.wwidth = w;
        this.wheight = h;
      }

  },

  created() {
    //current device
    // this.currentDevice = this.$store.state.isMobile ? "mobile" : "desktop";
    // console.log("device: " + this.currentDevice);
  },

  beforeMount: function(){

    this.getWindowSize()

    window.addEventListener('resize', () => {
      this.getWindowSize();
    });

  },

  mounted: function() {

    // this.getWindowSize()

    // window.addEventListener('resize', () => {
    //   this.getWindowSize();
    // });


    
  }

};
</script>

<style>
@import "./style/common.css";
</style>
