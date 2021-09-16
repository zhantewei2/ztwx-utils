import {defineVNodeHook,defineVNodeTransition,Hooks} from "./utils";
import {CreateElement,RenderContext} from "vue";
export const VNodeHook = {
  functional: true,
  render(
    h: CreateElement,
    params: RenderContext<{
      hook?: Hooks;
      transition?: Record<string, any>;
    }>,
  ) {
    const children = params.slots().default;

    const vNode = children && children[0];
    if (!vNode) return null;
    const props = params.props;
    props.hook && defineVNodeHook(vNode, props.hook);
    props.transition && defineVNodeTransition(vNode, props.transition);
    return vNode;
  },
};