import {getUniqueId} from "./uniqueId";
import {getExtension} from "./contentType";

const switchQuality = (size: any) => {
    size = size / 1024;
    if (size < 300) return undefined;
    if (size < 500) return 0.7;
    if (500 <= size && size <= 1000) return 0.4;
    if (1000 < size && size <= 2000) return 0.35;
    if (2000 < size && size <= 4000) return 0.3;
    if (4000 < size && size <= 6000) return 0.2;
    if (6000 < size && size <= 7000) return 0.15;
    if (size > 7000) return 0.1;
    return undefined;
};

export const compressDataUrl = (b64: string,fileType:string="image/jpeg",qualityPercent?:number,resolutionPercent?:number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas: any = document.createElement('canvas');
        const ctx: any = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            let
                h = img.height,
                w = img.width,
                l = Math.max(w, h) / (w / h),
                percent = 1;
            
            if(resolutionPercent){
                percent=resolutionPercent;
            }else{
                if (l <= 1200 && l > 1000) {
                    percent = 0.95
                } else if (l > 1200 && l <= 1400) {
                    percent = 0.9
                } else if (l > 1400 && l <= 1500) {
                    percent = 0.85;
                } else if (l > 1500 && l <= 1600) {
                    percent = 0.75;
                } else if (l > 1600 && l <= 1700) {
                    percent = 0.65;
                } else if (l > 1700 && l <= 2000) {
                    percent = 0.65;
                } else if (l > 2000 && l <= 3000) {
                    percent = 0.55;
                } else if (l > 3000) {
                    percent = 0.5;
                }
            }
            h= canvas.height = h / percent;
            w= canvas.width = w / percent;
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL(fileType, resolutionPercent??switchQuality(b64.length)));
        };
        img.onerror = (e) => reject(e);
        img.src = b64;
    })
};

export const dataURLtoBlob = (dataurl: any) => {
    return new Promise((resolve, reject) => {
        let err: boolean = false;
        let data: any;
        try {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            data = new Blob([u8arr], {type: mime});
        } catch (e) {
            err = true;
        }
        err ? reject() : resolve(data);

    })
};
export const dataURLtoArrayBuffer = (base64String: string): any => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);

    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};


export class FileCompress {
    exts = ["png", "jpg", "jpeg", "git", "bmp", "svg", "webp", "jp"];

    checkFileFormat(filename: string): boolean {
        const pointIndex = filename.lastIndexOf(".");
        if (!pointIndex) return false;
        const ext = filename.slice(pointIndex + 1).toLowerCase();
        return this.exts.indexOf(ext) >= 0;
    }

    /**
     * 
     * @param file
     * @param qualityPercent 手动指定品质压缩比例 , 如：0.5 为50%
     * @param resolutionPercent 手动指定分辨率压缩比例
     */
    compressImgFromFile(file: File,qualityPercent?:number,resolutionPercent?:number): Promise<[string, string]> {
        let filename = file.name;
        if (!this.checkFileFormat(file.name)) return Promise.reject([filename, "image format error"]);
        filename = getUniqueId() +"."+ getExtension(filename);
        return new Promise((resolve, reject) => {
            const fr: FileReader = new FileReader();
            fr.onload = () => {
                const resultB64 = fr.result;
                if (resultB64 && typeof (resultB64) === "string") {
                    compressDataUrl(resultB64,file.type,qualityPercent,resolutionPercent)
                        .then((b64compressed: string) => resolve([filename, b64compressed]))
                        .catch((e: any) => reject([filename, e]))
                } else {
                    reject([filename, "image read error"])
                }
            };
            fr.readAsDataURL(file);
        })
    }
}

export const fileCompress = new FileCompress();