define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAlipay = exports.isWechat = exports.isIOS = exports.isAndroid = exports.isMobile = void 0;
    exports.isMobile = navigator ? /Mobile/.test(navigator.appVersion) : false;
    exports.isAndroid = navigator ? /Android/i.test(navigator.userAgent) : false;
    exports.isIOS = navigator ? /iPhone|iPod|iPad/i.test(navigator.userAgent) : false;
    exports.isWechat = navigator ? /MicroMessenger/i.test(navigator.userAgent) : false;
    exports.isAlipay = navigator ? /Alipay/i.test(navigator.userAgent) : false;
});
