<template>
  <div class="home">
    <van-search
      v-model="search_value"
      shape="round"
      background="#D15343"
      placeholder="请输入想要的商品"
      @input="Onsearch"
      @focus="ShowHistroy"
      @blur="HideHistroy"
    />
    <div class="search-box">
      <div class="search_related" v-show="isTrue">
        <div class="search_related_text">相关搜索</div>
        <div
          class="search-box-detail"
          v-for="(value, index) in searchList"
          :key="index"
          @click="ToDetails(value.pid, value.name)"
        >
          {{ value.name }}
        </div>
      </div>
      <div v-show="toggleShowHis">
        <div class="search_histroy" v-show="!isTrue">
          <div class="search_histroy_text">历史纪录</div>
          <div
            class="search-box-detail"
            v-for="(value, index) in historyData"
            :key="index"
            @click="ToDetails(value.id)"
          >
            {{ value.val }}
          </div>
        </div>
      </div>
    </div>
    <van-swipe @change="onChange" autoplay="2000" duration="1000">
      <van-swipe-item v-for="(item, index) in swipperData" :key="index">
        <img @click="swipperShow(item.pid)" :src="item.bannerImg" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          <div
            class="indicator_box"
            v-for="(item, index) in swipperData"
            :key="index"
            :class="{ active: current === index }"
          ></div>
        </div>
      </template>
    </van-swipe>

    <div class="home_middle">
      <div class="login_page" v-show="isLogin === false">
        <div class="home_middle_left">
          <div class="login_text">
            <p class="login_text_p1">你还没登录呢~~</p>
            <p class="login_text_p2">登录享受好礼~~</p>
          </div>
        </div>
        <div class="home_middle_right">
          <button @click="toLogin">登 录</button>
        </div>
      </div>
      <div class="login_page" v-show="isLogin === true">
        <div class="home_middle_left">
          <div class="login_text">
            <p class="login_text_p1">{{ personnalData.nickName }}</p>
            <p class="login_text_p2">欢迎登录成功~~</p>
          </div>
        </div>
        <div class="home_middle_right">
          <div class="img_persom">
            <img :src="personnalData.userImg" alt="" />
          </div>
        </div>
      </div>
      <div class="hot_goods">
        <div class="hot_goods_title">
          <p class="hot_goods_title1">Gaga热销</p>
          <p class="hot_goods_title2">HOT SALE</p>
        </div>
        <div class="hot_goods_boxs">
          <HotGood
            v-for="(v, i) in hotcoffee"
            :key="i"
            :coffee_value="v"
          ></HotGood>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/home.less";
import HotGood from "../components/HotGood";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    HotGood,
  },
  data() {
    return {
      current: 0,
      //swipper数据
      swipperData: [],
      //搜索关键字
      search_value: "",
      //热搜咖啡数据
      hotcoffee: [],
      //历史纪录
      historyData: [],
      //搜索结果
      searchList: [],
      //相关搜索时候出现
      isTrue: false,
      //历史记录是否出现
      toggleShowHis: false,
      //是否登录
      isLogin: false,
      //个人信息
      personnalData: [],
    };
  },
  methods: {
    ...mapMutations(["changeHistroyData"]),
    onChange(index) {
      // console.log(index);
      this.current = index;
    },
    toLogin() {
      this.$router.push("/login");
    },
    // 查看轮播图详情
    swipperShow(pid) {
      this.$router.push({ name: "Detail", query: { id: pid } });
    },
    //模糊搜索
    Onsearch() {
      //判断搜索框里面的长度
      if (this.search_value.length === 0) {
        this.isTrue = false;
        return;
      } else {
        this.isTrue = true;
      }

      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        this.$toast({
          message: "请先登录",
          forbidClick: true,
          duration: 1000,
        });
        return this.$router.push("/login");
      }

      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/search",
        params: {
          appkey: this.appkey,
          name: this.search_value,
        },
      })
        .then((res) => {
          // console.log(res);
          // this.$toast.clear();
          if (res.data.status === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === "Q001") {
            this.searchList = res.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //点击跳转
    ToDetails(id, val) {
      this.changeHistroyData({ id: id, val: val });
      //存值到缓存里面
      if (val !== undefined) {
        localStorage.setItem("one", JSON.stringify(this.histroyData));
        var data1 = JSON.parse(localStorage.getItem("one"));
        console.log(data1);
        this.historyData = data1;
        console.log(data1);
      }
      //跳转
      this.$router.push({ name: "Detail", query: { id: id } });
    },
    //历史纪录时候出现
    ShowHistroy() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return;
      }
      if (this.historyData === null) {
        return;
      }
      this.toggleShowHis = true;
    },
    //隐藏历史纪录
    HideHistroy() {},

    //登录后获取个人数据
    NowLogin() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString: lToken,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === "B001") {
            this.personnalData = res.data.result[0];
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
  },

  mounted() {
    this.axios
      .get(this.BaseUrl1 + "/banner?appkey=" + this.appkey)
      .then((data) => {
        this.swipperData = data.data.result;
      });
    this.axios
      .get(
        this.BaseUrl1 +
          "/typeProducts?appkey=" +
          this.appkey +
          "&key=isHot&value=1"
      )
      .then((data) => {
        this.hotcoffee = data.data.result;
        // console.log(this.hotcoffee);
      });
  },

  computed: {
    ...mapState(["histroyData"]),
  },

  created() {
    //为了是能获取到缓存里面的值
    let lToken = this.$cookie.get("loginToken");
    if (!lToken) {
      this.isLogin = false;
      this.toggleShowHis = false;
      return;
    } else {
      this.NowLogin();
      this.isLogin = true;
    }
    var data1 = JSON.parse(localStorage.getItem("one"));
    this.historyData = data1;
  },
};
</script>
