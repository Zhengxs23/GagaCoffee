<template>
  <div class="collect">
    <van-nav-bar title="我的收藏" left-arrow @click-left="back" />
    <div class="collect_bg" >
      <img src="../assets/images/bg.png" alt="" />
    </div>
    <div class="collect-boxs" v-for="(value,index) in Collectdata" :key="index">
      <div class="collect-box">
        <div class="box-img">
          <img :src="value.smallImg" />
        </div>
        <div class="box-details">
          <div class="box-text-c">{{value.name}}</div>
          <div class="box-text-e">{{value.enname}}</div>
          <div class="box-text">{{value.desc}}</div>
        </div>
        <div class="delete-box">
          <van-icon name="delete-o" size="60px" @click="deleteData(value.pid,index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/collect.less";
export default {
  name: "Collect",
  data(){
      return{
          Collectdata:[]
      }
  },
  created(){
      this.getCollectData();
  },
  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //发送收藏请求
    getCollectData() {
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
        url: this.BaseUrl1 + "/findAllLike",
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
          if (res.data.code === 2000) {
              this.Collectdata = res.data.result;
          } 
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },

    //删除数据
    deleteData(id,index){
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
        url: this.BaseUrl1 + "/notlike",
        data: {
          appkey: this.appkey,
          pid:id,
          tokenString: lToken
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
          if (res.data.code === 900) {
              this.Collectdata.splice(index, 1);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    }
  },
};
</script>
