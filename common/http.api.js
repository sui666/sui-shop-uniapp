// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let indexUrl = 'http://shop.sui666.tk';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let login = (params = {}) => vm.$u.post("/api/login/login", params);

	// 此处使用了传入的params参数，一切自定义即可
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	
	let getBanner = (params = {}) => vm.$u.post("/api/login/login", params);;
	let getGoodsList = (params = {}) => vm.$u.post("/api/goodssku/page", params);
	let getCategoryTree = (params = {}) => vm.$u.post("/api/goodscategory/tree", params);
	let getSkudetail = (params = {}) => vm.$u.post("/api/goodssku/detail", params);
	
	
	let orderPayment = (params = {}) => vm.$u.post("/api/ordercreate/payment", params);
	
	// 中国地址列表
	let regionList = (params = {}) => vm.$u.post("/api/address/lists", params);
	// 地址列表
	let addressList = (params = {}) => vm.$u.post("/api/memberaddress/page", params);
	// 单条地址信息
	let addressInfo =  (params = {}) => vm.$u.post("/api/memberaddress/info", params); 
	// 添加地址
	let addressAdd = (params = {}) => vm.$u.post("/api/memberaddress/add", params);
	// 设置默认地址
	let addressDefault = (params = {}) => vm.$u.post("/api/memberaddress/setdefault", params);
	// 修改地址
	let addressEdit  = (params = {}) => vm.$u.post("/api/memberaddress/edit", params);
	// 删除一条地址信息
	let addressDel  = (params = {}) => vm.$u.post("/api/memberaddress/del", params);
	
	// 购物车列表
	let cartList  = (params = {}) => vm.$u.post("/api/cart/goodslists", params);
	
	// 订单创建 
	let orderCreate  = (params = {}) => vm.$u.post("/api/ordercreate/create", params);
	// 支付订单信息
	let payInfo  = (params = {}) => vm.$u.post("/api/pay/info", params);
	
	let cartEdit  = (params = {}) => vm.$u.post("/api/cart/edit", params);
	// 查询购物车数量
	let cartNum =  (params = {}) => vm.$u.post("/api/cart/count", params);
	let cartAdd =  (params = {}) => vm.$u.post("/api/cart/add", params);
	let skuList  = (params = {}) => vm.$u.post("/api/goodssku/page", params);

    // 个人信息接口
	let memberInfo  = (params = {}) => vm.$u.post("/api/member/info", params);
	
	// 订单列表
	let orderList =  (params = {}) => vm.$u.post("/api/order/lists", params);
	// 商品推荐
	let skuRecommend  = (params = {}) => vm.$u.post("/api/goodssku/recommend", params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		getBanner,
		getGoodsList,
		getInfo,
		getCategoryTree,
		getSkudetail,
		orderPayment,
		addressList,
		addressInfo,
		addressAdd,
		addressDefault,
		addressEdit,
		addressDel,
		regionList,
		cartList,
		cartAdd,
		orderCreate,
		payInfo,
		cartEdit,
		skuList,
		cartNum,
		skuRecommend,
		memberInfo,
		orderList
	

	};
}

export default {
	install
}
