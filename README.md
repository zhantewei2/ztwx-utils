URL
---

#### Usage

```js
import {
  encodeQuery,
  decodeQuery,
  parseUrl,
  additionurl
} from "@ztwx/utils";
```

- encodeQuery (obj:QueryType)
- decodeQuery (url:string)
- parseUrl

```typescript
parseUrl=(url:string)=>{
  pureUrl:string;
  tag: string;
  query:QueryType;
}
```

- additionUrl : (url:string, params?: QueryType)=> string;

> concatenate url and parameters

Subject
-------

简单的订阅

#### Usage

```js
import {Subject} from "@ztwx/utils";
const s=Subject();
// 订阅
const order=s.subscribe(action=>console.log(action))
// 分发 
s.next(action);
//取消订阅
order.unsubscribe();
```

Queue
-----

简单的队列等待

#### OneRun

同一时间节点，无论调用多少次，若执行方法未完成，则该方法的调用不会超过一次。


| method | type                                | desc                 |
| -------- | ------------------------------------- | ---------------------- |
| run    | `<T>(fn:()=>Promise<T>):Promise<T>` | 同代码时间，执行一次 |

Example：

```js
import {OneRun} from "@ztwx/utills";
const oneRun =new OneRun();

const run=async()=>{
  console.log("start run.");
  await oneRun.run(()=>new Promise((resolve)=>{
    console.log("run!");
    setTimeout(resolve,1000);
  }))
  console.log("end run.");
}
run();
run();
/**
 * print result:
 * start run
 * start run
 * run!
 * end run
 * end run
 */
```

#### QueueRun <T,R>

指定方法，在完成(end)后执行

| method            | type                                     | desc                   |
| ------------------- | ------------------------------------------ | ------------------------ |
| end               | `(r:T):void`                             | 完成                   |
| err               | `(e:R):void`                             | 错误                   |
| awaitPromise      | `():Promise<T,R>`                        | 等待完成（promise）    |
| awaitRun          | `(cb:(r:T)=>void,err?:(e:R)=>void):void` | 等待完成 (callback)    |
| awaitUntilSuccess | `():Promise<T>`                          | 等待直到成功           |
| refresh           | `():void`                                | 刷新状态，清除等待队列 |



Example:

```js
import {QueueRun} from "@ztwx/utils";
const queueRun=new QueueRun();

const run=async()=> {
  await queueRun.awaitPromise();
  console.log("task end!");
}

run();
run();
console.log("start~");
queueRun.end("success");
run();
/**
 * print result:
 * 
 * start~
 * task end!
 * task end!
 * task end!
 * 
 */
```

Except
------

错误类


| 类                              | desc            |
| --------------------------------- | ----------------- |
| VoyoError                       | 基础错误        |
| NetWorkError(extends VoyoError) | 网络错误        |
| TimeoutError(extends VoyoError) | 超时错误        |
| ReqError(extends VoyoError)     | request响应错误 |
| EmptyError(extends VoyoError)   | 空白错误        |

UniqueId
--------

生成client唯一id.

#### Usage

```
import {getUniqueId} from "@ztwx/utils";

console.log(getUniqueId());
console.log(getUniqueId());
console.log(getUniqueId());
```

Object
------


| 工具函数          | type                                         | desc                                     |
| ------------------- | ---------------------------------------------- | ------------------------------------------ |
| isObject          | `(i:unknown):boolean`                        | 是否为字典对象                           |
| getObjectFromList | `(obj, keys:key[])=>Partial<obj>`            | 从指定数组里刷选出新对象                 |
| filterNullObj     | `(obj)=>Partial<obj>`                        | 去除值为`null或undefined`的部分          |
| filterEmptyObj    | `(obj)=>Partial<obj>`                        | 去除值为`null或undefined或""`的部分      |
| floatSimplify     | `(float:number,decimalCount:number)=>number` | 浮点类数字，约束小数点`(decimalCount)`位 |

