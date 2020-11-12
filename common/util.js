import { API_URL,IMG_DOMAIN_PRE } from '@/env.js'

// // 全路径图片地址
export const  getImgUrl = (img) =>
{
	return IMG_DOMAIN_PRE + img;
	// return IMG_DOMAIN_PRE + img;
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

