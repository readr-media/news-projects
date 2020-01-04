<template>
  <div class="political-post">
    <div class="background">
      <div class="container">
        <div class="project-header">
          <div class="corner top left" />
          <div class="corner top right" />
          <div class="wrapper">
            <div class="people" />
            <h2>Facebook <span style="display:inline-block;">政治廣告收集者</span></h2>
            <h3>政治廣告客戶如何鎖定你</h3>
            <div class="people mobile" />
            <p>Facebook 因應臺灣總統選舉，要求所有「政治性廣告」揭露廣告對象及金額，<br>來看看哪些人的廣告鎖定的是你！</p>
          </div>
          <div class="focus" />
          <div class="corner bottom left" />
          <div class="corner bottom right" />
        </div>
      </div>
      <div class="container inner">
        <div class="criteria">
          <div class="title">
            <h2>我會看到什麼廣告？</h2>
          </div>
          <div class="filter">
            <div class="line">
              住在
              <span class="select-wrapper select-area">
                <select
                  v-model="filter.area"
                  name="area"
                >
                  <option
                    v-for="(item, index) in areaList"
                    :key="`area-${index}`"
                    :value="index"
                  >{{ item['name'] }}</option>
                </select>
                <span class="holder">{{ areaList[filter.area].name }}</span>
              </span>
              ，
            </div>
            <div class="line">
              <input
                v-model="filter.age"
                type="number"
                name="age"
                value="36"
              >
              歲的
              <span class="select-wrapper select-gender">
                <select
                  v-model="filter.gender"
                  name="gender"
                >
                  <option
                    v-for="(item, index) in genderList"
                    :key="`gender-${index}`"
                    :value="index"
                  >{{ item['name'] }}</option>
                </select>
                <span class="holder">{{ genderList[filter.gender].name }}</span>
              </span>
              。
            </div>
          </div>
          <div
            class="no-result"
            :class="{active: isEmpty}"
          >
            沒有以你的條件為觸及目標的政治廣告
          </div>
        </div>

        <div class="candidate">
          <div class="title">
            <h2>你也可以看看：</h2>
          </div>
          <div class="people">
            <div
              class="person"
              @click="setFilter('Taichung', 37, 'male')"
            >
              <div class="wrapper">
                <div class="avatar a" />
                <div class="desc">
                  <span>臺中市</span>  37 歲男性
                </div>
              </div>
            </div>
            <div
              class="person"
              @click="setFilter('Yunlin', 20, 'male')"
            >
              <div class="wrapper">
                <div class="avatar b" />
                <div class="desc">
                  <span>雲林縣</span>  20 歲男性
                </div>
              </div>
            </div>
            <div
              class="person"
              @click="setFilter('Hsinchu City', 52, 'female')"
            >
              <div class="wrapper">
                <div class="avatar c" />
                <div class="desc">
                  <span>新竹市</span>  52 歲女性
                </div>
              </div>
            </div>
            <div
              class="person"
              @click="setFilter('Taipei', 28, 'female')"
            >
              <div class="wrapper">
                <div class="avatar d" />
                <div class="desc">
                  <span>臺北市</span>  28 歲女性
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="background-shadow"
      :class="{hide: filteredData.length === 0}"
    >
      <div class="container inner">
        <div class="navigation">
          <div
            class="prev"
            :class="[((paging.page - 1) < 1) && 'disable']"
            @click="goPrev"
          />
          <div class="paging">
            <div
              v-for="(item, index) in pages"
              :key="`pages-${index}`"
              class="page"
              :class="{active: paging.page === item}"
              @click="paging.page = item"
            >
              {{ item }}
            </div>
          </div>
          <div
            class="next"
            :class="[((paging.page + 1) >= paging.max) && 'disable']"
            @click="goNext"
          />
        </div>

        <NoSSR>
          <masonry
            class="content"
            :cols="{default: 3, 960: 1}"
            :gutter="10"
          >
            <div
              v-for="(item, index) in paginatedData"
              :key="index"
              class="item"
            >
              <div class="title">
                {{ item['參選人'] }}
              </div>
              <div class="category">
                廣告
              </div>
              <div class="inner-text">
                <ReadMore
                  :text="item['廣告內容']"
                  @toggled="toggledReadmore"
                />
              </div>
              <div class="image">
                <img :src="item['圖片']">
              </div>
            </div>
          </masonry>
        </NoSSR>
        <div class="navigation">
          <div
            class="prev"
            :class="[((paging.page - 1) < 1) && 'disable']"
            @click="goPrev"
          />
          <div class="paging">
            <div
              v-for="(item, index) in pages"
              :key="`pages-${index}`"
              class="page"
              :class="{active: paging.page === item}"
              @click="paging.page = item"
            >
              {{ item }}
            </div>
          </div>
          <div
            class="next"
            :class="[((paging.page + 1) >= paging.max) && 'disable']"
            @click="goNext"
          />
        </div>
      </div>
    </div>
    <div class="background">
      <TheFooter />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Papa from 'papaparse';
