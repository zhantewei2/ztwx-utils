export var getScrollParent = function (el) {
    var parent = el.parentNode;
    if (el === window || parent === window)
        return window;
    //IS Shadow Root
    if (parent.host && parent.host instanceof HTMLElement) {
        parent = parent.host;
    }
    var style = window.getComputedStyle(parent);
    return /auto|scroll/.test(style.getPropertyValue("overflow") +
        style.getPropertyValue("overflow-y")) ? parent : getScrollParent(parent);
};
