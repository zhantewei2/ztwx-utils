export var defineVNodeHook = function (vNode, hooks) {
    vNode.data = vNode.data || {};
    Object.assign((vNode.data.hook = vNode.data.hook || {}), hooks);
    return vNode;
};
export var defineVNodeTransition = function (vNode, transitionHook) {
    vNode.data = vNode.data || {};
    vNode.data.transition = transitionHook;
    return vNode;
};
