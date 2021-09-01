"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortErr = exports.ReqErr = exports.TimeoutErr = exports.NetWorkErr = exports.VoyoError = void 0;
var tslib_1 = require("tslib");
var VoyoError = /** @class */ (function (_super) {
    tslib_1.__extends(VoyoError, _super);
    function VoyoError(info) {
        var _this = _super.call(this) || this;
        if (info) {
            _this.message = info;
            _this.info = info;
        }
        return _this;
    }
    return VoyoError;
}(Error));
exports.VoyoError = VoyoError;
//网络异常
var NetWorkErr = /** @class */ (function (_super) {
    tslib_1.__extends(NetWorkErr, _super);
    function NetWorkErr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = "100";
        return _this;
    }
    return NetWorkErr;
}(VoyoError));
exports.NetWorkErr = NetWorkErr;
//连接超时
var TimeoutErr = /** @class */ (function (_super) {
    tslib_1.__extends(TimeoutErr, _super);
    function TimeoutErr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = "101";
        return _this;
    }
    return TimeoutErr;
}(VoyoError));
exports.TimeoutErr = TimeoutErr;
//服务器响应返回错误
var ReqErr = /** @class */ (function (_super) {
    tslib_1.__extends(ReqErr, _super);
    function ReqErr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = "201";
        return _this;
    }
    return ReqErr;
}(VoyoError));
exports.ReqErr = ReqErr;
//强行断开连接
var AbortErr = /** @class */ (function (_super) {
    tslib_1.__extends(AbortErr, _super);
    function AbortErr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = "102";
        return _this;
    }
    return AbortErr;
}(VoyoError));
exports.AbortErr = AbortErr;