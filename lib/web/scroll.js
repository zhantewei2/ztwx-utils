var body = document && document.body;
export var getScrollParent = function (el) {
    var parent = el.parentNode;
    if (el === body || parent === body) {
        var bodyPosition = window.getComputedStyle(body).getPropertyValue("position");
        return /static|relative/.test(bodyPosition) ? document.documentElement : body;
    }
    //IS Shadow Root
    if (parent.host && parent.host instanceof HTMLElement) {
        parent = parent.host;
    }
    var style = window.getComputedStyle(parent);
    return /auto|scroll/.test(style.getPropertyValue("overflow") +
        style.getPropertyValue("overflow-y")) ? parent : getScrollParent(parent);
};
export var checkAndSetOffsetNode = function (node) {
    if (/static|inherit/.test(window.getComputedStyle(node).getPropertyValue("position"))) {
        node.style.position = "relative";
    }
};
export var getScrollDistanceFromNode = function (targetNode, scrollParent, distance) {
    if (scrollParent === void 0) { scrollParent = document.documentElement; }
    if (distance === void 0) { distance = 0; }
    distance += targetNode.offsetTop;
    return targetNode.offsetParent !== scrollParent ?
        (targetNode.offsetParent ? getScrollDistanceFromNode(targetNode.offsetParent, scrollParent, distance) : distance)
        : distance;
};
