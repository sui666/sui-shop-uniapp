<template>
	<view class="content">
		<view class="search u-p-30">
			<u-search height="70" @custom="search" @search="search" :animation="true" placeholder="搜一搜吧" v-model="keyword" shape="round" ></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			};
		},
		methods:{
			search(value) {
				if(value.length ===0) return this.$u.toast('请输入搜索词'); 
				this.$u.route("pages/goods/list",{keyword: this.keyword});
			}
		}
	}
</script>

<style lang="scss">
.search{
	
}
</style>
