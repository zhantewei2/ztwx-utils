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
declare const _default: {
    VoyoError: typeof VoyoError;
    NetWorkErr: typeof NetWorkErr;
    TimeoutErr: typeof TimeoutErr;
    ReqErr: typeof ReqErr;
    AbortErr: typeof AbortErr;
};
export default _default;
