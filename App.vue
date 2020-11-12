<script>
import { mapState, mapActions } from 'vuex';
export default {
	onLaunch: function() {
		console.log('App Launch');
		
	},
	onShow: function() {
		// 购物车数量
		this.$store.dispatch('getCartNumber');
		
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

.bg{
	background: skyblue; //demo
}
page {
	background: #F7F7F7 !important;
}
/*每个页面公共css */
</style>
