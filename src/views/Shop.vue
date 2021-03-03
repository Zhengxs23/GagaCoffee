<template>
  <div class="shop">
    <van-nav-bar title="购物袋" left-arrow @click-left="back">
      <template #right>
        <div @click="toggleState" v-if="shopbagData.length > 0">
          {{ !isEdit ? "编辑" : "完成" }}
        </div>
      </template>
    </van-nav-bar>
    <div v-if="shopbagData.length > 0">
      <div class="shopDetails">
        <div>
          <div class="clearshopcar" @click="clearAllBox">清空购物车</div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="哎呀，没有更多了"
          @load="onLoad"
          offset="-90"
        >
          <van-swipe-cell
            :disabled="!isEdit"
            v-for="(item, index) in shopbagData"
            :key="item.sid"
          >
            <div class="shopbox">
              <div class="shopbox_left">
                <div class="check">
                  <van-checkbox
                    v-model="item.isChecked"
                    @change="simpleSelect"
                  ></van-checkbox>
                </div>
                <div class="shopImg">
                  <img :src="item.small_img" />
                </div>
              </div>
              <div class="shopbox_right">
                <div class="shopbox_right_top">{{ item.name }}</div>
                <div class="shopbox_right_middle">{{ item.rule }}</div>
                <div class="shopbox_right_bottom">
                  <div class="shopbox_right_bottom_left">{{ item.price }}</div>
                  <div class="shopbox_right_bottom_right">
                    <van-stepper
                      v-model="item.count"
                      theme="round"
                      button-size="22"
                      disable-input
                      @change="changeDataNum(item.sid, item.count)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                class="shopbag-remove-btn"
                color="#D0563F"
                square
                text="删除"
                @click="deleteData([item.sid], index)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
      <van-submit-bar
        v-show="!isEdit"
        :price="total"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @click="ChooseAllData"
          >全选</van-checkbox
        >
      </van-submit-bar>
      <van-submit-bar
        v-show="isEdit"
        button-text="删除选择"
        @submit="removeSelect"
      >
        <van-checkbox v-model="checked" @click="ChooseAllData"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </div>
    <div v-else>
      <van-empty description="购物袋没有数据，快去逛一逛!" />
    </div>
  </div>
</template>

<script>
import "../assets/less/shop.less";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      //是否编辑商品
      isEdit: false,
      //是否全选
      checked: false,
      //购物袋数据
      shopbagData: [],
      //全部的数据
      shopbagAllData: [],
      //开始
      start: 0,
      //结束
      count: 6,
      //滚到底部刷新,首次不进行懒加载
      loading: true,
      //数据时候加载完毕
      finished: false,
      //总金额
      total: 0,
    };
  },
  created() {
    this.getShopbagData();
  },
  computed: {
    ...mapState(["shopbagCount"]),
    // total(){
    //   this.sum();
    // }
  },
  methods: {
    ...mapMutations(["changeShopbagCount"]),
    clearAllBox() {
      console.log("清空购物车");
    },
    //提交订单
    onSubmit() {
      let sids = [];
      this.shopbagData.forEach((v) => {
        if (v.isChecked) {
          sids.push(v.sid);
        }
      });
      console.log(sids);
      if (sids.length === 0) {
        this.$toast({
          message: "选择下单的商品",
          forbidClick: true,
          duration: 2000,
        });
        return;
      }
      // console.log(sids)
      this.$router.push({name:'Pay',query:{sids:sids.join('-')}})
    },
    //获取购物袋数据
    getShopbagData() {
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
          message: "购物车加载中",
          forbidClick: true,
          duration: 0,
        });
        this.axios({
          method: "GET",
          url: this.BaseUrl1 + "/findAllShopcart",
          params: {
            appkey: this.appkey,
            tokenString: lToken,
          },
        })
          .then((data) => {
            this.$toast.clear();
            // this.$toast({
            //   message: "购物车加载成功",
            //   forbidClick: true,
            //   duration: 1000,
            // });
            if (data.data.code == 5000) {
              data.data.result.forEach((v) => {
                v.isChecked = false;
              });

              this.shopbagAllData = data.data.result;
              // console.log(this.shopbagAllData.length, this.count);
              this.shopbagData = this.shopbagAllData.slice(
                this.start,
                this.start + this.count
              );
              this.start += this.count;
              if (this.shopbagAllData.length < this.count) {
                this.finished = true;
                return;
              }
              //下次触底懒加载
              this.loading = false;
            }
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      }
    },
    //加载更多
    onLoad() {
      setTimeout(() => {
        let data = this.shopbagAllData.slice(
          this.start,
          this.start + this.count
        );
        this.shopbagData.push(...data);
        this.start += this.count;
        //改变状态
        if (data.length < this.count) {
          this.finished = true;
          return;
        }
        this.loading = false;
      }, 1000);
    },
    //改变购物车数量
    changeDataNum(sid, count) {
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
        this.axios({
          method: "POST",
          url: this.BaseUrl1 + "/modifyShopcartCount",
          data: {
            appkey: this.appkey,
            tokenString: lToken,
            sid,
            count,
          },
        })
          .then((data) => {
            if (data.data.code === 6000) {
              this.sum();
            }
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      }
    },
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //切换状态
    toggleState() {
      this.isEdit = !this.isEdit;
    },
    //全选
    ChooseAllData() {
      this.shopbagData.forEach((v) => {
        v.isChecked = this.checked;
      });
    },
    //单选
    simpleSelect() {
      this.sum();
      for (let i = 0; i < this.shopbagData.length; i++) {
        if (!this.shopbagData[i].isChecked) {
          this.checked = false;
          return;
        }
      }
      this.checked = true;
    },
    //单个商品删除/多个商品删除
    deleteData(sids, index) {
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
        this.axios({
          method: "POST",
          url: this.BaseUrl1 + "/deleteShopcart",
          data: {
            appkey: this.appkey,
            tokenString: lToken,
            sids: JSON.stringify(sids),
          },
        })
          .then((data) => {
            if (data.data.code == 7000) {
              //删除
              //单个删除
              if (index !== undefined) {
                this.shopbagData.splice(index, 1);
                this.changeShopbagCount(this.shopbagCount - 1);
                this.simpleSelect();
              } else {
                //执行多个删除
                for (let i = 0; i < this.shopbagData.length; i++) {
                  if (this.shopbagData[i].isChecked) {
                    this.shopbagData.splice(i, 1);
                    //防止跳跃
                    i--;
                  }
                }
                this.changeShopbagCount(this.shopbagCount - sids.length);
                this.sum();
              }
            }
            this.$toast({
              message: data.data.msg,
              forbidClick: true,
              duration: 3000,
            });
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      }
    },
    //删除选择的购物袋商品
    removeSelect() {
      //获取选中的sid
      let sids = [];
      this.shopbagData.forEach((v) => {
        if (v.isChecked) {
          sids.push(v.sid);
        }
      });
      if (sids.length === 0) {
        this.$toast({
          message: "未选择删除商品",
          forbidClick: true,
          duration: 2000,
        });
        return;
      }
      //删除商品函数
      this.deleteData(sids);
    },
    //计算勾选商品总金额
    sum() {
      let total = 0;
      this.shopbagData.forEach((v) => {
        if (v.isChecked) {
          total += v.price * v.count;
        }
      });
      this.total = total * 100;
    },
  },
};
</script>
