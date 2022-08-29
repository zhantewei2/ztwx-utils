import { StorageInterface } from "./storage.interface";
export declare class Storage implements StorageInterface {
    saveVal(key: string, val: Record<string, any>): void;
    getVal(key: string): any;
}
