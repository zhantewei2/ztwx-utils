enum Err{
  Base="0",
  NetWork= "100",
  TimeOut="101",
  ReqErr="201",
  AbortErr="102",
  Empty="404"
}
export interface VoyoErrorProperty{
  code: string;
  message: any;
  info:any;
  
}

export interface VoyoErrorConstructor extends VoyoErrorProperty{
  new (info?:any): any;
}

const VoyoError: VoyoErrorConstructor= function(this:VoyoErrorProperty,info:any){
  this.code=Err.Base;
  this.message=this.info=info;
  
} as any;
//网络异常
const NetWorkErr:VoyoErrorConstructor=function(this:VoyoErrorProperty,info?:any){
  this.code=Err.NetWork;
  this.message=this.info=info;
} as any;

NetWorkErr.prototype= new VoyoError();


//连接超时
const TimeoutErr:VoyoErrorConstructor=function (this:VoyoErrorProperty,info?:any){
  this.code=Err.TimeOut;
  this.message=this.info=info;
} as any;
TimeoutErr.prototype=new VoyoError();

//服务器响应返回错误
const ReqErr:VoyoErrorConstructor = function(this:VoyoErrorProperty,info?:any){
  this.code=Err.ReqErr;
  this.message=this.info=info;
} as any;
ReqErr.prototype=new VoyoError();

//强行断开连接
const AbortErr:VoyoErrorConstructor = function(this:VoyoErrorProperty,info?:any){
  this.code=Err.ReqErr;
  this.message=this.info=info;
} as any;
AbortErr.prototype=new VoyoError();

const EmptyErr: VoyoErrorConstructor =function(this:VoyoErrorProperty,info?:any){
  this.code=Err.Empty;
  this.message=this.info=info;
} as any;

EmptyErr.prototype=new VoyoError();

export {
  VoyoError,
  NetWorkErr,
  TimeoutErr,
  ReqErr,
  AbortErr,
  EmptyErr,
  Err,
}