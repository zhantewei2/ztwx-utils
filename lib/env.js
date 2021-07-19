var navigator;
try {
    navigator = window.navigator;
}
catch (e) {
    navigator = {
        appVersion: "",
        userAgent: ""
    };
}
export var isMobile = /Mobile/.test(navigator.appVersion);
export var isAndroid = /Android/i.test(navigator.userAgent);
export var isIOS = /iPhone|iPod|iPad/i.test(navigator.userAgent);
export var isWechat = /MicroMessenger/i.test(navigator.userAgent);
export var isAlipay = /Alipay/i.test(navigator.userAgent);
