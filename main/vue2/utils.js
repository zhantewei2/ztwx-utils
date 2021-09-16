"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineVNodeTransition = exports.defineVNodeHook = void 0;
exports.defineVNodeHook = function (vNode, hooks) {
    vNode.data = vNode.data || {};
    Object.assign((vNode.data.hook = vNode.data.hook || {}), hooks);
    return vNode;
};
exports.defineVNodeTransition = function (vNode, transitionHook) {
    vNode.data = vNode.data || {};
    vNode.data.transition = transitionHook;
    return vNode;
};
