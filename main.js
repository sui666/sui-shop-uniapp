import Vue from 'vue'
import App from './App'
import store from './store'
import { getImgUrl } from '@/common/util.js';


// 全局图片函数
Vue.prototype.getImgUrl = getImgUrl

Vue.config.productionTip = false
App.mpType = 'app'

import global from '@/common/global'
Vue.use(global);

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	store,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完
Vue.use(httpInterceptor, app)


// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)


app.$mount()
