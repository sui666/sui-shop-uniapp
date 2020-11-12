<template>
	<view class="content">
		<view class="address-box">
			<u-form :model="form" ref="uForm" class="">
				<u-form-item label-width="120" :label-style="{ 'font-size': '24rpx' }" label="姓名"><u-input   placeholder-style="color:gray;font-size:24rpx" placeholder="收货人姓名"  v-model="form.name" /></u-form-item>
				<u-form-item label-width="120" :label-style="{ 'font-size': '24rpx' }" label="手机"><u-input   placeholder-style="color:gray;font-size:24rpx" placeholder="收货人手机号" v-model="form.mobile" /></u-form-item>
				<u-form-item label-width="120" :label-style="{ 'font-size': '24rpx' }" label="电话"><u-input   placeholder-style="color:gray;font-size:24rpx" placeholder="收货人固定电话" v-model="form.telephone"/></u-form-item>
				
				<u-form-item label-width="120" :label-style="{ 'font-size': '24rpx' }" label="地区">
					<u-input  type="select" :select-open="pickerShow" v-model="form.full_address" placeholder="请选择地区" @click="pickerShow = true"></u-input>
				</u-form-item>
				
				<u-form-item label-width="120" :label-style="{ 'font-size': '24rpx' }" label="详细地址"><u-input  placeholder-style="color:gray;font-size:24rpx" v-model="form.address" placeholder="定位小区,街道地址,写字楼" /></u-form-item>
			</u-form>
		</view>
		<view class="button u-padding-30 u-margin-x-50"><u-button @click="addressAddSave()" type="error" shape="circle">保存</u-button></view>
	
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info:[],
			pickerShow: false,
			id: '',//如果有id就是修改
			form: {
				region: '',
				name: '',
				mobile:'',
				telephone: '',
				address:'',
				full_address:'',
			},
			province:[],
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					}
				]
			},
		};
	},
	onLoad(e) {
		if(e.id) {
			this.id = e.id;
			this.getInfo();
		}
		this.regionList();
	},
	methods: {
		getInfo() {
				let params = { id: this.id};
				this.$u.api.addressInfo(params).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.form = res.data
					} else {
						this.$u.toast($res.message);
					}
				});
		},
		regionList(pid) {
			pid = 	pid || 0;
			let params = {
				pid: pid
			}
			this.$u.api.regionList(params).then(res =>{
				console.log(res)
				if(res.code == 0){
					this.province = res.data;
				}else{
					this.$u.toast(res.message);
				}
			});
			
		},
		// 选择地区回调
		regionConfirm(e) {
			console.log(e)
			this.form.full_address = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		addressAddSave() {
			let params = {
				name: this.form.name,
				mobile: this.form.mobile,
				telephone: this.form.telephone,
				province_id: "210000",
				city_id: "210600",
				district_id: 210102,
				community_id: 0,
				address: this.form.address,
				full_address: this.form.full_address,
				latitude: 0,
				longitude: 0,
				is_default: 1,
			}
			
			if(this.id) { //修改
			
				Object.assign(params,{id:this.id});
				
				this.$u.api.addressEdit(params).then(res => {
					if(res.code == 0) {
						this.$u.toast("修改成功");
						uni.navigateBack();
					}else{
						this.$u.toast(res.message);
					}
				});
			}else{
				this.$u.api.addressAdd(params).then(res => {
					if(res.code == 0) {
						this.$u.toast("添加成功");
						uni.navigateBack();
					}else{
						this.$u.toast(res.message);
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	.address-box {
		margin: 20rpx;
		background: #fff;
		overflow: hidden;
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
	}
}
</style>
