export var getPureUrl = function (url) { return url ? (url.match(/^[^?#]*/) || "").toString() : url; };
export var getUrlTag = function (url) { return url && (url.match(/#[^?#]*/) || "").toString().slice(1); };
export var getQueryStr = function (url) { return url && (url.match(/\?[^#?]*/) || "").toString().slice(1); };
export var encodeQuery = function (obj, URIComponent) {
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
export var decodeQuery = function (url) {
    if (!url)
        return {};
    try {
        var str = getQueryStr(url);
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
export var parseUrl = function (url) {
    return {
        pureUrl: getPureUrl(url),
        tag: getUrlTag(url),
        query: decodeQuery(url)
    };
};
var QueryParams = /** @class */ (function () {
    function QueryParams() {
        /**
         * encode queryparams
         */
        this.encode = function (obj, URIComponent) {
            if (URIComponent === void 0) { URIComponent = true; }
            return encodeQuery(obj, URIComponent);
        };
        /**
         * decode queryparams
         */
        this.dencode = function (url) {
            if (url === void 0) { url = ""; }
            return decodeQuery(url);
        };
    }
    return QueryParams;
}());
export { QueryParams };
export var queryparams = new QueryParams();
export var additionUrl = function (url, params, URIComponent) {
    if (URIComponent === void 0) { URIComponent = true; }
    var _a = parseUrl(url), tag = _a.tag, query = _a.query, pureUrl = _a.pureUrl;
    var endParams = !params ? query : Object.assign(query, params);
    return "" + pureUrl + (tag ? '#' + tag : '') + (Object.keys(endParams).length ? '?' + encodeQuery(endParams, URIComponent) : '');
};
