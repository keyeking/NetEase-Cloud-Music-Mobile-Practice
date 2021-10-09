import Vue from 'vue'
// 相对路径引入的App.vue文件
import App from './App.vue'

import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入iview
import iviewUi from 'view-design'
import 'view-design/dist/styles/iview.css'
// 引入路由router
import router from './router/index.js'
import axios from 'axios'
// 引入自定义指令
import directives from './plugins/directives'
Vue.use(directives)
Vue.prototype.$http = axios
Vue.use(iviewUi)
Vue.use(elementUi)
new Vue({
    // 渲染节点
    render: h => h(App),
    // 挂载store文件
  
    // 挂载路由
    router
}).$mount('#app')