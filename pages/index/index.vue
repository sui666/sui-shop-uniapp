<template>
	<view class="content ">
		<view class="search-header">
			<view class="u-p-l-20 u-font-30 title u-p-b-20">随某人商城</view>
			<view @click="search()" class="u-p-x-30 u-flex u-row-between search-header u-m-x-20 u-p-y-20 search-input u-font-24">
				商品搜索
				<u-icon name="search" size="30"></u-icon>
			</view>
		</view>
		<view class="swiper u-m-20"><u-swiper :list="bannerList"></u-swiper></view>
		<view class="u-m-y-30 u-font-lg u-text-center">--- 精品推荐 ---</view>
		<view class="list u-m-x-20">
			<view :key="index" v-for="(item, index) in list" class="list-cell u-flex u-row-center">
				<view class="inner-cell" @tap="goGoodsInfo(item.sku_id)">
					<view class="goods-img">
						<image :src="getImgUrl(item.sku_image)" mode="aspectFill"></image>
					</view>
					<view class="goods-title u-font-sm u-line-2">{{ item.goods_name }}</view>
					<!-- <view class="goods-desc u-font-xs">{{ item.introduction }}</view> -->
					<view class="u-m-y-10" v-if="item.is_free_shipping"><u-tag type="error" mode="plain" text="免运费" size="mini" /></view>
					<text class="yuan_price u-font-xs">￥{{ item.market_price }}</text>
					<view class="u-flex u-row-between">
						<text class="u-font-lg goods-price">￥ {{ item.price }}</text>
						<text class="u-font-xs">{{ item.sale_num }}人付款</text>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" icon-type="flower" margin-bottom="24rpx" />
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			status: 'loadmore',
			show: true,
			bannerList: [],
			pageConfig: {
				page: 1,
				page_size: 6
			},
			list: []
		};
	},
	computed: {
		...mapState({
			vuex_token: state => state.vuex_token
		})
	},
	created() {
		this.getBanner();
		this.getList();
	},
	onLoad() {
		console.log('token是' + this.$store.state.vuex_token);
	},
	onReachBottom() {
		this.pageConfig.page++;
		this.getList();
	},
	methods: {
		search() {
			this.$u.route('pages/search/search');
		},
		goGoodsInfo(sku_id) {
			console.log(sku_id);
			this.$u.route('/pages/goods/info', {
				sku_id: sku_id
			});
		},
		getBanner() {
			this.bannerList = [
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			];
			// this.$u.api.getBanner().then(res => {
			// });
		},
		getList() {
			let param = {
				page: this.pageConfig.page,
				page_size: this.pageConfig.page_size
			};
			this.$u.api.getGoodsList(this.pageConfig).then(res => {
				if (res.code == 0) {
					if (res.data.list.length == 0) {
						this.status = 'nomore';
						return;
					}
					this.status = 'loading';
					this.list = this.list.concat(res.data.list);
					// console.log(this.list);
				} else {
					this.$u.toast(res.message);
				}
			});
		}
	}
};
</script>
<style>
page {
	background: #f7f7f7;
}
</style>
<style lang="scss" scoped>
.content {
	.search-header {
		padding: 80rpx 0 20rpx 0;
		background: #ff4544;
		.title {
			color: rgba(239, 196, 128, 1);
		}
		.search-input {
			background: white;
			border-radius: 100rpx;
		}
	}
	.list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.list-cell {
			border-radius: 10rpx;
			background: white;
			width: 45%;
			margin: 0 2.5% 2.5% 0%;
			padding: 10rpx;
			.inner-cell {
				.goods-img {
					width: 306rpx ;
					height: 306rpx;
					overflow: hidden;
					// background: red;
					image{width: 100%;height: 100%;}
				}
				.goods-title{
					height: 72rpx;
					margin: 20rpx 0;
				}
				.yuan_price {
					color: gray;
					text-decoration: line-through;
				}
				.goods-price {
					color: $u-type-error;
				}
			}
		}
	}
}
</style>
