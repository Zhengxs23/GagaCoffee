<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="back" color="black" />
    <div class="bg"></div>
    <div class="order-nav">
      <van-tabs
        v-model="activedata"
        swipeable
        line-height="2px"
        color="#D0563F"
        title-active-color="#D0563F"
        @change="changeState"
      >
        <van-tab v-for="(v1, i1) in tabs" :key="i1" :title="v1.title">
          <div class="tab-item">
            <div v-if="orderData.length > 0">
              <div class="tab-box" v-for="(v2, i2) in orderData" :key="i2">
                <PayBox
                  :total="orderData[i2].count"
                  :totalPrice="orderData[i2].total"
                  :date="orderData[i2].date"
                >
                  <template #pay-title>
                    <div class="pay-title-box">
                      <div class="pay-t">NO1613785881316</div>
                      <div class="pay-s" v-if="orderData[i2].status === 2">
                        <div class="pay-text">已完成</div>
                        <div class="pay-icon">
                          <van-icon
                            name="delete-o"
                            @click="deleteOrder(v2.oid,i2)"
                          />
                        </div>
                      </div>
                      <div class="pay-s" v-if="orderData[i2].status === 1">
                        <div class="pay-text" @click="confirmOrder(v2, i2)">
                          确认订单
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #order-name>
                    <OrderItem
                      v-for="(item, index) in v2.data"
                      :key="index"
                      :product="item"
                    ></OrderItem>
                  </template>
                </PayBox>
              </div>
            </div>
            <div v-else>
              <van-empty description="没有已完成订单" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "../assets/less/order.less";
import PayBox from "../components/PayBox";
import OrderItem from "../components/OrderItem";
export default {
  name: "Order",
  data() {
    return {
      activedata: 0,
      tabs: [
        {
          title: "全部订单",
          status: 0,
        },
        {
          title: "进行中",
          status: 1,
        },
        {
          title: "已完成",
          status: 2,
        },
      ],
      //订单数据
      orderData: [],
    };
  },
  components: {
    PayBox,
    OrderItem,
  },
  created() {
    this.getOrderData(0);
  },
  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //获取订单数据
    getOrderData(status) {
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
        url: this.BaseUrl1 + "/findOrder",
        params: {
          appkey: this.appkey,
          tokenString: lToken,
          status: status,
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
          if (res.data.code === 70000) {
            let products = [];
            let oids = [];
            res.data.result.forEach((v) => {
              if (oids.indexOf(v.oid) === -1) {
                let o = {
                  oid: v.oid,
                  date: v.updatedAt,
                  status: v.status,
                  count: 0,
                  total: 0,
                  data: [],
                };
                oids.push(v.oid);
                products.push(o);
              }
            });
            products.forEach((val) => {
              res.data.result.forEach((item) => {
                if (val.oid === item.oid) {
                  val.data.push(item);
                  val.count += item.count;
                  val.total += item.count * item.price;
                }
              });
            });
            this.orderData = products;
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
    //切换状态
    changeState(name) {
      this.getOrderData(name);
    },
    //确认订单
    confirmOrder(val, index) {
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
        method: "POST",
        url: this.BaseUrl1 + "/receive",
        data: {
          appkey: this.appkey,
          tokenString: lToken,
          oid: val.oid,
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
          if (res.data.code === 80000) {
            val.status = 2;
            // console.log(this.activedata);
            if (this.activedata === 1) {
              this.orderData.splice(index, 1);
            }
          }
          this.$toast({
            message: res.data.msg,
            forbidClick: true,
            duration: 2000,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //删除订单
    deleteOrder(val,index) {
      // console.log(val);
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
        method: "POST",
        url: this.BaseUrl1 + "/removeOrder",
        data: {
          appkey: this.appkey,
          tokenString: lToken,
          oid: val,
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
          if (res.data.code === 90000) {
             this.orderData.splice(index, 1);
          }
          this.$toast({
            message: res.data.msg,
            forbidClick: true,
            duration: 2000,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
  },
};
</script>