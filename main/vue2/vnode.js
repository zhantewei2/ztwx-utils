"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNodeHook = void 0;
var utils_1 = require("./utils");
exports.VNodeHook = {
    functional: true,
    render: function (h, params) {
        var children = params.slots().default;
        var vNode = children && children[0];
        if (!vNode)
            return null;
        var props = params.props;
        props.hook && utils_1.defineVNodeHook(vNode, props.hook);
        props.transition && utils_1.defineVNodeTransition(vNode, props.transition);
        return vNode;
    },
};
