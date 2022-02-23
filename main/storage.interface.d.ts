export declare type StorageValue = string | number | boolean | Record<any, any> | null | undefined;
export interface StorageInterface {
    saveVal(key: string, val: StorageValue): void;
    getVal(key: string): StorageValue;
}
export declare class aa implements StorageInterface {
    saveVal(key: string, val: Record<string, any>): void;
    getVal(key: string): string;
}
