define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isMobile = /Mobile/.test(navigator.appVersion);
    exports.isAndroid = /Android/i.test(navigator.userAgent);
    exports.isIOS = /iPhone|iPod|iPad/i.test(navigator.userAgent);
    exports.isWechat = /MicroMessenger/i.test(navigator.userAgent);
    exports.isAlipay = /Alipay/i.test(navigator.userAgent);
});
