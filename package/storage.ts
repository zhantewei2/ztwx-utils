import {StorageInterface} from "./storage.interface";


export class Storage implements StorageInterface{
  saveVal(key:string,val:Record<string, any>){
      localStorage.setItem(key,JSON.stringify(val));
  }

  getVal(key:string){
    try {
      const val = localStorage.getItem(key);
      return val?JSON.parse(val):null;
    }catch (e){
      return null;
    }
  }
}
