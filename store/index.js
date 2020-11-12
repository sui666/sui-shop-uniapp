import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { API_URL,IMG_DOMAIN_PRE } from '@/env.js'

const store = new Vuex.Store({
	state: {
		vuex_token: '',
		cartNumber:0, //购物车数量
	},
	mutations: {
		modifyToken(state, token) {
			state.vuex_token = token;
		},
		setCartNumber(state, cartNumber) {
			state.cartNumber = cartNumber
		},
	},
	actions:{
		//查询购物车数量
		getCartNumber() {
			var token = uni.getStorageSync("token");
			if (token) {
				
				uni.request({
						url: API_URL + '/api/cart/count',
						 data: {
						   token: token || ''
						},
						success: res => {
							// console.log(res.data.data)
							if (res.data.code == 0) {
								this.commit('setCartNumber', res.data.data)
								uni.setTabBarBadge({
								  index: 2,
								  // text: `${res.data.data}`
								  text: res.data.data.toString()
								})
							}
						},
						fail: (err) => {
							// console.log(err)
						}
					});
				
			}else{
				this.commit('setCartNumber', 0)
			}
		},
	}
})

export default store
