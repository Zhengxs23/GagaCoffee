import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible/flexible'
import cookie from 'vue-cookie'
import {
  Button,
  NavBar,
  Field,
  Popup,
  Cell,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Toast,
  Search,
  Stepper,
  Divider,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  SwipeCell,
  List,
  Empty,
  AddressList,
  AddressEdit,
  Icon,
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
  Uploader,
  Dialog 
} from 'vant';
// import { use } from 'vue/types/umd'

Vue.use(Button)
  .use(NavBar)
  .use(Field)
  .use(Popup)
  .use(Cell)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Toast)
  .use(Search)
  .use(Stepper)
  .use(Divider)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(SwipeCell)
  .use(List)
  .use(Empty)
  .use(AddressList)
  .use(AddressEdit)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Uploader)
  .use(Dialog);


Vue.use(VueAxios, axios)
Vue.use(cookie)
Vue.config.productionTip = false


//请求拦截器
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    let poststr = '';
    for (let key in config.data) {
      poststr += `${key}=${config.data[key]}&`
    }
    config.data = poststr.slice(0, -1);
  }
  return config;
})

//接口主路径
Vue.prototype.BaseUrl1 = 'http://www.kangliuyong.com:10002';
//appkey
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//定义全局过滤器
Vue.filter('formatDate', (data, format) => {
  //data需要格式化的数据;format格式
  let date = new Date(data);
  let year = date.getFullYear().toString();
  if (/(y+)/.test(format)) {
    let yearContent = RegExp.$1;
    format = format.replace(yearContent, year.slice(year.length - yearContent.length))
  }
  //替换月日时分秒
  let dateObject = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  };
  for (let i in dateObject) {
    let reg = new RegExp(`(${i}+)`);
    if (reg.test(format)) {
      let a = RegExp.$1;
      format = format.replace(a, dateObject[i] >=10 ? dateObject[i] : a.length === 2? '0'+dateObject[i] : dateObject[i])
    }

  }
  return format;
})


 new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')