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
