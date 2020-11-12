<template>
	<view class="content">
		<view @click="addAddress()" class="header u-text-center u-padding-20">
			<view v-if="data_info.member_address" class="u-m-t-30 setting-box u-flex u-col-center u-p-x-20 u-p-y-15">
				<view class="left">
					<u-icon name="map" size="60" color="#FF4544"></u-icon>
				</view>
				<view class="right u-font-26">
					<view class=" u-margin-y-10">{{data_info.member_address.name}} {{data_info.member_address.mobile}}</view>
					<view class="tex2">{{data_info.member_address.full_address}}</view>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view v-else class="u-m-t-30 setting-box u-flex u-col-center u-p-x-20 u-p-y-15">
				<view class="left">
					<u-icon name="map" size="60" color="#FF4544"></u-icon>
				</view>
				<view class="right u-font-26">
					<view class="txt1 u-margin-y-10">前去设置</view>
					<view class="tex2">您还没有设置收货地址</view>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			
			<view  class="u-m-t-30 setting-box u-flex u-col-center u-p-x-20 u-p-y-15">
				<view class="left">
					<u-icon name="map" size="60" color="#FF4544"></u-icon>
				</view>
				<view class="right u-font-26">
					<view class="txt1 u-margin-y-10">前去设置</view>
					<view class="tex2">您还没有设置收货地址</view>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
			<view :key="index" v-for="(item,index) in goods_list" class="payment-detail u-m-20 u-padding-20 u-border-bottom u-flex u-col-top">
				<view class="img-wrap">
					<image :src="getImgUrl(item.sku_image)"></image>
				</view>
				<view class="info">
					<view class="sky_name u-line-2 u-font-26">
						{{item.sku_name}}
					</view>
					<view class="sku_spec u-m-y-15">
						<text :key="index1" v-for="(item1,index1) in JSON.parse(item.sku_spec_format)">{{ item1.spec_value_name}}</text>
					</view>
					<view class="price">
						<text class="sku_price">¥ {{item.price}}</text>
						<text class="num">x {{item.num}}</text>
					</view>
				</view>
			</view>
		
		<view class="goods-extend u-padding-20 u-m-20">
			<view class="liuyan u-flex u-row-between u-border-bottom u-padding-y-20">
				<text class="left-txt">买家留言</text>
				<input v-model="buyer_message" placeholder-style="color:gray;font-size:24rpx" placeholder="留言前建议先与商家协调一致" type="text">
			</view>
			<view class="total u-m-y-20 u-flex u-row-between">
				<text class="left-txt">商品金额</text>
				<text class="price">¥ {{ data_info.goods_money }}</text>
			</view>
		</view>
		<view class="goods-compture u-flex u-row-right  u-padding-20">
			<text class="u-font-sm">共{{data_info.num}}件</text>
			<text class="u-font-sm u-m-x-25">合计: <text class="">¥ {{data_info.pay_money}}</text></text>
			<view @click="orderCreate()" class="button">提交订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sku_id: '',
				num: '',
				cart_ids: '',
				data_info: [],
				goods_list:[],
				buyer_message: '',
			};
		},
		onLoad(e) {
			this.sku_id = e.sku_id,
			this.num = e.goods_num	
			this.cart_ids = e.cart_ids;
			console.log(e)
			
		},
		created(e) {
			this.getOrderPayment();
		},
		methods:{
			orderCreate() {
				if(this.sky_id) {
					var params = {
						sku_id: this.sku_id,
						num: this.num,
						delivery: '{"store_id":0,"delivery_type":"express","delivery_type_name":"物流配送"}',
						coupon: {},
						buyer_message: this.buyer_message,
						is_balance: 0,
						is_point: 1,
						pay_password:'', 
						is_invoice: 0,
						invoice_type: 1,
						invoice_title_type: 1,
						is_tax_invoice: 0,
						invoice_title: '',
						member_address: '',
					}
				}else{
					//购物车
						var params = {
							cart_ids: this.cart_ids
						}
				}
				this.$u.api.orderCreate(params).then(res => {
					if(res.code == 0){
						const out_trade_no = res.data;
						this.$u.route('pages/pay/pay',{out_trade_no: out_trade_no});
					}else{
						this.$u.toast(res.message);
					}
				});
			},
			addAddress() {
				this.$u.route('pages/member/address/address');
			},
			getOrderPayment() {
				if(this.sku_id)
				{
					var params = {
						sku_id: this.sku_id,
						num: this.num
					}
				}else{
					var params = {
						cart_ids: this.cart_ids,
					}
				}
				this.$u.api.orderPayment(params).then( res=>{
					console.log(res)
					if(res.code == 0){
						this.data_info = res.data;
						this.goods_list = res.data.shop_goods_list.goods_list;
					}else{
						this.$u.toast(res.message);
					}
					
				});
				
			}
		},
		
	}
</script>

<style lang="scss">
	.content{
		.header{
			height: 180rpx;
			background: #FF4544 !important;
			.setting-box{
				background: #fff;
				border-radius: 8rpx;
				.left{}
				.right{
					text-align: left;
					margin: 0 auto 0 20rpx;
					.txt1{color: $s-main-color}
					.txt2{}
				}
			}
		}
		.payment-detail{
				background-color: #fff;
				border-radius: 8rpx;
				.img-wrap{
					display: flex;
					align-items: stretch;
					background: red;
					border-radius: 8rpx;
					image{
						height: 124rpx;
						width:  124rpx;
					}
				}
				.info{
					margin-left: 20rpx;
					.sky_name{
						line-height: 40rpx;
					}
					.sku_spec{color: gray;font-size: 24rpx;}
					.price{
						display: flex;
						justify-content: space-between;
						.sku_price{color: $s-main-color;font-weight: bold;}
						.num{font-weight: bold;}
					}
				}
			}
	}
		.goods-extend{background: #fff;
			.left-txt{
				color:#333;
				font-size: 26rpx;
			}
			.total{
				.price{font-weight: bold;}
			}
		}
		.goods-compture{
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 100rpx;
			background-color: #fff;
			.button{
				padding: 10rpx 30rpx;
				border-radius: 30rpx;
				background-color: $s-main-color;
				color: #fff;
			}
			
		}
</style>
