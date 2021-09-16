"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.additionUrl = exports.queryparams = exports.QueryParams = exports.parseUrl = exports.decodeQuery = exports.encodeQuery = exports.getQueryStr = exports.getUrlTag = exports.getPureUrl = void 0;
exports.getPureUrl = function (url) { return url ? (url.match(/^[^?#]*/) || "").toString() : url; };
exports.getUrlTag = function (url) { return url && (url.match(/#[^?#]*/) || "").toString().slice(1); };
exports.getQueryStr = function (url) { return url && (url.match(/\?[^#?]*/) || "").toString().slice(1); };
exports.encodeQuery = function (obj, URIComponent) {
    if (URIComponent === void 0) { URIComponent = true; }
    var str = '';
    if (!obj)
        return str;
    var value;
    for (var i in obj) {
        value = URIComponent ? encodeURIComponent(obj[i]) : obj[i];
        if (value || value === 0)
            str += i + '=' + value + '&';
    }
    return str.slice(0, -1);
};
exports.decodeQuery = function (url) {
    if (!url)
        return {};
    try {
        var str = exports.getQueryStr(url);
        if (!str)
            return {};
        var result_1 = {};
        var arr = str.split('&');
        arr.forEach(function (i) {
            var _a = i.split('='), key = _a[0], value = _a[1];
            result_1[key] = decodeURIComponent(value || "");
        });
        return result_1;
    }
    catch (e) {
        return {};
    }
};
exports.parseUrl = function (url) {
    return {
        pureUrl: exports.getPureUrl(url),
        tag: exports.getUrlTag(url),
        query: exports.decodeQuery(url)
    };
};
var QueryParams = /** @class */ (function () {
    function QueryParams() {
        /**
         * encode queryparams
         */
        this.encode = function (obj, URIComponent) {
            if (URIComponent === void 0) { URIComponent = true; }
            return exports.encodeQuery(obj, URIComponent);
        };
        /**
         * decode queryparams
         */
        this.dencode = function (url) {
            if (url === void 0) { url = ""; }
            return exports.decodeQuery(url);
        };
    }
    return QueryParams;
}());
exports.QueryParams = QueryParams;
exports.queryparams = new QueryParams();
exports.additionUrl = function (url, params, URIComponent) {
    if (URIComponent === void 0) { URIComponent = true; }
    var _a = exports.parseUrl(url), tag = _a.tag, query = _a.query, pureUrl = _a.pureUrl;
    var endParams = !params ? query : Object.assign(query, params);
    return "" + pureUrl + (tag ? '#' + tag : '') + (Object.keys(endParams).length ? '?' + exports.encodeQuery(endParams, URIComponent) : '');
};
