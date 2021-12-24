export var isObject = function (obj) {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
};
export var getObjectFromList = function (obj, list) {
    var endObj = {};
    list.forEach(function (key) {
        endObj[key] = obj[key];
    });
    return endObj;
};
export var filterIncludeObj = function (obj, exclude, filterValue) {
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
export var filterNullObj = function (obj, exclude) {
    return filterIncludeObj(obj, exclude, [undefined, null]);
};
export var filterEmptyObj = function (obj, exclude) {
    return filterIncludeObj(obj, exclude, [undefined, null, ""]);
};
export var floatSimplify = function (float, decimalCount) {
    return Math.round(float * Math.pow(10, decimalCount)) / Math.pow(10, decimalCount);
};
