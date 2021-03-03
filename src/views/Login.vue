<template>
  <div class="login">
    <Nav></Nav>
    <div class="login_interface">
      <div class="coffee_bg"></div>
      <p class="login_login">登录</p>
      <p class="login_welcome">Gaga Coffee</p>
    </div>
    <div class="login_form">
      <van-field
        v-model="logindata.unamenumber"
        class="login_user"
        label="账号"
        placeholder="输入手机号"
      />
      <van-field
        v-model="logindata.upw"
        class="login_pw"
        label="密码"
        :type="ispassword ? 'text' : 'password'"
        placeholder="输入密码"
        left-icon=""
        :right-icon="ispassword ? 'eye-o' : 'closed-eye'"
        @click-right-icon="togglepw"
      />
    </div>
    <!-- <div class="forgetPw">
      忘记密码？
    </div> -->
    <div class="btn_box">
      <van-button @click="login" round type="default" block color=" #D15343"
        >登录</van-button
      >
      <van-button
        class="login_btn"
        round
        type="default"
        block
        @click="showPopup"
        >注册</van-button
      >
    </div>
    <div class="showlayer">
      <van-popup v-model="isshow" position="bottom" closeable>
        <div class="register_bg"></div>
        <p class="register_register">注册</p>
        <div class="register">
          <van-field
            v-model="registerdata.unamenumber"
            class="register_user"
            label="账号"
            placeholder="输入手机号"
          />
          <van-field
            v-model="registerdata.upw"
            class="register_pw"
            label="密码"
            :type="ispassword ? 'text' : 'password'"
            placeholder="输入密码"
            left-icon=""
            :right-icon="ispassword ? 'eye-o' : 'closed-eye'"
            @click-right-icon="togglepw"
          />
          <van-field
            v-model="registerdata.uname"
            class="register_username"
            label="用户名"
            placeholder="输入用户名"
          />
        </div>
        <van-button
          class="register_btn"
          round
          type="default"
          block
          @click="leaveRegister"
          >注册</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import "../assets/less/login.less";
import { utils } from "../assets/js/utils";
import {mapMutations} from 'vuex';
export default {
  components: {
    Nav,
  },
  data() {
    return {
      //密码显示隐藏
      ispassword: false,
      //登录数据
      logindata: {
        unamenumber: "",
        upw: "",
      },
      //注册弹出层
      isshow: false,
      //注册数据
      registerdata: {
        unamenumber: "",
        upw: "",
        uname: "",
      },
    };
  },
  created(){
    this.changeShopbagCount(0);
    this.changeIsShopbagCount(false);
  },
  methods: {
    ...mapMutations(['changeShopbagCount','changeIsShopbagCount']),
    //切换密码显示隐藏
    togglepw() {
      this.ispassword = !this.ispassword;
    },
    //注册层弹出
    showPopup() {
      this.isshow = true;
    },
    //注册页注册按钮
    leaveRegister() {
      //验证判断
      let register_obj = {
        phone: {
          value: this.registerdata.unamenumber,
          reg: /^1[3-9]\d{9}$/,
          error: "手机号格式不正确",
        },
        pw: {
          value: this.registerdata.upw,
          reg: /^[A-Za-z]\w{5,15}$/,
          error: "密码支持字母数字_组合且首字符必须为字母",
        },
        name: {
          value: this.registerdata.uname,
          reg: /^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/,
          error: "昵称支持汉字字母数字组合",
        },
      };
      //验证
      if (!utils.validForm(register_obj)) {
        return;
      }

      //发起注册请求
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      //发送到服务器
      this.axios({
        method: "POST",
        url: this.BaseUrl1 + "/register",
        data: {
          appkey:
          "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          nickName: this.registerdata.uname,
          password: this.registerdata.upw,
          phone: this.registerdata.unamenumber,
        },
      })
        .then((data) => {
          this.$toast.clear();
          //注册成功
          if (data.data.code == 100) {
            this.$toast({
              message: "注册成功",
              forbidClick: true,
              duration: 1000,
            });
            //注册层消失
            this.isshow = false;
          } else {
            //注册重复
            this.$toast({
              message: data.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            //清空注册内容
            this.registerdata.uname = "";
            this.registerdata.upw = "";
            this.registerdata.unamenumber = "";
          }
        })
        //err
        .catch((error) => {
          this.$toast.clear();
          console.log("err" + error);
        });
    },
    //登录
    login() {
      let login_obj = {
        phone: {
          value: this.logindata.unamenumber,
          reg: /^1[3-9]\d{9}$/,
          error: "手机号格式不正确",
        },
        pw: {
          value: this.logindata.upw,
          reg: /^[A-Za-z]\w{5,15}$/,
          error: "密码支持字母数字_组合且首字符必须为字母",
        },
      };
      //验证表单
      //err
      if (!utils.validForm(login_obj)) {
        return;
      }

      //发起登录请求
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      //登录请求
      this.axios({
        method: "post",
        url: this.BaseUrl1 + "/login",
        data: {
          appkey: this.appkey,
          password: this.logindata.upw,
          phone: this.logindata.unamenumber,
        },
      })
        .then((data) => {
          this.$toast.clear();
          if (data.data.code === 200) {
            //保存Token
            this.$cookie.set("loginToken", data.data.token, "1d");
            //登录成功跳转页面
            this.$router.push("/");
          } else {
            //错误提示
            this.$toast({
              message: data.data.msg,
              forbidClick: true,
              duration: 2000,
            });
            //输入框清空
            this.logindata.unamenumber = "";
            this.logindata.upw = "";
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