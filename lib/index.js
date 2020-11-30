(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./uniqueId", "./compressImg", "./animation", "./load/Library", "./env"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    tslib_1.__exportStar(require("./uniqueId"), exports);
    tslib_1.__exportStar(require("./compressImg"), exports);
    tslib_1.__exportStar(require("./animation"), exports);
    tslib_1.__exportStar(require("./load/Library"), exports);
    tslib_1.__exportStar(require("./env"), exports);
});
