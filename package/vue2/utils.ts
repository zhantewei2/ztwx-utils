import {VNode} from "vue";

export interface Hooks {
  create?: (v: VNode) => void;
  insert?: (v: VNode) => void;
  init?: (v: VNode) => void;
  prePatch?: (oldV: VNode, nowV: VNode) => void;
  destroy?: (v: VNode) => void;
  update?: (v: VNode) => void;
}

export const defineVNodeHook = <T extends VNode>(vNode: T, hooks: Hooks): T => {
  vNode.data = vNode.data || {};
  Object.assign((vNode.data.hook = vNode.data.hook || {}), hooks);
  return vNode;
};

export const defineVNodeTransition = <T extends VNode>(
  vNode: T,
  transitionHook: Record<string, any>,
): T => {
  vNode.data = vNode.data || {};
  vNode.data.transition = transitionHook;
  return vNode;
};
