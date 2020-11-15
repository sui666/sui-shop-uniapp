<template>
	<view>
		<u-swiper @click="previewimage" :list="banner" :height="750" mode="number" indicator-pos="bottomRight"></u-swiper>
		<view class="goods-box">
			<view class="price u-padding-y-10">¥{{goods_info.price}}</view>
			<view class="u-line-3 u-padding-y-10">{{goods_info.sku_name}}</view>
			<view class="u-line-2 desc">{{goods_info.introduction}}</view>
			<view class="u-padding-y-15 u-line u-flex u-row-between service">
				<text v-if="goods_info.is_free_shipping">快递: 包邮</text>
				<text>总销量 {{goods_info.sale_num}} 件</text>
			</view>
		</view>
		<view @click="GoodsModel" class="goods-choose u-margin-y-20 u-padding-25">
			<u-section fontSize="26" color="gray" title="选择" sub-title="" :showLine="false"></u-section>
		</view>
		<view class="goods-evaluate u-padding-x-25">
			<view class="header u-padding-y-20 u-border-bottom"><text class="u-font-sm">宝贝评价 (0)</text></view>
			<view class="body u-text-center u-p-y-50">该商品暂无评价哦</view>
		</view>
		<view class="u-m-y-20 goods-detail">
			<view class="header u-p-x-80"><u-tabs active-color="#ff4544" :list="tabs" :current="tab_cur" @change="changeTab" :is-scroll="false"></u-tabs></view>
			<view class="u-m-25 body">
				<view v-if="tab_cur == 0">
					<rich-text :nodes="goods_info.goods_content"></rich-text>
				</view>
				<view  v-if="tab_cur == 1">售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障售后保障dsafa</view>
			</view>
		</view>

		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="home" :size="40"></u-icon>
					<view class="text u-line-1">首页</view>
				</view>
				<view class="item">
					<u-icon name="server-fill" :size="40"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view @click="goCart" class="item car">
					<u-badge class="car-num" :count="cartNumber" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view @click="addCartCar" class="cart btn u-line-1">加入购物车</view>
				<view @click="GoodsModel()" class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		<u-popup :closeable="true" v-model="show"  mode="bottom">
			<view class="goods-sku-box u-p-30 u-font-24">
				<view class="header u-border-bottom u-flex ">
					<!-- <view class="left">
						<image mode="aspectFit" :src="getImgUrl(goods_info.sku_image)"></image>
					</view>
					<view class="right">
						<view class="u-font-28 price">
							¥ {{goods_info.price}}
						</view>
						<view class="u-font-28 stock u-margin-y-5">库存{{goods_info.stock}} 件</view>
						<view class="u-font-24 choice">已选择: 尺码 颜色</view>
						<view class="u-font-24 u-padding-y-10">总价:¥ {{ totalPrice }}</view>
					</view> -->
					
				</view>
				<view class="sku-info-box">
					<view v-for="(item,index) in goods_spec_format" :key="index" class="sku-item u-border-bottom u-padding-y-30">
						<view class="sku-title">{{item.spec_name}}</view>
						<view class="sku-detail u-flex">
								<view @tap="selectSku(index,item1,index1)"  :class="item1.selected == true ? 'active': '' " class="item u-padding-y-10" :key="index1" v-for="(item1,index1) in item.value" >
								{{item1.spec_value_name}}
								</view>
						</view>
					</view>
				</view>
				<view class="number u-p-y-30 u-flex u-row-between">
					<view>购买数量</view>
					<u-number-box :min="1" v-model="goods_number" @change="getGoodsNum"></u-number-box>
				</view>
				<view class="u-m-x-30">
					<u-button @tap="confirmBuy" shape="circle" type="error" >确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
	data() {
		return {
			is_add_cart: false,
			cartNum:0,
			sku_id: '',
			show: false,
			sku_spec_format: {}, //当前sku
			goods_spec_format:{},// goods sku
			tabs: [{ name: '商品详情' }, { name: '售后保障' }],
			tab_cur: 0,
			goods_number: 1,
			goods_info : {},
			banner: []
		};
	},
	computed:{
		 totalPrice: function() {
			 return this.goods_number * this.goods_info.price
		  },
		  
		  ...mapState({
			  cartNumber: state => state.cartNumber
		   })
		   
	},
	onLoad(e) {
		this.sku_id = e.sku_id || '20';
		this.getSku();
		
	},
	
	methods: {
		...mapMutations(['setCartNumber']),
		confirmBuy() {
			if(this.is_add_cart) {
				// 加入购物车
				let params = {
					sku_id: this.sku_id,
					num: this.goods_number,
				}
				
				
				this.$u.api.cartAdd(params).then(res => {
					if(res.code == 0) {
						var cartNum =this.$store.state.cartNumber + 1
						this.$store.commit("setCartNumber",cartNum);
					 	this.$u.toast('添加成功');
						this.show = false;
					}else{
						this.$u.toast(res.message);
					}
				});
			}else{
				let params = {
					sku_id: this.sku_id,
					goods_num: this.goods_number,
				}
				this.$u.route("pages/order/payment/payment", params);
			}
		},
		goCart() {
			this.$u.route("pages/goods/cart");
		},
		// 加入购物车
		addCartCar() {
			this.is_add_cart =true;
			this.show = true;
		},
		previewimage(index){
		  let imgs = [];
		  this.banner.map(item => {
			  imgs.push(item.image);
		  })
		  console.log(imgs)
		  uni.previewImage({
			current:index,
		  	urls: imgs
		  })
		},
		getSku() {
			let params = {sku_id: this.sku_id};
			this.$u.api.getSkudetail(params).then(res => {
				console.log()
				if(res.code == 0){
					this.goods_info = res.data.goods_sku_detail;
					this.banner = this.getImgUrl(res.data.goods_sku_detail.sku_images,true);
					this.sku_spec_format = res.data.goods_sku_detail.sku_spec_format;
					if(res.data.goods_sku_detail.goods_spec_format) this.goods_spec_format = JSON.parse(res.data.goods_sku_detail.goods_spec_format);
					// console.log(JSON.stringify(JSON.parse(this.goods_spec_format)))
					uni.setNavigationBarTitle({
						title: this.goods_info.sku_name
					});
					console.table(this.goods_info);
					// Object.assign(this.goods_info, res.data.goods_sku_detail);
				}else{
					this.$u.toast(res.message);
				}
			});
		},
		selectSku(index, item1,index1,sku_id){
			this.sku_id  = item1.sku_id;
			this.goods_spec_format[index].value.forEach(item => item.selected = false);
			this.goods_spec_format[index].value[index1].selected = true;
			this.getSku()
		},
		changeTab(index) {
			this.tab_cur = index;
		},
		GoodsModel() {
			this.is_add_cart = false;
			this.show = true;
		},
		getGoodsNum(e) {
		  	console.log(`goods_num: ${e.value}`);
			this.goods_number = e.value;
		},
	}
};
</script>
<style>
page {
	background: #f7f7f7;
}
</style>
<style lang="scss">
.goods-box {
	background: white;
	padding: 10rpx 25rpx;
	.price {
		color: #ff4544;
		font-size: 36rpx;
	}
	.desc {
		color: #ff4544;
	}
	.service {
		font-size: 24rpx;
		color: gray !important;
	}
}
.goods-choose {
	background: white !important;
}
.goods-evaluate {
	background: white;
}
.goods-detail {
	background: white;
	padding-bottom: 250rpx;
	.header {
	}
	.body {
		// width: 700rpx;
	}
}
.navigation {
	z-index: 999;
	width: 100%;
	position: fixed;
	bottom: 0;
	border-bottom: 0;
	display: flex;
	margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}
.goods-sku-box{
	.header{
		padding: 50rpx 0 70rpx 280rpx;
		position: relative;
		border-bottom: 1px solid rgba(0,0,0,.1);		
		.left{
			position: absolute;
			left: 0rpx;
			image{
				border-radius: 10rpx;
				width: 250rpx;
				height: 250rpx;
			}
		}
		
		.right{
			padding-right: 40rpx;
			.price{color: #ff4544;}
		}
	}
	.sku-item{
			.sku-title{}
			.sku-detail{
				padding-top: 20rpx;
				.item{
					margin-right: 10rpx;
					border-radius: 100rpx;
					padding: 10rpx 20rpx;
					border: 1rpx solid gray;
					color:#333;
				}
				& .active{
					color: red;
					border: 1rpx solid red;
				}
			}
	}
}
</style>
