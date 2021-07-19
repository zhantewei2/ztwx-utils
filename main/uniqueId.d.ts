declare class GetUniqueId {
    b64Table: string;
    t: number;
    to64(num: number): string;
    de64(str: string): number;
    preTimestamp: number | null;
    preUniqueTag: number;
    /** not thread safe
     **/
    getUniqueId(): string;
}
export declare const uniqueId: GetUniqueId;
export declare const getUniqueId: () => string;
export {};
