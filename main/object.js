"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNullObj = exports.getObjectFromList = exports.isObject = void 0;
exports.isObject = function (obj) {
    return Object.prototype.toString.call(obj).toLowerCase() === "[object object]";
};
exports.getObjectFromList = function (obj, list) {
    var endObj = {};
    list.forEach(function (key) {
        endObj[key] = obj[key];
    });
    return endObj;
};
exports.filterNullObj = function (obj, exclude) {
    var newObj = {};
    var value;
    for (var i in obj) {
        if (exclude && exclude.indexOf(i) >= 0)
            continue;
        value = obj[i];
        if (value !== null && value !== undefined) {
            newObj[i] = value;
        }
    }
    return newObj;
};
