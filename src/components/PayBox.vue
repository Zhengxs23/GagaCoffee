<template>
  <div class="pay-boxing">
    <div>
      <slot name="pay-title">
        <div class="pay-title">订单信息</div>
      </slot>
    </div>
    <div class="pay-middle">
      <slot name="order-name"></slot>
    </div>
    <div class="pay-foot">
      <div class="pay-line">
        <div class="pay-top" v-if="date">{{date | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="pay-bottom">
          <div class="pay-bottom-left">共计 {{total}} 件</div>
          <div class="pay-bottom-right">合计 ￥ {{totalPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/paybox.less";
export default {
  props:{
    total:{
      type:[Number,String],
      default:0
    },
    totalPrice:{},
    date:''
  }
};
</script>