#### Usage

```Usage
import {isObject} from "@ztwx/utils";
```

MD5
---
| method| type|
|--- |--- |
|strToMd5 | (content:string):string|
#### Usage
```js
import {strToMd5} from "@ztwx/utils/lib/data/md5"

console.log(strToMd5("xxxx")); //获得md5 hash值
```

Web Env
-------

web环境获取


| 工具常量  | desc           |
| ----------- | ---------------- |
| isMobile  | 是否为移动环境 |
| isAndroid | 是否为安卓     |
| isIOS     | 是否为ios      |
| isWechat  | 是否为微信     |
| isAlipay  | 是否为支付宝   |
#### Usage
```js
import {isIOS} from "@ztwx/utils";
console.log(isIOS);
```
Web Compress Image
------------------

web图片压缩


| Method                           | type                                                                    | desc                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| FileCompress.compressImgFromFile | `(File,quality?:number,resolution?:number):Promise<[filename,dataUrl]>` | 压缩图片，返回随机图片名和DataUrl,`quality`和`resolution`取0至1，不指定时会按默认算法自动调整 |
| dataURLtoArrayBuffer             | `(dataUrl):Uint8Array`                                                  | 转换dataUrl为`ArrayBuffer`                                                                    |
| dataURLtoBlob                    | `(dataUrl):Promise<Blob>`                                               | 转换dataUrl为`blob`                                                                           |
| compressDataUrl                  | `(dataUrl):Promise<dataUrl>`                                            | 压缩`dataUrl`                                                                                 |

#### Example

```js
import {FileCompress ,dataURLtoArrayBuffer,dataURLtoBlob} from "@ztwx/utils";
const fileCompress=new FileCompress();

fileCompress.compressImgFromFile(file).then(async([filename,dataUrl])=>{
  console.log(dataUrl); //此处得到图片压缩后的dataUrl.
  
  const uinty8Arr=dataURLtoArrayBuffer(dataUrl); //如果需要arrayBuffer.
  
  const blob=await dataURLtoBlob(dataURLtoArrayBuffer); //如果需要blob.
})

```
Web Utils
---
|Method| type | desc|
| ---|---| ---|
|copy|(content:str):void| 复制字符串到剪贴板|
|getScrollParent|(node:HTMLElement):HTMLElement |获得父级滚动体|
|checkAndSetOffsetNode|(node:HTMLElement):void| 如果node不为offsetNode,则赋值style`position：relative`|
|getScrollDistanceFromNode|(target:HTMLElement,parent?:HTMLElement):number|获得targetNode top距目标offsetParent top的距离|
|VisibleScroll|implements BaseIntersection|根据scroll管理dom visible|
|VisibleIntersection|implements BaseIntersection|根据intersection管理dom visible|
|createScrollIntersection|():BaseIntersection|如果不支持intersection则返回`VisibleScroll`|
|loadJs|`(urlAddress:string,id:string,remove?:boolean):Promise<void>`|根据url加载js|
|loadCss|`(urlAddress:string,id:string):Promise<void>`| 根据url加载css|

#### Usage
```js
import {
  copy,
  getScrollParent,
  checkAndSetOffsetNode,
  getScrollDistanceFromNode,
  VisibleScroll,
  VisibleIntersection,
  createScrollIntersection
} from "@ztwx/utils/lib/web";

import {
  loadJs,
  loadCss
} from "@ztwx/utils/lib/load/loadJs";
```
TaskScheduler
---
任务调度器工具

每一次程序运行，进行一次**任务遍历**。

### API

**TaskRule**任务规则

| key| type|desc|
|---|---|---|
|id|string|任务id|
|index|number|执行顺序order|
|local?|boolean|是否保存本地|
|localExpires?|number(seconds)|保存本地时，过期时间。为0或不设置时，local默认不过期|

