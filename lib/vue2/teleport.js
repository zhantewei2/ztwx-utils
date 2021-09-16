import { defineVNodeHook } from "./utils";
export var Teleport = {
    props: {
        to: {
            type: String,
        },
    },
    render: function () {
        var _this = this;
        var child = this.$slots.default && this.$slots.default[0];
        if (child) {
            defineVNodeHook(child, {
                insert: function () {
                    if (_this.to || _this.toEl) {
                        _this.outsideWrapper = _this.toEl || document.querySelector(_this.to);
                        _this.outsideWrapper && _this.outsideWrapper.appendChild(_this.outsideEl = child.elm);
                    }
                }
            });
            return child;
        }
        else {
            this.outsideEl = null;
            return null;
        }
    },
    methods: {
        removeOutside: function () {
            this.outsideEl && this.outsideEl.parentElement && this.outsideEl.parentElement.removeChild(this.outsideEl);
            this.mutationUnsubscribe && this.mutationUnsubscribe();
        }
    },
    activated: function () {
        if (this.outsideEl && this.outsideWrapper)
            this.outsideWrapper.appendChild(this.outsideEl);
    },
    deactivated: function () {
        this.removeOutside();
    },
    beforeDestroy: function () {
        this.removeOutside();
    }
};
