<template>
  <div>
    <router-view />
    <van-tabbar v-model="activeIndex" active-color="#D0563F" route>
      <van-tabbar-item
        v-for="item in icon_Img"
        :key="item.name"
        :to="item.to"
        :badge="item.badge > 0 ? item.badge : ''"
      >
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.unactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Bottom",
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    ...mapState(["shopbagCount","isShopbagCount"]),
     icon_Img(){
       return [
        {
          name: "首页",
          icon: {
            active: require("../assets/images/coffee.png"),
            unactive: require("../assets/images/coffee_uncheck.png"),
          },
          to: "/",
        },
        {
          name: "菜单",
          icon: {
            active: require("../assets/images/menu.png"),
            unactive: require("../assets/images/menu_uncheck.png"),
          },
          to: "/menu",
        },
        {
          name: "购物袋",
          icon: {
            active: require("../assets/images/shop.png"),
            unactive: require("../assets/images/shop_uncheck.png"),
          },
          badge:this.shopbagCount,
          to: "/shop"
        },
        {
          name: "我的",
          icon: {
            active: require("../assets/images/me.png"),
            unactive: require("../assets/images/me_unchecked.png"),
          },
          to: "/my",
        }
      ]
     } 
  },
  created() {
    this.shopbagCount;
    //执行查看购物袋
    this.search_shop();
  },
  methods: {
    ...mapMutations(["changeShopbagCount","changeIsShopbagCount"]),
    //获取购物袋数量
    search_shop() {
      if(this.isShopbagCount){
        // console.log(this.isShopbagCount);
        // console.log("bottom已经加载过购物袋数量");
        return;
      }
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return;
      } else {
        this.axios({
          method: "get",
          url: this.BaseUrl1 + "/shopcartRows",
          params: {
            appkey: this.appkey,
            tokenString: lToken,
          },
        })
          .then((data) => {
            // console.log(data);
            if (data.data.code == 8000) {
              // console.log(data.data.result);
              this.changeShopbagCount(data.data.result);
              this.changeIsShopbagCount(true);//购物车加载完成
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>