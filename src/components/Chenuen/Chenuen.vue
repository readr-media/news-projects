<template>
<div v-if="!isClientSide"></div>
<!-- ///// 電腦版 ///// -->
<div v-else-if="currentDevice === 'desktop' && getParams !== 'gallery'">

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`" :direction="`right`"></share>

  <div class="outerwpr">
    <div class="scroller">
      <div class="container">      
        <chenuen-home></chenuen-home>
        <chenuen-page></chenuen-page>
      </div>
    </div>
  </div> 

  <!-- <h1 class="test">{{currentDevice}}</h1>  -->

</div>

<!-- ///// 手機版 gallery ///// -->
<div v-else-if="getParams === 'gallery'">

  <logo :top="`2px`" :left="`6px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`2px`" :left="`54px`" :bgColor="`#b1adca`" :direction="`right`"></share>

  <chenuen-pagem></chenuen-pagem>
  <!-- <h1 class="test">{{currentDevice}}</h1>  -->
</div>

<!-- ///// 手機版首頁 ///// -->
<div v-else>

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`" :direction="`right`"></share>

  <chenuen-homem></chenuen-homem>
  <!-- <h1 class="test">{{currentDevice}}</h1>  -->
</div>  

</template>

<script>
//common
import { MM_SITE_URL } from "../../constants";
import titleMeta from "../../util/titleMeta";
import Logo from '../Logo.vue';
import Share from '../Share.vue';

//plugins
import _ from 'lodash';

// pages
import ChenuenHome from './ChenuenHome.vue'; //desktop
import ChenuenPage from './ChenuenPage.vue'; //desktop

import ChenuenHomem from './ChenuenHomem.vue'; //mobile
import ChenuenPagem from './ChenuenPagem.vue'; //mobile

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

    'chenuen-home': ChenuenHome,
    'chenuen-page': ChenuenPage,

    'chenuen-homem': ChenuenHomem,
    'chenuen-pagem': ChenuenPagem
  },

  computed: {
    getParams() {
      //取得網址列參數
      return _.get(this.$route, "params.params");
    }
  },

  data: function() {
    return {
      shareLink: `${MM_SITE_URL}chenuen`,
      // shareLinkOpinion: `${MM_SITE_URL}farmhouse/opinion`,
      // shareLinkFaq: `${MM_SITE_URL}farmhouse/faq`,
      // shareLinkGallery: `${MM_SITE_URL}farmhouse/gallery`
      currentDevice: 'desktop',

      wheelDirection: '',  
      
      // wrapperTimer: null, 
      scrollTimer: null,

      // scroller: null,
      container: null,
      homewpr: null,
      homeIntro: null,
      galleryProgress: null,

      introVisibility: false,
      galleryVisibility: false,
      isClientSide: false,

    };
  },

  metaInfo() {
    let ogTitle = "【千年一問】鄭問故宮大展 必看的12張明星圖";
    let description = "台灣漫畫大師鄭問2017年3月因心肌梗塞病逝，在各界努力下，成為第一位進入故宮展覽的漫畫家。鄭問故宮大展「千年一問」訂於2018年6月16日開展，「千年一問」意義即為「一千年才會出現一位鄭問這樣的奇才」，鏡週刊獨家取得鄭問的數位畫作大檔，並專訪鄭問故宮大展策展人鍾孟舜，請他解析展覽必看的12張鄭問明星圖，讓大家先睹為快，也藉由畫作思念一代宗師，緬懷鄭問帶給世人的美好。";
    let metaUrl = "chenuen";
    let ogImage = "chenuen/images/og.jpg";
    let favicon = "https://www.mirrormedia.mg/public/favicon-48x48.png"

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage,
      favicon: favicon,
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
    this.currentDevice = this.$store.state.useragent.isMobile ? 'mobile' : 'desktop';
    console.log("device: " + this.currentDevice);
  },

  mounted: function() {      
    this.isClientSide = true;
    if(this.currentDevice == 'desktop'){

    /* -------------------- desktop start -------------------- */  

      document.querySelector('body').classList.add('fixed');

      let wrapper = document.querySelector('.outerwpr');
      this.container = document.querySelector('.container');    
      this.homewpr = document.querySelector('.homewpr');
      this.homeIntro = document.querySelector('.home-intro');
      this.galleryProgress = document.getElementById('galleryProgress');

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

    /* -------------------- desktop end -------------------- */       

    }
    window.ga('send', 'pageview')
  }
};
</script>

<style>
@import './style/animate.css';
@import './style/common.css';

body.fixed {width:100%; height:100vh; overflow:hidden;}
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

h1.test {position:fixed; left:0; top:0;
background-color:#111; color:#fff; z-index:999999;
}

</style>
