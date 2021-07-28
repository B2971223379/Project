import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Content from './assets/js/content.js'
import './assets/icon/iconfont.css'


//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


//Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 引入echarts
const ECharts =require('echarts')
Vue.prototype.$echarts = ECharts


//时间格式过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted() {
    Content.setRem(),
      window.onresize = Content.setRem;
  },
  render: h => h(App)
}).$mount('#app')
