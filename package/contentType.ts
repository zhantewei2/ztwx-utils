export const httpHeaders: Record<string, string> = {
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
    'ppt':'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'xlm': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed'
};

export const getContentType = (extension: string) => httpHeaders[extension] || "application/octet-stream";
export const getFileExtension=(contentType:string)=>Object.keys(httpHeaders)[Object.values(httpHeaders).indexOf(contentType)||0];
export const getExtension=(filename:string)=>{
    const pointLast=filename.lastIndexOf(".");
    if(pointLast&&pointLast<filename.length-1)return filename.slice(pointLast+1);
    return "";
}
export const getFileName=(filename:string)=>{
    const pointLast=filename.lastIndexOf(".");
    if(pointLast&&pointLast>0)return filename.slice(0,pointLast);
    return "";
}