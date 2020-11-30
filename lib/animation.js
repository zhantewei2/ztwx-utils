(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NzxAnimation = void 0;
    var NzxAnimation = /** @class */ (function () {
        function NzxAnimation(element, transitionClass) {
            this.leaving = false;
            this.el = element;
            this.transitionClass = transitionClass;
        }
        NzxAnimation.prototype.leave = function (className, handleElement, cb) {
            var _this = this;
            if (handleElement === void 0) { handleElement = null; }
            if (cb === void 0) { cb = null; }
            if (this.leaving)
                return;
            this.leaving = true;
            var transitionEvent = function (e) {
                if (e.target !== _this.el)
                    return;
                _this.leaving = false;
                _this.el.removeEventListener("transitionend", transitionEvent);
                _this.el.removeEventListener("transitioncancel", transitionEvent);
                var currentElement = handleElement || _this.el;
                _this.el.classList.remove(className);
                currentElement && currentElement.parentElement && currentElement.parentElement.removeChild(currentElement);
                cb && cb();
            };
            this.el.addEventListener("transitioncancel", transitionEvent);
            this.el.addEventListener("transitionend", transitionEvent);
            this.el.classList.add(this.transitionClass, className);
        };
        return NzxAnimation;
    }());
    exports.NzxAnimation = NzxAnimation;
});
