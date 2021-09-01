declare class VoyoError extends Error {
    code?: string;
    message: any;
    info: any;
    constructor(info?: any);
}
declare class NetWorkErr extends VoyoError {
    code: string;
}
declare class TimeoutErr extends VoyoError {
    code: string;
}
declare class ReqErr extends VoyoError {
    code: string;
}
declare class AbortErr extends VoyoError {
    code: string;
}
export { VoyoError, NetWorkErr, TimeoutErr, ReqErr, AbortErr };
