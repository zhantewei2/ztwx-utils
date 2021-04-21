"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.getContentType = exports.httpHeaders = void 0;
exports.httpHeaders = {
    'html': 'text/html;charset=utf8',
    'txt': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'git': 'image/gif',
    'jpeg': 'image/jpeg',
    'ico': 'image/x-icon',
    'js': 'application/x-javascript',
    'woff': 'application/x-font-woff',
    'woff2': 'application/x-font-woff',
    'svg': 'image/svg+xml',
    'oft': 'application/x-font-otf',
    'ttf': 'application/x-font-ttf',
    'eot': 'application/vnd.ms-fontobject',
    'mp4': 'video/mpeg4',
    'ogg': 'application/ogg'
};
exports.getContentType = function (extension) { return exports.httpHeaders[extension] || "application/octet-stream"; };
exports.getExtension = function (filename) {
    var pointLast = filename.lastIndexOf(".");
    if (pointLast && pointLast < filename.length - 1)
        return filename.slice(pointLast + 1);
    return "";
};
