define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GetUniqueId = /** @class */ (function () {
        function GetUniqueId() {
            this.b52Table = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
            this.preTimestamp = null;
            this.preUniqueTag = 0;
        }
        GetUniqueId.prototype.to52 = function (num) {
            var str = "";
            var remainder;
            do {
                remainder = num % 52;
                num = Math.floor(num / 52);
                str += this.b52Table[remainder];
            } while (num > 1);
            return str;
        };
        /** not thread safe
         **/
        GetUniqueId.prototype.getUniqueId = function () {
            var nowTimestamp = new Date().getTime();
            var nowUniqueId;
            if (nowTimestamp === this.preTimestamp) {
                this.preUniqueTag += 1;
                nowUniqueId = this.to52(this.preTimestamp) + this.to52(this.preUniqueTag);
            }
            else {
                this.preTimestamp = nowTimestamp;
                nowUniqueId = this.to52(this.preTimestamp);
                this.preUniqueTag = 0;
            }
            return nowUniqueId;
        };
        return GetUniqueId;
    }());
    var _getUniqueId = new GetUniqueId();
    exports.getUniqueId = function () { return _getUniqueId.getUniqueId(); };
});
