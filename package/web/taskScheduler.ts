import {StorageInterface} from "./storage.interface";
import {getObjectFromList} from "../object";

export type TaskRunParams={
  executeCount:number;
  lastExecuteTime?:number;
}

export interface TaskRule{
  id:string;
  local?:boolean; //store in disk.
  localExpires?: number; // store (seconds)
  index:number; //优先级序列
}
export interface TaskItemLocal extends TaskRule{
  executeCount:number;
  completed:boolean; //已成功完成
  lastExecuteTime:number; //上次执行时间 (seconds)
}

export interface TaskItem extends TaskItemLocal{
  finished:boolean;  //当前执行结束，包括为错误执行结束
  run?:(params:TaskRunParams)=>Promise<void>;
}

export interface RegistryTaskRun{
  id:string;
  run:(params:TaskRunParams)=>Promise<void>;
}




export class TaskScheduler{
  private storageKey:string;
  private storageManager:StorageInterface;
  taskList:TaskItem[]=[];
  taskStorageList: TaskItemLocal[]=[];
  taskState: "run"|"ready";
  constructor(storageKey:string,storageManager:StorageInterface) {
    this.storageManager=storageManager;
    this.storageKey=storageKey;
    this.restoreTaskStorageList();  
  }
  
  getCurrentTime(){
    return Math.round(new Date().getTime()/1000);
  }
  
  // restore task list from storage
  restoreTaskStorageList(){
    this.taskStorageList=this.storageManager.getVal(this.storageKey) as TaskItemLocal[] || [];
  }
  saveTaskStorageListFromItem(task:TaskItem){
    
    let localTaskIndex=this.taskStorageList.findIndex(local=>task.id===local.id);
    if(!task.local){
      if(localTaskIndex>=0){
        this.taskStorageList.splice(localTaskIndex,1);
        this.storageManager.saveVal(this.storageKey,this.taskStorageList);
      }
      return;
    }
    
    let localTask:TaskItemLocal|undefined=localTaskIndex>=0? this.taskStorageList[localTaskIndex]: undefined;
    if(localTask){
      localTask.executeCount=task.executeCount;
      localTask.lastExecuteTime=task.lastExecuteTime;
      localTask.completed = task.completed;
    }else{
      this.taskStorageList.push({
        id: task.id,
        index: task.index,
        executeCount: task.executeCount,
        completed: task.completed,
        lastExecuteTime: task.lastExecuteTime
      })
    }
    // this.taskStorageList=this.taskList.filter(i=>i.local).map(i=>getObjectFromList(i,["id","local","localExpires","index","executeCount","completed","lastExecuteTime"])) as TaskItemLocal[];
    this.storageManager.saveVal(this.storageKey,this.taskStorageList);
  }
  
  initTasksRule(taskRules:TaskRule[]){
    taskRules.forEach(taskRule=>this.registryTaskRule(taskRule));
  }
  // 先注册规则
  registryTaskRule(taskRule:TaskRule){
    this.taskList.push({
      ...taskRule,
      ...{
        executeCount:  0,
        finished: false,
        completed: false,
        lastExecuteTime: 0
      }
    });
    this.taskList.sort((pre,next)=>pre.index-next.index);
    
  }
  //实际运行时注册run
  registryTaskRun({id,run}:RegistryTaskRun,check?:boolean){
    const existsTaskItem=this.taskList.find(i=>i.id===id);
    if(!existsTaskItem)return console.error("task not exists:",id);
    existsTaskItem.run=run;
    check&&this.check();
  }
  
  // @ts-ignore
  async check(){
    if(this.taskState==="run")return;
    const task=this.taskList.find(i=>!i.finished);
    if(!task)return;
    if(task.local) {
      const localTask = this.taskStorageList.find(i => task.id === i.id);
      const currentTime = this.getCurrentTime();
      if (localTask) {
        task.executeCount = localTask.executeCount || 0;
        task.completed = task.finished = !localTask.completed ? false : !task.localExpires ? true : !localTask.lastExecuteTime ? false : task.localExpires + localTask.lastExecuteTime > currentTime;
        task.lastExecuteTime = localTask.lastExecuteTime;
      }
      if(task.finished)return this.check()
    }
    
    this.taskState="run";
    try {
      if (task.run) await task.run({
        executeCount: task.executeCount+1,
        lastExecuteTime: task.lastExecuteTime
      });
      
      if(task.local)task.completed=true; // save completed when its local.
      
    }catch (e){
      
    }
    task.executeCount++;
    task.finished=true;
    task.lastExecuteTime= this.getCurrentTime();
    this.saveTaskStorageListFromItem(task);
    this.taskState="ready";
    this.check();
  }
  
}