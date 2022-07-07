import {getUniqueId} from "./uniqueId";
import {getExtension} from "./contentType";
import {strToMd5} from "./data/md5";

const switchQuality = (size: any) => {
    size = size / 1024;
    if (size < 300) return 0.92;
    if (size < 500) return 0.7;
    if (500 <= size && size <= 1000) return 0.4;
    if (1000 < size && size <= 2000) return 0.35;
    if (2000 < size && size <= 4000) return 0.3;
    if (4000 < size && size <= 6000) return 0.2;
    if (6000 < size && size <= 7000) return 0.15;
    if (size > 7000) return 0.1;
    return 0.92;
};
export const shouldQuality=(fileType:string)=>["image/jpeg","image/webp"].includes(fileType);

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
                    percent = 0.9
                } else if (l > 1200 && l <= 1400) {
                    percent = 0.85
                } else if (l > 1400 && l <= 1500) {
                    percent = 0.75;
                } else if (l > 1500 && l <= 1600) {
                    percent = 0.7;
                } else if (l > 1600 && l <= 1700) {
                    percent = 0.65;
                } else if (l > 1700 && l <= 2000) {
                    percent = 0.6;
                } else if (l > 2000 && l <= 3000) {
                    percent = 0.55;
                } else if (l > 3000) {
                    percent = 0.5;
                }
            }
            h= canvas.height = Math.ceil(h * percent);
            w= canvas.width = Math.ceil(w * percent);
            ctx.drawImage(img, 0, 0, w, h);
            const dataUrl=canvas.toDataURL(fileType, shouldQuality(fileType)?
              qualityPercent??switchQuality(b64.length):undefined);
            resolve(dataUrl.length<b64.length?dataUrl:b64);
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
export const dataURLtoArrayBuffer = (base64String: string) => {
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
export type ImageMimeTypes=
  "image/png"|"image/jpg"|"image/jpeg"|"image/gif"|"image/bmp"|"image/svg"|"image/webp"|"image/svg+xml"|"image/vnd.microsoft.icon";

export const imageMimes= {
    "image/png":"png",
    "image/jpg":"jpg",
    "image/jpeg":"jpg",
    "image/gif":"gif",
    "image/bmp":"bmp",
    "image/svg":"svg",
    "image/webp":"webp",
    "image/svg+xml":"svg",
    "image/vnd.microsoft.icon":"ico"
}
export const imageMimeIgnores:ImageMimeTypes[]=[
  "image/svg+xml","image/gif"
];
export type CompressRes=string|Blob;

export interface CompressOpts{
    file: File;
    md5?:boolean; //return md5 of the image.
    turnLargePngKB?: number; // turn large png to jpeg when the image is large than x KB.
    ignoreMimeType?: ImageMimeTypes[];
    resultType?: "blob"|"dataUrl";
    qualityPercent?:number; //quality 0-1
    resolutionPercent?:number; // resolution 0-1
}

export interface CompressResult{
    fileMd5?:string;
    result:CompressRes;
    mimeType: ImageMimeTypes;
    postfix:string;
}

export class FileCompress {
    imageMimeList=Reflect.ownKeys(imageMimes);
    imageMimeIgnores=imageMimeIgnores;
    checkFileFormat(file: File): boolean {
        return this.imageMimeList.includes(file.type);
    }
    readAsDataUrl(file:File):Promise<string>{
        const fr=new FileReader();
        return new Promise((resolve,reject)=>{
            fr.onload=()=>fr.result&&typeof fr.result=="string"?resolve(fr.result):reject("image read error");
            fr.onerror=(e)=>reject(e);
            fr.readAsDataURL(file);
        });
    }
    combineIgnoreMimeType(mimes:ImageMimeTypes[]):Set<ImageMimeTypes>{
        return new Set((this.imageMimeIgnores||[]).concat(mimes||[]));
    }
    turnPng(file:File,turnLargePngKB?:number):ImageMimeTypes{
        if(turnLargePngKB && file.type==="image/png"&&file.size> turnLargePngKB*1024) return "image/jpeg";
        return file.type as ImageMimeTypes;
    }

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
    compress({
         md5,ignoreMimeType,resultType="blob",file,qualityPercent,resolutionPercent,turnLargePngKB
        }:CompressOpts
    ):Promise<CompressResult>{
        if(!this.checkFileFormat(file))return Promise.reject([file.name, "image format error"]);
        const ignoreMimes=this.combineIgnoreMimeType(ignoreMimeType||[]);
        const mimeType=this.turnPng(file,turnLargePngKB);

        let fileMd5:string|undefined,result:CompressRes;

        return this.readAsDataUrl(file)
          .then((dataUrl)=>{
              if(ignoreMimes.has(file.type as ImageMimeTypes))return dataUrl;
              return compressDataUrl(dataUrl,mimeType,qualityPercent,resolutionPercent)
          })
          .then(dataUrl=>{
              fileMd5=md5?strToMd5(dataUrl):undefined;
              return resultType=="blob"? dataURLtoBlob(dataUrl):dataUrl;
          })
          .then((result:any)=>{
              return{
                  fileMd5,
                  result,
                  mimeType,
                  postfix: imageMimes[mimeType]
              }
          });
    }

    /**
     * @deprecated
     *
     * @param file
     * @param qualityPercent 手动指定品质压缩比例 , 如：0.5 为50%
     * @param resolutionPercent 手动指定分辨率压缩比例
     */
    compressImgFromFile(file: File,qualityPercent?:number,resolutionPercent?:number): Promise<[string, string]> {
        let filename = file.name;
        if (!this.checkFileFormat(file)) return Promise.reject([filename, "image format error"]);
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
