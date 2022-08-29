let navigator;
try {
  navigator = window.navigator;
}catch (e){
  navigator={
    appVersion:"",
    userAgent:""
  }
}

export const isMobile=/Mobile/.test(navigator.appVersion);
export const isAndroid=/Android/i.test(navigator.userAgent);
export const isIOS=/iPhone|iPod|iPad/i.test(navigator.userAgent);
export const isWechat=/MicroMessenger/i.test(navigator.userAgent);
export const isAlipay=/Alipay/i.test(navigator.userAgent);
