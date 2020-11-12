// #ifdef H5
let protocol = window.location.protocol;
// #endif

const ENV_BASE_URL = {
	development: 'http://shop.sui666.tk', //开发环境
	production: 'http://shop.sui666.tk', //生产环境
}
const ENV_API_URL = {
	development: `${ENV_BASE_URL.development}`, //开发环境
	production: `${ENV_BASE_URL.production}`, //生产环境
}

// 图片前缀域名
export const IMG_DOMAIN_PRE = "http://shop.sui666.tk/";
export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; //后台根域名
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development']; //后台接口域名
export const HAS_LIVE = false; //后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。
