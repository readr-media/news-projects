<template>

<div id="mainWrapper">

<app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/dollclaw/images/logo_readr.png"></app-logo>
<app-share :shareUrl="shareLink" top="20px" right="20px" bgColor="#544356" direction="down"></app-share>

<div class="deco-claw">
  <div class="centerwpr">
    <div class="deco-claw--pic"></div>
  </div>
</div>

<dc-opening></dc-opening>
<dc-article></dc-article>
<dc-footer></dc-footer>

</div>

</template>

<script>
// common
import { READR_SITE_URL } from '../../constants';
import titleMeta from '../../util/titleMeta';
import Logo from '../Logo.vue';
import Share from '../Share.vue';

// section
import dcOpening from './dcOpening.vue';
import dcArticle from './dcArticle.vue';
import dcFooter from './dcFooter.vue';

export default {

  name: 'Dollclaw',

  mixins: [titleMeta],

  components: {
    'app-logo': Logo,
    'app-share': Share,

    'dc-opening': dcOpening,
    'dc-article': dcArticle,
    'dc-footer': dcFooter
  },  

  metaInfo() {
    let ogTitle = '夾娃娃機專題';
    let description = '夾娃娃機專題';
    let metaUrl = 'dollclaw';
    let ogImage = 'dollclaw/images/og.jpg';

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  data: function() {
    return {
      shareLink: `${READR_SITE_URL}dollclaw`
    };
  },

  props: {},

  watch: {},

  computed: {},

  methods: {},

  created() {
    //current device
    // this.currentDevice = this.$store.state.isMobile ? "mobile" : "desktop";
    // console.log("device: " + this.currentDevice);
  },

  beforeMount: function() {},

  mounted: function() {
    // scroll to content
    document.querySelectorAll('.btn-scrolldown').forEach(element => {
      element.addEventListener('click', () => {

        let offset = document.querySelector('.openingwpr').offsetHeight;

        window.scroll({
          top: offset, 
          left: 0, 
          behavior: 'smooth' 
        });
          // document.querySelector('.sectionwpr.intro').scrollIntoView({
          //   behavior: 'smooth'
          // });
        },
        false
      );
    });
  }
};
</script>

<style>
@import './style/common.css';
</style>

<style scoped>

.deco-claw {position:fixed; width:100%; left:0; top:0;}
.deco-claw--pic {width:83px; height:393px;
position:absolute; right:-83px; top:-45px;
background-image:url("/proj-assets/dollclaw/images/deco-claw.png");
background-size:100% auto; background-repeat:no-repeat;
}




/* ---------- RWD ---------- */
@media screen and (max-width: 1000px) {

  .deco-claw {display:none;}

}

</style>
