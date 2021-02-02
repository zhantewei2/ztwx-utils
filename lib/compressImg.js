(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./uniqueId", "./contentType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fileCompress = exports.FileCompress = exports.dataURLtoArrayBuffer = exports.dataURLtoBlob = exports.compressDataUrl = void 0;
    var uniqueId_1 = require("./uniqueId");
    var contentType_1 = require("./contentType");
    var switchQuality = function (size) {
        size = size / 1024;
        if (size < 300)
            return undefined;
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
        return undefined;
    };
    exports.compressDataUrl = function (b64, fileType) {
        if (fileType === void 0) { fileType = "image/jpeg"; }
        return new Promise(function (resolve, reject) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.onload = function () {
                var h = img.height, w = img.width, l = Math.max(w, h) / (w / h), percent = 1;
                if (l <= 1200 && l > 1000) {
                    percent = 0.95;
                }
                else if (l > 1200 && l <= 1400) {
                    percent = 0.9;
                }
                else if (l > 1400 && l <= 1500) {
                    percent = 0.85;
                }
                else if (l > 1500 && l <= 1600) {
                    percent = 0.75;
                }
                else if (l > 1600 && l <= 1700) {
                    percent = 0.65;
                }
                else if (l > 1700 && l <= 2000) {
                    percent = 0.65;
                }
                else if (l > 2000 && l <= 3000) {
                    percent = 0.55;
                }
                else if (l > 3000) {
                    percent = 0.5;
                }
                var _h = canvas.height = h / percent;
                var _w = canvas.width = w / percent;
                ctx.drawImage(img, 0, 0, _w, _h);
                resolve(canvas.toDataURL(fileType, switchQuality(b64.length)));
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
    var FileCompress = /** @class */ (function () {
        function FileCompress() {
            this.exts = ["png", "jpg", "jpeg", "git", "bmp", "svg", "webp", "jp"];
        }
        FileCompress.prototype.checkFileFormat = function (filename) {
            var pointIndex = filename.lastIndexOf(".");
            if (!pointIndex)
                return false;
            var ext = filename.slice(pointIndex + 1).toLowerCase();
            return this.exts.indexOf(ext) >= 0;
        };
        FileCompress.prototype.compressImgFromFile = function (file) {
            var filename = file.name;
            if (!this.checkFileFormat(file.name))
                return Promise.reject([filename, "image format error"]);
            filename = uniqueId_1.getUniqueId() + "." + contentType_1.getExtension(filename);
            return new Promise(function (resolve, reject) {
                var fr = new FileReader();
                fr.onload = function () {
                    var resultB64 = fr.result;
                    if (resultB64 && typeof (resultB64) === "string") {
                        exports.compressDataUrl(resultB64, file.type)
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
});
