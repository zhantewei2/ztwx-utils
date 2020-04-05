export declare class NzxAnimation {
    el: HTMLElement;
    leaving: boolean;
    transitionClass: string;
    constructor(element: HTMLElement, transitionClass: string);
    leave(className: string, handleElement?: HTMLElement | null, cb?: any | null): void;
}
