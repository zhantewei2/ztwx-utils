var QueryParams = /** @class */ (function () {
    function QueryParams() {
        /**
         * encode queryparams
         */
        this.encode = function (obj, URIComponent) {
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
        /**
         * decode queryparams
         */
        this.dencode = function (url) {
            if (url === void 0) { url = ""; }
            if (!url)
                return {};
            try {
                var str = (url.match(/\?[^#?]*/) || "").toString();
                str = str.slice(1);
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
    }
    return QueryParams;
}());
export { QueryParams };
export var queryparams = new QueryParams();
export var getPureUrl = function (url) { return url ? (url.match(/^[^\?#]*/) || "").toString() : url; };
export var additionUrl = function (url, params, URIComponent) {
    if (URIComponent === void 0) { URIComponent = true; }
    return url + (params && Object.keys(params).length ? '?' + queryparams.encode(params, URIComponent) : '');
};
