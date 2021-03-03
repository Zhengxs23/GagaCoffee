import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //购物袋数量
    shopbagCount:0,
    //购物袋数量是否加载过
    isShopbagCount:false,
    //历史纪录
    histroyData:[]
  },
  mutations: {
    //改变购物袋数量
    changeShopbagCount(state,data){
      state.shopbagCount = data;
    },
    changeIsShopbagCount(state,data){
      state.isShopbagCount = data;
    },
    changeHistroyData(state,val){
      state.histroyData.push(val)
    }
  }
})
