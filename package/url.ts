export type QueryType=Record<any, any>;

export const getPureUrl=(url:string)=>url?(url.match(/^[^?#]*/)||"").toString():url;
export const getUrlTag=(url:string)=>url&&(url.match(/#[^?#]*/)||"").toString().slice(1);
export const getQueryStr=(url:string)=>url&&(url.match(/\?[^#?]*/)||"").toString().slice(1);


export const encodeQuery=(obj:QueryType,URIComponent:boolean=true):string=>{
  let str:string='';
  if(!obj)return str;
  let value:any;
  for(let i in obj){
    value=URIComponent?encodeURIComponent(obj[i]):obj[i];
    if(value||value===0)str+=i+'='+value+'&';
  }
  return str.slice(0,-1);
}

export const decodeQuery=(url:string):QueryType=>{
  if(!url)return {};
  try {
    const str: string = getQueryStr(url);
    if (!str) return {};
    const result: Record<any, any> = {};
    const arr = str.split('&');
    arr.forEach(i => {
      const [key, value] = i.split('=');
      result[key] = decodeURIComponent(value || "");
    });
    return result;
  }catch (e){
    return {}
  }
}

export const parseUrl=(url:string):{
  pureUrl:string,
  tag:string,
  query:QueryType
}=>{
  return {
    pureUrl:getPureUrl(url),
    tag:getUrlTag(url),
    query:decodeQuery(url)
  }
}

export class QueryParams{
  /**
   * encode queryparams
   */
  encode=(obj:Record<any,any>,URIComponent:boolean=true):string=>
    encodeQuery(obj,URIComponent);  
  /**
   * decode queryparams
   */
  dencode=(url:string=""):QueryType=>
    decodeQuery(url);
}


export const queryparams=new QueryParams();

export const additionUrl=(url:string,params?:Record<any, any>,URIComponent:boolean=true)=>{
  const {tag,query,pureUrl} = parseUrl(url);
  const endParams=!params?query:Object.assign(query,params);
  return `${pureUrl}${tag?'#'+tag:''}${Object.keys(endParams).length?'?'+encodeQuery(endParams):''}`
}