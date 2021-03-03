<template>
  <div class="my">
    <div class="my-bg" :style="{ backgroundImage: `url(${userInfo.userBg})` }">
      <van-uploader :after-read="uploadBg" />
    </div>

    <div class="my-box">
      <div class="my-info">
        <div class="my-img">
          <img class="auto-img" :src="userInfo.userImg" alt />
          <div class="up-img">
            <van-uploader :max-size="500 * 1024" :after-read="uploadAvatar" />
          </div>
        </div>
        <div class="my-text">
          <div class="my-name one-text">{{ userInfo.nickName }}</div>
          <div class="my-desc one-text">
            {{ userInfo.desc ? userInfo.desc : "这家伙很懒，什么都没留下。" }}
          </div>
        </div>
      </div>

      <div class="my-list">
        <van-cell
          @click="goPage(item.name)"
          :title="item.title"
          is-link
          title-style="color: #666;"
          v-for="(item, index) in cellData"
          :key="index"
        />
      </div>
    </div>
    <van-button class="register_btn" round type="default" block @click="SignOut"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import "../assets/less/my.less";
export default {
  name: "My",
  data() {
    return {
      cellData: [
        { title: "个人资料", name: "Myself" },
        { title: "我的订单", name: "Order" },
        { title: "我的收藏", name: "Collect" },
        { title: "地址管理", name: "AddressList" },
        { title: "安全中心", name: "Safe" },
      ],

      userInfo: {},
    };
  },

  created() {
    this.getUserInfo();
  },

  methods: {
    goPage(name) {
      this.$router.push({ name });
    },

    //获取用户信息
    getUserInfo() {
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
        url: this.BaseUrl1 + "/findMy",
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
          if (res.data.code === "A001") {
            this.userInfo = res.data.result[0];
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

    //上传头像
    uploadAvatar(file) {
      console.log(file);
      let types = ["png", "gif", "jpg", "jpeg"];

      //截取上传图片的类型
      let type = file.file.type.split("/")[1];
      //   console.log("type ==> ", type);

      if (types.indexOf(type) === -1) {
        return this.$toast({
          message: `文件类型只支持${types.join(",")}`,
          forbidClick: true,
          duration: 3000,
        });
      }

      //处理base64
      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");
      //   console.log('base64 ==> ', base64);

      //发送请求
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
        url: this.BaseUrl1 + "/updateAvatar",
        data: {
          appkey: this.appkey,
          tokenString: lToken,
          imgType: type,
          serverBase64Img: base64,
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
          if (res.data.code === "H001") {
            this.userInfo.userImg = res.data.userImg;
          }
          this.$toast({
            message: res.data.msg,
            forbidClick: true,
            duration: 3000,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },

    //上传背景
    uploadBg(file) {
      let types = ["png", "gif", "jpg", "jpeg"];

      //截取上传图片的类型
      let type = file.file.type.split("/")[1];
      //   console.log("type ==> ", type);

      if (types.indexOf(type) === -1) {
        return this.$toast({
          message: `文件类型只支持${types.join(",")}`,
          forbidClick: true,
          duration: 3000,
        });
      }

      //处理base64
      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");
      //   console.log('base64 ==> ', base64);

      //发送请求
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
        url: this.BaseUrl1 + "/updateUserBg",
        data: {
          appkey: this.appkey,
          tokenString: lToken,
          imgType: type,
          serverBase64Img: base64,
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
          if (res.data.code === "I001") {
            this.userInfo.userBg = res.data.userBg;
          }
          this.$toast({
            message: res.data.msg,
            forbidClick: true,
            duration: 3000,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //退出登录
    SignOut() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "真的要退出登录吗？？？",
        })
        .then(() => {
          this.$cookie.set("loginToken", "", "1d");
          this.$toast({
            message: "退出登录成功",
            forbidClick: true,
            duration: 2000,
          });
          return this.$router.push("/");
        });
    },
  },
};
</script>