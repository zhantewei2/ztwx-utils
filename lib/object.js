export var isObject = function (obj) {
    return Object.prototype.toString.call(obj).toLowerCase() === "[object object]";
};
export var getObjectFromList = function (obj, list) {
    var endObj = {};
    list.forEach(function (key) {
        endObj[key] = obj[key];
    });
    return endObj;
};
export var filterNullObj = function (obj, exclude) {
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
