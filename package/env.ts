
export const isMobile=navigator?/Mobile/.test(navigator.appVersion):false;
export const isAndroid=navigator?/Android/i.test(navigator.userAgent):false;
export const isIOS=navigator?/iPhone|iPod|iPad/i.test(navigator.userAgent):false;
export const isWechat=navigator?/MicroMessenger/i.test(navigator.userAgent):false;
export const isAlipay=navigator?/Alipay/i.test(navigator.userAgent):false;