<template>
  <div class="myself">
    <van-nav-bar title="我的信息" left-arrow @click-left="back" />
    <div class="myselfData">
      <div class="myself_img">
        <img :src="userInfo.userImg" alt="" />
        <div class="up-img">
          <van-uploader :max-size="500 * 1024" :after-read="uploadAvatar"/>
        </div>
        <div class="myself_img_text">更换头像</div>
      </div>
      <div class="myself_id">
        <div class="myslef_logo">用 户 ID：</div>
        <div class="myself_id_son">{{ userInfo.userId }}</div>
      </div>
      <div class="myself_name">
        <div class="myslef_logo">用 户 名：</div>
        <div class="myself_name_son">{{ userInfo.nickName }}</div>
      </div>
      <div class="myself_name">
        <div class="myslef_logo">用户电话：</div>
        <div class="myself_name_son">{{ userInfo.phone }}</div>
      </div>
      <div class="myself_desc">
        <div class="myslef_logo">个人介绍：</div>
        <div class="myself_desc_son" @click="alterDesc">
          {{
            userInfo.desc ? userInfo.desc : "你还没有写个人简介，快快来写！！！"
          }}
        </div>
      </div>
      <van-popup v-model="isshow" position="bottom" closeable>
        <div class="desc">
          <textarea
            class="desc_text"
            placeholder=" 介绍一下自己，让大家了解和关注你"
            v-model="descData"
          />
          <div class="desc-btn">
            <van-button
              class="register_btn"
              round
              type="default"
              block
              @click="leaveDesc"
              >提交</van-button
            >
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import "../assets/less/myself.less";
export default {
  name: "Myself",
  data() {
    return {
      userInfo: [],
      isshow: false,
      descData: "",
    };
  },
  // computed:{},
  created() {
    this.getDetail();
  },
  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    getDetail() {
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
        url: this.BaseUrl1 + "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString: lToken,
        },
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code === 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push("/login");
          }
          if (res.data.code === "B001") {
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
    //弹出个人简介遮罩层
    alterDesc() {
      this.isshow = true;
    },
    //提交个人简介
    leaveDesc() {
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
        url: this.BaseUrl1 + "/updateDesc",
        data: {
          appkey: this.appkey,
          tokenString: lToken,
          desc: this.descData,
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
          if (res.data.code === "D001") {
            this.isshow = false;
            this.userInfo.desc = res.data.desc;
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
    //更改头像
    uploadAvatar(file) {
      let types = ["png", "gif", "jpg", "jpeg"];

      let type = file.file.type.split("/")[1];

      if (types.indexOf(type) === -1) {
        return this.$toast({
          message: `文件类型只支持${types.join(",")}`,
          forbidClick: true,
          duration: 3000,
        });
      }

      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");

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