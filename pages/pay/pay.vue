<template>
	<view class="content">
		<view class="body u-text-center">
			<view class="title u-p-t-50">支付金额</view>
			<view class="price u-margin-20">{{order_info.pay_money}}</view>
			<view class="goods-name u-line-1 u-m-20">{{order_info.pay_body}}</view>
		</view>
		<view class="pay-type">
			<view class="title u-p-t-30 u-font-32">请选择支付方式</view>
		</view>
		<view @click="pay" class="confirm-button">立即支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				out_trade_no:'',
				order_info: []
			};
		},
		onLoad(e) {
			this.out_trade_no = e.out_trade_no || ''
			this.getOrderInfo();
		},
		methods: {
			getOrderInfo(){
				let params = {out_trade_no: this.out_trade_no}
				this.$u.api.payInfo(params).then(res => {
					if(res.code == 0){
						console.log(res)
						this.order_info = res.data;
					}else{
						this.$u.toast(res.message);
					}
				});
				
			},
			pay() {
				this.$u.toast("支付成功")
				this.$u.route({
					url:'/pages/index/index',
					params: {},
					type: 'switchTab'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.body{
			background-color: #fff;
			border-radius: 8rpx;
			margin: 20rpx;
			padding: 20rpx;
			.title{color:#838383;}
			.price{font-size: 40rpx;font-weight: bold;color: $s-main-color;}
			.goods-name{color:#838383;}
			
		}
		.pay-type{height: 280rpx;background-color: #fff;margin: 20rpx;
			padding: 20rpx;}
		.confirm-button{
			width: 80%;
			margin: 180rpx auto;
			padding: 10rpx;
			border-radius: 30rpx;
			color:#fff;background-color: $s-main-color;text-align: center;}
	}
</style>
