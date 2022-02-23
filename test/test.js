const { TaskScheduler} =require("../main/web/taskScheduler")
const fs=require("fs");

const manager=new (class Manager{
  saveVal(key,val){
    fs.writeFileSync("./1.txt",JSON.stringify(val));
  }
  getVal(key){
    const result=fs.readFileSync("./1.txt","utf-8");
    return result ? JSON.parse(result) : "";
  }
})();

const taskScheduler=new TaskScheduler("yoyo-key",manager);

taskScheduler.initTasksRule([
  {
    id:"a",
    local: true,
    index:2,
    localExpires: 1
  },
  {
    id:"b",
    local: true,
    index:1,
    localExpires: 1
  }
]);

taskScheduler.registryTaskRun({
  id:"a",
  run: (params)=>{
    console.log("a",params);
    return new Promise((resolve)=>{
      setTimeout(resolve,1000);
    })
  }
});

taskScheduler.registryTaskRun({
  id:"b",
  run: (params)=>{
    console.log("b",params);
    return new Promise((resolve)=>{
      setTimeout(resolve,1000);
    })
  }
});


taskScheduler.check()

