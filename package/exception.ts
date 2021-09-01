class VoyoError extends Error {
  code?: string;
  message: any;
  info: any;
  constructor(info?: any) {
    super();
    if (info) {
      this.message = info;
      this.info = info;
    }
  }
}

//网络异常
class NetWorkErr extends VoyoError {
  code = "100";
}
//连接超时
class TimeoutErr extends VoyoError {
  code = "101";
}
//服务器响应返回错误
class ReqErr extends VoyoError {
  code = "201";
}
//强行断开连接
class AbortErr extends VoyoError {
  code = "102";
}

export default {
  VoyoError,
  NetWorkErr,
  TimeoutErr,
  ReqErr,
  AbortErr
}