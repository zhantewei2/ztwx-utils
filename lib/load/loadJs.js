var load = function (_a) {
    var address = _a.address, tag = _a.tag, rel = _a.rel, remove = _a.remove, id = _a.id;
    return new Promise(function (resolve, reject) {
        var script = document.createElement(tag);
        var body = document.querySelector('body');
        id = id || (address.match(/[^\/]*$/) || address).toString();
        //filter if exists
        if (document.getElementById(id))
            return resolve();
        if (tag == 'link') {
            script.href = address;
        }
        else {
            script.src = address;
        }
        script.onload = function () {
            if (remove)
                body.removeChild(script);
            resolve();
        };
        script.onerror = function () {
            body.removeChild(script);
            reject();
        };
        script.id = id;
        if (rel)
            script.rel = rel;
        body.appendChild(script);
    });
};
export var loadJs = function (address, id, remove) {
    if (remove === void 0) { remove = true; }
    return load({
        address: address,
        tag: "script",
        id: id,
        remove: remove,
    });
};
export var loadCss = function (address, id, remove) {
    if (remove === void 0) { remove = false; }
    return load({
        address: address,
        rel: "stylesheet",
        tag: "link",
        id: id,
        remove: remove,
    });
};
