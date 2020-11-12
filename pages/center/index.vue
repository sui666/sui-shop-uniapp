<template>
	<view class="content">
		<view class="header">
			<block v-if="info.member_id">
				<view class="user-title u-padding-x-30 u-flex">
					<image class="user-left" mode="aspectFit" :src="getImgUrl(info.headimg)"></image>
					<view class="user-right u-m-l-20">
						<view class="u-font-40">{{info.nickname}}</view>
						<view class="u-font-28">{{info.member_level_name}}</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="user-title u-padding-x-30 u-flex" @click="login()">
					<image class="user-left" mode="aspectFit" src="../../static/index-selected.png"></image>
					<view class="user-right u-m-l-20">
						<view class="u-font-40">立即登录</view>
						<view class="u-font-28">登录体验更多功能</view>
					</view>
				</view>
			</block>
			
			
			<u-modal 
			@confirm="confirm"
			:zoom="true"
			v-model="show" :show-title="false"
			:show-cancel-button="true"
			cancel-text="暂不登录"
			confirm-text="立即登录"
			:confirm-style='{"background-color": "#ff4544","color": "#fff"}'
			>
				<view class="slot-login-model u-text-center">
					<view class="u-font-28 title u-p-t-30">您还未登录</view>
					<view class="u-font-24 sub-title">请登录后再进行操作</view>
					<image mode="widthFix" src="../../static/login.png"></image>
				</view>
			</u-modal>
			
			<view class="user-body u-m-t-80 u-flex">
				<view class="item u-text-center">
					<view class="u-font-36">{{info.balance || 0.00}}</view>
					<view class="">余额</view>
				</view>
				<view class="item u-text-center">
					<view class="u-font-36">{{parseInt(info.point) || 0}}</view>
					<view>积分</view>
				</view>
				<view class="item u-text-center">
					<view class="u-font-36">{{parseInt(info.growth)|| 0}}</view>
					<view>优惠券</view>
				</view>
			</view>
		</view>
		<view class="all-order u-padding-30 u-border-bottom ">
			<u-section  title="全部订单" :show-line="false" @click="moreOrder()" sub-title="查看全部订单"></u-section>
		</view>
		<view class="order-box u-padding-30 u-flex u-row-between">
			<view class="item u-text-center">
				<image @click="goOrder(1)" mode="aspectFit" class="order-img" src="../../static/order/default_order_1.png"></image>
				<view class="order-txt">待付款</view>
			</view>
			<view class="item u-text-center">
				<image @click="goOrder(2)" mode="aspectFit" class="order-img" src="../../static/order/default_order_2.png"></image>
				<view class="order-txt">待发货</view>
			</view>
			<view class="item u-text-center">
				<image @click="goOrder(3)" mode="aspectFit" class="order-img" src="../../static/order/default_order_3.png"></image>
				<view class="order-txt">待收货</view>
			</view>
			<view class="item u-text-center">
				<image @click="goOrder(4)" mode="aspectFit" class="order-img" src="../../static/order/default_order_4.png"></image>
				<view class="order-txt">待评价</view>
			</view>
			<!-- <view class="item u-text-center">
				<image @click="goOrder(1)" mode="aspectFit" class="order-img" src="../../static/order/default_order_5.png"></image>
				<view class="order-txt">退款</view>
			</view> -->
			
		</view>
		
		<view class="tool ">
			<view class="u-p-30 u-font-32 title">常用工具</view>	
			<view class="box u-flex u-flex-wrap">
				<view class="item u-text-center">
					<image src="../../static/order/box1.png" class="img" mode="aspectFit"></image>
					<view>签到</view>
				</view>
				<view class="item u-text-center">
					<image src="../../static/order/box1.png" class="img" mode="aspectFit"></image>
					<view>签到</view>
				</view>
				<view class="item u-text-center">
					<image src="../../static/order/box1.png" class="img" mode="aspectFit"></image>
					<view>签到</view>
				</view>
				<view class="item u-text-center">
					<image src="../../static/order/box1.png" class="img" mode="aspectFit"></image>
					<view>签到</view>
				</view>
				<view class="item u-text-center">
					<image src="../../static/order/box1.png" class="img" mode="aspectFit"></image>
					<view>签到</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				title: 'Hello',
				show: false,
				order:[
				],
				
			}
		},
		onLoad() {
			this.getMemberInfo();
		},
		methods: {
			goOrder(index) {
				this.$u.route('pages/order/list',{index:index});
			},
			moreOrder() {
				this.$u.route('pages/order/list');
			},
			login(){
				this.show = true;
				
			},
			confirm() {
			 this.$u.route('pages/login/login');	
			},
			getMemberInfo() {
			 this.$u.api.memberInfo().then(res => {
				 if(res.code == 0) {
					 this.info = res.data;
					 console.log(this.info)
				 }else {
					 this.$u.toast(res.message);
				 }
			 })	
			},
		}
	}
</script>
<style>
	page{
		background: #F7F7F7;
	}
</style>
<style lang="scss" scoped>
	.content{
		background: white;
		.header{
			height: 410rpx;
			width: 100%;
			background-image: url(../../static/user-center.png);
			background:  linear-gradient(to right, #ff9966, #ff5e62) no-repeat 100% 100% ;
		    .user-title{
				padding-top: 100rpx;
				color: #fff;
				font-weight: bold;
				.user-left{width: 90rpx;height: 90rpx;
					border: 3px solid #fff;
					border-radius: 50%;
					overflow: hidden;

				}
			}
			.user-body{
				color: #fff;
				.item{
					position: relative;
					flex: 1;
					&:not(:last-child) :after {
						position: absolute;
						bottom: 10rpx;
						right: 0;
						display: block;
						content: '';
						width: 2rpx;
						height: 50rpx;
						background: #fff;
					}
					
				}
			}
		}
		.order-box{
			.order-img{
				width: 50rpx;
				height: 50rpx;
			}
			.order-txt{
				margin-top: 10rpx;
				color: #636363;
			}
		}
		.tool{
			.title{font-weight: 600;}
			.box{
				width: 100%;
				.item{
					margin:  20rpx 0;
					width: 25%;
					.img{width: 44rpx;height: 44rpx;}
				}
			
			}
		}
		.slot-login-model{
			.title{color: #333;}
			.sub-title{color: #666;padding: 30rpx 0 0 0;}
			image{width: 300rpx;height: 300rpx; }
		}
	}
</style>
