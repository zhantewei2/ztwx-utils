"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScrollDistanceFromNode = exports.checkAndSetOffsetNode = exports.getScrollParent = void 0;
var body = document && document.body;
exports.getScrollParent = function (el) {
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
        style.getPropertyValue("overflow-y")) ? parent : exports.getScrollParent(parent);
};
exports.checkAndSetOffsetNode = function (node) {
    if (/static|inherit/.test(window.getComputedStyle(node).getPropertyValue("position"))) {
        node.style.position = "relative";
    }
};
exports.getScrollDistanceFromNode = function (targetNode, scrollParent, distance) {
    if (scrollParent === void 0) { scrollParent = document.documentElement; }
    if (distance === void 0) { distance = 0; }
    distance += targetNode.offsetTop;
    return targetNode.offsetParent !== scrollParent ?
        (targetNode.offsetParent ? exports.getScrollDistanceFromNode(targetNode.offsetParent, scrollParent, distance) : distance)
        : distance;
};
