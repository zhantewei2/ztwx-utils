export declare type QueryType = Record<any, any>;
export declare const getPureUrl: (url: string) => string;
export declare const getUrlTag: (url: string) => string;
export declare const getQueryStr: (url: string) => string;
export declare const encodeQuery: (obj: QueryType, URIComponent?: boolean) => string;
export declare const decodeQuery: (url: string) => QueryType;
export declare const parseUrl: (url: string) => {
    pureUrl: string;
    tag: string;
    query: QueryType;
};
export declare class QueryParams {
    /**
     * encode queryparams
     */
    encode: (obj: Record<any, any>, URIComponent?: boolean) => string;
    /**
     * decode queryparams
     */
    dencode: (url?: string) => QueryType;
}
export declare const queryparams: QueryParams;
export declare const additionUrl: (url: string, params?: Record<any, any> | undefined, URIComponent?: boolean) => string;
