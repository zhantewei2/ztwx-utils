export declare const shouldQuality: (fileType: string) => boolean;
export declare const compressDataUrl: (b64: string, fileType?: string, qualityPercent?: number | undefined, resolutionPercent?: number | undefined) => Promise<string>;
export declare const dataURLtoBlob: (dataurl: any) => Promise<unknown>;
export declare const dataURLtoArrayBuffer: (base64String: string) => Uint8Array;
export declare type ImageMimeTypes = "image/png" | "image/jpg" | "image/jpeg" | "image/gif" | "image/bmp" | "image/svg" | "image/webp" | "image/svg+xml" | "image/vnd.microsoft.icon";
export declare const imageMimes: {
    "image/png": string;
    "image/jpg": string;
    "image/jpeg": string;
    "image/gif": string;
    "image/bmp": string;
    "image/svg": string;
    "image/webp": string;
    "image/svg+xml": string;
    "image/vnd.microsoft.icon": string;
};
export declare const imageMimeIgnores: ImageMimeTypes[];
export declare type CompressRes = string | Blob;
export interface CompressOpts {
    file: File;
    md5?: boolean;
    turnLargePngKB?: number;
    ignoreMimeType?: ImageMimeTypes[];
    resultType?: "blob" | "dataUrl";
    qualityPercent?: number;
    resolutionPercent?: number;
}
export interface CompressResult {
    fileMd5?: string;
    result: CompressRes;
    mimeType: ImageMimeTypes;
    postfix: string;
}
export declare class FileCompress {
    imageMimeList: (string | number | symbol)[];
    imageMimeIgnores: ImageMimeTypes[];
    checkFileFormat(file: File): boolean;
    readAsDataUrl(file: File): Promise<string>;
    combineIgnoreMimeType(mimes: ImageMimeTypes[]): Set<ImageMimeTypes>;
    turnPng(file: File, turnLargePngKB?: number): ImageMimeTypes;
    /**
     * compress Image
     * @param md5
     * @param ignoreMimeType
     * @param resultType
     * @param file
     * @param qualityPercent
     * @param resolutionPercent
     * @param turnLargePngKB
     */
    compress({ md5, ignoreMimeType, resultType, file, qualityPercent, resolutionPercent, turnLargePngKB }: CompressOpts): Promise<CompressResult>;
    /**
     * @deprecated
     *
     * @param file
     * @param qualityPercent 手动指定品质压缩比例 , 如：0.5 为50%
     * @param resolutionPercent 手动指定分辨率压缩比例
     */
    compressImgFromFile(file: File, qualityPercent?: number, resolutionPercent?: number): Promise<[string, string]>;
}
export declare const fileCompress: FileCompress;
