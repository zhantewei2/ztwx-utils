import { defineVNodeHook, defineVNodeTransition } from "./utils";
export var VNodeHook = {
    functional: true,
    render: function (h, params) {
        var children = params.slots().default;
        var vNode = children && children[0];
        if (!vNode)
            return null;
        var props = params.props;
        props.hook && defineVNodeHook(vNode, props.hook);
        props.transition && defineVNodeTransition(vNode, props.transition);
        return vNode;
    },
};
