<template>
  <div class="fact-check-debate-2020">
    <div class="section-container">
      <h1 class="hero">
        <span class="small">2020 總統候選人辯論</span>
        <br>即時事實查核
      </h1>
    </div>

    <div class="width-control">
      <div class="video-container">
        <iframe
          class="youtube-video"
          :src="liveUrl"
        />
      </div>
    </div>

    <div class="section-container">
      <h2 class="title">
        辯論即時事實查核成果
      </h2>
      <div class="factcheck-list">
        <Item
          v-for="(item, index) in limitedItems"
          :key="index"
          :item="item"
        />
        <div class="paging">
          <div class="position">
            顯示 {{ limitNumber }} / {{ total }} 則
          </div>
          <div
            class="loadmore"
            :class="{active: showLoadMore}"
            @click="loadMore"
          >
            載入更多
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-background">
      <div class="section-container">
        <h3 class="title">
          此次參與查核媒體
        </h3>
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
        href="/project/fact-check-2020"
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
import * as Firebase from 'firebase/app';
import 'firebase/firestore';
import Item from './components/Item.vue';

export default {
  name: 'FactCheckDebate2020',
  metaInfo() {
    return {
      title: '2020 總統候選人辯論即時事實查核',
      description: '總統候選人辯論，媒體即時查核！2020 總統候選人事實查核計畫陪你一起看辯論！',
      metaUrl: 'fact-check-debate-2020',
      metaImage: 'fact-check-debate-2020/img/og_img.jpg',
    };
  },
  components: {
    Item,
  },
  data() {
    return {
      // 每次載入最大數量
      pageLength: 20,
      // 目前顯示數量
      limitNumber: 0,
      // YouTube 直播網址 (Embed形式)
      liveUrl: 'https://www.youtube.com/embed/AAUqtzp1eX8',
      // 參與媒體
      mediaList: [
        {
          id: 'readr',
          url: 'https://www.readr.tw/',
        },
        {
          id: 'right-plus',
          url: 'https://rightplus.org/',
        },
        {
          id: 'futurecity',
          url: 'https://futurecity.cw.com.tw/',
        },
        {
          id: 'newslab',
          url: 'https://newslab.pts.org.tw/',
        },
        {
          id: 'TEIA',
          url: 'https://teia.tw/',
        },
        {
          id: 'TNL',
          url: 'https://www.thenewslens.com/',
        },
      ],
    };
  },
  firestore() {
    return {
      // Collection
      debates: {
        ref: Firebase.firestore().collection('debate').where('可上架（V）', '==', 'V').orderBy('編號', 'desc'),
        resolve: () => {
          this.loadMore();
        },
      },
    };
  },
  computed: {
    limitedItems() {
      return this.debates
        ? this.debates.slice(0, this.limitNumber >= this.pageLength ? this.limitNumber : this.pageLength)
        : [];
    },
    total() {
      return this.debates ? this.debates.length : 0;
    },
    showLoadMore() {
      return this.limitNumber < (this.debates ? this.debates.length : 0);
    },
  },
  mounted() {
    if (!Firebase.apps.length) {
      Firebase.initializeApp({
        apiKey: 'AIzaSyB61nfPkmQ9lBuJOG3HgTT-qJ_9NKZlMvA',
        authDomain: 'mirrormedia-1470651750304.firebaseapp.com',
        databaseURL: 'https://mirrormedia-1470651750304.firebaseio.com',
        projectId: 'mirrormedia-1470651750304',
        storageBucket: 'mirrormedia-1470651750304.appspot.com',
        messagingSenderId: '983956931553',
        appId: '1:983956931553:web:a880a20e7c8e0f3aab48a0',
      });
    }
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
