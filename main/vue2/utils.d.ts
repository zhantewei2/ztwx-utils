import { VNode } from "vue";
export interface Hooks {
    create?: (v: VNode) => void;
    insert?: (v: VNode) => void;
    init?: (v: VNode) => void;
    prePatch?: (oldV: VNode, nowV: VNode) => void;
    destroy?: (v: VNode) => void;
    update?: (v: VNode) => void;
}
export declare const defineVNodeHook: <T extends VNode>(vNode: T, hooks: Hooks) => T;
export declare const defineVNodeTransition: <T extends VNode>(vNode: T, transitionHook: Record<string, any>) => T;
