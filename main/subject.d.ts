export interface SubjectOrder<T> {
    id: number;
    cb: (value: T) => void;
    unsubscribe: () => void;
}
export declare class Subject<T> {
    id: number;
    orderList: SubjectOrder<T>[];
    next(v: T): void;
    subscribe(cb: (value: T) => void): SubjectOrder<T>;
    unsubscribe(itemId: number): void;
}