`TaskScheduler` 将会按照定义的index顺序,按序执行已推入方法的任务
> `推入任务方法: taskScheduler.registryTaskRun(opts)` 若index:2执行完后，再推入index:0的任务方法，则index:0的任务会后执行。

`local`为true时，该任务执行成功后将存入本地，未过期前，以后的**任务遍历**将不再检查该任务。

`local`不为true, 该任务在每次**任务遍历**开启后，都会检查该任务。

### Method

| method| type| desc|
|---|---|---|
|constructor|`(key:string,manager:StorageInterface):TaskScheduler`| TaskScheduler的构造方法，传入自定义key值，和[storage管理工具](#storageManger)|
|initTasksRule|`(rules:TaskRule[]):void`|初始化定义任务集|
|registryTaskRun|`(p:{id:string,run:({executeCount,lastExecuteTime}):Promise<void>}):void`|注册任务方法，注意run一定返回Promise,代表该方法结束|
|pauseCheck|():void|中断任务检查`一条任务检查完后会自动进行下一条的检查,该方法可以中断此行为`|
|restoreCheck|():void|被中断后，必须先调用`restoreCheck`，才能继续check|


Usage
```js
import {TaskScheduler} from "@ztwx/utils/lib/taskScheduler"
const taskScheduler=new TaskScheduler("task-storage-key",storageManger);
//注册任务
taskScheduler.initTasksRule([
  // TaskRule
  {
    id:"open-dialog1",
    index:0,
  },
  {
    id:"newbie-guide",
    index:2,
    local: true  //新手引导，每个本地只会执行一次
  },
  {
    id:"user-remind",
    index:3,
    local: true,
    localExpires: 60*60*24*12 //用户提醒，每12天执行一次
  }
]);

taskScheduler.registryTaskRun({
  id:"open-dialog1",
  run: ()=>openDialog('dialog content1').then(()=>{...})
})

taskScheduler.registryTaskRun({
  id:"newbie-guide",
  run: async()=>{
    // start 
    await startNewBieGuide();
    //end
  }
});

taskScheduler.registryTaskRun({
  id:"user-remind",
  /**
   * 
   * @param executeCount 已执行次数
   * @param lastExecuteTime 最后一次执行时间(seconds)
   * @returns {Promise<void>}
   */
  run: async({executeCount,lastExecuteTime})=>{
    //toDo...
  }
});

taskScheduler.check(); //开始检查任务
```
Complex Example 更复杂的案例:
```js
import {TaskScheduler} from "@ztwx/utils/lib/taskScheduler"
const taskScheduler=new TaskScheduler("task-storage-key",storageManger);
taskScheduler.initTasksRule([
  {
    id:"a",
    index:0,
  },
  {
    id:"c",
    index:1,
    local: true,
  }
]);

class IndexPage{
  created(){
    taskScheduler.registryTaskRun({
      id:"a",
      run: async()=>{
        taskScheduler.pauseCheck();
        //离开当前页前，暂停任务检测
        //保证任务检测只会在index Page内执行。
        routeSkip("/xxx/otherPage");
      }
    });
    taskScheduler.registryTaskRun({
      id:"b",
      run:async()=>{...}
    })
  }
  onPageShow(){
    //当前页显示时，恢复检查
    taskScheduler.restoreCheck();
    //因任务未开始，或被中断，所以此处需手动调用开启任务检查
    taskScheduler.check();
  }
  onPageHide(){
    //其他原因当前页被隐藏时，暂停任务检测
    taskScheduler.pauseCheck();
  }
}
```



<h5 id="storageManger">关于storage工具的实现</h5>
```typescript

import {StorageInterface} from "@ztwx/utils/lib/taskScheduler"
//web
export class WebStorage implements StorageInterface{
  saveVal(key:string,val:Record<string, any>){
    localStorage[key]=JSON.stringify(val);
  }
  getVal(key:string){
    return localStorage[key]?JSON.parse(localStorage[key]): undefined;
  }
}
```