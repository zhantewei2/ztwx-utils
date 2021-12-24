export const isObject=(obj:any):boolean=>
  obj!==null && typeof obj ==="object" && !(obj instanceof Array);

export const getObjectFromList = <T, K extends keyof T>(
  obj: T,
  list: K[],
):{[P in K]?:T[K]} => {
  const endObj:{[P in K]?:T[K]} ={};
  list.forEach((key) => {
    endObj[key] = obj[key];
  });
  return endObj;
};

export const filterIncludeObj=<T extends {[k:string]:any},K extends keyof T>(
  obj:T,
  exclude?: Array<K>,
  filterValue?: Array<any>,
):Partial<T>=>{
  const newObj: Partial<T> = {};
  let value;
  for (let i in obj) {
    if(exclude&&exclude.indexOf(i as any)>=0)continue;
    value = obj[i];
    if (!filterValue||!filterValue.includes(value)) {
      newObj[i]=value;
    }
  }
  return newObj;
}

export const filterNullObj = <T, K extends keyof T>(
  obj: T,
  exclude?: Array<K>
): Partial<T> => {
  return filterIncludeObj(obj,exclude,[undefined,null]);
};

export const filterEmptyObj= <T, K extends keyof T> (
  obj: T,
  exclude?: Array<K>
): Partial<T> => {
  return filterIncludeObj(obj,exclude,[undefined,null,""]);
};

export const floatSimplify=(float:number,decimalCount:number):number=>{
  return Math.round(float*Math.pow(10,decimalCount))/Math.pow(10,decimalCount);
}