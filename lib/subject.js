var Subject = /** @class */ (function () {
    function Subject() {
        this.id = 0;
        this.orderList = [];
    }
    Subject.prototype.next = function (v) {
        this.orderList.forEach(function (i) {
            i.cb(v);
        });
    };
    Subject.prototype.subscribe = function (cb) {
        var _this = this;
        var id = ++this.id;
        var order = {
            id: id,
            cb: cb,
            unsubscribe: function () { return _this.unsubscribe(id); }
        };
        this.orderList.push(order);
        return order;
    };
    Subject.prototype.unsubscribe = function (itemId) {
        var itemIndex = this.orderList.findIndex(function (i) { return i.id === itemId; });
        if (itemIndex >= 0)
            this.orderList.splice(itemIndex, 1);
    };
    return Subject;
}());
export { Subject };
