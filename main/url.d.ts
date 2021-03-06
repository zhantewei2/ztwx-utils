export declare class QueryParams {
    /**
     * encode queryparams
     */
    encode: (obj: Record<any, any>, URIComponent?: boolean) => string;
    /**
     * decode queryparams
     */
    dencode: (url?: string) => Record<any, any>;
}
export declare const queryparams: QueryParams;
export declare const getPureUrl: (url: string) => string;
export declare const additionUrl: (url: string, params?: Record<any, any> | undefined, URIComponent?: boolean) => string;
