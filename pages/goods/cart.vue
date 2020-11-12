<template>
	<view class="content">
		<block v-if="list.length == 0">
			<view class="u-m-t-80 u-p-t-80">
				<u-empty mode="car" name="购物车为空">
				</u-empty>
				<view class="u-m-x-80 u-m-t-70" @click="goIndex()">
					<u-button @click="goIndex()" type="error">去逛逛吧</u-button>
				</view>
			</view>
		</block>
		<view v-else class="cart-list u-margin-20 u-padding-20">
			<view class="header u-flex u-row-between">
				<view>
					共
					<text class="num">{{ totalGoods }}</text>
					件商品
				</view>
				<view class="edit">编辑</view>
			</view>
			<view v-for="(item, index) in list" :key="index" class="goods-box u-border-bottom u-flex u-p-y-20">
				<view class="left">
					<u-checkbox-group><u-checkbox shape="circle" active-color="red" v-model="item.checked" @change="radioChange(index)"></u-checkbox></u-checkbox-group>
				</view>
				<view class="middle u-m-l-10 u-m-r-20"><image mode="aspectFill" :src="getImgUrl(item.sku_image)"></image></view>
				<view class="right">
					<view class="goods-name u-line-2 u-font-xs">{{ item.sku_name }}</view>
					<view class="goods-sku u-m-y-10">
						<block v-if="item.sku_spec_format">
							<text class="u-m-r-10" v-for="(item1, index1) in JSON.parse(item.sku_spec_format)" :key="index1">{{ item1.spec_value_name }}</text>
						</block>
					</view>
					<view class="goods-price u-flex  u-row-between">
						<text class="price">¥{{ item.price }}</text>
						<u-number-box :min="1" v-model="item.num" :index="item.cart_id" size="20" @change="goodsNumChange"></u-number-box>
					</view>
				</view>
			</view>
		</view>
		<view v-if="list.length" class="nav-fiexed u-padding-x-20 u-flex u-row-between u-border-bottom">
			<view class="left u-m-l-10" @click="checkedAll"><u-checkbox shape="circle" active-color="red" v-model="is_checked_all">全选</u-checkbox></view>
			<view class="right u-flex">
				<view class="u-m-r-80">
					合计:
					<text class="price">¥{{ totalPrice }}</text>
				</view>
				<block v-if="current_select.length">
					<view @tap="jiesuan" class="jiesuan">结算 ({{ totalNum }})</view>
				</block>
				<block v-else>
					<view class="jiesuan disable">结算 ({{ totalNum }})</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			is_checked_all:true,
			current_select: [],
			my_num: 1
		};
	},
	onLoad() {
		this.getCartList();
	},
	watch: {
		current_select: {
			// 每个属性值发生变化就会调用这个函数
			handler(newVal, oldVal) {
				// console.log('oldVal:', oldVal);
				console.log('当前选中商品:', newVal);
				newVal.forEach(item => {
					if(!item.checked) {
						this.is_checked_all = false;
					}
				})
			},
			// 立即处理 进入页面就触发
			// immediate: true,
			// 深度监听 属性的变化
			deep: true
		}
	},
	computed: {
		
		totalGoods() {
			let sum = 0;
			this.current_select.map(item => {
				if(item.checked) sum += 1;	
			});
			return sum;
		},
		totalPrice() {
			if (!this.is_all_select && this.current_select.length == 0) {
				return 0.0;
			}
			let sum = 0.0;
			this.current_select.forEach(item => {
				if (item.checked) sum += item.price * item.num;
			});

			return sum.toFixed(2);
		},
		totalNum() {
			if (!this.is_all_select && this.current_select.length == 0) {
				return 0;
			}
			let sum = 0.0;
			this.current_select.forEach(item => {
				if (item.checked) sum += item.num;
			});
			return sum;
		}
	},
	methods: {
		goIndex() {
			this.$u.route({
				url: 'pages/index/index',
				type: 'switchTab'
			});	
		},
		jiesuan() {
			let cart_ids = [];
			this.current_select.map(item => {
				if (item.checked) {
					cart_ids.push(item.cart_id);
				}
			});
			console.log(cart_ids.join(','));

			let params = {
				cart_ids: cart_ids.join(',')
			};
			this.$u.route('pages/order/payment/payment',params);
			// this.$u.api.orderCreate(params).then(res => {
			// 	if (res.code == 0) {
			// 		const out_trade_no = res.data;
			// 	} else {
			// 		this.$u.toast(res.message);
			// 	}
			// });
		},
		goodsNumChange(e) {
			let params = {
				num: e.value,
				cart_id: e.index
			};

			this.$u.api.cartEdit(params).then(res => {
				if (res.code == 0) {
					this.current_select.forEach(item => {
						if (item.cart_id == e.index) item.num = e.value;
					});
					// console.log(this.current_select)
				} else {
					this.$u.toast(res.message);
				}
			});
		},
		checkedAll() {
			if (!this.is_checked_all) {
				this.list.map(val => {
					val.checked = false;
				});
				this.current_select.map(val => {
					val.checked = false;
				});
			} else {
				this.list.map(val => {
					val.checked = true;
				});
				this.current_select.map(val => {
					val.checked = true;
				});
				// this.current_select = this.list;
			}
		},
		radioChange(index) {
			// this.is_all_select = !this.is_all_select;
			// this.current_select.splice(index, 1);
			this.current_select[index].checked = !this.current_select[index].checked;
			// this.current_select.forEach((item,index)=> {
			// 	item.checked = ! item.checked;
			// })
			// console.log(index);
		},
		getCartList() {
			let params = {};
			this.$u.api.cartList(params).then(res => {
				if (res.code == 0) {
					res.data.map(val => {
						val.checked = true;
					});
					this.list = res.data;
					this.current_select = this.$u.deepClone(res.data);
				} else {
					this.$u.toast(res.message);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	.cart-list {
		border-radius: 8rpx;
		background: #fff;
		.header {
			.num {
				color: $s-main-color;
				margin: 0 10rpx;
			}
		}
		.goods-box {
			.left {
				width: 40rpx;
			}
			.middle {
				border-radius: 8rpx;
				width: 180rpx;
				height: 180rpx;
				background: #fff;
				flex-shrink: 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.right {
				.goods-price {
					.price {
						color: $s-main-color;
					}
				}
			}
		}
	}
	.nav-fiexed {
		position: fixed;
		bottom: calc(var(--window-bottom));
		width: 100%;
		height: 132rpx;
		background-color: #fff;
		.left {
		}
		.right {
			.price {
				margin-left: 10rpx;
				color: $s-main-color;
			}
			.jiesuan {
				width: 180rpx;
				height: 75rpx;
				text-align: center;
				color: #fff;
				line-height: 75rpx;
				border-radius: 50rpx;
				background-color: $s-main-color;
				&.disable {
					background-color: gray;
				}
			}
		}
	}
}
</style>
