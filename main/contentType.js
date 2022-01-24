"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.getFileExtension = exports.getContentType = exports.httpHeaders = void 0;
exports.httpHeaders = {
    'html': 'text/html;charset=utf8',
    'txt': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
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
    'ogg': 'application/ogg',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'xlm': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed'
};
exports.getContentType = function (extension) { return exports.httpHeaders[extension] || "application/octet-stream"; };
exports.getFileExtension = function (contentType) { return Object.keys(exports.httpHeaders)[Object.values(exports.httpHeaders).indexOf(contentType) || 0]; };
exports.getExtension = function (filename) {
    var pointLast = filename.lastIndexOf(".");
    if (pointLast && pointLast < filename.length - 1)
        return filename.slice(pointLast + 1);
    return "";
};
