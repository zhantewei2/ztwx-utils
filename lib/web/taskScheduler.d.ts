import { StorageInterface } from "./storage.interface";
export declare type TaskRunParams = {
    executeCount: number;
    lastExecuteTime?: number;
};
export interface TaskRule {
    id: string;
    local?: boolean;
    localExpires?: number;
    index: number;
}
export interface TaskItemLocal extends TaskRule {
    executeCount: number;
    completed: boolean;
    lastExecuteTime: number;
}
export interface TaskItem extends TaskItemLocal {
    finished: boolean;
    run?: (params: TaskRunParams) => Promise<void>;
}
export interface RegistryTaskRun {
    id: string;
    run: (params: TaskRunParams) => Promise<void>;
}
export declare class TaskScheduler {
    private storageKey;
    private storageManager;
    taskList: TaskItem[];
    taskStorageList: TaskItemLocal[];
    taskState: "run" | "ready";
    constructor(storageKey: string, storageManager: StorageInterface);
    getCurrentTime(): number;
    restoreTaskStorageList(): void;
    saveTaskStorageListFromItem(task: TaskItem): void;
    initTasksRule(taskRules: TaskRule[]): void;
    registryTaskRule(taskRule: TaskRule): void;
    registryTaskRun({ id, run }: RegistryTaskRun, check?: boolean): void;
    check(): any;
}
