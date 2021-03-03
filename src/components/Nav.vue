<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar>
        <!-- 左边 -->
      <template #left>
        <div class="title_left">
          <div class="title_left_icon">
            <img class="img_auto" src="../assets/images/coffee.png" />
          </div>
          <div class="title_left_text">
            <p>Gaga Coffee</p>
          </div>
        </div>
      </template>
      <!-- 右边 -->
      <template #right>
        <div @click="toHome" class="title_right">先逛一逛</div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import "../assets/less/nav.less";
export default {
    name:"Nav",
    methods:{
      toHome(){
        this.$router.push('/')
      }
    }
}
</script>