<template>
  <div class="menu">
    <van-nav-bar title="菜单" color="black" />
    <div class="menu-box">
      <div class="menu-left">
        <!-- <div class="menu-nav-box" @click="getNavData('isHot', 1)">
          <div class="shop-img">
            <img :src="HotshopImg" alt="" />
          </div>
          <div class="shop-text shop-text2" ref="shoptext">推荐</div>
        </div> -->
        <div
          class="menu-nav-box"
          v-for="(value, index) in nav"
          :key="index"
          @click="getNavData('type', value.type)"
        >
          <div class="shop-img">
            <!-- {{value.type}} -->
            <!-- {{icon_Img[index].name}} -->
            <img
              :src="
                value.type === a
                  ? icon_Img[index].icon.active
                  : icon_Img[index].icon.unactive
              "
              alt=""
            />
          </div>
          <div class="shop-text">
            {{ value.typeDesc }}
          </div>
        </div>
      </div>
      <div class="menu-right">
        <div
          class="menu-nav-details"
          v-for="(value, index) in navData"
          :key="index"
          @click="jumpDetail(value.pid)"
        >
          <div class="menu-nav-details-img">
            <img :src="value.smallImg" alt="" />
          </div>
          <div class="menu-nav-details-text">
            <div class="shopDetail-title">{{ value.name }}</div>
            <div class="shopDetail-introduce">
              {{ value.desc }}
            </div>
            <div class="shopDetail-bottom">
              <div class="shopDetail-price">{{ value.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/menu.less";
export default {
  name: "Menu",
  data() {
    return {
      nav: [],
      navData: [],
      HotshopImg: require("../assets/images/hot.png"),
      shopImg: require("../assets/images/drink.png"),
      a: "",
    };
  },
  created() {
    this.getNav();
    // this.getNavData('isHot', 1);
  },
  computed: {
    icon_Img() {
      return [
        {
          name: "latte",
          icon: {
            active: require("../assets/images/coffee.png"),
            unactive: require("../assets/images/coffee_uncheck.png"),
          },
          to: "/",
        },
        {
          name: "coffee",
          // name: "coffee_true",
          icon: {
            active: require("../assets/images/menu.png"),
            unactive: require("../assets/images/menu_uncheck.png"),
          },
          to: "/menu",
        },
        {
          name: "rena_ice",
          icon: {
            active: require("../assets/images/shop.png"),
            unactive: require("../assets/images/shop_uncheck.png"),
          },
          badge: this.shopbagCount,
          to: "/shop",
        },
        {
          name: "fruit_tea",
          icon: {
            active: require("../assets/images/me.png"),
            unactive: require("../assets/images/me_unchecked.png"),
          },
          to: "/my",
        },
      ];
    },
  },
  methods: {
    //获取主标签
    getNav() {
      // let lToken = this.$cookie.get("loginToken");
      // if (!lToken) {
      //   return this.$router.push("/login");
      // }
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/type",
        params: {
          appkey: this.appkey,
        },
      })
        .then((res) => {
          // console.log(res);
          this.$toast.clear();
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === 400) {
            this.nav = res.data.result;
            if (this.nav.length !== 0) {
              this.getNavData("type",'latte')
              // this.getNavData("isHot", 1);
            }
          }
          // this.$toast({
          //   message: res.data.msg,
          //   forbidClick: true,
          //   duration: 2000,
          // });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //点击主标签弹出内容
    getNavData(key, type) {
      // let lToken = this.$cookie.get("loginToken");
      // if (!lToken) {
      //   return this.$router.push("/login");
      // }
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/typeProducts",
        params: {
          appkey: this.appkey,
          key: key,
          value: type,
        },
      })
        .then((res) => {
          // console.log(res);
          this.$toast.clear();
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === 500) {
            //coffee标识符重复了
            // if (res.data.result[0].typeDesc === "咖啡") {
            //   console.log(11);
            //   res.data.result[0].type = "coffee_true";
            // }
            // if (key === "isHot") {
            //   this.HotshopImg = require("../assets/images/hot_click.png");
            //   this.$refs.shoptext.style.color = "#D0563F";
            // } else {
            //   this.HotshopImg = require("../assets/images/hot.png");
            //   this.$refs.shoptext.style.color = "grey";
            // }
            this.navData = res.data.result;
            this.a = res.data.result[0].type;
            // console.log(this.a);
          }
          // this.$toast({
          //   message: res.data.msg,
          //   forbidClick: true,
          //   duration: 2000,
          // });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //调到详情页
    jumpDetail(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
  },
};
</script>
