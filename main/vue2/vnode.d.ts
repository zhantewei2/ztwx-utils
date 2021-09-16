import { Hooks } from "./utils";
import { CreateElement, RenderContext } from "vue";
export declare const VNodeHook: {
    functional: boolean;
    render(h: CreateElement, params: RenderContext<{
        hook?: Hooks;
        transition?: Record<string, any>;
    }>): any;
};
