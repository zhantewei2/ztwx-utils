class VoyoError extends Error {
  code?: string;
  message: any;
  info: any;
  name: string;
  constructor(info?: any) {
    super();
    if (info) {
      this.message = info;
      this.info = info;
    }
  }
}

enum Err{
  NetWork= "11",
  TimeOut="101",
  ReqErr="201",
  AbortErr="102"
}
//网络异常
class NetWorkErr extends VoyoError {
  code = Err.NetWork;
}
//连接超时
class TimeoutErr extends VoyoError {
  code = Err.TimeOut;
}
//服务器响应返回错误
class ReqErr extends VoyoError {
  code = Err.ReqErr;
}
//强行断开连接
class AbortErr extends VoyoError {
  code = Err.AbortErr;
}

export {
  VoyoError,
  NetWorkErr,
  TimeoutErr,
  ReqErr,
  AbortErr,
  Err
}