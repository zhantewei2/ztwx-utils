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
    exports.ExcuteAfterConnected = void 0;
    var ExcuteAfterConnected = /** @class */ (function () {
        function ExcuteAfterConnected() {
            var _this = this;
            this.isConnected = false;
            this.waitQueue = [];
            this.connect = function () {
                if (_this.isConnected)
                    return;
                _this.waitQueue.forEach(function (i) {
                    if (typeof i === "function") {
                        i();
                    }
                    else {
                        i.run();
                    }
                });
                _this.isConnected = true;
            };
            this.execute = function (cb, uniqueKey) {
                if (_this.isConnected) {
                    cb();
                }
                else {
                    if (uniqueKey) {
                        var index = 0;
                        for (var _i = 0, _a = _this.waitQueue; _i < _a.length; _i++) {
                            var i = _a[_i];
                            if (typeof i !== "function" && i.uniqueKey === uniqueKey) {
                                _this.waitQueue.splice(index, 1);
                                break;
                            }
                            index++;
                        }
                        _this.waitQueue.push({
                            uniqueKey: uniqueKey,
                            run: cb
                        });
                    }
                    else {
                        _this.waitQueue.push(cb);
                    }
                }
            };
        }
        return ExcuteAfterConnected;
    }());
    exports.ExcuteAfterConnected = ExcuteAfterConnected;
});
