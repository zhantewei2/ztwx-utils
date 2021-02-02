export interface ObserveRunOpts {
    visible: boolean;
    unsubscribe: () => void;
}
export declare type ObserveRun = (opts: ObserveRunOpts) => void;
export interface BaseIntersection {
    observe(el: HTMLElement, run: ObserveRun): {
        unsubscribe: () => void;
    };
    mounted(mountedEl: HTMLElement): void;
    disconnect(): void;
}
export declare class VisibleScrollItem {
    el: HTMLElement;
    visible: boolean;
    distanceTop: number;
    distanceBottom: number;
    observerRun?: ObserveRun;
}
export declare const createScrollIntersection: () => BaseIntersection;
