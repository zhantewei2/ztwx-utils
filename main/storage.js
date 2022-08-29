"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.prototype.saveVal = function (key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    };
    Storage.prototype.getVal = function (key) {
        try {
            var val = localStorage.getItem(key);
            return val ? JSON.parse(val) : null;
        }
        catch (e) {
            return null;
        }
    };
    return Storage;
}());
exports.Storage = Storage;
