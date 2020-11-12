<template>
	<view>
		<view class="login-header u-text-center">
			<u-navbar  :border-bottom="false" :background="{background: 'transparent'}" back-icon-color="#333333" :title="title"></u-navbar>
			<image class="bg-logo" src="../../static/logo_bg.png"></image>
		</view>
		<view class="login-type u-line-1 u-m-x-50  u-flex">
			<view @tap="loginTypeClick(1)"  :class="login_type == 1 ? 'active':''" class="u-flex-1 u-text-center title u-p-t-10 u-p-b-10">手机登录</view>
			<view @tap="loginTypeClick(2)"  :class="login_type == 2 ? 'active':''" class="u-flex-1 u-text-center title u-p-t-10 u-p-b-10">密码登录</view>
		</view>
		
		<view v-if="login_type == 1" class="login-type-content u-m-x-50 ">
				<view class="input-login u-p-y-30">
					<input  placeholder-style="color:#c8963d" type="number" placeholder="请输入手机号" />
				</view>
				<view class="input-login u-p-y-30  u-flex u-row-between">
					<input  placeholder-style="color:#c8963d" type="number" placeholder="请输入验证码" />
					<text class="get-code u-font-26">获取验证码</text>
				</view>
		</view>
		<view v-if="login_type == 2" class="login-type-content u-m-x-50 ">
				<view class="input-login u-p-y-30">
					<input v-model="username" placeholder-style="color:#c8963d" type="text" placeholder="请输入手机号/邮箱/用户名" />
				</view>
				<view class="input-login u-p-y-30  u-flex u-row-between">
					<input v-model="password" placeholder-style="color:#c8963d" type="number" placeholder="请输入密码" />
				</view>
		</view>
	
		<view  class="button u-m-x-50 u-text-center u-m-t-70">
			<u-button @tap="login" shape="circle" type="warning">登录</u-button>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
	data() {
		return {
			login_type: 2, // 1手机登录 2密码登录
			title: "",
			phone: "",
			username:"",
			password: "", 
			code: ""
		};
	},
	computed: {
			...mapState(['vuex_token'])
	},
	onLoad() {
		// console.log(this.$store.state.vuex_token)
	},
	methods:{
		...mapMutations(['modifyToken']),
		
		loginTypeClick(type) {
			this.login_type = type
		},
		setting(token)
		{
			uni.setStorageSync('token', token);
			uni.setStorageSync('username', this.username)
			this.$store.commit("modifyToken",token);
		},
		login() {
			
			if(this.login_type == 1) {
				
			}else{
				// 账号密码登录
				
				if(this.username == '' || this.password == '')
				{					
					this.$u.toast('关键参数不能为空');return;
				}
				  
				let params = {
					"username": this.username,
					"password": this.password,
				}
				
				this.$u.api.login(params).then(res => {
					if(res.code == 0) {
						this.setting(res.data.token);
						this.$u.toast(res.message);
						this.$u.route({
							url: '/pages/index/index',
							type: "switchTab"
						});
					}else{
						this.$u.toast(res.message);
					}
				})
			}
		}
	}
};
</script>

<style lang="scss">
	page{
		position: relative;
		width: 100vw;
		height: 100vh;
		// overflow: hidden;
		background: linear-gradient(180deg, rgba(239, 196, 128, 1) 0%, rgba(248, 220, 165, 1) 25%, rgba(255, 255, 255, 1) 98%);
	}
	.login-header{
		.bg-logo{
			width: 640rpx;
			height: 300rpx;
		}
		
	}
	.login-type{
		.title{
			font-weight: bold;
			color: #845708;
				
			&.active{
				border-bottom: 2rpx solid #e9b562;
				transition:all .1s ease;
			}
		}
	}
	.input-login{
		border-bottom: 1px solid #eed8b2;
	}
	.get-code{
		flex-basis: 40%;
		text-align: center;
		color: #845708;
	}
</style>
