<template>

<!-- /project/chenuen/page -->
<div v-if="getParams == 'page'">

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <page></page>
</div>

<!-- /project/chenuen/ -->
<div v-else>
  首頁
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
import page from './Page.vue';

export default {

  name: "ChenUenProject",

  mixins: [titleMeta],

  components: {
    'logo': Logo,
    'share': Share,

    'page': page
  },

  computed: {
    getParams() {
      //取得網址列參數
      return _.get(this.$route, "params.params");
    }
  },

  data: function() {
    return {
      shareLink: `${SITE_URL}chenuen`
      // shareLinkOpinion: `${SITE_URL}farmhouse/opinion`,
      // shareLinkFaq: `${SITE_URL}farmhouse/faq`,
      // shareLinkGallery: `${SITE_URL}farmhouse/gallery`
    };
  },

  metaInfo() {
    let ogTitle = "鄭問專題";
    let description = "鄭問專題";
    let metaUrl = "farmhouse";
    let ogImage = "farmhouse/images/og.jpg";

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  methods: {

  },

  mounted: function() {

  }

};
</script>

<style>
.logo {background-size:auto 100% !important;
transform:scale(0.9);
}
.share__item {transform:scale(0.85);}
.share__item.toggle {
background-image:url("/proj-assets/chenuen/images/navbtn.png") !important;
background-size:auto 100% !important;
background-position:right top !important;
transform:scale(0.9);
}

body {color:#4d4d4d; font-size:17px; line-height:1.5;
font-family:"微軟正黑體", "Microsoft JhengHei", sans-serif;
}
h1,h2,h3,h4,h5,h6 {
margin:0 0 20px 0;  
}
p {margin:0;
text-align:justify; text-justify:distribute;
}
p+p {margin-top:20px;}
img {display:block;}
</style>



<style scoped>


</style>