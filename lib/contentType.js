export var httpHeaders = {
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
export var getContentType = function (extension) { return httpHeaders[extension] || "application/octet-stream"; };
export var getFileExtension = function (contentType) { return Object.keys(httpHeaders)[Object.values(httpHeaders).indexOf(contentType) || 0]; };
export var getExtension = function (filename) {
    var pointLast = filename.lastIndexOf(".");
    if (pointLast && pointLast < filename.length - 1)
        return filename.slice(pointLast + 1);
    return "";
};
