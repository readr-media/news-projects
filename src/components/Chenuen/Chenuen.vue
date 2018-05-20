<template>

<!-- /project/chenuen/page -->
<div v-if="getParams == 'page'">

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <page></page>
</div>

<!-- /project/chenuen/pagem 手機版暫時 -->
<div v-else-if="getParams == 'pagem'">

  <logo :top="`2px`" :left="`6px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`2px`" :left="`54px`" :bgColor="`#b1adca`"></share>

  <pagem></pagem>
</div>

<!-- Homepage -->
<div v-else>

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <div class="outerwpr">
    <div class="scroller">
      <div class="container">      
        <home></home>
        <page></page>
      </div>
    </div>
  </div>  

</div>

</template>

<script>
//common
import { SITE_URL } from "../../constants";
import titleMeta from "../../util/titleMeta";
import Logo from '../Logo.vue';
import Share from '../Share.vue';

//plugins
import _ from 'lodash';

// pages
import home from './Home.vue';
import page from './Page.vue';
import pagem from './Pagem.vue';

// script
import {
  getContentHeight,
  scrollAction,
  wheelContent,
  resizeAction,
  slideToSection
} from './common/desktopScroll.js';

export default {

  name: "ChenUenProject",

  mixins: [titleMeta],

  components: {
    'logo': Logo,
    'share': Share,

    'home': home,
    'page': page,
    'pagem': pagem
  },

  computed: {
    getParams() {
      //取得網址列參數
      return _.get(this.$route, "params.params");
    }
  },

  data: function() {
    return {
      shareLink: `${SITE_URL}chenuen`,
      // shareLinkOpinion: `${SITE_URL}farmhouse/opinion`,
      // shareLinkFaq: `${SITE_URL}farmhouse/faq`,
      // shareLinkGallery: `${SITE_URL}farmhouse/gallery`
      currentDevice: '',

      wheelDirection: '',  
      
      // wrapperTimer: null, 
      scrollTimer: null,

      // scroller: null,
      container: null,
      homewpr: null,
      homeIntro: null,
      galleryProgress: null,

      introVisibility: false,
      galleryVisibility: false

    };
  },

  metaInfo() {
    let ogTitle = "鄭問專題";
    let description = "鄭問專題";
    let metaUrl = "chenuen";
    let ogImage = "chenuen/images/og.jpg";

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  methods: {

    getContentHeight,  
    scrollAction,
    wheelContent,
    resizeAction,
    slideToSection

  },

  created () {    
    //current device
    this.currentDevice = this.$store.state.isMobile ? 'mobile' : 'desktop';
    console.log("device: " + this.currentDevice);
  },

  mounted: function() {

    let wrapper = document.querySelector('.outerwpr');

    // this.scroller = document.querySelector('.scroller');
    this.container = document.querySelector('.container');    
    this.homewpr = document.querySelector('.homewpr');
    this.homeIntro = document.querySelector('.home-intro');
    this.galleryProgress = document.getElementById('galleryProgress');

/* -------------------- desktop start -------------------- */

    if(this.currentDevice == 'desktop'){

      if(wrapper.scrollTop != 1){
        wrapper.scrollTop = 1;
      }  

      //reset container top position 
      this.container.style.top = '0px';    
 
    /* ---------- scroll ---------- */

      // 用 throttle 包住要執行的動作
      let scrollThrottle = _.throttle(() => {    

        console.log('--- invoke function ---');
        this.scrollAction(this);         

      }, 1200, {
        'trailing': false
      });

      // wrapper scroll (with throttle)
      wrapper.addEventListener('scroll', scrollThrottle);

      wrapper.addEventListener('scroll', () => {
        // 讓內容鎖住不捲動，只需要判斷有觸發 scroll event        
        wrapper.scrollTop  = 1;
        console.log('scroll');
      });

    /* ---------- wheel ---------- */

      // 用 throttle 包住要執行的動作
      let wheelThrottle = _.throttle((event) => {

        this.wheelContent(event,this);

      }, 1200, {
        'trailing': false
      });

      wrapper.addEventListener('wheel', wheelThrottle);

    /* ---------- resize ---------- */

      // 用 throttle 包住要執行的動作
      let resizeThrottle = _.throttle(() => {

        this.resizeAction(this);

      }, 300, {
        'leading': false
      });
      
      window.addEventListener('resize', resizeThrottle);

      wrapper.addEventListener('resize', () => {
        // 讓內容鎖住不捲動
        wrapper.scrollTop  = 1;
      });

    /* ---------- click button ---------- */

      document.getElementById('showIntro').addEventListener('click',(event) => {

        event.preventDefault();
        event.stopPropagation();
        this.slideToSection(this,'intro',false);

      }, false);

      document.getElementById('showGallery').addEventListener('click',(event) => {
   
        event.preventDefault();
        event.stopPropagation();
        this.slideToSection(this,'gallery',false);

      }, false);



    } // current device: desktop

/* -------------------- desktop end -------------------- */    







  }

};
</script>

<style>
@import './style/animate.css';
@import './style/common.css';

body {width:100%; height:100vh; overflow:hidden;}
</style>

<style scoped>

.outerwpr {position:fixed; left:0; bottom:0; 
width:calc(100% + 50px); height:100vh; overflow-y:scroll;
touch-action:none;
}

.scroller {position:absolute; left:0; top:0; width:100vw;
height:calc(100vh + 2px); 
overflow:hidden;
}

.container {position:relative; top:0; margin-top:1px;
transition-duration:1100ms; transition-property:top;
}


</style>
