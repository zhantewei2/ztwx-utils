import {loadCss,loadJs} from "./loadJs";

export type AssemblyType="css"|"js";


export interface AssemblyFromFileParameter{
  fileAddress:string;
  type:AssemblyType,
  id:string;
  globalVariableName?:string;
}

export class LibraryItem{
  id:string;
  globalVariableName:string|undefined;
  get variable(){
    return this.globalVariableName&&(window as any)[this.globalVariableName];
  }
  loadSuccess:boolean=false;
  loadError:boolean=false;
  isloading:boolean=false;
  loadEnd:(err?:boolean)=>void=(err)=>err;
  constructor(
    id:string,
    globalVariableName:string|undefined
  ){
    this.id=id;
    this.globalVariableName=globalVariableName;
  }
  destroy():void{
    const el:HTMLElement|null=document.getElementById(this.id);
    el&&document.body.removeChild(el);
  }
  getVariable():Promise<any>{
    // load end
    if(this.loadSuccess)return Promise.resolve(this.variable)
    if(this.loadError)return Promise.reject("load failure");
    
    // not start load
    if(!this.isloading)return Promise.reject("not load");
    
    // is loading
    return new Promise((resolve,reject)=>{
      const oldLoadEnd=this.loadEnd;
      this.loadEnd=()=>{
        const loadError:any=oldLoadEnd.call(this);
        loadError?reject():resolve(this.variable);
        return loadError;
      }
    })

  }
  load(fileAddress:string,type:AssemblyType){

    if(this.isloading||this.loadSuccess||this.loadError)return;
   
    let method:any=type==="css"?loadCss:loadJs;

    this.isloading=true;
    method.call(method,fileAddress,type)
      .then(()=>{
        this.loadEnd();
        this.isloading=false;
        this.loadSuccess=true;
      })
      .catch(()=>{
        this.loadEnd(true);
        this.isloading=false;
        this.loadError=true;
      })
  }
}

export class Library{
  lib:{[key:string]:Promise<any>}={};
  _lib:Record<string,LibraryItem>={};

  private assemblyLib(id:string,libItem:LibraryItem){
    const self:Library=this;
    Object.defineProperty(this.lib,id,{
        writable:false,
        get(){
          return self._lib[id].getVariable();
        }
    })
  }

  /**
   * load js or css file.
   * @param id primarykey unique id. must be specified;
   * @param globalVariableName The global variable name provided by the js file;
   * @param fileAddress absolute path or relative path;
   * @param type  js|css;
   */
  public assemblyFromFile({id,globalVariableName,fileAddress,type}:AssemblyFromFileParameter){
      if(this._lib[id])return;
      const libraryItem:LibraryItem=new LibraryItem(id,globalVariableName);
      libraryItem.load(fileAddress,type);
      this._lib[id]=libraryItem;
      this.assemblyLib(id,libraryItem);
  }
  

}