declare class VoyoError extends Error {
    code?: string;
    message: any;
    info: any;
    name: string;
    constructor(info?: any);
}
declare enum Err {
    NetWork = "11",
    TimeOut = "101",
    ReqErr = "201",
    AbortErr = "102"
}
declare class NetWorkErr extends VoyoError {
    code: Err;
}
declare class TimeoutErr extends VoyoError {
    code: Err;
}
declare class ReqErr extends VoyoError {
    code: Err;
}
declare class AbortErr extends VoyoError {
    code: Err;
}
export { VoyoError, NetWorkErr, TimeoutErr, ReqErr, AbortErr, Err };
