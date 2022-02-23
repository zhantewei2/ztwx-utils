export type StorageValue=string|number|boolean|Record<any, any>|null|undefined;

export interface StorageInterface {
  saveVal(key:string,val:StorageValue):void;
  getVal(key:string):StorageValue;
}

export class aa implements StorageInterface{
  saveVal(key:string,val:Record<string, any>){
    
  }
  
  getVal(key:string){
    return "";
  }
}