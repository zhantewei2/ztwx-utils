export declare const compressDataUrl: (b64: string, fileType?: string) => Promise<string>;
export declare const dataURLtoBlob: (dataurl: any) => Promise<unknown>;
export declare const dataURLtoArrayBuffer: (base64String: string) => any;
export declare class FileCompress {
    exts: string[];
    checkFileFormat(filename: string): boolean;
    compressImgFromFile(file: File): Promise<[string, string]>;
}
export declare const fileCompress: FileCompress;
