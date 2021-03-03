<template>
  <div class="orderitem">
    <div class="order-img">
      <img :src="product.small_img || product.smallImg" alt="" />
    </div>
    <div class="order-info">
      <div class="order-name">
        <div class="order-name-left">{{product.name}}</div>
        <div class="order-price">￥{{product.price * product.count}}</div>
      </div>
      <div class="order-rules">{{product.rule}}</div>
      <div class="order-num">x{{product.count}}</div>
    </div>
  </div>
</template>

<script>
import "../assets/less/orderitem.less";
export default {
  props:{
    product:{
      type:Object,
      default(){
        return {};
      }
    }
  }
};
</script>
