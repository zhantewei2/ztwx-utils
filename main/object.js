"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floatSimplify = exports.filterEmptyObj = exports.filterNullObj = exports.filterIncludeObj = exports.getObjectFromList = exports.isObject = void 0;
exports.isObject = function (obj) {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
};
exports.getObjectFromList = function (obj, list) {
    var endObj = {};
    list.forEach(function (key) {
        endObj[key] = obj[key];
    });
    return endObj;
};
exports.filterIncludeObj = function (obj, exclude, filterValue) {
    var newObj = {};
    var value;
    for (var i in obj) {
        if (exclude && exclude.indexOf(i) >= 0)
            continue;
        value = obj[i];
        if (!filterValue || !filterValue.includes(value)) {
            newObj[i] = value;
        }
    }
    return newObj;
};
exports.filterNullObj = function (obj, exclude) {
    return exports.filterIncludeObj(obj, exclude, [undefined, null]);
};
exports.filterEmptyObj = function (obj, exclude) {
    return exports.filterIncludeObj(obj, exclude, [undefined, null, ""]);
};
exports.floatSimplify = function (float, decimalCount) {
    return Math.round(float * Math.pow(10, decimalCount)) / Math.pow(10, decimalCount);
};
