export var httpHeaders = {
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
export var getContentType = function (extension) { return httpHeaders[extension] || "application/octet-stream"; };
