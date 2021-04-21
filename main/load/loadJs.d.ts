export interface LoadParams {
    address: string;
    tag: string;
    rel?: string;
    remove?: boolean;
    id?: string;
}
export declare const loadJs: (address: string, id: string, remove?: boolean) => Promise<unknown>;
export declare const loadCss: (address: string, id: string, remove?: boolean) => Promise<unknown>;
