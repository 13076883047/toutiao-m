import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 移动端vant组件库
import vant from 'vant'
import 'vant/lib/index.css'
// rem适配、用于设置rem的基准值
import 'lib-flexible'
// 全局样式表
import '@/styles/index.less'

Vue.use(vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
