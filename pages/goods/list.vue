<template>
	<view class="content">
		<view class="header">
			<view class="search u-p-20"><u-search @custom="search" height="78"></u-search></view>
			<view class="choice-list u-flex">
				<view @click="choiceList(0)" :class="current === 0 ? 'active' : ''" class="item u-flex-1 u-text-center">综合</view>
				<view @click="choiceList(1)" :class="current === 1 ? 'active' : ''" class="item u-flex-1 u-text-center">销量</view>
				<view  :class="current === 2 ? 'active' : ''" class="item u-flex-1 u-text-center price-sort">
					<text @click="choiceList(2,'')">价格</text>
					<!-- 组件bug,无法阻止向上冒泡 正确: @click.stop="priceSort('desc')" -->
					<u-icon
						:custom-style="{ position: 'absolute', right: '20rpx', top: '0rpx', color: current === 2 && price_sort == 'desc' ? 'red' : 'gray' }"
						@click="priceSort('desc')"
						index="red"
						size="20"
						name="arrow-up"
					></u-icon>
					<u-icon
						:custom-style="{ position: 'absolute', right: '20rpx', top: '30rpx', color: current === 2 && price_sort == 'asc' ? 'red' : 'gray' }"
						@click="priceSort('asc')"
						index="asc"
						size="20"
						name="arrow-down"
					></u-icon>
				</view>
				<view @click="rightShow = true" :class="current === 3 ? 'active' : ''" class="item u-flex-1 u-text-center">筛选</view>
			</view>
			
		</view>
		<view class="list u-m-x-20 u-m-y-20">
			<view  :key="index" v-for="(item,index) in list" class="list-cell u-flex u-row-center">
				<view class="inner-cell" @tap="goGoodsInfo(item.sku_id)">
					<image :src="getImgUrl(item.sku_image)" mode="aspectFill" class="goods-img"></image>
					<view class="goods-title u-font-sm">{{ item.goods_name }}</view>
					<view class="goods-desc u-font-xs">{{ item.introduction }}</view>
					<view class="u-m-y-10" v-if="item.is_free_shipping">
						<u-tag type="error" mode="plain" text="免运费"  size="mini"/>
					</view>
					<text class="yuan_price u-font-xs">￥{{item.market_price}}</text>
					<view class="u-flex u-row-between">
						<text class="u-font-lg goods-price">￥ {{item.price}}</text>
						<text class="u-font-xs">{{item.sale_num}}人付款</text>
					</view>
				</view>
			</view>
		</view>
		
		<u-popup v-model="rightShow" mode="right">
		  <view>右侧筛选,待完成</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			rightShow:false,
			list:[],
			current: -1,
			price_sort: '', 
			page_config:{
				page: 1,
				page_size: 6
			},
			min_price: '',
			max_price: '',
			category_id: 0,
			is_free_shipping: 0,
			keywords: '',
			order: '',
			coupon: 0,
		};
	},
	onLoad(e) {
		this.keyword = e.keyword;
		console.log(e);
		this.getList();
	},
	onReachBottom() {
			this.page_config.page++;
			this.getList();
	},
	methods: {
		goGoodsInfo(sku_id) {
			console.log(sku_id)
				this.$u.route('/pages/goods/info', {
					sku_id: sku_id
				});
		},
		search(value){
			this.keyword = value
			this.getList();
		},
		priceSort(index) {
			console.log(index)
			this.price_sort = index;
		},
		choiceList(index, sort) {
			this.current = index;
			this.list = [];
            // alert(111)
			// 0综合 1 销量 2价格
			switch(index)
			{
			    case 0:
			        this.order = '' ;
					this.price_sort = '';
			        break;
			    case 1:
			        this.order = 'sale_num' ;
					this.price_sort = 'desc';
			        break;
				case 2:
				    this.order = 'discount_price' ;
				   
				   if(this.price_sort == '') {
					   this.price_sort = 'desc'
				   }else if(this.price_sort == 'desc')
				   {
					   this.price_sort = 'asc'
				   }else{
					   this.price_sort = 'desc';
				   }
					
			
					break;
			    default:
					return;
			}
			this.getList();
		},
		
		getList() {
			let params = {
				page: this.page_config.page,
				page_size: this.page_config.page_size,
				keyword: this.keyword,
				category_id: this.category_id,
				min_price: this.min_price,
				max_price: this.max_price,
				is_free_shipping: this.is_free_shipping,
				order: this.order,
				sort: this.price_sort,
				coupon: this.coupon
			}
			this.$u.api.skuList(params).then(res => {
				if(res.code == 0) {
					console.log(res)
					this.list = this.list.concat(res.data.list);
				}else{
					this.$u.toast(res.message);
				}
			});
			console.log(params)
		}
	}
};
</script>

<style lang="scss">
.content {
	.header {
		background-color: #fff;
	}
	.choice-list {
		padding: 10rpx 20rpx 10rpx 0;
		.item {
			position: relative;
			padding: 10rpx 0;
			overflow: hidden;
			transition: all 0.1s ease-in 0.1s;
			&.active {
				color: $s-main-color;
			}
			.price-choice {
				// position: absolute;
				// right: 20rpx;
				// top: -6rpx;
				// .arrow{height: 24rpx;}
			}
		}
		.price-sort {
			position: relative;
		}
	}
	.list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.list-cell{
			border-radius: 10rpx;
			background: white;
			width: 45%;
			margin: 0 2.5% 2.5% 0;
			padding: 10rpx;
			.inner-cell{
				.goods-img{
					width: 306rpx;
					height: 306rpx;
				}
				.yuan_price{color: gray;
					text-decoration:line-through;
				 }
				 .goods-price{
					 color: $u-type-error;
				 }
				 
			}
		}
	}
}
</style>
