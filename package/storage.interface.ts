export type StorageValue=string|number|boolean|Record<any, any>|null|undefined;

export interface StorageInterface {
  saveVal(key:string,val:StorageValue):void;
  getVal(key:string):StorageValue;
}
