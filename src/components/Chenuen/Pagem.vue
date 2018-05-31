<template>
<div class="pagewpr">

<div class="header">
    <!-- pagination -->
    <div class="swiper-pagination" id="mFraction"></div>
 
    <div class="swiper-btnwpr">
      <div class="swiper-button-prev" @click="toogleSwiperButtonPrev"></div>
      <div class="swiper-button-next" @click="toogleSwiperButtonNext"></div>
    </div>    

</div>

<div class="swiper-container" id="mGallery">
    <div class="swiper-wrapper">
        <div class="swiper-slide" 
          v-for="(item, index) in galleryData" 
          :key="item.id"
        >
          <img class="swiper-slide__image" v-bind:src="item.url" />

          <div class="swiper-slide__content">
            <h2 v-text="item.title"></h2>
            <div v-html="item.desc"></div>
          </div>

          <div class="note--container">
            <!-- note--entry -->
            <div class="note--entry" 
              v-for="(entry) in item.note" :key="entry.id"
            >
                <h4 class="alternate">{{entry.title}}</h4>
                <div class="note--content">
                    <div class="note--content__image">
                        <img v-bind:src="entry.url" />
                    </div>
                    <div class="note--content__text">
                        <div v-html="entry.desc"></div>
                    </div>
                </div>
            </div>
            <!-- note--entry -->

          </div>

          <div class="swiper-nexttbn">
            <div class="text">下一篇：</div>
            <h2 v-text="_get(galleryData, [index + 1,'title'], galleryData[0].title)"></h2>
            <i></i>
          </div>

        </div>     
    </div> 

</div>

<div class="footer">
  <div class="footer--bg"></div>
  <h5>作品一覽：</h5>
  <ul class="table">
    <li class="table-list"
      v-for="(item,index) in galleryData" 
      :key="item.id"
    >
      <div class="table-list__item">
        <span class="table-list__index" v-text="index + 1 + '.'"></span>
        <span class="table-list__text" v-text="item.title"></span>
      </div>        
    </li>
  </ul>
</div>



</div>
</template>

<script>
//plugins
import {get,indexOf} from 'lodash'; 
import Swiper from 'swiper/dist/js/swiper.js';

//主圖資料
import galleryData from './data/gallery.json'

export default {

  components: {

  },

  watch: {
    'gallery.realIndex' (value) {
      console.log(value);
      if (!this.slideBeenViewed[value]) {
        window.ga('send', 'event', 'projects', 'scroll', `slide ${value + 1}`, { nonInteraction: false })
        this.slideBeenViewed[value] = true
      }
    }
  },

  // Component data must be a function.
  data: function() {
    return {
      galleryData: galleryData,
      gallery: {},
      slideBeenViewed: Array(galleryData.length).fill(false)
    };
  },

  props: {

  },

  computed: {

  },

  methods: {  
    
    // lodash
    _get: get,
    _indexOf: indexOf,

    setFooterTriangle: function(){
      let vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let el = document.querySelector(".footer--bg");

      el.style.borderRightWidth = vw + "px";
    },

    setTableList: function(swiper){
      let index = swiper.realIndex;
      let tableLists = document.querySelectorAll(".table-list");

      tableLists.forEach(function(element){
        element.classList.remove("current");
      });
      tableLists[index].classList.add("current");
    },

    toogleSwiperButtonPrev () {
      window.ga('send', 'event', 'projects', 'click', 'toogleSwiperButtonPrev', { nonInteraction: false })
    },

    toogleSwiperButtonNext () {
      window.ga('send', 'event', 'projects', 'click', 'toogleSwiperButtonNext', { nonInteraction: false })
    },

  },

  mounted: function(){

    let _setTableList = this.setTableList;

    this.gallery = new Swiper ('#mGallery', {
      loop: true,
      observer: true,
      autoHeight: true,

      pagination: {
        el: '#mFraction',
        type: 'fraction',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      on: {
        slideChangeTransitionStart: function () {
          window.scrollTo(0,0);
        },

        slideChange: function() {
          _setTableList(this);
        }
      },

    });

    {
      //slide to next
      let thatGallery = this.gallery;
      let slideNextBtns = document.querySelectorAll(".swiper-nexttbn");

      slideNextBtns.forEach(function(element){
        element.addEventListener("click",() => {
          thatGallery.slideNext();
          window.ga('send', 'event', 'projects', 'click', 'nextSlide', { nonInteraction: false })
        });
      });
    }

    {
      //table of contents
      let thatGallery = this.gallery;
      let tableLists = document.querySelectorAll(".table-list");

      let _indexOf = this._indexOf;

      tableLists.forEach(function(element){
        element.addEventListener("click",() => {

          let index = _indexOf(tableLists,element) 
          thatGallery.slideToLoop(index);
          window.ga('send', 'event', 'projects', 'click', `jumpSlide${index + 1}`, { nonInteraction: false })

        });
      });

      this.setTableList(thatGallery);

    }

    this.setFooterTriangle();

    window.addEventListener("resize",() => {
      this.setFooterTriangle();
    },false);

  }

};
</script>

<style>
@import './style/swiper.min.css';
</style>


<style scoped>
@import './style/pagem.css';
</style>
