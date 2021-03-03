<template>
    <div class="hot_goods_box" @click="toDetail(coffee_value.pid)">
      <div class="hot_goods_img">
        <img :src="coffee_value.smallImg" />
      </div>
      <div class="hot_goods_introduce">
        <div class="hot_goods_text">{{coffee_value.name}}</div>
        <div class="hot_goods_englishtext">{{coffee_value.enname}}</div>
        <div class="hot_goods_price">
          <span class="hot_goods_icon">￥</span>
          <span class="hot_goods_priceprice">{{coffee_value.price}} </span>
        </div>
      </div>
    </div>
</template>

<script>
import '../assets/less/hotgoods.less'
export default {
    props:['coffee_value'],
    methods:{
        toDetail(id){
            this.$router.push({path: '/detail',query:{id:id}})
            // console.log(id);
        }
    }
}
</script>