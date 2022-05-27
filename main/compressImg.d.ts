export declare const shouldQuality: (fileType: string) => boolean;
export declare const compressDataUrl: (b64: string, fileType?: string, qualityPercent?: number | undefined, resolutionPercent?: number | undefined) => Promise<string>;
export declare const dataURLtoBlob: (dataurl: any) => Promise<unknown>;
export declare const dataURLtoArrayBuffer: (base64String: string) => Uint8Array;
export declare class FileCompress {
    exts: string[];
    checkFileFormat(filename: string): boolean;
    /**
     *
     * @param file
     * @param qualityPercent 手动指定品质压缩比例 , 如：0.5 为50%
     * @param resolutionPercent 手动指定分辨率压缩比例
     */
    compressImgFromFile(file: File, qualityPercent?: number, resolutionPercent?: number): Promise<[string, string]>;
}
export declare const fileCompress: FileCompress;
