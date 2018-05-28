<template>
<div class="homewpr">

<div class="opening">
  <div id="showIntro" class="animated infinite bounce"></div>  
  <!-- <div id="showIntro"></div> -->
</div>

<div class="home-intro">
  <div class="centerwpr">

  <div class="credit">
    <ul>
      <li>文字採訪：楊政勳</li>
      <li>畫作提供：鄭問工作室</li>
      <li>設計：許玲瑋</li>
      <li>網頁製作：v_k</li>
      <li>畫作解析：鍾孟舜</li>
    </ul>
  </div>

  <p>台灣漫畫大師鄭問2017年3月因心肌梗塞病逝，在各界努力下，成為第一位進入故宮展覽的漫畫家。鄭問故宮大展「千年一問」訂於2018年6月16日開展，「千年一問」意義即為「一千年才會出現一位鄭問這樣的奇才」，鏡週刊獨家取得鄭問的數位畫作大檔，並專訪鄭問故宮大展策展人鍾孟舜，請他解析展覽必看的12張鄭問明星圖，讓大家先睹為快，也藉由畫作思念一代宗師，緬懷鄭問帶給世人的美好。</p>  

  <h3>鄭問小檔案</h3>
  <p>鄭問，本名鄭進文，台灣漫畫家，以水墨結合西方繪畫技巧聞名。日本媒體讚嘆他是「亞洲至寶」，漫畫界二十年內無人能出其右的「天才、鬼才、異才」。鄭問於2017年3月26日因心肌梗塞過世，享年58歲。2018年6月台灣故宮將舉行鄭問畫展，使他成第一位踏進故宮的漫畫家。</p>

  <div class="btnwpr">
    <div id="showGallery">開始欣賞</div>
  </div>  

  </div>  
  
</div>


</div>
</template>

<script>

export default {

  components: {

  },
 
  data: function() {
    return {

    };
  },

  props: {

  },

  watch: {

  },

  computed: {

  },

  methods: {


  },

  mounted: function(){
   

  }

};
</script>

<style scoped>
.homewpr {position:relative;}

.opening {width:100%; height:100vh; position:relative;
background-color:#fff;
background-image:url("/proj-assets/chenuen/images/opening.jpg");
background-repeat:no-repeat; background-position:60% bottom;
background-size:auto 100%;
}

#showIntro {width:70px; height:60px;
position:absolute; left:50%; bottom:40px; margin-left:-35px;
animation-duration:1.5s;
/* background-color:pink; */
background-image:url("/proj-assets/chenuen/images/page-navbtn.png");
background-size:70px auto; background-repeat:no-repeat;
background-position:0 -100px;
cursor:pointer;
}
#showIntro:hover {background-position:0 -168px;}

.home-intro {padding:50px 20px 50px 20px;
color:#fff; font-size:17px; line-height:1.7;
text-align:justify;
background-color:#ac7431;
}
.home-intro .centerwpr {max-width:680px; margin:0 auto;}

.home-intro h3 {margin-top:50px; margin-bottom:10px;
font-size:24px; text-align:center;
}

.btnwpr {display:flex; justify-content:center; align-items:center;
margin-top:50px;
}
#showGallery {cursor:pointer;
font-weight:bold; font-size:30px; color:#f3eae0;
letter-spacing:1px; line-height:1.3;
border-bottom:3px solid #f3eae0;
}
#showGallery:hover {color:#fff; border-bottom:3px solid #fff;}

.credit {margin-bottom:15px;
font-size:15px; text-align:center; opacity:0.9;
}
.credit ul {display:flex; justify-content:center; align-items:center;
flex-wrap:wrap;
}
.credit li {flex-shrink:0;}
.credit li+li {margin-left:20px;}

/* ----- animate bounce custom ----- */
@-webkit-keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -14px, 0);
    transform: translate3d(0, -14px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -7px, 0);
    transform: translate3d(0, -7px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -14px, 0);
    transform: translate3d(0, -14px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -7px, 0);
    transform: translate3d(0, -7px, 0);
  }

  90% {   
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }
}






</style>
