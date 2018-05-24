<template>
<div class="homewpr">

<div class="opening"></div>

<!-- <div class="home-intro">
  <div class="centerwpr">台灣漫畫大師鄭問去年三月因心肌梗塞病逝，在各界努力下，成為全世界第一位進入故宮展覽的漫畫家。鄭問故宮大展「千年一問」於6月16日開展，「千年一問」意義即為「一千年才會出現一位鄭問這樣的奇才」，鏡週刊獨家取得鄭問的數位畫作大檔，並專訪鄭問故宮大展策展人鍾孟舜，請他解析展覽必看的12張鄭問明星圖，讓大家先睹為快，也藉由畫作思念一代宗師，緬懷鄭問帶給世人的美好。</div>

  <div class="btnwpr">
    <a id="showGallery" href="gallery">開始欣賞</a>
  </div>
  
</div> -->

<div class="home-intro">
  <div class="centerwpr">

  <p>台灣漫畫大師鄭問去年三月因心肌梗塞病逝，在各界努力下，成為全世界第一位進入故宮展覽的漫畫家。鄭問故宮大展「千年一問」於6月16日開展，「千年一問」意義即為「一千年才會出現一位鄭問這樣的奇才」，鏡週刊獨家取得鄭問的數位畫作大檔，並專訪鄭問故宮大展策展人鍾孟舜，請他解析展覽必看的12張鄭問明星圖，讓大家先睹為快，也藉由畫作思念一代宗師，緬懷鄭問帶給世人的美好。</p>  

  <h3>鄭問小檔案</h3>
  <p>鄭問，本名鄭進文，台灣漫畫家，以水墨結合西方繪畫技巧聞名。日本媒體讚嘆他是漫畫界二十年內無人能出其右的「天才、鬼才、異才」，被譽為「亞洲至寶」，於2017年3月26日因心肌梗塞過世，享年58歲。 2018年6月在台灣故宮將舉行鄭問畫展，是全世界第一個踏進故宮的漫畫家。</p>

  <div class="btnwpr">
    <a id="showGallery" href="gallery">開始欣賞</a>
  </div>

  <div class="credit">
    <ul>
      <li>文字採訪：楊政勳</li>
      <li>畫作提供：鄭問工作室</li>
      <li>設計：許玲瑋</li>
      <li>網頁製作：v_k</li>
      <li>畫作解析：鍾孟舜</li>
    </ul>
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

.opening {position:fixed; width:100%; height:100vh; left:0; top:0;
background-color:#fff;
background-image:url("/proj-assets/chenuen/images/opening-m.jpg");
background-repeat:no-repeat; background-position:0 bottom;
background-size:auto 100%;
}

.home-intro {position:relative; margin-top:100vh;
padding:50px 20px 20px 20px;
color:#fff; font-size:17px; line-height:1.7;
text-align:justify;
background-color:rgba(172,116,49,.92);
}
.home-intro .centerwpr {max-width:900px; margin:0 auto;}

.home-intro h3 {margin-top:30px; margin-bottom:10px;
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

.credit {margin-top:50px;
font-size:15px; text-align:center; opacity:0.9;
}
.credit ul {display:flex; justify-content:center; align-items:center;
flex-wrap:wrap;
}
.credit li {flex-shrink:0; margin:0 10px;}
/* .credit li+li {margin-left:20px;} */

</style>
