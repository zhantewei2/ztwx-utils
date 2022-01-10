"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.AbortErr = exports.ReqErr = exports.TimeoutErr = exports.NetWorkErr = exports.VoyoError = void 0;
var Err;
(function (Err) {
    Err["Base"] = "0";
    Err["NetWork"] = "100";
    Err["TimeOut"] = "101";
    Err["ReqErr"] = "201";
    Err["AbortErr"] = "102";
})(Err || (Err = {}));
exports.Err = Err;
var VoyoError = function (info) {
    this.code = Err.Base;
    this.message = this.info = info;
};
exports.VoyoError = VoyoError;
//网络异常
var NetWorkErr = function (info) {
    this.code = Err.NetWork;
    this.message = this.info = info;
};
exports.NetWorkErr = NetWorkErr;
NetWorkErr.prototype = new VoyoError();
//连接超时
var TimeoutErr = function (info) {
    this.code = Err.TimeOut;
    this.message = this.info = info;
};
exports.TimeoutErr = TimeoutErr;
TimeoutErr.prototype = new VoyoError();
//服务器响应返回错误
var ReqErr = function (info) {
    this.code = Err.ReqErr;
    this.message = this.info = info;
};
exports.ReqErr = ReqErr;
ReqErr.prototype = new VoyoError();
//强行断开连接
var AbortErr = function (info) {
    this.code = Err.ReqErr;
    this.message = this.info = info;
};
exports.AbortErr = AbortErr;
AbortErr.prototype = new VoyoError();