import NoSSR from 'vue-no-ssr';
import ReadMore from './components/ReadMore.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  name: 'PoliticalPost',
  metaInfo() {
    return {
      title: 'Facebook 政治廣告收集者',
      description: 'Facebook 因應臺灣總統選舉，要求所有「政治性廣告」揭露廣告對象及金額，來看看哪些人的廣告鎖定的是你！',
      metaUrl: 'political-post',
      metaImage: 'political-post/img/og.png',
    };
  },
  components: {
    NoSSR,
    ReadMore,
    TheFooter,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      THRESHOLD: 10,
      filter: {
        age: 35,
        area: 0,
        gender: 0,
      },
      paging: {
        page: 0,
        max: 0,
        perPage: 9,
        width: 2,
      },
      genderList: [
        { identifier: 'male', name: '男性' },
        { identifier: 'female', name: '女性' },
        // {identifier: 'Unknown', name: '未知'},
      ],
      areaList: [
        { identifier: 'Taipei', name: '台北市' },
        { identifier: 'New Taipei City', name: '新北市' },
        { identifier: 'Keelung City', name: '基隆市' },
        { identifier: 'Taoyuan City', name: '桃園市' },
        { identifier: 'Hsinchu City', name: '新竹市' },
        { identifier: 'Hsinchu', name: '新竹縣' },
        { identifier: 'Miaoli', name: '苗栗縣' },
        { identifier: 'Taichung', name: '台中市' },
        { identifier: 'Changhua', name: '彰化市' },
        { identifier: 'Nantou', name: '南投縣' },
        { identifier: 'Yunlin', name: '雲林縣' },
        { identifier: 'Chiayi', name: '嘉義市' },
        { identifier: 'Chiayi', name: '嘉義縣' },
        { identifier: 'Tainan', name: '台南市' },
        { identifier: 'Kaohsiung', name: '高雄市' },
        { identifier: 'Pingtung', name: '屏東縣' },
        { identifier: 'Yilan', name: '宜蘭縣' },
        { identifier: 'Hualien', name: '花蓮縣' },
        { identifier: 'Taitung', name: '台東市' },
        { identifier: 'Kinmen', name: '金門縣' },
        { identifier: 'Lienchiang', name: '連江縣' },
        { identifier: 'Penghu', name: '澎湖縣' },
        // {identifier: 'Fujian', name: '福建省'},
        // {identifier: 'Taiwan', name: '台灣省'},
        // {identifier: 'Unknown', name: '未知'},
      ],
      filteredData: [],
      parsedResults: [],
      isEmpty: false,
    };
  },
  computed: {
    paginatedData() {
      const from = (this.paging.page - 1) * this.paging.perPage;
      const end = this.paging.page * this.paging.perPage;
      return _.slice(this.filteredData, from, end);
    },
    pages() {
      if (this.paging.page <= this.paging.width) {
        return _.range(1, 1 + (2 * this.paging.width) + 1);
      } if (this.paging.page + this.paging.width >= this.paging.max) {
        return _.range(this.paging.max - 2 * (this.paging.width), this.paging.max + 1);
      }
      return _.range(
        this.paging.page - this.paging.width,
        this.paging.page + this.paging.width + 1,
      );
    },
  },
  watch: {
    filter: {
      handler() {
        this.doFilter();
      },
      deep: true,
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    Papa.parse('/proj-assets/political-post/data.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.parsedResults = results.data;
      },
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    setFilter(area, age, gender) {
      this.filter.area = _.findIndex(this.areaList, (o) => o.identifier === area);
      this.filter.age = age;
      this.filter.gender = _.findIndex(this.genderList, (g) => g.identifier === gender);
      this.doFilter();
    },
    doFilter(
      area = this.areaList[this.filter.area].identifier,
      age = this.filter.age,
      gender = this.genderList[this.filter.gender].identifier,
    ) {
      let range = '';
      if (age < 13) { range = '<13'; }
      if (age >= 13 && age <= 17) { range = '13-17'; }
      if (age >= 18 && age <= 24) { range = '18-24'; }
      if (age >= 25 && age <= 34) { range = '25-34'; }
      if (age >= 35 && age <= 44) { range = '35-44'; }
      if (age >= 45 && age <= 54) { range = '45-54'; }
      if (age >= 55 && age <= 64) { range = '55-64'; }
      if (age >= 65) { range = '65+'; }

      this.filteredData = _.orderBy(_.filter(this.parsedResults, (item) => item[area] > this.THRESHOLD && (item[`${range} ${gender}`] > this.THRESHOLD)), ['area', `${range} ${gender}`]);

      // eslint-disable-next-line no-console
      console.log('area:', area);
      // eslint-disable-next-line no-console
      console.log('range:', range);
      // eslint-disable-next-line no-console
      console.log('gender:', gender);
      // eslint-disable-next-line no-console
      console.log(`filtered: ${this.filteredData.length}`);

      this.filteredData = _.slice(this.filteredData, 0, 100);
      this.paging.page = 1;
      this.paging.max = Math.ceil(this.filteredData.length / this.paging.perPage);
      // eslint-disable-next-line no-console
      console.log(`max: ${this.paging.max}`);

      this.isEmpty = this.filteredData.length === 0;
    },
    goPrev() {
      if (this.paging.page > 1) {
        this.paging.page -= 1;
      }
    },
    goNext() {
      if (this.paging.page < this.paging.max) {
        this.paging.page += 1;
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (window.innerWidth >= 960) {
        this.paging.perPage = 9;
        this.paging.width = 2;
      } else {
        this.paging.perPage = 5;
        this.paging.width = 1;
      }
    },
  },
};
</script>

<style src="./index.css"></style>
