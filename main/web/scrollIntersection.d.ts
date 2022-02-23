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
export declare class VisibleScroll implements BaseIntersection {
    scrollParent: HTMLElement;
    scrollHandler: any;
    scrollListenerEl: HTMLElement | Window;
    observe(el: HTMLElement, observerRun: ObserveRun): {
        unsubscribe: () => void;
    };
    unsubscribe(item: VisibleScrollItem): void;
    disconnect: () => void;
    observerList: Array<VisibleScrollItem>;
    mounted(mountedEl: HTMLElement): void;
}
export declare class VisibleIntersection implements BaseIntersection {
    mainObserver: IntersectionObserver;
    elKeyName: string;
    mounted(mountedEl: HTMLElement): void;
    observe(el: HTMLElement, run: ObserveRun): {
        unsubscribe: () => void;
    };
    unsubscribe(el: any): void;
    disconnect(): void;
    constructor();
}
export declare const createScrollIntersection: () => BaseIntersection;
