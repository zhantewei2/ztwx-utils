export const isObject=(obj:any)=>
  Object.prototype.toString.call(obj).toLowerCase() === "[object object]";

export const getObjectFromList = (
  obj: Record<string, any>,
  list: string[],
): Record<string, any> => {
  const endObj :Record<string, any>= {};
  list.forEach((key) => {
    endObj[key] = obj[key];
  });
  return endObj;
};

export const filterNullObj = (
  obj: Record<string, any>,
  exclude?: Array<string>
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  let value: any;
  for (let i in obj) {
    if(exclude&&exclude.indexOf(i)>=0)continue;
    value = obj[i];
    if (value !== null && value !== undefined) {
      newObj[i] = value;
    }
  }
  return newObj;
};
