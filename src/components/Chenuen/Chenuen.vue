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
    <!-- <div class="scroller"></div> -->
    <div class="container">      
      <home></home>
      <page></page>
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

      scrollPosition: 0,
      scrollDirection: '',

      // introVisibility: false,
      // wheelTimer: null,
  
      // homeTransitionEnd: false,
      // galleryTransitionEnd: false,

      // galleryVisibility: false


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

    getIntroHeight: () => {
      return document.querySelector('.home-intro').offsetHeight;
    },   

    getScrollPosition: (element) => {
      return element.getBoundingClientRect().top;
    }


  },

  created () {    
    //current device
    this.currentDevice = this.$store.state.isMobile ? 'mobile' : 'desktop';
    console.log("device: " + this.currentDevice);
  },

  mounted: function() {

    // const scrollDir = require('./common/scrolldir.auto.min.js');
    // console.log(scrollDir);

    let wrapper = document.querySelector('.outerwpr');
    let container = document.querySelector('.container');
    // let scroller = document.querySelector('.scroller');

    let homewpr = document.querySelector('.homewpr');
    let pagewpr = document.querySelector('.pagewpr');

    if(this.currentDevice == 'desktop'){

      // wrapper.scrollTo(0,0);
      
      this.scrollPosition = this.getScrollPosition(container);

      // intro 高度
      let introHeight = this.getIntroHeight();    
     
      wrapper.addEventListener('scroll',(e) => {        

        let position = this.getScrollPosition(container);

        console.log(position);

        if(position > this.scrollPosition){
          // scroll up
          this.scrollDirection = 'up';
          console.log('up');

        } else {
          // scroll down
          this.scrollDirection = 'down';
          console.log('down');

          // container.style.top = introHeight * -1 + 'px';

        }

        this.scrollPosition = position;



      }, false);

    //  console.log(container.getBoundingClientRect().top);


    }

  }

};
</script>

<style>
@import './style/animate.css';
@import './style/common.css';

body {width:100%; height:100vh; overflow:hidden;}
/* .run .homewpr,
.run .pagewpr {pointer-events:none;
opacity:0.3;
} */
</style>

<style scoped>

.outerwpr {position:fixed; left:0; top:0; 
width:calc(100% + 50px); height:100vh; overflow-y:scroll;
touch-action: pan-y pan-x;
}
.container {position:absolute; left:0; top:0; width:100%;
transition:500ms; transition-property:top;
}
/* .scroller {width:100%; height:200vh; position:relative;
background-color:pink; opacity:0.3;
} */

</style>
