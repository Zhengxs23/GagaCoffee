<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="back" color="black" />
    <div class="detail_img">
      <img :src="goods_details.large_img" />
    </div>
    <div class="detail_info">
      <div class="detail_info_top">
        <div class="detail_title">{{ goods_details.name }}</div>
        <div class="detail_choose">已选：{{ rule_show }}</div>
        <div
          class="detail_classify"
          v-for="(v1, i1) in goods_details.detailarr"
          :key="i1"
        >
          <p class="detail_type">{{ v1.title }}</p>
          <div class="detail_type_choose">
            <div
              class="details_type_box"
              :class="{ active: v1.currentIndex === i2 }"
              v-for="(v2, i2) in v1.rule"
              :key="i2"
              @click="rule_choose(v1, i2)"
            >
              {{ v2.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="detail_info_bottom">
        <p class="detail_info_bottom_information">商品简介</p>
        <div
          class="detail_introduction"
          v-for="(v, i) in goods_details.desc"
          :key="i"
        >
          {{ i + 1 }}. {{ v }}
        </div>
        <!-- <van-divider /> -->
      </div>
    </div>
    <div class="detail_bottom">
      <div class="detail_quantity">
        <span>￥29.00</span>
        <van-stepper
          v-model="number_value"
          theme="round"
          button-size="22"
          disable-input
        />
      </div>
      <div class="detail_c_navigation">
        <van-goods-action>
          <van-goods-action-icon
            icon="bag-o"
            text="购物袋"
            :badge="shopbagCount > 0 ? shopbagCount : ''"
            @click="ToShop"
          />
          <van-goods-action-icon
            @click="doornotcollect"
            icon="like"
            :color="toggle_collect ? '#D15343' : '#666'"
            :text="toggle_collect ? '已收藏' : '收藏'"
          />
          <van-goods-action-button
            color="#bd8986"
            type="warning"
            text="加入购物车"
            @click="addToShop"
          />
          <van-goods-action-button
            color="#D15343"
            type="danger"
            text="立即购买"
            @click="JumpOrder"
          />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/detail.less";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      //商品数量
      number_value: 1,
      //商品id
      pid: "",
      //商品详情
      goods_details: [],
      //选中的规格显示
      rule_show: "",
      //收藏是否
      toggle_collect: false,
      //标记初始收藏状态
      initial_collect: "",
    };
  },
  computed: {
    ...mapState(["shopbagCount", "isShopbagCount"]),
  },
  created() {
    //赋值初始收藏状态
    this.initial_collect = this.toggle_collect;
    //加载运行
    this.getDetailData();
    //规格选中
    this.search_collect();
    this.search_shop();
  },
  mounted() {
    this.pid = this.$route.query.id;
    // console.log(this.pid);
    this.axios({
      method: "get",
      url: this.BaseUrl1 + "/productDetail",
      params: {
        appkey: this.appkey,
        pid: this.pid,
      },
    })
      .then((data) => {
        console.log(data);
        //加载中消失
        this.$toast.clear();
        // console.log(data);
        // console.log(this.goods_details);
        if (data.data.code == 600) {
          let res = data.data.result[0];
          //   console.log(res);
          //处理数据
          let arr = ["cream", "tem", "sugar", "milk"];

          //创建一个空数组对象，保存解析好的值
          res.detailarr = [];

          arr.forEach((v) => {
            // console.log(v);
            // 不存在就return掉
            if (!res[v]) {
              return;
            }

            //规则（分割好数据）
            let regText = res[v].split("/");

            //声明一个对象格式
            let currentRule = {
              title: res[v + "_desc"],
              currentIndex: 0,
              rule: [],
            };
            //遍历每个分割好的数据
            regText.forEach((item) => {
              let o = {
                title: item,
              };
              currentRule.rule.push(o);
              //console.log(currentRule);
            });
            res.detailarr.push(currentRule);
          });
          // console.log(res);

          //商品简介信息分析
          res.desc = res.desc.split(/\n/);
          // console.log(res.desc);
          this.goods_details = data.data.result[0];
          // console.log(this.goods_details);
          //开始给规格赋值
          let rules = [];
          let str = "";
          this.goods_details.detailarr.forEach((v) => {
            rules.push(v.rule[v.currentIndex].title);
          });
          for (let v of rules) {
            str += v + "/";
          }
          str = str.slice(0, -1);
          this.rule_show = str;
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
  methods: {
    ...mapMutations(["changeShopbagCount", "changeIsShopbagCount"]),

    //返回上一级
    back() {
      this.$router.go(-1);
    },

    //获取商品详情数据
    getDetailData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
    },

    //规格选择
    rule_choose(x, y) {
      //   //x:温度这些大类，y:温度这些子元素的序号
      //   //改变选中
      x.currentIndex = y;

      let rules = [];
      let str = "";
      this.goods_details.detailarr.forEach((v) => {
        rules.push(v.rule[v.currentIndex].title);
      });
      for (let v of rules) {
        str += v + "/";
      }
      str = str.slice(0, -1);
      this.rule_show = str;
    },

    //收藏
    //点击
    collect() {
      // console.log('111');
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        this.$toast({
          message: "请先登录",
          forbidClick: true,
          duration: 2000,
        });
        //未登录
        return this.$router.push("/login");
      } else {
        //已登录
        // console.log("已登录");
        this.$toast.loading({
          message: "收藏中...",
          forbidClick: true,
          duration: 0,
        });
        this.axios({
          method: "post",
          url: this.BaseUrl1 + "/like",
          data: {
            appkey: this.appkey,
            pid: this.pid,
            tokenString: lToken,
          },
        })
          .then((data) => {
            this.$toast.clear();
            this.$toast({
              message: "收藏成功",
              forbidClick: true,
              duration: 1000,
            });
            if (data.data.code == 800) {
              //收藏成功图标
              this.toggle_collect = true;
            }
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      }
    },
    //查询收藏
    search_collect() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        //未登录
        // this.$router.push("/login");
      } else {
        this.axios({
          method: "get",
          url: this.BaseUrl1 + "/findAllLike",
          params: {
            appkey: this.appkey,
            tokenString: lToken,
          },
        })
          .then((data) => {
            // console.log(data);
            //查询收藏接口连接成功
            if (data.data.code === 2000) {
              for (let v of data.data.result) {
                //判断收藏列表里时候又跟当前页面相等的pid
                if (v.pid === this.pid) {
                  this.toggle_collect = true;
                  this.initial_collect = true;
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //删除收藏
    del_collect() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        //未登录
      } else {
        this.$toast.loading({
          message: "取消收藏中...",
          forbidClick: true,
          duration: 0,
        });
        this.axios({
          method: "post",
          url: this.BaseUrl1 + "/notlike",
          data: {
            appkey: this.appkey,
            pid: this.pid,
            tokenString: lToken,
          },
        })
          .then((data) => {
            this.$toast.clear();
            this.$toast({
              message: "已取消收藏",
              forbidClick: true,
              duration: 1000,
            });
            // console.log(data);
            if (data.data.code == 900) {
              this.toggle_collect = false;
            }
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      }
    },
    //集合收藏和取消收藏
    doornotcollect() {
      console.log(this.initial_collect);
      if (this.initial_collect) {
        this.initial_collect = false;
        this.del_collect();
      } else {
        this.initial_collect = true;
        this.collect();
      }
    },

    //购物车
    //加入购物车
    addToShop(isJump) {
      let lToken = this.$cookie.get("loginToken");
      //未登录
      if (!lToken) {
        this.$toast({
          message: "请先登录",
          forbidClick: true,
          duration: 2000,
        });
        return this.$router.push("/login");
      } else {
        //得到规格
        let rules = [];
        this.goods_details.detailarr.forEach((v) => {
          rules.push(v.rule[v.currentIndex].title);
        });
        //已登录
        this.$toast.loading({
          message: "加入购物袋中",
          duration: 0,
        });
        this.axios({
          method: "post",
          url: this.BaseUrl1 + "/addShopcart",
          data: {
            appkey: this.appkey,
            pid: this.pid,
            tokenString: lToken,
            count: this.number_value,
            rule: rules.join("/"),
          },
        })
          .then((data) => {
            this.$toast.clear();
            // console.log("加入购物袋", data);
             if (isJump === '1') {
                this.$router.push({
                  name: "Pay",
                  query: { sids: data.data.sid },
                });
                return;
              }
            if (data.data.code == 3000) {
              if (data.data.status == 1) {
                this.changeShopbagCount(this.shopbagCount + 1);
                this.$toast({
                  message: "加入购物袋成功",
                  duration: 2000,
                });
              } else {
                this.$toast({
                  message: "更改数量成功",
                  duration: 2000,
                });
              }

             
            }
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      }
    },
    //购物车数量
    search_shop() {
      if (this.isShopbagCount) {
        // console.log(this.isShopbagCount);
        // console.log("detail已经加载过购物袋数量");
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
              this.changeIsShopbagCount(true); //购物车加载完成
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //跳转购物袋页面
    ToShop() {
      this.$router.push("/shop");
    },
    //跳转订单页面
    JumpOrder() {
      this.addToShop('1');
    },
  },
};
</script>