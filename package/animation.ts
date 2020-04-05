export class NzxAnimation {
    el: HTMLElement;
    leaving: boolean;
    transitionClass: string;

    constructor(element: HTMLElement, transitionClass: string) {
        this.leaving = false;
        this.el = element;
        this.transitionClass = transitionClass;
    }

    leave(className: string, handleElement: HTMLElement | null = null, cb: any | null = null) {
        if (this.leaving) return;
        this.leaving = true;
        const transitionEvent = (e: any) => {
            if (e.target !== this.el) return;
            this.leaving = false;
            this.el.removeEventListener("transitionend", transitionEvent);
            this.el.removeEventListener("transitioncancel", transitionEvent);
            const currentElement = handleElement || this.el;
            this.el.classList.remove(className);
            currentElement && currentElement.parentElement && currentElement.parentElement.removeChild(currentElement);
            cb && cb();
        };
        this.el.addEventListener("transitioncancel", transitionEvent);
        this.el.addEventListener("transitionend", transitionEvent);
        this.el.classList.add(this.transitionClass, className);
    }
}