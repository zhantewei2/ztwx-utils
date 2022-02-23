import { __assign, __awaiter, __generator } from "tslib";
var TaskScheduler = /** @class */ (function () {
    function TaskScheduler(storageKey, storageManager) {
        this.taskList = [];
        this.taskStorageList = [];
        this.storageManager = storageManager;
        this.storageKey = storageKey;
        this.restoreTaskStorageList();
    }
    TaskScheduler.prototype.getCurrentTime = function () {
        return Math.round(new Date().getTime() / 1000);
    };
    // restore task list from storage
    TaskScheduler.prototype.restoreTaskStorageList = function () {
        this.taskStorageList = this.storageManager.getVal(this.storageKey) || [];
    };
    TaskScheduler.prototype.saveTaskStorageListFromItem = function (task) {
        var localTaskIndex = this.taskStorageList.findIndex(function (local) { return task.id === local.id; });
        if (!task.local) {
            if (localTaskIndex >= 0) {
                this.taskStorageList.splice(localTaskIndex, 1);
                this.storageManager.saveVal(this.storageKey, this.taskStorageList);
            }
            return;
        }
        var localTask = localTaskIndex >= 0 ? this.taskStorageList[localTaskIndex] : undefined;
        if (localTask) {
            localTask.executeCount = task.executeCount;
            localTask.lastExecuteTime = task.lastExecuteTime;
            localTask.completed = task.completed;
        }
        else {
            this.taskStorageList.push({
                id: task.id,
                index: task.index,
                executeCount: task.executeCount,
                completed: task.completed,
                lastExecuteTime: task.lastExecuteTime
            });
        }
        // this.taskStorageList=this.taskList.filter(i=>i.local).map(i=>getObjectFromList(i,["id","local","localExpires","index","executeCount","completed","lastExecuteTime"])) as TaskItemLocal[];
        this.storageManager.saveVal(this.storageKey, this.taskStorageList);
    };
    TaskScheduler.prototype.initTasksRule = function (taskRules) {
        var _this = this;
        taskRules.forEach(function (taskRule) { return _this.registryTaskRule(taskRule); });
    };
    // 先注册规则
    TaskScheduler.prototype.registryTaskRule = function (taskRule) {
        this.taskList.push(__assign(__assign({}, taskRule), {
            executeCount: 0,
            finished: false,
            completed: false,
            lastExecuteTime: 0
        }));
        this.taskList.sort(function (pre, next) { return pre.index - next.index; });
    };
    //实际运行时注册run
    TaskScheduler.prototype.registryTaskRun = function (_a, check) {
        var id = _a.id, run = _a.run;
        var existsTaskItem = this.taskList.find(function (i) { return i.id === id; });
        if (!existsTaskItem)
            return console.error("task not exists:", id);
        existsTaskItem.run = run;
        check && this.check();
    };
    // @ts-ignore
    TaskScheduler.prototype.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            var task, localTask, currentTime, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.taskState === "run")
                            return [2 /*return*/];
                        task = this.taskList.find(function (i) { return !i.finished; });
                        if (!task)
                            return [2 /*return*/];
                        if (task.local) {
                            localTask = this.taskStorageList.find(function (i) { return task.id === i.id; });
                            currentTime = this.getCurrentTime();
                            if (localTask) {
                                task.executeCount = localTask.executeCount || 0;
                                task.completed = task.finished = !localTask.completed ? false : !task.localExpires ? true : !localTask.lastExecuteTime ? false : task.localExpires + localTask.lastExecuteTime > currentTime;
                                task.lastExecuteTime = localTask.lastExecuteTime;
                            }
                            if (task.finished)
                                return [2 /*return*/, this.check()];
                        }
                        this.taskState = "run";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!task.run) return [3 /*break*/, 3];
                        return [4 /*yield*/, task.run({
                                executeCount: task.executeCount + 1,
                                lastExecuteTime: task.lastExecuteTime
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (task.local)
                            task.completed = true; // save completed when its local.
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        task.executeCount++;
                        task.finished = true;
                        task.lastExecuteTime = this.getCurrentTime();
                        this.saveTaskStorageListFromItem(task);
                        this.taskState = "ready";
                        this.check();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskScheduler;
}());
export { TaskScheduler };
