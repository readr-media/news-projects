<template>
  <div id="app">
    <div class="section-container">
      <div class="hero">
        2020 總統候選人辯論
        <br>即時事實查核
      </div>
    </div>

    <div class="video-container">
      <iframe
        class="youtube-video"
        :src="liveUrl"
      />
    </div>

    <div class="section-container">
      <div class="title">
        辯論即時事實查核成果
      </div>
      <div class="factcheck-list">
        <Item
          v-for="(item, index) in limitedItems"
          :key="index"
          :item="item"
        />
        <div class="paging">
          <div class="position">
            顯示 {{ limitNumber }} / {{ debates.length }} 則
          </div>
          <div
            class="loadmore"
            @click="loadMore"
          >
            載入更多
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-background">
      <div class="section-container">
        <div class="title">
          此次參與查核媒體
        </div>
        <div class="media">
          <a
            v-for="(media, index) in mediaList"
            :key="index"
            class="block"
            :href="media.url"
          >
            <div
              class="logo"
              :class="[{[media.id]: true}]"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="share">
        <button
          class="facebook"
          @click="shareToFacebook"
        >
          分享到 Facebook
        </button>
        <button
          class="line"
          @click="shareToLine"
        >
          分享到 LINE
        </button>
      </div>
      <a
        class="action"
        href="#"
      >看 2020 總統候選人事實查核計畫</a>
    </div>

    <div class="footer">
      <div class="credit">
        工程師：小島 / 設計：weiweihsu
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Item from './components/Item.vue';

Vue.use(VueFirestore);

const config = {
  // Firebase Config
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

export default {
  metaInfo() {
    return {
      title: '2020 總統候選人辯論即時事實查核',
      description: '總統候選人辯論，媒體即時查核！2020 總統候選人事實查核計畫陪你一起看辯論！',
      metaUrl: 'META-URL-TBD',
      metaImage: 'META-URL-IMG/ogimage.png',
    };
  },
  components: {
    Item,
  },
  data() {
    return {
      // 每次載入最大數量
      pageLength: 1,
      // 目前顯示數量
      limitNumber: 0,
      // YouTube 直播網址 (Embed形式)
      liveUrl: 'https://www.youtube.com/embed/ApFfpb3RFR0',
      // 參與媒體
      mediaList: [
        {
          id: 'readr',
          url: 'https://www.readr.tw/',
        },
        {
          id: 'newslab',
          url: 'https://newslab.pts.org.tw/',
        },
        {
          id: 'TNL',
          url: 'https://www.thenewslens.com/',
        },
        {
          id: 'TEIA',
          url: 'https://teia.tw/',
        },
      ],
    };
  },
  firestore() {
    return {
      // Collection
      debates: {
        ref: firestore.collection('debate').where('可上架（V）', '==', 'V').orderBy('編號', 'desc'),
        resolve: () => {
          this.loadMore();
        },
      },
    };
  },
  computed: {
    limitedItems() {
      return this.debates.slice(0, this.limitNumber);
    },
  },
  methods: {
    shareToFacebook() {
      window.open(`https://www.facebook.com/share.php?u=${window.location.href}`);
      window.ga && window.ga('send', 'event', 'projects', 'click', 'share to fb', { nonInteraction: false });
    },
    shareToLine() {
      window.open(`https://line.me/R/msg/text/?${window.location.href}`);
      window.ga && window.ga('send', 'event', 'projects', 'click', 'share to line', { nonInteraction: false });
    },
    loadMore() {
      let nextLimitNumber = this.limitNumber + this.pageLength;
      if (nextLimitNumber > this.debates.length) {
        nextLimitNumber = this.debates.length;
      }
      this.limitNumber = nextLimitNumber;
    },
  },
};
</script>

<style src="./index.css"></style>
