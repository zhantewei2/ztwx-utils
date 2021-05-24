import {Subject} from "rxjs";

export class OneRun<T>{
  subject:Subject<T>;
  run(runFn:()=>Promise<T>):Promise<T>{
    if(!this.subject){
      this.subject=new Subject();
      runFn()
        .then(result=>this.subject.next(result))
        .catch((e)=>this.subject.error(e))
        .finally(()=>{
          this.subject.complete();
          this.subject=null as any;
        });
    }
    return this.subject.toPromise();
  }
}

export class QueueRun<T,S>{
  result:T;
  errMsg:S;
  resultComplete:boolean;
  errComplete:boolean;
  queueList:Array<{
    success:(p:T)=>void,
    error?:(p:S)=>void
  }>=[];
  end(p:T){
    this.result=p;
    this.resultComplete=true;
    this.queueList.forEach(({success})=>success(p));
    this.clear();
  }
  err(p:S){
    this.errMsg=p;
    this.errComplete=true;
    this.queueList.forEach(({error})=>error&&error(p));
    this.clear();
  }
  awaitRun(run:(p:T)=>void,err?:(p:S)=>void){
    if(this.resultComplete)return run(this.result);
    if(this.errComplete)return err&&err(this.errMsg);
    this.queueList.push({
      success:run,
      error:err
    });
  }
  clear(){
    this.queueList=[];
    this.result=this.errMsg=undefined as any;
  }
  awaitPromise():Promise<T>{
    if(this.resultComplete)return Promise.resolve(this.result);
    if(this.errComplete)return Promise.reject(this.errMsg);
    return new Promise((resolve,reject)=>{
      this.queueList.push({
        success:(p)=>resolve(p),
        error:(p)=>reject(p)
      })
    })
  }
}