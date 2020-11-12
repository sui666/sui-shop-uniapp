<template>
	<view class="content">
		<view v-if="list.length" v-for="(item, index) in list" :key="index" class="address-list u-margin-20 u-padding-20">
			<view class="info u-flex u-row-between">
				<text class="u-font-32">{{ item.name }}</text>
				<text>{{ item.mobile }}</text>
			</view>
			<view class="u-line-3 full-address u-padding-y-15 u-border-bottom">{{ item.full_address }} {{ item.address }}</view>
			<view class="handle u-padding-y-20 u-flex u-row-between u-col-center">
				<u-radio-group v-model="is_default"><u-radio @change="radioChange(item.id)"  active-color="#fa3534" shape="circle" :name="item.is_default">默认地址</u-radio></u-radio-group>
				<view class="right-handle">
					<text @click="editAddress(item.id)" class="">编辑</text>
					<text @click="delAddress(item.id)" v-if="item.is_default != 1" class="u-m-l-40">删除</text>
				</view>
			</view>
		</view>

		<view class="no-address" v-else><u-empty text="收货地址为空" mode="address"></u-empty></view>

		<view class="button u-padding-30 u-margin-x-50"><u-button @click="addressAdd()" type="error" shape="circle">去添加收货地址</u-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			is_default: 1,
			list: [],
			pageConfig: {
				page: 1,
				page_size: 6
			}
		};
	},
	onLoad(e) {
		this.getAdressList();
	},
	methods: {
		editAddress(id)
		{
			this.$u.route('pages/member/address/add',{id:id});
		},
		delAddress(id)
		{
			let params = { id: id};
			this.$u.api.addressDel(params).then(res => {
				if (res.code == 0) {
					this.$u.toast('删除成功');
				} else {
					this.$u.toast($res.message);
				}
			});
		},
		radioChange(id) {
			let params = { id: id};
			this.$u.api.addressDefault(params).then(res => {
				if (res.code == 0) {
					this.$u.toast('修改成功');
				} else {
					this.$u.toast($res.message);
				}
			});
		},
		addressAdd() {
			this.$u.route('pages/member/address/add');
		},
		getAdressList() {
			let params = this.pageConfig;
			this.$u.api.addressList(params).then(res => {
				console.log(res);
				if (res.code == 0) {
					this.list = this.list.concat(res.data.list);
				} else {
					this.$u.toast($res.message);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	.no-address {
		margin-top: 150rpx;
	}
	.address-list {
		background: white;
		.info {
			font-weight: bold;
		}
		.handle {
			.right-handle {
				color: #898989;
			}
		}
	}
}
</style>
