import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Toast,Dialog  } from 'vant'
import api from './api/index.js'
import {setCookie,getCookie,delCookie} from './assets/js/cookie.js'
import VueCookies from 'vue-cookies'

import 'lib-flexible'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/public.css'
import 'vant/lib/index.css'
import animated from 'animate.css'
import VueClipboard from 'vue-clipboard2'

import i18n from './i18n'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

Vue.config.productionTip = false
Vue.prototype.$api=api
Vue.use(VueCookies)

Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}

Vue.use(Dialog);
Vue.use(VueClipboard)
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(animated);

new Vue({
  router,
  store,
  i18n, 
  render: h => h(App)
}).$mount('#app')

var isMobile= /^1[3|4|5|6|7|8][0-9]{9}$/;
Vue.prototype.$isMobile=isMobile;

//获取cookie里的值
function getCookie3(name){
      //可以搜索RegExp和match进行学习
      var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
      } else {
          return null;
      }
  }
 
  Vue.prototype.getCookie3 = getCookie3;
  router.beforeEach((to, from, next) => {
      let islogin = getCookie3("openid") || false;
      if(to.meta.islg){
        // next()
         if(islogin==false){
         Toast('Please log in again!')
         setTimeout(()=>next('/login'),1000)
         }else{
           next()
         }
      }else{
        next()
      }
    
  })


    api.Post('logo').then(res=>{
      if(res.status==1){
        document.title=res.result.name;
      }
    })




