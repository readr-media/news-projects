<template>

<div class="wrapper">

<logo :top="`12px`" :left="`15px`" :bgColor="`#333`" :bgImage="`/proj-assets/dollclaw/images/navbtn.png`"></logo>
<share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#333`"></share>

<main-map></main-map>

</div>

</template>

<script>
//common
import { SITE_URL } from "../../constants";
import titleMeta from "../../util/titleMeta";
import Logo from "../Logo.vue";
import Share from "../Share.vue";

import mainMap from "./Map.vue";

export default {
  // name: 'componentName',

  mixins: [titleMeta],

  components: {
    'logo': Logo,
    'share': Share,

    'mainMap': mainMap


  },

  data: function() {
    return {
      shareLink: `${SITE_URL}dollclaw`
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

  methods: {},

  created() {
    //current device
    this.currentDevice = this.$store.state.isMobile ? "mobile" : "desktop";
    console.log("device: " + this.currentDevice);
  },

  mounted: function() {
    
  }

};
</script>

<style>
@import "./style/common.css";
</style>
