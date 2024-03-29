var Err;
(function (Err) {
    Err["Base"] = "0";
    Err["NetWork"] = "100";
    Err["TimeOut"] = "101";
    Err["ReqErr"] = "201";
    Err["AbortErr"] = "102";
    Err["Empty"] = "404";
})(Err || (Err = {}));
var VoyoError = function (info) {
    this.code = Err.Base;
    this.message = this.info = info;
};
//网络异常
var NetWorkErr = function (info) {
    this.code = Err.NetWork;
    this.message = this.info = info;
};
NetWorkErr.prototype = new VoyoError();
//连接超时
var TimeoutErr = function (info) {
    this.code = Err.TimeOut;
    this.message = this.info = info;
};
TimeoutErr.prototype = new VoyoError();
//服务器响应返回错误
var ReqErr = function (info) {
    this.code = Err.ReqErr;
    this.message = this.info = info;
};
ReqErr.prototype = new VoyoError();
//强行断开连接
var AbortErr = function (info) {
    this.code = Err.ReqErr;
    this.message = this.info = info;
};
AbortErr.prototype = new VoyoError();
var EmptyErr = function (info) {
    this.code = Err.Empty;
    this.message = this.info = info;
};
EmptyErr.prototype = new VoyoError();
export { VoyoError, NetWorkErr, TimeoutErr, ReqErr, AbortErr, EmptyErr, Err, };
