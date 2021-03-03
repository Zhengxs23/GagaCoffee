<template>
  <div class="safe">
    <van-nav-bar title="安全中心" left-arrow @click-left="back" />
    <div class="safe_bg">
      <img src="../assets/images/bg.png" alt="" />
    </div>
    <div class="safe-opt">
      <div class="safe-changePw">
        <van-cell title="修改密码" is-link @click="ChangePw" />
      </div>
      <div class="safe-logOut">
        <van-cell title="退出登录" is-link @click="SignOut" />
      </div>
      <div class="safe-unsubscribe">
        <van-cell title="注销账户" is-link @click="offCount" />
      </div>
    </div>
    <van-popup v-model="isShow" position="bottom" closeable>
      <div class="changePw">
        <van-field
          v-model="oldPw"
          label="旧密码"
          placeholder="输入旧密码"
          type="password"
        />
        <van-field
          v-model="newPw"
          label="新密码"
          placeholder="输入新密码"
          type="password"
        />
        <van-field
          v-model="confirmPw"
          label="确认密码"
          placeholder="确认新密码"
          type="password"
        />
        <van-button
          class="register_btn"
          round
          type="default"
          block
          @click="SubmitnewPw"
          >提交修改</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import "../assets/less/safe.less";
import { utils } from "../assets/js/utils";
export default {
  name: "Safe",
  data() {
    return {
      isShow: false,
      oldPw: "",
      newPw: "",
      confirmPw: "",
    };
  },
  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //修改密码
    ChangePw() {
      this.isShow = true;
    },
    //提交修改的密码
    SubmitnewPw() {
      let lToken = this.$cookie.get("loginToken");
      if (!lToken) {
        return this.$router.push("/login");
      }
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
      });

      let changePw_obj = {
        newPw: {
          value: this.newPw,
          reg: /^[A-Za-z]\w{5,15}$/,
          error: "密码支持字母数字_组合且首字符必须为字母",
        },
        confirmPw: {
          value: this.confirmPw,
          reg: /^[A-Za-z]\w{5,15}$/,
          error: "密码支持字母数字_组合且首字符必须为字母",
        },
      };

      //格式判断
      if (!utils.validForm(changePw_obj)) {
        this.oldPw = "";
        this.newPw = "";
        this.confirmPw = "";
        return;
      }

      if (this.newPw !== this.confirmPw) {
        this.$toast({
          message: "两次密码不正确",
          forbidClick: true,
          duration: 2000,
        });
        this.oldPw = "";
        this.newPw = "";
        this.confirmPw = "";
        return;
      }
      this.axios({
        method: "POST",
        url: this.BaseUrl1 + "/updatePassword",
        data: {
          appkey: this.appkey,
          tokenString: lToken,
          password: this.confirmPw,
          oldPassword: this.oldPw,
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
          if (res.data.code === "E003") {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            this.oldPw = "";
            this.newPw = "";
            this.confirmPw = "";
          }

          if (res.data.code === "E001") {
            this.$cookie.set("loginToken", "", "1d");
            this.$toast({
              message: "修改密码成功，请重新登录",
              forbidClick: true,
              duration: 2000,
            });
            return this.$router.push("/login");
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
        })
        .catch(() => {
          // on cancel
        });
    },
    //注销账户
    offCount() {
      this.$dialog
        .confirm({
          title: "注销账户",
          message: "真的要注销账户吗？？？",
        })
        .then(() => {
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
            url: this.BaseUrl1 + "/destroyAccount",
            data: {
              appkey: this.appkey,
              tokenString: lToken,
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
              if (res.data.code === "G001") {
                this.$cookie.set("loginToken", "", "1d");
                this.$router.push("/");
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
        });
    },
  },
};
</script>