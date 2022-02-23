"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScrollIntersection = exports.VisibleIntersection = exports.VisibleScroll = exports.VisibleScrollItem = void 0;
var scroll_1 = require("./scroll");
var VisibleScrollItem = /** @class */ (function () {
    function VisibleScrollItem() {
    }
    return VisibleScrollItem;
}());
exports.VisibleScrollItem = VisibleScrollItem;
var VisibleScroll = /** @class */ (function () {
    function VisibleScroll() {
        var _this = this;
        this.disconnect = function () {
            if (_this.scrollListenerEl) {
                _this.scrollListenerEl.removeEventListener("scroll", _this.scrollHandler);
                _this.observerList = [];
            }
        };
        this.observerList = [];
    }
    VisibleScroll.prototype.observe = function (el, observerRun) {
        var _this = this;
        var distanceTop = scroll_1.getScrollDistanceFromNode(el, this.scrollParent);
        var item = {
            el: el,
            distanceTop: distanceTop,
            distanceBottom: distanceTop + el.scrollHeight,
            observerRun: observerRun,
            visible: false
        };
        this.observerList.push(item);
        return {
            unsubscribe: function () { return _this.unsubscribe(item); }
        };
    };
    VisibleScroll.prototype.unsubscribe = function (item) {
        var itemIndex = this.observerList.findIndex(function (i) { return i.el === item.el; });
        if (itemIndex >= 0)
            this.observerList.splice(itemIndex, 1);
    };
    VisibleScroll.prototype.mounted = function (mountedEl) {
        var _this = this;
        this.scrollParent = scroll_1.getScrollParent(mountedEl);
        scroll_1.checkAndSetOffsetNode(this.scrollParent);
        var scrollTop;
        var scrollBottom;
        var scrollHeight = this.scrollParent.clientHeight;
        this.scrollListenerEl = this.scrollParent === document.documentElement ? window : this.scrollParent;
        this.scrollHandler = function (e) {
            scrollTop = _this.scrollParent.scrollTop;
            scrollBottom = scrollTop + scrollHeight;
            _this.observerList.forEach(function (i) {
                if ((scrollBottom >= i.distanceTop && scrollTop < i.distanceBottom && !i.visible)
                    || (scrollBottom < i.distanceTop && scrollTop >= i.distanceBottom && i.visible)) {
                    i.visible = !i.visible;
                    i.observerRun && i.observerRun({
                        visible: i.visible,
                        unsubscribe: function () { return _this.unsubscribe(i); }
                    });
                }
            });
        };
        this.scrollListenerEl.addEventListener("scroll", this.scrollHandler);
    };
    return VisibleScroll;
}());
exports.VisibleScroll = VisibleScroll;
var VisibleIntersection = /** @class */ (function () {
    function VisibleIntersection() {
        var _this = this;
        this.elKeyName = "voyo-scroll-intersection-order";
        this.mainObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var runFn = entry.target[_this.elKeyName];
                if (runFn)
                    runFn({
                        visible: entry.isIntersecting,
                        unsubscribe: function () { return _this.unsubscribe(entry.target); }
                    });
            });
        }, { root: null, threshold: 0 });
    }
    VisibleIntersection.prototype.mounted = function (mountedEl) {
    };
    VisibleIntersection.prototype.observe = function (el, run) {
        var _this = this;
        this.mainObserver.observe(el);
        el[this.elKeyName] = run;
        return {
            unsubscribe: function () { return _this.unsubscribe(el); }
        };
    };
    VisibleIntersection.prototype.unsubscribe = function (el) {
        try {
            this.mainObserver.unobserve(el);
        }
        catch (e) {
        }
    };
    VisibleIntersection.prototype.disconnect = function () {
        this.mainObserver && this.mainObserver.disconnect();
    };
    return VisibleIntersection;
}());
exports.VisibleIntersection = VisibleIntersection;
exports.createScrollIntersection = function () { return IntersectionObserver ? new VisibleIntersection() : new VisibleScroll(); };
