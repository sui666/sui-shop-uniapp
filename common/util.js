import { API_URL,IMG_DOMAIN_PRE } from '@/env.js'

// // 全路径图片地址
export const  getImgUrl = (img, mult = false) =>
{
	if(mult) {
		let imgs = [];
		let temp = img.split(',');
		// 构造uveiw轮播图格式
		// [	
		// 		{
		// 			image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
		// 			title: '身无彩凤双飞翼，心有灵犀一点通'
		// 		},
		// 		{
		// 			image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
		// 			title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
		// 		},
		// 		{
		// 			image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
		// 			title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
		// 		}
			
		// ]
		temp.forEach(item => {
			imgs.push({image: IMG_DOMAIN_PRE+ item})
		});
		return imgs;
	}else{
		return IMG_DOMAIN_PRE + img;
	}
}

export const NumberFormat = ($num) => {
    if($num < 1000) {
       return $num;
    } else if($num >=1000 && $num < 10000){
       return ($num/1000).toFixed(1) + 'k';
    } else if ($num >= 10000) {
       return ($num/10000).toFixed(1) + 'w';
    }
}

