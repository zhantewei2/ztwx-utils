(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./scroll", "./scrollIntersection", "./excuteAfterConnected"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    tslib_1.__exportStar(require("./scroll"), exports);
    tslib_1.__exportStar(require("./scrollIntersection"), exports);
    tslib_1.__exportStar(require("./excuteAfterConnected"), exports);
});
