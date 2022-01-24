declare enum Err {
    Base = "0",
    NetWork = "100",
    TimeOut = "101",
    ReqErr = "201",
    AbortErr = "102",
    Empty = "404"
}
export interface VoyoErrorProperty {
    code: string;
    message: any;
    info: any;
}
export interface VoyoErrorConstructor extends VoyoErrorProperty {
    new (info?: any): any;
}
declare const VoyoError: VoyoErrorConstructor;
declare const NetWorkErr: VoyoErrorConstructor;
declare const TimeoutErr: VoyoErrorConstructor;
declare const ReqErr: VoyoErrorConstructor;
declare const AbortErr: VoyoErrorConstructor;
declare const EmptyErr: VoyoErrorConstructor;
export { VoyoError, NetWorkErr, TimeoutErr, ReqErr, AbortErr, EmptyErr, Err, };
