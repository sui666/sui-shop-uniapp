<template>
	<view>
		<view v-if="list.length" :data-theme="themeStyle">
			<view class="hr-view" v-if="isLike">
				<view class="text-left ns-font-size-base">
					<text>────•</text>
				</view>
				<text class="title">{{ $lang('common.goodsRecommendTitle') }}</text>
				<view class="text-right ns-font-size-base">
					<text>•────</text>
				</view>
			</view>
			<ns-goods-item-row :value="list" @toDetail="toDetail"></ns-goods-item-row>
		</view>
		<view class="circle-box" v-if="showLoading && load">
			<ns-loading></ns-loading>
		</view>
	</view>
</template>

<script>
	import globalConfig from '@/common/js/golbalConfig.js';
	// 商品推荐
	import nsLoading from "@/components/ns-loading/ns-loading.vue"
	import nsGoodsItemRow from '@/components/ns-goods-item/ns-goods-item-row.vue'
	export default {
		name: 'ns-goods-recommend',
		components: {
			nsLoading,nsGoodsItemRow
		},
		data() {
			return {
				list: [],
				page: 1,
				isAll: !0,
				isClick: true,
				showLoading: false
			};
		},
		mixins:[globalConfig],
		props: {
			isLike: {
				type: Boolean,
				default: true
			},
			size: {
				type: [Number, String],
				default: 10
			},
			auto: {
				type: Boolean,
				default: true
			},
			load: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			if (this.auto) {
				this.getLikeList();
			}
		},
		methods: {
			init() {
				this.list = [];
				this.page = 1;
			},
			toDetail(e){
				let data={
					sku_id:e.sku_id
				};
				this.$util.redirectTo('/pages/goods/detail/detail', data);
			},
			getLikeList(size) {
				let that = this;
				if (!this.isClick) return;
				if (!this.isAll) return;
				this.isClick = false;
				if (this.page > 1) this.showLoading = true;
				return new Promise((resolve, reject) => {
					that.$api.sendRequest({
						url: '/api/goodssku/recommend',
						data: {
							page: this.page,
							page_size: this.auto ? this.size : size
						},
						success: res => {
							this.showLoading = false;
							this.isClick = true;
							if (res.code == 0) {
								if (this.page == 1) {
									this.list = [];
								}
								this.list = this.list.concat(res.data.list);
								if (this.list.length == res.data.count) this.isAll = !1;
								this.page += 1;
								resolve(res.data.list);
							}
						}
					});
				});
			},
			imageError(index) {
				this.list[index].sku_image = this.$util.getDefaultImage().default_goods_img;
				this.$forceUpdate();
			}
		}
	};
</script>

<style lang="scss">
	.hr-view {
		margin: 50rpx 20rpx 30rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		box-sizing: content-box;
		font-size: $ns-font-size-x-lg;
	}

	.hr-view .hr {
		width: 36%;
		height: 2rpx;
		background: #e5e5e5;
	}

	.hr-view .title {
		padding: 0 $ns-padding;
	}

	.recommend-goods-list {
		width: 702rpx;
		margin: 0 auto;

		display: flex;
		flex-flow: wrap;
		justify-content: space-between;

		.goods-item {
			width: 49%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 18rpx;
			background-color: #fff;
			padding: 26rpx 20rpx;
			box-sizing: border-box;
			border-radius: 10rpx;

			image {
				width: 334rpx;
				height: 342rpx;
			}

			.title-box {
				width: 100%;
				height: 90rpx;
				margin-top: 19rpx;

				.goods-title {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					font-size: $ns-font-size-base;
					color: #000;
					padding: 0 10rpx;
					box-sizing: border-box;
				}
			}

			.mail {
				width: 100%;
				height: 26rpx;
				display: flex;
				align-items: center;

				view {
					line-height: 1;
					border: 1px solid #fff;
					font-size: $ns-font-size-x-sm;
					padding: 2rpx 4rpx;
					border-radius: 4rpx;
					margin-right: 11rpx;
				}
			}

			.price-info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 100%;
				height: 75rpx;
				line-height: 1;

				.price {
					width: 65%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: flex-end;
					overflow: hidden;

					.price-1 {
						font-size: $ns-font-size-sm;
						margin-right: 10rpx;
						line-height: 1;
					}

					.price-2 {
						font-size: $ns-font-size-lg;
						color: #313326;
						display: flex;
						align-items: center;
						line-height: 1;

						image {
							width: 56rpx;
							height: 22rpx;
							margin-left: 6rpx;
						}
					}

					.old-num {
						font-size: $ns-font-size-sm;
						color: #777;
						text-decoration: line-through;
					}
				}

				.price-num {
					line-height: 1;
					font-size: $ns-font-size-x-sm;
					color: #777777;
				}
			}
		}
	}

	.recommend-goods-list .item {
		margin: 0 10rpx 20rpx 20rpx;
		box-sizing: border-box;
		background: #fff;
		width: calc(50% - 30rpx);
		border-radius: 4px;
		overflow: hidden;
	}

	.recommend-goods-list .item:nth-child(2n) {
		margin: 0 20rpx 20rpx 10rpx;
	}

	.recommend-goods-list .control-thumbnail {
		width: 100%;
		height: calc(50vw - 30rpx);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		padding: $ns-padding;
		box-sizing: border-box;
	}

	.recommend-goods-list .control-thumbnail image {
		width: 100%;
		height: 100%;
	}

	.recommend-goods-list .control-goods-name {
		height: 70rpx;
	}

	.recommend-goods-list .control-goods-name .goods-name {
		padding: 0 20rpx 0 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: $ns-font-size-base;
		line-height: 1.3;
	}

	.recommend-goods-list .item .control-goods-price {
		padding: 16rpx 20rpx 20rpx 20rpx;
		line-height: 1;
	}

	.recommend-goods-list .control-goods-price .price {
		font-size: $ns-font-size-lg;
	}

	.recommend-goods-list .control-goods-price .currency-symbol {
		font-size: $ns-font-size-base;
	}

	/*旋转进度条 */
	.circle-box {
		width: 100%;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #b1b1b1;
	}
</style>
