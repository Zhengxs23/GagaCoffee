<template>
  <div class="address-list">
    <van-nav-bar title="地址管理" left-arrow @click-left="back" color="black" />
    <van-address-list
      :list="list"
      default-tag-text="默认"
      :switchable="false"
      @add="add"
      @edit="edit"
    />
  </div>
</template>

<script>
import "../assets/less/addresslist.less";
export default {
  name: "AddressList",
  data() {
    return {
      //地址列表数据
      list: [],
    };
  },
  created() {
    this.getAddressListData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    //新增
    add() {
      this.$router.push({ name: "Address" });
    },
    //编辑
    edit({aid}){
        this.$router.push({name:'Address' , params:{aid}})
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
          if (res.data.code === 20000) {
            //添加address属性
            res.data.result.forEach((v) => {
              v.address = `${v.province} ${v.city} ${v.county} ${v.addressDetail}`;
              v.isDefault = Boolean(v.isDefault);
            });
            // console.log(res.data.result);
            this.list = res.data.result;
          }else{
              this.$toast({
                  message:res.data.msg,
                  forbidClick:true,
                  duration:3000
              })
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

<style lang="less" scoped>
</style>