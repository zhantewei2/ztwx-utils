"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlipay = exports.isWechat = exports.isIOS = exports.isAndroid = exports.isMobile = void 0;
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
exports.isMobile = /Mobile/.test(navigator.appVersion);
exports.isAndroid = /Android/i.test(navigator.userAgent);
exports.isIOS = /iPhone|iPod|iPad/i.test(navigator.userAgent);
exports.isWechat = /MicroMessenger/i.test(navigator.userAgent);
exports.isAlipay = /Alipay/i.test(navigator.userAgent);
