"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCompress = exports.FileCompress = exports.imageMimeIgnores = exports.imageMimes = exports.dataURLtoArrayBuffer = exports.dataURLtoBlob = exports.compressDataUrl = exports.shouldQuality = void 0;
var uniqueId_1 = require("./uniqueId");
var contentType_1 = require("./contentType");
var md5_1 = require("./data/md5");
var switchQuality = function (size) {
    size = size / 1024;
    if (size < 300)
        return 0.92;
    if (size < 500)
        return 0.7;
    if (500 <= size && size <= 1000)
        return 0.4;
    if (1000 < size && size <= 2000)
        return 0.35;
    if (2000 < size && size <= 4000)
        return 0.3;
    if (4000 < size && size <= 6000)
        return 0.2;
    if (6000 < size && size <= 7000)
        return 0.15;
    if (size > 7000)
        return 0.1;
    return 0.92;
};
exports.shouldQuality = function (fileType) { return ["image/jpeg", "image/webp"].includes(fileType); };
exports.compressDataUrl = function (b64, fileType, qualityPercent, resolutionPercent) {
    if (fileType === void 0) { fileType = "image/jpeg"; }
    return new Promise(function (resolve, reject) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
            var h = img.height, w = img.width, l = Math.max(w, h) / (w / h), percent = 1;
            if (resolutionPercent) {
                percent = resolutionPercent;
            }
            else {
                if (l <= 1200 && l > 1000) {
                    percent = 0.9;
                }
                else if (l > 1200 && l <= 1400) {
                    percent = 0.85;
                }
                else if (l > 1400 && l <= 1500) {
                    percent = 0.75;
                }
                else if (l > 1500 && l <= 1600) {
                    percent = 0.7;
                }
                else if (l > 1600 && l <= 1700) {
                    percent = 0.65;
                }
                else if (l > 1700 && l <= 2000) {
                    percent = 0.6;
                }
                else if (l > 2000 && l <= 3000) {
                    percent = 0.55;
                }
                else if (l > 3000) {
                    percent = 0.5;
                }
            }
            h = canvas.height = Math.ceil(h * percent);
            w = canvas.width = Math.ceil(w * percent);
            ctx.drawImage(img, 0, 0, w, h);
            var dataUrl = canvas.toDataURL(fileType, exports.shouldQuality(fileType) ? qualityPercent !== null && qualityPercent !== void 0 ? qualityPercent : switchQuality(b64.length) : undefined);
            resolve(dataUrl.length < b64.length ? dataUrl : b64);
        };
        img.onerror = function (e) { return reject(e); };
        img.src = b64;
    });
};
exports.dataURLtoBlob = function (dataurl) {
    return new Promise(function (resolve, reject) {
        var err = false;
        var data;
        try {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
            var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            data = new Blob([u8arr], { type: mime });
        }
        catch (e) {
            err = true;
        }
        err ? reject() : resolve(data);
    });
};
exports.dataURLtoArrayBuffer = function (base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
exports.imageMimes = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/svg": "svg",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/vnd.microsoft.icon": "ico"
};
exports.imageMimeIgnores = [
    "image/svg+xml", "image/gif"
];
var FileCompress = /** @class */ (function () {
    function FileCompress() {
        this.imageMimeList = Reflect.ownKeys(exports.imageMimes);
        this.imageMimeIgnores = exports.imageMimeIgnores;
    }
    FileCompress.prototype.checkFileFormat = function (file) {
        return this.imageMimeList.includes(file.type);
    };
    FileCompress.prototype.readAsDataUrl = function (file) {
        var fr = new FileReader();
        return new Promise(function (resolve, reject) {
            fr.onload = function () { return fr.result && typeof fr.result == "string" ? resolve(fr.result) : reject("image read error"); };
            fr.onerror = function (e) { return reject(e); };
            fr.readAsDataURL(file);
        });
    };
    FileCompress.prototype.combineIgnoreMimeType = function (mimes) {
        return new Set((this.imageMimeIgnores || []).concat(mimes || []));
    };
    FileCompress.prototype.turnPng = function (file, turnLargePngKB) {
        if (turnLargePngKB && file.type === "image/png" && file.size > turnLargePngKB * 1024)
            return "image/jpeg";
        return file.type;
    };
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
    FileCompress.prototype.compress = function (_a) {
        var md5 = _a.md5, ignoreMimeType = _a.ignoreMimeType, _b = _a.resultType, resultType = _b === void 0 ? "blob" : _b, file = _a.file, qualityPercent = _a.qualityPercent, resolutionPercent = _a.resolutionPercent, turnLargePngKB = _a.turnLargePngKB;
        if (!this.checkFileFormat(file))
            return Promise.reject([file.name, "image format error"]);
        var ignoreMimes = this.combineIgnoreMimeType(ignoreMimeType || []);
        var mimeType = this.turnPng(file, turnLargePngKB);
        var fileMd5, result;
        return this.readAsDataUrl(file)
            .then(function (dataUrl) {
            if (ignoreMimes.has(file.type))
                return dataUrl;
            return exports.compressDataUrl(dataUrl, mimeType, qualityPercent, resolutionPercent);
        })
            .then(function (dataUrl) {
            fileMd5 = md5 ? md5_1.strToMd5(dataUrl) : undefined;
            return resultType == "blob" ? exports.dataURLtoBlob(dataUrl) : dataUrl;
        })
            .then(function (result) {
            return {
                fileMd5: fileMd5,
                result: result,
                mimeType: mimeType,
                postfix: exports.imageMimes[mimeType]
            };
        });
    };
    /**
     * @deprecated
     *
     * @param file
     * @param qualityPercent 手动指定品质压缩比例 , 如：0.5 为50%
     * @param resolutionPercent 手动指定分辨率压缩比例
     */
    FileCompress.prototype.compressImgFromFile = function (file, qualityPercent, resolutionPercent) {
        var filename = file.name;
        if (!this.checkFileFormat(file))
            return Promise.reject([filename, "image format error"]);
        filename = uniqueId_1.getUniqueId() + "." + contentType_1.getExtension(filename);
        return new Promise(function (resolve, reject) {
            var fr = new FileReader();
            fr.onload = function () {
                var resultB64 = fr.result;
                if (resultB64 && typeof (resultB64) === "string") {
                    exports.compressDataUrl(resultB64, file.type, qualityPercent, resolutionPercent)
                        .then(function (b64compressed) { return resolve([filename, b64compressed]); })
                        .catch(function (e) { return reject([filename, e]); });
                }
                else {
                    reject([filename, "image read error"]);
                }
            };
            fr.readAsDataURL(file);
        });
    };
    return FileCompress;
}());
exports.FileCompress = FileCompress;
exports.fileCompress = new FileCompress();
