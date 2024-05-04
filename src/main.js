import Vue from 'vue'
import App from './App.vue'
import TypeNav from "@/components/TypeNav/index.vue";
import Carousel from "@/components/Carousel/index.vue";
import Pagination from "@/components/Pagination/index.vue";

//引入路由
import router from "@/router";
//引入store仓库 vuex
import store from "@/store"
import "@/mock/mockServe"
import "swiper/css/swiper.css"
//引入element-ui组件插件
import {Button,MessageBox,Message} from 'element-ui';

Vue.config.productionTip = false
//引入全局组件
Vue.component("TypeNva",TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入element-ui组件
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
  //绑定全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
}).$mount('#app')




