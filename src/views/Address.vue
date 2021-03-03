<template>
  <div class="address">
    <van-nav-bar
      :title="aid ? '编辑地址' : '新增地址'"
      left-arrow
      @click-left="back"
      color="black"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="!!aid"
      show-set-default
      show-search-result
      detail-maxlength="30"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="originAddressInfo"
      @save="save"
      @delete="removeAddress"
    />
  </div>
</template>

<script>
import "../assets/less/address.less";
import areaList from "../assets/js/area";
export default {
  name: "Address",
  data() {
    return {
      areaList,
      //编辑地址的aid
      aid: "",
      //编辑地址初始值
      originAddressInfo: {},
      //上一页地址
      fromPath: "",
    };
  },
  created() {
    //截取路由参数
    if (this.$route.params.aid) {
      this.aid = this.$route.params.aid;
      // console.log(this.aid);
      //如果存在aid，则根据aid去拿数据
      if (this.aid) {
        this.getAddressDataByAid();
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //新增地址
    add(value) {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      //声明多一个变量保存value
      let data = { ...value, tokenString: lToken, appkey: this.appkey };
      data.isDefault = Number(data.isDefault);
      delete data.country;
      //   console.log(data);

      this.axios({
        method: "POST",
        url: this.BaseUrl1 + "/addAddress",
        data,
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 700) {
            return this.$router.push("/login");
          }
          if (res.data.code === 9000) {
            if (this.fromPath === "/pay") {
              let sids = [];
              sids = this.$route.query.sids;
              console.log(sids);
              this.$router.push({
                path: `${this.fromPath}`,
                query: { sids: sids.join("-") },
              });
              return;
            }
            this.$router.push({ name: "AddressList" });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //编辑地址
    edit(value) {
      let isEdit = false;
      for (let i in value) {
        // console.log(value[i]);
        if (value[i] !== this.originAddressInfo[i]) {
          isEdit = true;
          break;
        }
      }
      if (isEdit) {
        // console.log("已编辑");

        let address = {};
        address.aid = this.aid;
        address.name = value.name;
        address.tel = value.tel;
        address.province = value.province;
        address.city = value.city;
        address.county = value.county;
        address.addressDetail = value.addressDetail;
        address.areaCode = value.areaCode;
        address.postalCode = value.postalCode;
        address.isDefault = Number(value.isDefault);
        // console.log(address);

        let lToken = this.$cookie.get("loginToken");
        if (!lToken) {
          return this.$router.push("/login");
        }
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });
        let data = { appkey: this.appkey, tokenString: lToken, ...address };

        this.axios({
          method: "POST",
          url: this.BaseUrl1 + "/editAddress",
          data,
        })
          .then((res) => {
            // console.log(res);
            if (res.data.code === 700) {
              return this.$router.push("/login");
            }
            if (res.data.code === 30000) {
              if (this.fromPath === "/pay") {
                let sids = [];
                sids = this.$route.query.sids;
                console.log(sids);
                this.$router.push({
                  path: `${this.fromPath}`,
                  query: { sids: sids.join("-") },
                });
                return;
              }
              return this.$router.push("/addressList");
            }
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 1000,
            });
          })
          .catch((err) => {
            this.$toast.clear();
            console.log(err);
          });
      } else {
        // console.log("未编辑");
        this.$router.push("/addressList");
      }
    },
    //保存地址
    save(value) {
      if (this.aid) {
        //编辑地址
        let data = value;
        delete data.country;
        this.edit(data);
      } else {
        this.add(value);
      }
    },
    //根据aid获取地址数据
    getAddressDataByAid() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: this.BaseUrl1 + "/findAddressByAid",
        params: {
          appkey: this.appkey,
          tokenString: lToken,
          aid: this.aid,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 700) {
            return this.$router.push("/login");
          }
          if (res.data.code === 40000) {
            let data = res.data.result[0];
            data.isDefault = !!data.isDefault;
            this.originAddressInfo = data;
          }
          this.$toast({
            message: res.data.msg,
            forbidClick: true,
            duration: 1000,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //删除地址
    removeAddress(value) {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "POST",
        url: this.BaseUrl1 + "/deleteAddress",
        data: {
          tokenString: lToken,
          appkey: this.appkey,
          aid: value.aid,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 700) {
            return this.$router.push("/login");
          }
          if (res.data.code === 10000) {
            this.$router.push("/addressList");
          }
          this.$toast({
            message: res.data.msg,
            forbidClick: true,
            duration: 1000,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromPath = from.path;
    });
  },
};
</script>