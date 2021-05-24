import { Subject } from "rxjs";
export declare class OneRun<T> {
    subject: Subject<T>;
    run(runFn: () => Promise<T>): Promise<T>;
}
export declare class QueueRun<T, S> {
    result: T;
    errMsg: S;
    resultComplete: boolean;
    errComplete: boolean;
    queueList: Array<{
        success: (p: T) => void;
        error?: (p: S) => void;
    }>;
    end(p: T): void;
    err(p: S): void;
    awaitRun(run: (p: T) => void, err?: (p: S) => void): void;
    clear(): void;
    awaitPromise(): Promise<T>;
}
