export declare const isObject: (obj: any) => boolean;
export declare const getObjectFromList: <T, K extends keyof T>(obj: T, list: K[]) => { [P in K]: T[K]; };
export declare const filterIncludeObj: <T extends {
    [k: string]: any;
}, K extends keyof T>(obj: T, exclude?: K[] | undefined, filterValue?: any[] | undefined) => Partial<T>;
export declare const filterNullObj: <T, K extends keyof T>(obj: T, exclude?: K[] | undefined) => Partial<T>;
export declare const filterEmptyObj: <T, K extends keyof T>(obj: T, exclude?: K[] | undefined) => Partial<T>;
export declare const floatSimplify: (float: number, decimalCount: number) => number;
