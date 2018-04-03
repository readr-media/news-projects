<template>
<div class="pagewpr">

<div class="page--aside">
  <div class="page--title"></div>

  <div class="page--navpanel">
    <div class="swiper-pagination" id="galleryFraction"></div>
    <div class="page--navbtn" v-on:click="toggleDesc">
      <i class="page--navbtn-icon" v-bind:class="{expand: descActive}"></i>
      <div class="page--navbtn-txt">
        <div class="navbtn-txt1">關閉導覽</div>  
        <div class="navbtn-txt2">點擊圖示<strong>關閉</strong>細節說明</div>
      </div>  
    </div>
  </div>
  
</div>

<div class="page--desc" v-bind:class="{expand: descActive}">
  <div class="innerwpr">
    <h2>深邃美麗的亞細亞</h2>
    <p>《深邃美麗的亞細亞》兼具了脫離世界、遺世獨立的特質，以及體現普世性的寓意，既分裂又交融。這就是鬥爭權衡之美的所在！作品中更充滿了傳承自中國文學《山海經》、《封神演義》，交融奇幻文學的想像力、與超現實主義，可說是跨越時空、鄭問最年輕張狂的經典之作！</p>
    <p>其中許多獨特的角色，如百兵衛（倒霉王）、理想王、完美王、潰爛王、收妖王、善意王、蜘蛛人、蛤蟆精、傀儡王、南魔天、蛇郎君、痛苦女等，他們有神性、有魔性、有人性。在物慾橫流的世界裡，他們都在尋求些「什麼」，有人追逐名利，有人迷戀權勢，有人等待幸福……什麼樣的世界才是人類夢寐以求的「美麗新世界」？鄭問運用他那出神入化的筆勾勒出一幅人性藍圖，善與惡交織成一篇篇動人的故事。 </p>
    <!-- <p>《深邃美麗的亞細亞》兼具了脫離世界、遺世獨立的特質，以及體現普世性的寓意，既分裂又交融。這就是鬥爭權衡之美的所在！作品中更充滿了傳承自中國文學《山海經》、《封神演義》，交融奇幻文學的想像力、與超現實主義，可說是跨越時空、鄭問最年輕張狂的經典之作！</p>
    <p>其中許多獨特的角色，如百兵衛（倒霉王）、理想王、完美王、潰爛王、收妖王、善意王、蜘蛛人、蛤蟆精、傀儡王、南魔天、蛇郎君、痛苦女等，他們有神性、有魔性、有人性。在物慾橫流的世界裡，他們都在尋求些「什麼」，有人追逐名利，有人迷戀權勢，有人等待幸福……什麼樣的世界才是人類夢寐以求的「美麗新世界」？鄭問運用他那出神入化的筆勾勒出一幅人性藍圖，善與惡交織成一篇篇動人的故事。 </p> -->
  </div>
</div>

<!-- <div class="gallerywpr" v-bind:class="{collapse: descActive}"> -->
<div class="swiper-container page--gallery" v-bind:class="{collapse: descActive}">

    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in imgSrc" :key="item.id">
          <img v-bind:src="item.url" />
          <div class="note--wrapper">
            <div class="note--container">

              <div class="note--entry" style="left:15%; top:25%;">
                <div class="note--marker">1</div>
                <div class="note--content"></div>
              </div>

              <div class="note--entry" style="left:35%; top:55%;">
                <div class="note--marker">2</div>
                <div class="note--content"></div>
              </div>
            </div>           

          </div>
        </div>
    </div>

    <!-- navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

</div>
<!-- </div> -->

<div class="swiper-container gallery--progress">

    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in imgSrc" :key="item.id"></div>
    </div>

    <!-- Pagination -->
    <div class="swiper-pagination swiper-pagination-progressbar" id="galleryProgress"></div>

</div>

</div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.js';
import imagesLoaded from 'imagesloaded';
import PerfectScrollbar from 'perfect-scrollbar';

import imgSrc from './data/gallery.json'

export default {

  // name: 'componentName',

  components: {
    // 'foo-bar': foobar
  },

  // Component data must be a function.
  data: function() {
    return {
      imgSrc: imgSrc,
      descActive: true,
      gallery: {},
      galleryProgress: {}
    };
  },

  // Prop definitions should be as detailed as possible.
  props: {
    // status: String
  },

  watch: {
    // An object where keys are expressions to watch and values are the corresponding callbacks. The value can also be a string of a method name, or an Object that contains additional options. The Vue instance will call $watch() for each entry in the object at instantiation.

  },

  computed: {

  },

  methods: {    

    toggleDesc: function(){
      this.descActive = !this.descActive;
      // this.gallery.update();
      // this.galleryProgress.pagination.update();
      
      // trigger resize to update slider
      // window.dispatchEvent(new Event('resize'));
      // this.gallery.update();
      // console.log(window);
    },

    initNoteContainer: function(){
      //計算 note--container 尺寸
      let slide = document.querySelectorAll(".swiper-slide");
      slide.forEach(function(element,index){

        const image = element.querySelector("img");

        if(image){
          let width = image.offsetWidth;
          let height = image.offsetHeight;
          // console.log("index: " + index + ", width: " + width + ", height: " + height);

          let container = element.querySelector(".note--container");
          if(container){
            container.style.width = width + "px";
            container.style.height = height + "px";
          }

        }             

      });
    }

  },

  mounted: function(){

    this.gallery = new Swiper ('.page--gallery', {
      loop: true,
      observer: true,

      pagination: {
        el: '#galleryFraction',
        type: 'fraction',
        // type: 'progressbar'
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }

    });

    this.galleryProgress = new Swiper ('.gallery--progress', {
      loop: true,
      // observer: true,

      pagination: {
        el: '#galleryProgress',
        type: 'progressbar',
      }
    });

    this.gallery.controller.control = this.galleryProgress;

    imagesLoaded( document.querySelector('.page--gallery'), () => {
      this.initNoteContainer();
      console.log("image loaded");
    });
    
    // console.log(PerfectScrollbar);
    const pageDescScroll = new PerfectScrollbar('.page--desc');

    window.addEventListener("resize",() => {
      this.initNoteContainer();
    },false);


  }

};
</script>

<style>
@import './style/swiper.min.css';
@import './style/perfect-scrollbar.css';
@import './style/page.css';
</style>


<style scoped>
</style>
