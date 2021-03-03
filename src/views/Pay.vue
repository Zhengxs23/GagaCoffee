<template>
  <div class="pay">
    <van-nav-bar title="确认订单" left-arrow @click-left="back" color="black" />
    <div class="bg"></div>
    <div class="address-box" @click="showAddress">
      <p class="adress-title">订单配送至</p>
      <div class="address-detail" v-if="currentAddress.aid">
        <div class="address-detail-top">
          <div class="address-detail-top-left">
            <div class="address-default" v-if="currentAddress.isDefault">
              默认
            </div>
            <div class="address-address">{{ currentAddress.address }}</div>
          </div>
          <div class="address-detail-top-right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="address-detail-bottom">
          <div class="address-people">
            {{ currentAddress.name }} {{ currentAddress.tel }}
          </div>
        </div>
      </div>
    </div>
    <div class="pay-info">
      <PayBox :total="total" :totalPrice="total_price">
        <template #order-name>
          <OrderItem
            v-for="(item, index) in ShopPay"
            :key="index"
            :product="item"
          ></OrderItem>
        </template>
      </PayBox>
    </div>
    <van-popup v-model="show" position="bottom" closeable>
      <div class="address">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="add"
          @select="selectAddress"
          @edit="edit"
        />
      </div>
    </van-popup>
    <div class="pay-btn">
      <van-button color="#D05140" block round @click="pay">立即结算</van-button>
    </div>
  </div>
</template>

<script>
import "../assets/less/pay.less";
import PayBox from "../components/PayBox";
import OrderItem from "../components/OrderItem";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Pay",
  created() {
    this.sids = this.$route.query.sids.split("-");
    console.log(this.sids);
    this.getAddressListData();
    this.getShopData();
  },
  data() {
    return {
      show: false,
      chosenAddressId: "",
      list: [],
      sids: [],
      //当前地址对象
      currentAddress: {},
      //需要购买的购物袋商品数据
      ShopPay: [],
      //商品总数量
      total: 0,
      //总金额
      total_price: 0,
    };
  },
  components: {
    PayBox,
    OrderItem,
  },
  computed: {
    ...mapState(["shopbagCount"]),
  },
  methods: {
    ...mapMutations(["changeShopbagCount"]),
    back() {
      this.$router.go(-1);
    },
    //切换地址栏
    showAddress() {
      this.show = true;
    },
    //跳转新增地址页面
    add() {
      this.$router.push({ name: "Address", query: { sids: this.sids } });
    },
    //查询用户地址列表
    getAddressListData() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/findAddress",
        params: {
          appkey: this.appkey,
          tokenString: lToken,
        },
      })
        .then((res) => {
          //   console.log(res);
          this.$toast.clear();
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === 20000) {
            //添加address属性
            res.data.result.forEach((v) => {
              v.address = `${v.province} ${v.city} ${v.county} ${v.addressDetail}`;
              v.isDefault = Boolean(v.isDefault);
              if (v.isDefault) {
                this.chosenAddressId = v.id;
                this.currentAddress = { ...v };
              }
            });
            // console.log(res.data.result);
            this.list = res.data.result;
          } else {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //选择地址
    selectAddress(item) {
      // console.log(item);
      this.chosenAddressId = item.id;
      this.currentAddress = { ...item };

      this.show = false;
    },
    //编辑地址
    edit({ aid }) {
      this.$router.push({
        name: "Address",
        params: { aid },
        query: { sids: this.sids },
      });
    },
    //获取购物袋的商品
    getShopData() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/commitShopcart",
        params: {
          appkey: this.appkey,
          tokenString: lToken,
          sids: JSON.stringify(this.sids),
        },
      })
        .then((res) => {
          console.log(res);
          this.$toast.clear();
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === 50000) {
            if (res.data.result.length === 0) {
                return this.$router.push({path:'/'});
            }
            this.ShopPay = res.data.result;
            this.ShopPay.forEach((v) => {
              this.total += v.count;
              this.total_price += v.count * v.price;
            });
            //   console.log(this.total);
            // console.log(this.total_price)
          } else {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //结算订单
    pay() {
      //判断是否选择地址
      if (!this.currentAddress.aid) {
        return this.$toast({
          message: "请选择收货地址",
          forbidClick: true,
          duration: 2000,
        });
      }
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }

      //获取参数
      let data = {
        appkey: this.appkey,
        tokenString: lToken,
        sids: JSON.stringify(this.sids),
        phone: this.currentAddress.tel,
        address: this.currentAddress.address,
        receiver: this.currentAddress.name,
      };

      //发送请求
      this.axios({
        method: "POST",
        url: this.BaseUrl1 + "/pay",
        data,
      })
        .then((res) => {
          console.log(res);
          this.$toast.clear();
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === 60000) {
            //跳转订单组件
            this.changeShopbagCount(this.shopbagCount - this.sids.length);
            this.$router.push({ name: "Order" });
          } else {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
  },
};
</script>
