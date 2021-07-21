"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueId = exports.uniqueId = void 0;
var GetUniqueId = /** @class */ (function () {
    function GetUniqueId() {
        this.b64Table = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789*~";
        this.t = 64;
        this.preTimestamp = null;
        this.preUniqueTag = 0;
    }
    GetUniqueId.prototype.to64 = function (num) {
        var str = "";
        var remainder;
        do {
            remainder = num % this.t;
            num = Math.floor(num / this.t);
            str += this.b64Table[remainder];
        } while (num >= 1);
        return str;
    };
    GetUniqueId.prototype.de64 = function (str) {
        var total = 0;
        for (var i = 0, len = str.length; i < len; i++) {
            total += Math.pow(this.t, i) * this.b64Table.indexOf(str[i]);
        }
        return total;
    };
    /** not thread safe
     **/
    GetUniqueId.prototype.getUniqueId = function () {
        var nowTimestamp = new Date().getTime();
        var nowUniqueId;
        if (nowTimestamp === this.preTimestamp) {
            this.preUniqueTag += 1;
            nowUniqueId = this.to64(this.preTimestamp) + this.to64(this.preUniqueTag);
        }
        else {
            this.preTimestamp = nowTimestamp;
            nowUniqueId = this.to64(this.preTimestamp);
            this.preUniqueTag = 0;
        }
        return nowUniqueId;
    };
    return GetUniqueId;
}());
var _getUniqueId = new GetUniqueId();
exports.uniqueId = _getUniqueId;
exports.getUniqueId = function () { return _getUniqueId.getUniqueId(); };
