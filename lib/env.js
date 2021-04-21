export var isMobile = navigator ? /Mobile/.test(navigator.appVersion) : false;
export var isAndroid = navigator ? /Android/i.test(navigator.userAgent) : false;
export var isIOS = navigator ? /iPhone|iPod|iPad/i.test(navigator.userAgent) : false;
export var isWechat = navigator ? /MicroMessenger/i.test(navigator.userAgent) : false;
export var isAlipay = navigator ? /Alipay/i.test(navigator.userAgent) : false;
