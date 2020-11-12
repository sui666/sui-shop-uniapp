exports.install = function(Vue, options) {
	Vue.prototype.alert = (params) => {
		console.log(params)
	};
};
