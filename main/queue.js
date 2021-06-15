"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueRun = exports.OneRun = void 0;
var rxjs_1 = require("rxjs");
var OneRun = /** @class */ (function () {
    function OneRun() {
    }
    OneRun.prototype.run = function (runFn) {
        var _this = this;
        if (!this.subject) {
            this.subject = new rxjs_1.Subject();
            runFn()
                .then(function (result) { return _this.subject.next(result); })
                .catch(function (e) { return _this.subject.error(e); })
                .finally(function () {
                _this.subject.complete();
                _this.subject = null;
            });
        }
        return this.subject.toPromise();
    };
    return OneRun;
}());
exports.OneRun = OneRun;
var QueueRun = /** @class */ (function () {
    function QueueRun() {
        this.queueList = [];
    }
    QueueRun.prototype.end = function (p) {
        this.result = p;
        this.resultComplete = true;
        this.queueList.forEach(function (_a) {
            var success = _a.success;
            return success(p);
        });
        this.clear();
    };
    QueueRun.prototype.err = function (p) {
        this.errMsg = p;
        this.errComplete = true;
        this.queueList.forEach(function (_a) {
            var error = _a.error;
            return error && error(p);
        });
        this.clear();
    };
    QueueRun.prototype.awaitRun = function (run, err) {
        if (this.resultComplete)
            return run(this.result);
        if (this.errComplete)
            return err && err(this.errMsg);
        this.queueList.push({
            success: run,
            error: err
        });
    };
    QueueRun.prototype.clear = function () {
        this.queueList = [];
        this.result = this.errMsg = undefined;
    };
    QueueRun.prototype.awaitPromise = function () {
        var _this = this;
        if (this.resultComplete)
            return Promise.resolve(this.result);
        if (this.errComplete)
            return Promise.reject(this.errMsg);
        return new Promise(function (resolve, reject) {
            _this.queueList.push({
                success: function (p) { return resolve(p); },
                error: function (p) { return reject(p); }
            });
        });
    };
    return QueueRun;
}());
exports.QueueRun = QueueRun;
